import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Avatar,
  Menu as MuiMenu,
  MenuItem,
  Divider,
  Fade,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AddIcon from "@mui/icons-material/Add";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";

const drawerWidth = 240;

const ContentContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  minHeight: "calc(100vh - 64px - 56px)",
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  margin: theme.spacing(0, 1),
  color: active ? theme.palette.primary.main : "inherit",
  fontWeight: active ? 700 : 500,
  position: "relative",
  "&::after": active
    ? {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "3px",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "3px 3px 0 0",
      }
    : {},
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  cursor: "pointer",
  transition: "all 0.2s",
  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export const Menu = () => {
  const name = useSelector((state) => state.teacher.firstName);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    navigate("/");
  };

  const handleProfile = () => {
    handleClose();
    // Navigate to profile page or show profile modal
  };

  const menuItems = [
    { text: "דף הבית", icon: <HomeIcon />, path: "home" },
    { text: "אודות", icon: <InfoIcon />, path: "aboutAs" },
    { text: "הוספת ציון", icon: <AddIcon />, path: "updateMarks" },
    { text: "חיפוש תלמידים", icon: <PersonSearchIcon />, path: "allStudentsForEducatorTeacher" },
    { text: "ציונים לפי כיתה ומקצוע", icon: <AssessmentIcon />, path: "studentsByClassSub" },

    { text: "תפריט ניהול", icon: <SettingsIcon />, path: "manageMenu" },
    { text: "תעודות", icon: <SchoolIcon />, path: "diploma" },
  ];

  useEffect(() => {
    // On initial load, navigate to home instead of aboutAs
    navigate("home");
  }, []);

  const isActive = (path) => {
    return location.pathname === `/menu/${path}`;
  };

  const drawer = (
    <Box sx={{ width: drawerWidth }}>
      <DrawerHeader sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: "primary.main" }}>
          מערכת ניהול ציונים
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (isMobile) setDrawerOpen(false);
            }}
            sx={{
              backgroundColor: isActive(item.path) ? "rgba(26, 35, 126, 0.08)" : "transparent",
              borderRight: isActive(item.path) ? "3px solid #1a237e" : "none",
            }}
          >
            <ListItemIcon sx={{ color: isActive(item.path) ? "primary.main" : "inherit" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: isActive(item.path) ? "bold" : "normal",
                color: isActive(item.path) ? "primary.main" : "inherit",
              }}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="התנתק" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <StyledAppBar position="fixed">
        <StyledToolbar>
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
              מערכת ניהול ציונים
            </Typography>
          )}

          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {menuItems.map((item) => (
                <NavButton
                  key={item.text}
                  active={isActive(item.path)}
                  startIcon={item.icon}
                  onClick={() => navigate(item.path)}
                >
                  {item.text}
                </NavButton>
              ))}
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" sx={{ mr: 2, display: { xs: "none", sm: "block" } }}>
              שלום, {name}
            </Typography>
            <UserAvatar onClick={handleClick}>
              {name ? name.charAt(0).toUpperCase() : <AccountCircleIcon />}
            </UserAvatar>
            <MuiMenu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleProfile}>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>פרופיל</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>התנתק</ListItemText>
              </MenuItem>
            </MuiMenu>
          </Box>
        </StyledToolbar>
      </StyledAppBar>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? drawerOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: isMobile ? "block" : "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          mt: "64px", // AppBar height
        }}
      >
        <Fade in={true} timeout={800}>
          <ContentContainer maxWidth="xl">
            <Outlet />
          </ContentContainer>
        </Fade>

        <Box
          component="footer"
          sx={{
            py: 2,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) => theme.palette.grey[100],
            textAlign: "center",
            borderTop: '1px solid rgba(0, 0, 0, 0.06)'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} מערכת ניהול ציונים ותעודות | כל הזכויות שמורות
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

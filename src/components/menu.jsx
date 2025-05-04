import React, { useState, useEffect, useMemo } from "react";
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
  Switch,
  Badge,
  Tooltip,
  Paper,
  alpha,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

// Icons
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
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ClassIcon from "@mui/icons-material/Class";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import SearchIcon from "@mui/icons-material/Search";
import GradeIcon from "@mui/icons-material/Grade";
import PrintIcon from "@mui/icons-material/Print";

const drawerWidth = 280;

// Styled components
const ContentContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  minHeight: "calc(100vh - 64px - 56px)",
  transition: "all 0.3s ease",
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(90deg, #001064 0%, #0d2c94 100%)'
    : 'linear-gradient(90deg, #001064 0%, #0d47a1 100%)',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  margin: theme.spacing(0, 0.5),
  color: active ? '#ffffff' : 'rgba(255, 255, 255, 0.85)',
  fontWeight: active ? 700 : 500,
  position: "relative",
  borderRadius: "8px",
  padding: theme.spacing(0.8, 1.5),
  transition: "all 0.2s",
  "&:hover": {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: '#ffffff',
  },
  "&::after": active
    ? {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "3px",
        backgroundColor: '#ffffff',
        borderRadius: "3px 3px 0 0",
      }
    : {},
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1565c0' : '#bbdefb',
  color: theme.palette.mode === 'dark' ? '#ffffff' : '#001064',
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

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  margin: theme.spacing(0.8, 1),
  borderRadius: "8px",
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.12) : "transparent",
  transition: "all 0.2s",
  "&:hover": {
    backgroundColor: active
      ? alpha(theme.palette.primary.main, 0.18)
      : alpha(theme.palette.primary.main, 0.08),
  },
}));

export const Menu = () => {
  // Get teacher details from Redux store
  const teacherData = useSelector((state) => state.teacher);
  const { firstName, lastName, email, phone, classes } = teacherData;
 
  const navigate = useNavigate();
  const location = useLocation();
 
  // State
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState(null);
  // New state for help dialog
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
 
  // Create theme based on dark mode preference with navy blue color scheme
  const theme = useMemo(
    () =>
      createTheme({
        direction: 'rtl',
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            light: '#1565c0',
            main: '#001064',  // Navy blue as main color
            dark: '#000051',
            contrastText: '#fff',
          },
          secondary: {
            light: '#4f83cc',
            main: '#01579b',
            dark: '#002f6c',
            contrastText: '#fff',
          },
          background: {
            default: darkMode ? '#121212' : '#f5f5f5',
            paper: darkMode ? '#1e1e1e' : '#ffffff',
          },
        },
        typography: {
          fontFamily: '"Rubik", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: darkMode ? '#121212' : '#ffffff',
                backgroundImage: 'none',
              },
            },
          },
          MuiListItemIcon: {
            styleOverrides: {
              root: {
                color: darkMode ? '#1565c0' : '#001064',
                minWidth: '56px', // Increased spacing for icons
              },
            },
          },
        },
      }),
    [darkMode]
  );
 
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const open = Boolean(anchorEl);
  const notificationsOpen = Boolean(notificationsAnchorEl);
  const moreMenuOpen = Boolean(moreMenuAnchorEl);

  // Mock notifications
  const notifications = [
    { id: 1, text: "עדכון ציונים לכיתה ט'2 הושלם", read: false },
    { id: 2, text: "תזכורת: יש להזין ציוני מבחן עד מחר", read: false },
    { id: 3, text: "הפקת תעודות לסמסטר א' זמינה כעת", read: true },
    { id: 3, text: "יש לעדכן ציונים בסטטיסטיקה לכיתה י'1", read: false },
  ];

  // Menu items
  const menuItems = [
    { text: "דף הבית", icon: <HomeIcon />, path: "home" },
    { text: "אודות", icon: <InfoIcon />, path: "aboutAs" },
    { text: "הוספת ציון", icon: <AddIcon />, path: "updateMarks" },
    { text: "חיפוש תלמידים", icon: <PersonSearchIcon />, path: "allStudentsForEducatorTeacher" },
    { text: "ציונים לפי כיתה ומקצוע", icon: <AssessmentIcon />, path: "studentsByClassSub" },
    { text: "תפריט ניהול", icon: <SettingsIcon />, path: "manageMenu" },
    { text: "תעודות", icon: <SchoolIcon />, path: "diploma" },
  ];

  // Help topics for the help dialog
  const helpTopics = [
    {
      title: "ניווט במערכת",
      icon: <HomeIcon color="primary" />,
      content: "ניתן לנווט בין המסכים השונים באמצעות התפריט הצדדי או כפתורי הניווט בחלק העליון של המסך. לחיצה על לוגו המערכת תחזיר אותך תמיד לדף הבית."
    },
    {
      title: "חיפוש תלמידים",
      icon: <SearchIcon color="primary" />,
      content: "במסך 'חיפוש תלמידים' ניתן לחפש תלמידים לפי שם, כיתה או מספר זהות. לאחר בחירת תלמיד, ניתן לצפות בפרטיו המלאים ובציוניו."
    },
    {
      title: "הזנת ציונים",
      icon: <GradeIcon color="primary" />,
      content: "במסך 'הוספת ציון' ניתן להזין ציונים לתלמידים. יש לבחור כיתה, מקצוע, סוג מבחן ותאריך, ולאחר מכן להזין את הציונים לכל תלמיד. ניתן גם להוסיף הערות אישיות."
    },
    {
      title: "הפקת תעודות",
      icon: <PrintIcon color="primary" />,
      content: "במסך 'תעודות' ניתן להפיק תעודות לתלמידים. יש לבחור כיתה ותקופה, ולאחר מכן ניתן להפיק תעודות לכל הכיתה או לתלמידים נבחרים. התעודות ניתנות להדפסה או לשמירה כקובץ PDF."
    },
    {
      title: "ניהול פרופיל",
      icon: <AccountCircleIcon color="primary" />,
      content: "ניתן לצפות בפרטי הפרופיל שלך על ידי לחיצה על האייקון בפינה השמאלית העליונה. משם ניתן גם להתנתק מהמערכת."
    }
  ];

  // Handlers
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMoreMenuClick = (event) => {
    setMoreMenuAnchorEl(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreMenuAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    navigate("/");
  };

  const handleProfile = () => {
    handleClose();
    // Navigate to profile page or show profile modal
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleNotificationsClick = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  // New handlers for help dialog
  const handleHelpClick = () => {
    setHelpDialogOpen(true);
  };

  const handleHelpClose = () => {
    setHelpDialogOpen(false);
  };

  useEffect(() => {
    // On initial load, navigate to home
    navigate("home");
  }, []);

  const isActive = (path) => {
    return location.pathname === `/menu/${path}`;
  };

  // Drawer content
  const drawer = (
    <Box sx={{ width: drawerWidth, height: '100%' }}>
      <br />
      <DrawerHeader sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: "primary.main" }}>
            מערכת ניהול ציונים
          </Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        )}
      </DrawerHeader>
      <Divider />
      
      <Box sx={{ p: 2 }}>
        <Paper
          elevation={2}
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: theme => alpha(theme.palette.primary.main, 0.05),
            border: '1px solid',
            borderColor: theme => alpha(theme.palette.primary.main, 0.1),
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
           
            <UserAvatar sx={{ width: 50, height: 50, mr: 2 }}>
              {firstName ? firstName.charAt(0).toUpperCase() : <AccountCircleIcon />}
            </UserAvatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {firstName && lastName ? `${firstName} ${lastName}` : "משתמש"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                מורה
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ my: 1.5 }} />
          
          <Grid container spacing={1}>
            {email && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EmailIcon sx={{ fontSize: 18, mr: 1, color: 'primary.main' }} />
                  <Typography variant="body2" noWrap>
                    {email}
                  </Typography>
                </Box>
              </Grid>
            )}
            
            {phone && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PhoneIcon sx={{ fontSize: 18, mr: 1, color: 'primary.main' }} />
                  <Typography variant="body2">
                    {phone}
                  </Typography>
                </Box>
              </Grid>
            )}
            
            {classes && classes.length > 0 && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ClassIcon sx={{ fontSize: 18, mr: 1, color: 'primary.main' }} />
                  <Typography variant="body2">
                    {classes.length === 1
                      ? `כיתה: ${classes[0]}`
                      : `כיתות: ${classes.join(', ')}`}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Box>
      
      <Divider sx={{ my: 1 }} />
      
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <StyledListItem
            button
            key={item.text}
            active={isActive(item.path)}
            onClick={() => {
              navigate(item.path);
              if (isMobile) setDrawerOpen(false);
            }}
            sx={{ py: 1.2 }} // Added more vertical padding
          >
            <ListItemIcon sx={{
              color: isActive(item.path) ? "primary.main" : "inherit",
              minWidth: '56px' // Increased spacing for icons
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: isActive(item.path) ? "bold" : "normal",
                color: isActive(item.path) ? "primary.main" : "inherit",
              }}
            />
            {isActive(item.path) && (
              <Box
                sx={{
                  width: 4,
                  height: 35,
                  backgroundColor: 'primary.main',
                  
                  borderRadius: 4,
                  ml: 1
                }}
              />
            )}
          </StyledListItem>
        ))}
      </List>
      
      <Box sx={{ flexGrow: 1 }} />
      
      <Box sx={{ p: 2 }}>
        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: theme =>
              darkMode
                ? alpha(theme.palette.primary.main, 0.15)
                : alpha(theme.palette.primary.main, 0.08),
          }}
        >
          <Typography variant="body2">מצב לילה</Typography>
          <Switch
            checked={darkMode}
            onChange={handleDarkModeToggle}
            icon={<LightModeIcon fontSize="small" />}
            checkedIcon={<DarkModeIcon fontSize="small" />}
            color="primary"
          />
        </Paper>
      </Box>
      
      <Divider sx={{ my: 1 }} />
      
      <List>
        <StyledListItem button onClick={handleLogout} sx={{ py: 1.2 }}>
          <ListItemIcon sx={{ minWidth: '56px' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="התנתק" />
        </StyledListItem>
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <StyledAppBar position="fixed">
          <StyledToolbar>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
                <SchoolIcon sx={{ mr: 1 }} />
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                  מערכת ניהול ציונים
                </Typography>
              </Box>
            </Box>
            {/* Top Navigation for larger screens */}
            {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", mx: 2, flexGrow: 1, justifyContent: 'center' }}>
                {menuItems.slice(0, 5).map((item) => (
                  <NavButton
                    key={item.text}
                    active={isActive(item.path)}
                    startIcon={item.icon}
                    onClick={() => navigate(item.path)}
                  >
                    {item.text}
                  </NavButton>
                ))}
                
                <Button
                  endIcon={<KeyboardArrowDownIcon />}
                  color="inherit"
                  onClick={handleMoreMenuClick}
                  sx={{
                    borderRadius: '8px',
                    padding: theme => theme.spacing(0.8, 1.5),
                    transition: "all 0.2s",
                    color: 'rgba(255, 255, 255, 0.85)',
                    "&:hover": {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                    },
                  }}
                >
                  עוד
                </Button>
                <MuiMenu
                  anchorEl={moreMenuAnchorEl}
                  open={moreMenuOpen}
                  onClose={handleMoreMenuClose}
                  TransitionComponent={Fade}
                >
                  {menuItems.slice(5).map((item) => (
                    <MenuItem
                      key={item.text}
                      onClick={() => {
                        navigate(item.path);
                        handleMoreMenuClose();
                      }}
                      sx={{
                        minWidth: '180px',
                        backgroundColor: isActive(item.path) ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                      }}
                    >
                      <ListItemIcon sx={{
                        color: isActive(item.path) ? "primary.main" : "inherit",
                        minWidth: '56px' // Increased spacing for icons
                      }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          fontWeight: isActive(item.path) ? "bold" : "normal",
                        }}
                      />
                    </MenuItem>
                  ))}
                </MuiMenu>
              </Box>
            )}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* Notifications */}
              <Tooltip title="התראות">
                <IconButton
                  color="inherit"
                  onClick={handleNotificationsClick}
                  sx={{ mx: 1 }}
                >
                  <Badge badgeContent={notifications.filter(n => !n.read).length} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              
              <MuiMenu
                anchorEl={notificationsAnchorEl}
                open={notificationsOpen}
                onClose={handleNotificationsClose}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    width: 320,
                    maxHeight: 400,
                    mt: 1,
                  }
                }}
              >
                <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="h6">התראות</Typography>
                </Box>
                
                {notifications.length > 0 ? (
                  <List sx={{ p: 0 }}>
                    {notifications.map((notification) => (
                      <ListItem
                        key={notification.id}
                        sx={{
                          borderBottom: '1px solid',
                          borderColor: 'divider',
                          backgroundColor: notification.read ? 'transparent' : alpha(theme.palette.primary.main, 0.08),
                        }}
                      >
                        <ListItemText
                          primary={notification.text}
                          secondary={notification.read ? "נקרא" : "חדש"}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      אין התראות חדשות
                    </Typography>
                  </Box>
                )}
                
                <Box sx={{ p: 1, textAlign: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
                  <Button size="small" color="primary">
                    סמן הכל כנקרא
                  </Button>
                </Box>
              </MuiMenu>

              {/* Help */}
              <Tooltip title="עזרה">
                <IconButton 
                  color="inherit" 
                  sx={{ mx: 1 }}
                  onClick={handleHelpClick}
                >
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>

              {/* Help Dialog */}
              <Dialog
                open={helpDialogOpen}
                onClose={handleHelpClose}
                maxWidth="md"
                fullWidth
                PaperProps={{
                  sx: {
                    borderRadius: 2,
                    maxHeight: '80vh'
                  }
                }}
              >
                <DialogTitle sx={{ 
                  bgcolor: 'primary.main', 
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <LiveHelpIcon />
                  <Typography variant="h6" component="div">
                    עזרה ומדריך שימוש במערכת
                  </Typography>
                </DialogTitle>
                <DialogContent dividers>
                  <DialogContentText paragraph sx={{ mb: 3 }}>
                    ברוכים הבאים למערכת ניהול הציונים והתעודות. להלן מידע שיעזור לך להשתמש במערכת ביעילות:
                  </DialogContentText>
                  
                  {helpTopics.map((topic, index) => (
                    <Accordion key={index} sx={{ mb: 1 }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ 
                          '&.Mui-expanded': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.08)
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          {topic.icon}
                          <Typography variant="subtitle1" fontWeight="bold">
                            {topic.title}
                          </Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography paragraph>
                          {topic.content}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                  
                  <Box sx={{ mt: 3, p: 2, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold" color="primary.main" gutterBottom>
                      צריכים עזרה נוספת?
                    </Typography>
                    <Typography variant="body2">
                      אם נתקלתם בבעיה או שיש לכם שאלות נוספות, אנא פנו לצוות התמיכה הטכנית שלנו בכתובת:
                     ester1234@schoolgrade.co.il  או chaya1234@schoolgrade.co.il
                    </Typography>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleHelpClose} variant="contained" color="primary">
                    סגור
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Dark Mode Toggle (mobile only) */}
              {isMobile && (
                <Tooltip title={darkMode ? "מצב יום" : "מצב לילה"}>
                  <IconButton color="inherit" onClick={handleDarkModeToggle} sx={{ mx: 1 }}>
                    {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                </Tooltip>
              )}
              {/* User Menu */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" sx={{ mr: 2, display: { xs: "none", sm: "block" }, color: '#ffffff' }}>
                  שלום, {firstName}
                </Typography>
                <UserAvatar onClick={handleClick}>
                  {firstName ? firstName.charAt(0).toUpperCase() : <AccountCircleIcon />}
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
                 

                  PaperProps={{
                    elevation: 3,
                    sx: {
                      width: 280,
                      maxHeight: 400,
                      mt: 1,
                    }
                  }}
                >
                  <Box sx={{ px: 2, py: 2, textAlign: 'center' }}>
                    <UserAvatar sx={{ width: 60, height: 60, mx: 'auto', mb: 1 }}>
                      {firstName ? firstName.charAt(0).toUpperCase() : <AccountCircleIcon />}
                    </UserAvatar>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {firstName && lastName ? `${firstName} ${lastName}` : "משתמש"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      מורה
                    </Typography>
                  </Box>
                  
                  <Divider />
                  
                  <Box sx={{ p: 2 }}>
                    {email && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <EmailIcon sx={{ fontSize: 18, mr: 1, color: 'primary.main' }} />
                        <Typography variant="body2" noWrap>
                          {email}
                        </Typography>
                      </Box>
                    )}
                    
                    {phone && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <PhoneIcon sx={{ fontSize: 18, mr: 1, color: 'primary.main' }} />
                        <Typography variant="body2">
                          {phone}
                        </Typography>
                      </Box>
                    )}
                    
                    {classes && classes.length > 0 && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ClassIcon sx={{ fontSize: 18, mr: 1, color: 'primary.main' }} />
                        <Typography variant="body2">
                          {classes.length === 1
                            ? `כיתה: ${classes[0]}`
                            : `כיתות: ${classes.join(', ')}`}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  
                  <Divider />
                  
                  <MenuItem onClick={handleProfile}>
                    <ListItemIcon sx={{ minWidth: '40px' }}>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>פרופיל</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon sx={{ minWidth: '40px' }}>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>התנתק</ListItemText>
                  </MenuItem>
                </MuiMenu>
              </Box>
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
            transition: "all 0.3s ease",
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
              backgroundColor: (theme) =>
                darkMode ? alpha(theme.palette.background.paper, 0.6) : theme.palette.grey[100],
              textAlign: "center",
              borderTop: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} מערכת ניהול ציונים ותעודות | כל הזכויות שמורות
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Menu;
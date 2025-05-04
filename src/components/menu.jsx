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
  Chip,
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

// שדרוג: סגנון חדש לפריטי התפריט עם אנימציות ואפקטים
const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  margin: theme.spacing(0.8, 1),
  borderRadius: "12px",
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.15) : "transparent",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    backgroundColor: active
      ? alpha(theme.palette.primary.main, 0.2)
      : alpha(theme.palette.primary.main, 0.08),
    transform: "translateY(-2px)",
    boxShadow: active ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none",
  },
  "&:active": {
    transform: "translateY(0)",
  },
  "&::before": active ? {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "4px",
    height: "100%",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "0 4px 4px 0",
  } : {},
}));

// שדרוג: סגנון חדש לאייקונים בתפריט
const StyledListItemIcon = styled(ListItemIcon)(({ theme, active }) => ({
  minWidth: '50px',
  color: active ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.7),
  transition: "all 0.3s ease",
  "& .MuiSvgIcon-root": {
    fontSize: "1.4rem",
    transition: "transform 0.2s ease",
  },
  ".MuiListItem-root:hover &": {
    "& .MuiSvgIcon-root": {
      transform: "scale(1.1)",
    }
  }
}));

// שדרוג: סגנון חדש לטקסט בתפריט
const StyledListItemText = styled(ListItemText)(({ theme, active }) => ({
  "& .MuiTypography-root": {
    fontWeight: active ? 600 : 400,
    fontSize: "0.95rem",
    color: active ? theme.palette.primary.main : theme.palette.text.primary,
    transition: "all 0.3s ease",
  },
  ".MuiListItem-root:hover & .MuiTypography-root": {
    color: active ? theme.palette.primary.main : theme.palette.primary.dark,
  }
}));

// שדרוג: כרטיס פרופיל משתמש משופר
const ProfileCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: 16,
  backgroundColor: theme.palette.mode === 'dark' 
    ? alpha(theme.palette.primary.dark, 0.2)
    : alpha(theme.palette.primary.light, 0.1),
  backgroundImage: theme.palette.mode === 'dark'
    ? `linear-gradient(to bottom right, ${alpha(theme.palette.primary.dark, 0.05)}, ${alpha(theme.palette.primary.main, 0.2)})`
    : `linear-gradient(to bottom right, ${alpha(theme.palette.primary.light, 0.05)}, ${alpha(theme.palette.primary.main, 0.15)})`,
  border: `1px solid ${alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.15 : 0.2)}`,
  boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: `0 6px 25px ${alpha(theme.palette.common.black, 0.08)}`,
    transform: "translateY(-2px)",
  }
}));

// שדרוג: כפתור התנתקות משופר
const LogoutButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: 10,
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.mode === 'dark' 
    ? alpha(theme.palette.error.dark, 0.15)
    : alpha(theme.palette.error.light, 0.1),
  color: theme.palette.error.main,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.mode === 'dark' 
      ? alpha(theme.palette.error.dark, 0.25)
      : alpha(theme.palette.error.light, 0.2),
    transform: "translateY(-2px)",
  },
  "&:active": {
    transform: "translateY(0)",
  }
}));

// שדרוג: מתג מצב לילה משופר
const DarkModeSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.light,
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export const Menu = () => {
  // Get teacher details from Redux store
  const teacherData = useSelector((state) => state.teacher);
  const { firstName, lastName, email, phone, classes } = teacherData
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
                backgroundImage: darkMode 
                  ? 'linear-gradient(rgba(13, 71, 161, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(13, 71, 161, 0.05) 1px, transparent 1px)'
                  : 'linear-gradient(rgba(0, 16, 100, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 16, 100, 0.03) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                boxShadow: darkMode 
                  ? '1px 0 10px rgba(0, 0, 0, 0.5)'
                  : '1px 0 10px rgba(0, 0, 0, 0.1)',
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
    { id: 4, text: "יש לעדכן ציונים בסטטיסטיקה לכיתה י'1", read: false },
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

  // Drawer content - שדרוג תפריט הצד
  const drawer = (
    
    <Box sx={{ 
      width: drawerWidth, 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
       <br /> <br />
      <DrawerHeader sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: theme => alpha(theme.palette.primary.main, 0.03)
      }}>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SchoolIcon sx={{ 
            mr: 1, 
            color: 'primary.main',
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': { opacity: 0.7 },
              '50%': { opacity: 1 },
              '100%': { opacity: 0.7 },
            }
          }} />
         
          <Typography variant="h6" component="div" sx={{ 
            fontWeight: "bold", 
            color: "primary.main",
            background: theme => 
              `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            מערכת ניהול ציונים
          </Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle} sx={{
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'rotate(90deg)'
            }
          }}>
            <CloseIcon />
          </IconButton>
        )}
      </DrawerHeader>
      
      {/* פרופיל משתמש משודרג */}
      <Box sx={{ p: 2 }}>
        <ProfileCard elevation={0}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2,
            position: 'relative'
          }}>
            <UserAvatar sx={{ 
              width: 60, 
              height: 60, 
              mr: 2,
              border: '2px solid',
              borderColor: 'primary.main',
              boxShadow: '0 0 0 4px rgba(0, 16, 100, 0.1)'
            }}>
              {firstName ? firstName.charAt(0).toUpperCase() : <AccountCircleIcon />}
            </UserAvatar>
            <Box>
              <Typography variant="subtitle1" sx={{ 
                fontWeight: 'bold',
                fontSize: '1.1rem',
                mb: 0.5
              }}>
                {firstName && lastName ? `${firstName} ${lastName}` : "משתמש"}
              </Typography>
              <Typography variant="body2" sx={{
                color: 'primary.main',
                backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
                borderRadius: '12px',
                px: 1,
                py: 0.3,
                display: 'inline-block',
                fontSize: '0.75rem',
                fontWeight: 500
              }}>
                מורה
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ 
            my: 1.5,
            borderColor: theme => alpha(theme.palette.primary.main, 0.1),
            '&::before, &::after': {
              borderColor: theme => alpha(theme.palette.primary.main, 0.1),
            }
          }} />
          
          <Grid container spacing={1.5}>
            {email && (
              <Grid item xs={12}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 1,
                  p: 1,
                  borderRadius: 1.5,
                  backgroundColor: theme => alpha(theme.palette.background.default, 0.6),
                  '&:hover': {
                    backgroundColor: theme => alpha(theme.palette.background.default, 0.9),
                  },
                  transition: 'all 0.2s'
                }}>
                  <EmailIcon sx={{ 
                    fontSize: 18, 
                    mr: 1, 
                    color: 'primary.main',
                    opacity: 0.8
                  }} />
                  <Typography variant="body2" noWrap sx={{ fontSize: '0.85rem' }}>
                    {email}
                  </Typography>
                </Box>
              </Grid>
            )}
            
            {phone && (
              <Grid item xs={12}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 1,
                  p: 1,
                  borderRadius: 1.5,
                  backgroundColor: theme => alpha(theme.palette.background.default, 0.6),
                  '&:hover': {
                    backgroundColor: theme => alpha(theme.palette.background.default, 0.9),
                  },
                  transition: 'all 0.2s'
                }}>
                  <PhoneIcon sx={{ 
                    fontSize: 18, 
                    mr: 1, 
                    color: 'primary.main',
                    opacity: 0.8
                  }} />
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    {phone}
                  </Typography>
                </Box>
              </Grid>
            )}
            
            {classes && classes.length > 0 && (
              <Grid item xs={12}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  p: 1,
                  borderRadius: 1.5,
                  backgroundColor: theme => alpha(theme.palette.background.default, 0.6),
                  '&:hover': {
                    backgroundColor: theme => alpha(theme.palette.background.default, 0.9),
                  },
                  transition: 'all 0.2s'
                }}>
                  <ClassIcon sx={{ 
                    fontSize: 18, 
                    mr: 1, 
                    color: 'primary.main',
                    opacity: 0.8
                  }} />


                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    {classes.length === 1
                      ? `כיתה: ${classes[0]}`
                      : `כיתות: ${classes.join(', ')}`}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </ProfileCard>
      </Box>
      
      <Divider sx={{ 
        my: 1,
        borderColor: theme => alpha(theme.palette.primary.main, 0.1),
      }} />
      
      {/* תפריט ניווט משודרג */}
      <Box sx={{ 
        flexGrow: 1, 
        overflow: 'auto',
        px: 1,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: theme => alpha(theme.palette.primary.main, 0.3),
        },
      }}>
      
        
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
              sx={{ py: 1.2 }}
            >
              <StyledListItemIcon active={isActive(item.path)}>
                {item.icon}
              </StyledListItemIcon>
              <StyledListItemText 
                active={isActive(item.path)}
                primary={item.text}
              />
              {isActive(item.path) && (
                <Box
                  sx={{
                    width: 4,
                    height: 35,
                    backgroundColor: 'primary.main',
                    borderRadius: 4,
                    ml: 1,
                    boxShadow: '0 0 8px rgba(0, 16, 100, 0.3)',
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': { opacity: 0.7 },
                      '50%': { opacity: 1 },
                      '100%': { opacity: 0.7 },
                    }
                  }}
                />
              )}
            </StyledListItem>
          ))}
        </List>
      </Box>
      
      {/* מתג מצב לילה משודרג */}
      <Box sx={{ p: 2 }}>
        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: theme =>
              darkMode
                ? alpha(theme.palette.primary.main, 0.15)
                : alpha(theme.palette.primary.main, 0.08),
            border: '1px solid',
            borderColor: theme => alpha(theme.palette.primary.main, 0.1),
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: theme =>
                darkMode
                  ? alpha(theme.palette.primary.main, 0.2)
                  : alpha(theme.palette.primary.main, 0.12),
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {darkMode ? 
              <DarkModeIcon sx={{ mr: 1, color: 'primary.main' }} /> : 
              <LightModeIcon sx={{ mr: 1, color: 'primary.main' }} />
            }
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {darkMode ? 'מצב לילה' : 'מצב יום'}
            </Typography>
          </Box>
          <DarkModeSwitch
            checked={darkMode}
            onChange={handleDarkModeToggle}
          />
        </Paper>
      </Box>
      
      {/* כפתור התנתקות משודרג */}
      <Box sx={{ p: 2, pt: 0 }}>
        <LogoutButton
          fullWidth
          variant="text"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          התנתק
        </LogoutButton>
      </Box>
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
                  sx={{ 
                    mr: 2,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'rotate(180deg)'
                    }
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
                <SchoolIcon sx={{ mr: 1 }} />
                <Typography variant="h6" component="div" sx={{ 
                  fontWeight: "bold",
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                }}>
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
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      mt: 1,
                      borderRadius: 2,
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                      overflow: 'visible',
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    }
                  }}
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
                        borderRadius: 1,
                        mx: 0.5,
                        my: 0.3,
                        backgroundColor: isActive(item.path) ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: isActive(item.path) 
                            ? alpha(theme.palette.primary.main, 0.12)
                            : alpha(theme.palette.primary.main, 0.05),
                          transform: 'translateX(-4px)'
                        }
                      }}
                    >
                      <ListItemIcon sx={{
                        color: isActive(item.path) ? "primary.main" : "inherit",
                        minWidth: '40px'
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
                  sx={{ 
                    mx: 1,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Badge 
                    badgeContent={notifications.filter(n => !n.read).length} 
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        animation: notifications.filter(n => !n.read).length > 0 ? 'pulse 2s infinite' : 'none',
                        '@keyframes pulse': {
                          '0%': { transform: 'scale(1)' },
                          '50%': { transform: 'scale(1.2)' },
                          '100%': { transform: 'scale(1)' },
                        }
                      }
                    }}
                  >
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
                    borderRadius: 2,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    overflow: 'visible',
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  }
                }}
              >
                <Box sx={{ 
                  p: 2, 
                  borderBottom: '1px solid', 
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <Typography variant="h6">התראות</Typography>
                  <Badge 
                    badgeContent={notifications.filter(n => !n.read).length} 
                    color="error"
                    sx={{ ml: 1 }}
                  >
                    <NotificationsIcon color="primary" />
                  </Badge>
                </Box>
                
                {notifications.length > 0 ? (
                  <List sx={{ p: 0 }}>
                    {notifications.map((notification) => (
                      <ListItem
                        key={notification.id}
                        sx={{
                          borderBottom: '1px solid',
                          borderColor: 'divider',
                          backgroundColor: notification.read 
                            ? 'transparent' 
                            : alpha(theme.palette.primary.main, 0.08),
                          transition: 'all 0.2s',
                          '&:hover': {
                            backgroundColor: notification.read 
                              ? alpha(theme.palette.primary.main, 0.04)
                              : alpha(theme.palette.primary.main, 0.12),
                          }
                        }}
                      >
                        <ListItemText
                          primary={notification.text}
                          secondary={
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                display: 'inline-block',
                                color: notification.read ? 'text.secondary' : 'primary.main',
                                backgroundColor: notification.read 
                                  ? 'transparent' 
                                  : alpha(theme.palette.primary.main, 0.1),
                                borderRadius: '4px',
                                px: notification.read ? 0 : 0.8,
                                py: notification.read ? 0 : 0.2,
                              }}
                            >
                              {notification.read ? "נקרא" : "חדש"}
                            </Typography>
                          }
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
                
                <Box sx={{ 
                  p: 1, 
                  textAlign: 'center', 
                  borderTop: '1px solid', 
                  borderColor: 'divider' 
                }}>
                  <Button 
                    size="small" 
                    color="primary"
                    sx={{


                      borderRadius: 4,
                      px: 2,
                      py: 0.5,
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      }
                    }}
                  >
                    צפה בכל ההתראות
                  </Button>
                </Box>
              </MuiMenu>

              {/* Help Button */}
              <Tooltip title="עזרה">
                <IconButton
                  color="inherit"
                  onClick={handleHelpClick}
                  sx={{ 
                    mx: 1,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>

              {/* User Menu */}
              <Tooltip title="הגדרות משתמש">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  sx={{ 
                    ml: 1,
                    border: '2px solid',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.8)',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light' }}>
                    {firstName ? firstName.charAt(0).toUpperCase() : <AccountCircleIcon />}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
          </StyledToolbar>
        </StyledAppBar>

        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
          {/* Mobile drawer */}
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          
          {/* Desktop drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                borderRight: '1px solid',
                borderColor: 'divider',
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            mt: "64px",
            backgroundColor: theme => theme.palette.background.default,
            minHeight: "calc(100vh - 64px)",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            backgroundImage: darkMode 
              ? 'linear-gradient(rgba(13, 71, 161, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(13, 71, 161, 0.03) 1px, transparent 1px)'
              : 'linear-gradient(rgba(0, 16, 100, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 16, 100, 0.02) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        >
          <Outlet />
        </Box>

        {/* User Menu */}
        <MuiMenu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1,
              borderRadius: 2,
              minWidth: 200,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              overflow: 'visible',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            }
          }}
        >
          <Box sx={{ 
            p: 2, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}>
            <Avatar 
              sx={{ 
                width: 60, 
                height: 60, 
                mb: 1,
                bgcolor: 'primary.main',
                boxShadow: '0 4px 12px rgba(0, 16, 100, 0.2)'
              }}
            >
              {firstName ? firstName.charAt(0).toUpperCase() : <AccountCircleIcon />}
            </Avatar>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {firstName && lastName ? `${firstName} ${lastName}` : "משתמש"}
            </Typography>
            {email && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {email}
              </Typography>
            )}
            <Chip 
              label="מורה" 
              size="small" 
              color="primary" 
              sx={{ 
                borderRadius: '12px',
                fontWeight: 500,
                px: 1
              }} 
            />
          </Box>
          
          <MenuItem onClick={handleProfile} sx={{ py: 1.5 }}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText>פרופיל אישי</ListItemText>
          </MenuItem>
          
          <MenuItem onClick={handleDarkModeToggle} sx={{ py: 1.5 }}>
            <ListItemIcon>
              {darkMode ? (
                <DarkModeIcon fontSize="small" color="primary" />
              ) : (
                <LightModeIcon fontSize="small" color="primary" />
              )}
            </ListItemIcon>
            <ListItemText>{darkMode ? "מצב יום" : "מצב לילה"}</ListItemText>
          </MenuItem>
          
          <Divider />
          
          <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>התנתק</ListItemText>
          </MenuItem>
        </MuiMenu>

        {/* Help Dialog */}
        <Dialog
          open={helpDialogOpen}
          onClose={handleHelpClose}
          maxWidth="md"
          PaperProps={{
            elevation: 5,
            sx: {
              borderRadius: 3,
              overflow: 'hidden',
              maxWidth: 700
            }
          }}
        >
          <DialogTitle sx={{ 
            bgcolor: 'primary.main', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <HelpOutlineIcon sx={{ mr: 1 }} />
              <Typography variant="h6" component="div">
                מרכז העזרה
              </Typography>
            </Box>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleHelpClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 0 }}>
            <Box sx={{ p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
              <Typography variant="body1" gutterBottom>
                ברוכים הבאים למרכז העזרה של מערכת ניהול הציונים. כאן תוכלו למצוא מידע שימושי על אופן השימוש במערכת.
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {helpTopics.map((topic, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        height: '100%',
                        borderRadius: 2,
                        transition: 'all 0.2s',
                        '&:hover': {
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                          transform: 'translateY(-4px)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                        <Box sx={{ 
                          mr: 2, 
                          p: 1, 
                          borderRadius: '50%', 
                          bgcolor: alpha(theme.palette.primary.main, 0.1) 
                        }}>
                          {topic.icon}
                        </Box>
                        <Box>
                          <Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                            {topic.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {topic.content}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Button 
              onClick={handleHelpClose} 
              color="primary" 
              variant="outlined"
              sx={{ borderRadius: 2, px: 3 }}
            >
              סגור
            </Button>
            <Button 
              color="primary" 
              variant="contained"
              startIcon={<EmailIcon />}
              sx={{ borderRadius: 2, px: 3 }}
            >
              צור קשר עם התמיכה
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default Menu;
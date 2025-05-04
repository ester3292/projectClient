import { styled, alpha } from '@mui/material/styles';
import { 
  AppBar, 
  Toolbar, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Button, 
  Paper,
  Switch
} from '@mui/material';

// AppBar מותאם אישית
export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.primary.main,
  backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  borderBottom: '1px solid',
  borderColor: alpha(theme.palette.common.white, 0.1),
}));

// Toolbar מותאם אישית
export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 3),
  },
}));

// כפתור ניווט מותאם אישית
export const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  color: active ? theme.palette.common.white : alpha(theme.palette.common.white, 0.85),
  margin: theme.spacing(0, 0.5),
  padding: theme.spacing(0.8, 1.5),
  borderRadius: '8px',
  position: 'relative',
  fontWeight: active ? 600 : 400,
  transition: 'all 0.2s',
  '&::after': active ? {
    content: '""',
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '30%',
    height: '3px',
    backgroundColor: theme.palette.common.white,
    borderRadius: '3px 3px 0 0',
  } : {},
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    color: theme.palette.common.white,
    transform: 'translateY(-2px)',
  },
}));

// פריט רשימה מותאם אישית
export const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(0.5),
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.12) : 'transparent',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: active 
      ? alpha(theme.palette.primary.main, 0.18)
      : alpha(theme.palette.primary.main, 0.08),
    transform: 'translateX(-4px)',
  },
}));

// אייקון פריט רשימה מותאם אישית
export const StyledListItemIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({


  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  minWidth: '40px',
  transition: 'all 0.2s',
  '& .MuiSvgIcon-root': {
    fontSize: '1.3rem',
    transition: 'transform 0.2s',
  },
  '&:hover .MuiSvgIcon-root': {
    transform: 'scale(1.1)',
  },
}));

// טקסט פריט רשימה מותאם אישית
export const StyledListItemText = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  '& .MuiListItemText-primary': {
    fontWeight: active ? 600 : 400,
    fontSize: '0.95rem',
    color: active ? theme.palette.primary.main : theme.palette.text.primary,
    transition: 'all 0.2s',
  },
}));

// כרטיס פרופיל מותאם אישית
export const ProfileCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: 'blur(10px)',
  border: '1px solid',
  borderColor: alpha(theme.palette.primary.main, 0.1),
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
    borderColor: alpha(theme.palette.primary.main, 0.2),
    transform: 'translateY(-2px)',
  },
}));

// אווטאר משתמש מותאם אישית
export const UserAvatar = styled('div')(({ theme }) => ({
  width: 50,
  height: 50,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 6px 12px ${alpha(theme.palette.primary.main, 0.4)}`,
  },
}));

// כפתור התנתקות מותאם אישית
export const LogoutButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius * 1.5,
  color: theme.palette.error.main,
  fontWeight: 500,
  transition: 'all 0.2s',
  border: '1px solid',
  borderColor: 'transparent',
  '&:hover': {
    backgroundColor: alpha(theme.palette.error.main, 0.08),
    borderColor: alpha(theme.palette.error.main, 0.3),
    transform: 'translateY(-2px)',
  },
}));

// מתג מצב לילה מותאם אישית
export const DarkModeSwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: theme.palette.primary.main,
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? alpha(theme.palette.primary.main, 0.3) : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

// כותרת מגירה מותאמת אישית
export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
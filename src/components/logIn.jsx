import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  InputAdornment,
  IconButton,
  Alert,
  Fade,
  CircularProgress,
  useMediaQuery,
  Zoom,
  Slide,
  Grow,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
// import { login } from "../redux/slices/teacherSlice";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import { logInThunk } from "../redux/slices/logInThunk";
import ForgotPassword from "./forgotPassword";
import ContactSupport from "./contactSupport";

// Styled components with animations
const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "16px",
  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
  overflow: "hidden",
  position: "relative",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    boxShadow: "0 15px 50px rgba(0, 0, 0, 0.2)",
    transform: "translateY(-5px)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
    borderRadius: "12px",
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    textAlign: "center",
  },
}));

const Logo = styled(SchoolIcon)(({ theme }) => ({
  fontSize: 60,
  color: theme.palette.primary.main,
  marginRight: theme.spacing(2),
  filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.1) rotate(5deg)",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 48,
    marginRight: 0,
    marginBottom: theme.spacing(1),
  },
}));

const AnimatedTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    transition: "all 0.3s ease",
    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
        borderWidth: "2px",
      },
    },
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
        borderWidth: "2px",
      },
    },
  },
  "& .MuiInputLabel-root": {
    transition: "all 0.3s ease",
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.2), transparent)",
    transform: "translateX(-100%)",
  },
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
    "&::before": {
      transform: "translateX(100%)",
      transition: "all 0.7s ease",
    },
  },
  "&:active": {
    transform: "translateY(0)",
  },
}));

const BackgroundAnimation = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  overflow: "hidden",
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    opacity: 0.1,
    animation: "pulse 15s infinite",
  },
  "&::before": {
    background: theme.palette.primary.main,
    top: "-150px",
    right: "-150px",
  },
  "&::after": {


    background: theme.palette.secondary.main,
    bottom: "-150px",
    left: "-150px",
    animationDelay: "5s",
  },
  "@keyframes pulse": {
    "0%": {
      transform: "scale(1)",
      opacity: 0.1,
    },
    "50%": {
      transform: "scale(1.1)",
      opacity: 0.15,
    },
    "100%": {
      transform: "scale(1)",
      opacity: 0.1,
    },
  },
}));

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const id = useSelector((state) => state.teacher.id);

  // Animation sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setLogoVisible(true), 300);
    const timer2 = setTimeout(() => setFormVisible(true), 800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (id > 2)
      navigate("/menu");
    else if (id === -2)
      navigate("/addTeacher");
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("אנא הזן שם משתמש וסיסמה");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // await new Promise(resolve => setTimeout(resolve, 1000));
      await dispatch(logInThunk(password));
    } catch (err) {
      setError("שם משתמש או סיסמה שגויים. אנא נסה שנית.");
    } finally {
      setLoading(false);
    }
  };


  const [contactSupportOpen, setContactSupportOpen] = useState(false);

// Add these handlers
const handleContactSupportOpen = (e) => {
  e.preventDefault();
  setContactSupportOpen(true);
};

const handleContactSupportClose = () => {
  setContactSupportOpen(false);
};
  const handleForgotPasswordOpen = (e) => {
    e.preventDefault();
    setForgotPasswordOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #001064 0%, #1a237e 50%, #283593 100%)",
        py: 4,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
        }}
      >
        {[...Array(6)].map((_, i) => (
          <Box
            key={i}
            component={motion.div}
            sx={{
              position: "absolute",
              background: "rgba(255, 255, 255, 0.03)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              y: ["0%", "100%", "0%"],
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
            }}
          />
        ))}
      </Box>
      <Container maxWidth="sm">
        <Fade in={true} timeout={800}>
          <LoginPaper elevation={6}>
            <BackgroundAnimation />
            <Zoom in={logoVisible} timeout={800}>
              <LogoContainer>
                <Logo />
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  component="h1"
                  fontWeight="bold"
                  color="primary"
                  sx={{
                    textAlign: isMobile ? "center" : "left",
                    background: "linear-gradient(45deg, #001064 30%, #3949ab 90%)",
                    backgroundClip: "text",
                    textFillColor: "transparent",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  מערכת ניהול ציונים
                </Typography>
              </LogoContainer>
            </Zoom>
            <Slide direction="up" in={formVisible} timeout={500}>
              <Box sx={{ width: "100%" }}>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  align="center"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -8,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "40px",
                      height: "3px",
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: "3px",
                    }
                  }}
                >
                  התחברות למערכת
                </Typography>
                <Grow in={error !== ""} timeout={500}>
                  <Box sx={{ width: "100%", mb: error ? 2 : 0 }}>
                    {error && (
                      <Alert
                        severity="error"
                        sx={{
                          width: "100%",
                          borderRadius: "8px",
                          animation: "shake 0.5s cubic-bezier(.36,.07,.19,.97) both",
                          "@keyframes shake": {
                            "0%, 100%": { transform: "translateX(0)" },
                            "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
                            "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
                          }
                        }}
                      >
                        {error}
                      </Alert>
                    )}
                  </Box>
                </Grow>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    width: "100%",
                    mt: 1,
                    "& .MuiTextField-root": {
                      transition: "transform 0.3s ease",
                      "&:focus-within": {
                        transform: "translateY(-5px)",
                      }
                    }
                  }}
                >
                  <AnimatedTextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="שם משתמש"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <AnimatedTextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="סיסמה"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{
                              transition: "transform 0.3s ease",
                              "&:hover": { transform: "scale(1.1)" }
                            }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 4 }}
                  />
                  <LoginButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={loading}
                    startIcon={loading ? undefined : <LoginIcon />}
                    sx={{
                      py: 1.5,
                      borderRadius: "8px",
                      fontWeight: "bold",
                      background: "linear-gradient(45deg, #001064 30%, #283593 90%)",
                      boxShadow: "0 4px 20px rgba(0, 16, 100, 0.4)",
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "התחבר"
                    )}
                  </LoginButton>
                  <Grid
                    container
                    sx={{
                      mt: 3,
                      opacity: loading ? 0.6 : 1,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <Grid item xs>
                      <Link
                        href="#"
                        variant="body2"
                        onClick={handleForgotPasswordOpen}
                        sx={{
                          position: "relative",
                          textDecoration: "none",
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                          transition: "all 0.3s ease",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            width: "0%",
                            height: "2px",
                            bottom: -2,
                            left: 0,
                            backgroundColor: theme.palette.primary.main,
                            transition: "width 0.3s ease",
                          },
                          "&:hover": {
                            color: theme.palette.primary.dark,
                            "&::after": {
                              width: "100%",
                            },
                          },
                        }}
                      >
                        שכחת סיסמה?
                      </Link>
                    </Grid>
                    <Grid item xs>
                      <Link
                        href="/addTeacher"
                        variant="body2"
                        sx={{
                          position: "relative",
                          textDecoration: "none",
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                          transition: "all 0.3s ease",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            width: "0%",
                            height: "2px",
                            bottom: -2,
                            left: 0,
                            backgroundColor: theme.palette.primary.main,
                            transition: "width 0.3s ease",
                          },
                          "&:hover": {
                            color: theme.palette.primary.dark,
                            "&::after": {
                              width: "100%",
                            },
                          },
                        }}
                      >
                        משתמש חדש?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link
                        href="#"
                        variant="body2"
                        onClick={handleContactSupportOpen}
                        sx={{
                          position: "relative",
                          textDecoration: "none",
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                          transition: "all 0.3s ease",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            width: "0%",
                            height: "2px",
                            bottom: -2,
                            left: 0,
                            backgroundColor: theme.palette.primary.main,
                            transition: "width 0.3s ease",
                          },
                          "&:hover": {
                            color: theme.palette.primary.dark,
                            "&::after": {
                              width: "100%",
                            },
                          },
                        }}
                      >
                        צור קשר עם התמיכה
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Slide>
            {/* Decorative elements */}
            <Box
              sx={{
                position: "absolute",
                top: 20,
                right: 20,
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "linear-gradient(45deg, rgba(0,16,100,0.1) 0%, rgba(41,121,255,0.1) 100%)",
                opacity: 0.5,
                animation: "float 6s ease-in-out infinite",
                "@keyframes float": {
                  "0%, 100%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(-10px)" },
                },
              }}
            />
            <ContactSupport 
  open={contactSupportOpen} 
  onClose={handleContactSupportClose} 
/>
            <Box
              sx={{
                position: "absolute",
                bottom: 30,
                left: 30,
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: "linear-gradient(45deg, rgba(0,16,100,0.1) 0%, rgba(41,121,255,0.1) 100%)",
                opacity: 0.5,
                animation: "float 8s ease-in-out infinite 1s",
              }}
            />
          </LoginPaper>
        </Fade>
        {/* Version info */}
        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 4,
            color: "rgba(255,255,255,0.7)",
            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            opacity: 0,
            animation: "fadeIn 1s ease forwards 1.5s",

            "@keyframes fadeIn": {
              to: { opacity: 1 }
            }
          }}
        >
          גרסה 2.0 | {new Date().getFullYear()} © כל הזכויות שמורות
        </Typography>
      </Container>

      {/* Forgot Password Dialog */}
      <ForgotPassword
        open={forgotPasswordOpen}
        onClose={handleForgotPasswordClose}
      />
    </Box>
  );
};

export default Login;
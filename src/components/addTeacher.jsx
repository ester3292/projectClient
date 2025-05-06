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
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Alert,
    Fade,
    InputAdornment,
    FormControlLabel,
    Checkbox,
    IconButton,
    Zoom,
    Slide,
    Grow,
    useMediaQuery,
    CircularProgress,
    Tooltip,
} from "@mui/material";
import { styled, useTheme, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import SchoolIcon from "@mui/icons-material/School";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SubjectIcon from "@mui/icons-material/Subject";
import LockIcon from "@mui/icons-material/Lock";
import LockResetIcon from "@mui/icons-material/LockReset";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { addTeacherThunk } from "../redux/slices/addTeacherThunk";
import { CheckBox, Favorite, FavoriteBorder, Help } from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
import { logInThunk } from "../redux/slices/logInThunk";
import { editId } from "../redux/slices/studentSlice";
import { resetDetails } from "../redux/slices/teacherSlice";

// Styled components with animations
const AddTeacherPaper = styled(Paper)(({ theme }) => ({
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

const ActionButton = styled(Button)(({ theme }) => ({
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

const AnimatedIconWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: theme.spacing(1),
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    transition: "all 0.3s ease",
    "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.2),
        transform: "scale(1.1) rotate(5deg)",
    },
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
    transition: "all 0.3s ease",
    '&:hover': {
        transform: 'scale(1.1)',
    },
    '&.Mui-checked': {
        animation: 'pulse 0.5s ease-in-out',
    },
    '@keyframes pulse': {
        '0%': {
            transform: 'scale(1)',
        },
        '50%': {
            transform: 'scale(1.2)',
        },
        '100%': {
            transform: 'scale(1)',
        },
    },
}));

export const AddTeacher = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [educator, setEducator] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [logoVisible, setLogoVisible] = useState(false);
    const [headerVisible, setHeaderVisible] = useState(false);

    // Animation sequence
    useEffect(() => {
        const timer1 = setTimeout(() => setLogoVisible(true), 300);
        const timer2 = setTimeout(() => setHeaderVisible(true), 600);
        const timer3 = setTimeout(() => setFormVisible(true), 900);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    const validateForm = () => {
        if (!id || !firstName || !lastName || !phone || !email) {
            setError("אנא מלא את כל השדות החובה");
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("אנא הזן כתובת אימייל תקינה");
            return false;
        }

        // Phone validation
        const phoneRegex = /^0\d{8,9}$/;
        if (!phoneRegex.test(phone)) {
            setError("אנא הזן מספר טלפון תקין (10 ספרות המתחיל ב-0)");
            return false;
        }

        // ID validation
        if (id.length < 5) {
            setError("מספר מזהה חייב להכיל לפחות 5 ספרות");
            return false;
        }

        return true;
    };

    const handleAddTeacher = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating network delay
            await dispatch(addTeacherThunk({
                id: id,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                educator: educator
            }));

            setSuccess(true);
            setError("");

            // Auto login after successful registration
            setTimeout(async () => {
                await dispatch(logInThunk(id));
                navigate("/menu");
            }, 1500);

        } catch (err) {
            setError("אירעה שגיאה בעת הוספת המורה. אנא נסה שנית.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddTeacher();
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
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
                            background: "rgba(0, 16, 100, 0.03)",
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

            <Container maxWidth="md">
                <Fade in={true} timeout={800}>
                    <AddTeacherPaper>
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

                        <Zoom in={headerVisible} timeout={500}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 3,
                                    position: "relative",
                                    "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        bottom: -8,
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        width: "60px",
                                        height: "3px",
                                        backgroundColor: theme.palette.primary.main,
                                        borderRadius: "3px",
                                    }
                                }}
                            >
                                <PersonAddIcon
                                    sx={{
                                        mr: 1,
                                        color: "primary.main",
                                        fontSize: 32,


                                        animation: "bounce 2s infinite",
                                        "@keyframes bounce": {
                                            "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
                                            "40%": { transform: "translateY(-10px)" },
                                            "60%": { transform: "translateY(-5px)" },
                                        }
                                    }}
                                />
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    fontWeight="bold"
                                    sx={{
                                        background: "linear-gradient(45deg, #001064 30%, #3949ab 90%)",
                                        backgroundClip: "text",
                                        textFillColor: "transparent",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    הוספת מורה חדש/ה
                                </Typography>
                            </Box>
                        </Zoom>

                        <Grow in={error !== "" || success} timeout={500}>
                            <Box sx={{ width: "100%", mb: (error || success) ? 2 : 0 }}>
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
                                {success && (
                                    <Alert
                                        severity="success"
                                        sx={{
                                            width: "100%",
                                            borderRadius: "8px",
                                            animation: "pulse 2s infinite",
                                            "@keyframes pulse": {
                                                "0%": { boxShadow: "0 0 0 0 rgba(76, 175, 80, 0.4)" },
                                                "70%": { boxShadow: "0 0 0 10px rgba(76, 175, 80, 0)" },
                                                "100%": { boxShadow: "0 0 0 0 rgba(76, 175, 80, 0)" },
                                            }
                                        }}
                                    >
                                        המורה נוספ/ה בהצלחה! מועבר למערכת...
                                    </Alert>
                                )}
                            </Box>
                        </Grow>

                        <Slide direction="up" in={formVisible} timeout={500}>
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
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <AnimatedTextField
                                                fullWidth
                                                label="מספר מזהה"
                                                required
                                                type="number"
                                                variant="outlined"
                                                value={id}
                                                onChange={(e) => setId(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <KeyIcon color="primary" />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                helperText="מספר מזהה ייחודי (לפחות 5 ספרות)"
                                            />
                                            <Tooltip title="מספר זה ישמש להתחברות למערכת">
                                                <IconButton sx={{ ml: 1 }}>
                                                    <Help fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <AnimatedTextField
                                            fullWidth
                                            label="שם פרטי"
                                            required
                                            variant="outlined"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonIcon color="primary" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <AnimatedTextField
                                            fullWidth
                                            label="שם משפחה"
                                            required
                                            variant="outlined"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <BadgeIcon color="primary" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <AnimatedTextField
                                            fullWidth
                                            label="אימייל"
                                            required
                                            variant="outlined"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailIcon color="primary" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <AnimatedTextField
                                            fullWidth
                                            label="פלאפון"
                                            required
                                            variant="outlined"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PhoneIcon color="primary" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            helperText="מספר טלפון נייד (10 ספרות)"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                p: 2,
                                                borderRadius: 2,
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                backgroundColor: alpha(theme.palette.background.paper, 0.7),
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    borderColor: theme.palette.primary.main,
                                                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                                                    transform: 'translateY(-3px)',
                                                },
                                            }}
                                        >
                                            <FormControlLabel
                                                control={
                                                    <StyledCheckbox
                                                        checked={educator}
                                                        onChange={() => setEducator(!educator)}
                                                        icon={<FavoriteBorder />}
                                                        checkedIcon={<Favorite />}
                                                        color="primary"
                                                    />
                                                }
                                                label={
                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            fontWeight: educator ? 600 : 400,
                                                            color: educator ? theme.palette.primary.main : 'text.primary',
                                                            transition: 'all 0.3s ease',
                                                        }}
                                                    >
                                                        מחנך/ת כיתה
                                                    </Typography>
                                                }
                                            />
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ mt: 1, opacity: 0.8 }}
                                            >
                                                סמן אפשרות זו אם המורה משמש/ת כמחנך/ת כיתה ויש לו/ה הרשאות מיוחדות
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mt: 4,
                                        flexDirection: isMobile ? 'column' : 'row',
                                        gap: isMobile ? 2 : 0,
                                    }}
                                >
                                    <ActionButton
                                        variant="outlined"
                                        color="primary"
                                        onClick={async () => {
                                           await dispatch(resetDetails());
                                           await navigate('/');
                                        }}
                                        sx={{
                                            width: isMobile ? "100%" : "48%",
                                            py: 1.2,
                                            borderRadius: "8px",
                                        }}
                                        startIcon={<ArrowBackIcon />}
                                        disabled={loading}
                                    >
                                        ביטול וחזרה
                                    </ActionButton>

                                    <ActionButton
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            width: isMobile ? "100%" : "48%",
                                            py: 1.2,
                                            borderRadius: "8px",
                                            fontWeight: "bold",
                                            background: "linear-gradient(45deg, #001064 30%, #283593 90%)",
                                            boxShadow: "0 4px 20px rgba(0, 16, 100, 0.4)",
                                        }}
                                        startIcon={loading ? undefined : <SaveIcon />}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <CircularProgress size={24} color="inherit" />
                                        ) : (
                                            "הוסף מורה"
                                        )}
                                    </ActionButton>
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
                    </AddTeacherPaper>
                </Fade>

                {/* Version info */}
                <Typography
                    variant="body2"
                    align="center"
                    sx={{
                        mt: 4,
                        color: "rgba(0,16,100,0.7)",
                        textShadow: "0 1px 2px rgba(255,255,255,0.3)",
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
        </Box>
    );
};

export default AddTeacher;
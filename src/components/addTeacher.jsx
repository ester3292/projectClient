import React, { useState } from "react";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import { CheckBox, Favorite, FavoriteBorder } from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
import { logInThunk } from "../redux/slices/logInThunk";

// import { addTeacherThunk } from "../redux/slices/teacherSlice";

const AddTeacherPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "16px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
}));

const LogoContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(4),
}));

const Logo = styled(SchoolIcon)(({ theme }) => ({
    fontSize: 48,
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
}));
const FormField = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
}));

const IconWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: theme.spacing(1),
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: "rgba(26, 35, 126, 0.1)",
}));
export const AddTeacher = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        id: "",
        email: "",
        phone: "",
        subject: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [educator, setEducator] = useState(false);


    //   const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //       ...formData,
    //       [name]: value,
    //     });
    //   };
    const handleAddTeacher = () => {
        if (id && phone && firstName && lastName && email) {
            dispatch(addTeacherThunk({
                id: id,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                educator: educator
            })).then((result) => {
                dispatch(logInThunk(id)).then(() => {
                    navigate("/menu");
                });
            });
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();       

        if (firstName || lastName ||id || phone || email) {
            setError("אנא מלא את כל השדות החובה");
            return;
        }
    };

    const subjects = [
        "מתמטיקה",
        "אנגלית",
        "עברית",
        "היסטוריה",
        "מדעים",
        "פיזיקה",
        "כימיה",
        "ביולוגיה",
        "מחשבים",
        "אמנות",
        "חינוך גופני",
        "אחר"
    ];

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                py: 4,
            }}
        >
            <Container maxWidth="md">
                <Fade in={true} timeout={800}>
                    <AddTeacherPaper>
                        <LogoContainer>
                            <Logo />
                            <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
                                מערכת ניהול ציונים
                            </Typography>
                        </LogoContainer>

                        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                            <PersonAddIcon sx={{ mr: 1, color: "primary.main", fontSize: 32 }} />
                            <Typography variant="h5" component="h2" gutterBottom>
                                הוספת מורה חדשה
                            </Typography>
                        </Box>

                        {error && (
                            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
                                המורה נוספה בהצלחה!
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormField>
                                    <TextField
                                        fullWidth
                                        label="מספר מזהה "
                                        required
                                        type="number"
                                        variant="outlined"
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                    />
                                    <IconWrapper>
                                        <KeyIcon color="primary" />
                                    </IconWrapper>
                                </FormField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormField>
                                    <TextField
                                        fullWidth
                                        label="שם פרטי"
                                        required
                                        variant="outlined"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    <IconWrapper>
                                        <PersonIcon color="primary" />
                                    </IconWrapper>
                                </FormField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormField>
                                    <TextField
                                        fullWidth
                                        label="שם משפחה"
                                        required
                                        variant="outlined"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                    <IconWrapper>
                                        <BadgeIcon color="primary" />
                                    </IconWrapper>
                                </FormField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormField>
                                    <TextField
                                        fullWidth
                                        label="אימייל"
                                        required
                                        variant="outlined"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <IconWrapper>
                                        <EmailIcon color="primary" />
                                    </IconWrapper>
                                </FormField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormField>
                                    <TextField
                                        fullWidth
                                        label="פלאפון"
                                        required
                                        variant="outlined"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    <IconWrapper>
                                        <PhoneIcon color="primary" />
                                    </IconWrapper>
                                </FormField>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={educator}
                                            onChange={() => setEducator(!educator)}
                                            icon={<FavoriteBorder />}
                                            checkedIcon={<Favorite />}
                                            color="primary"
                                        />
                                    }
                                    label="מחנך/ת כיתה"
                                />
                            </Grid>
                        </Grid>

                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => navigate(-1)}
                                    sx={{ width: "48%", py: 1.2 }}
                                    startIcon={<ArrowBackIcon />}
                                >
                                    ביטול
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ width: "48%", py: 1.2, borderRadius: "8px", fontWeight: "bold" }}
                                    startIcon={<SaveIcon />}
                                    onClick={handleAddTeacher}
                                >
                                    הוסף מורה
                                </Button>
                            </Box>
                        </Box>
                    </AddTeacherPaper>
                </Fade>
            </Container>
        </Box>
    );
};
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("הסיסמאות אינן תואמות");
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.id || !formData.password) {
      setError("אנא מלא את כל השדות החובה");
      return;
    }

    // Here you would dispatch the action to add a teacher
    // dispatch(addTeacherThunk(formData));
    
    // Show success message
    setError("");
    setSuccess(true);
    
    // Reset form after successful submission
    setTimeout(() => {
      setFormData({
        firstName: "",
        lastName: "",
        id: "",
        email: "",
        phone: "",
        subject: "",
        password: "",
        confirmPassword: "",
      });
      setSuccess(false);
      // Optional: navigate back to teachers list
      // navigate("/teachers");
    }, 2000);
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="firstName"
                    label="שם פרטי"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="שם משפחה"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="id"
                    label="תעודת זהות"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="email"
                    label="דואר אלקטרוני"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="phone"
                    label="טלפון"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="subject-label">מקצוע הוראה</InputLabel>
                    <Select
                      labelId="subject-label"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      label="מקצוע הוראה"
                      onChange={handleChange}
                      startAdornment={
                        <InputAdornment position="start">
                          <SubjectIcon color="primary" />
                        </InputAdornment>
                      }
                    >
                      {subjects.map((subject) => (
                        <MenuItem key={subject} value={subject}>
                          {subject}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="סיסמה"
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="אימות סיסמה"
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockResetIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
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
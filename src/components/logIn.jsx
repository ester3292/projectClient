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
  InputAdornment,
  IconButton,
  Alert,
  Fade,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { login } from "../redux/slices/teacherSlice";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SchoolIcon from "@mui/icons-material/School";
import { logInThunk } from "../redux/slices/logInThunk";

const LoginPaper = styled(Paper)(({ theme }) => ({
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

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!username || !password) {
      setError("אנא הזן שם משתמש וסיסמה");
      return;
    }
    dispatch(logInThunk(password));
    navigate("/menu");
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
      }}
    >
      <Container maxWidth="sm">
        <Fade in={true} timeout={800}>
          <LoginPaper>
            <LogoContainer>
              <Logo />
              <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
                מערכת ניהול ציונים
              </Typography>
            </LogoContainer>

            <Typography variant="h5" component="h2" gutterBottom align="center">
              התחברות למערכת
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", mt: 1 }}>
              <TextField
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
              />
              <TextField
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
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ py: 1.5, borderRadius: "8px", fontWeight: "bold" }}
              >
                התחבר
              </Button>
              <Grid container sx={{ mt: 3 }}>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    שכחת סיסמה?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    צור קשר עם התמיכה
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </LoginPaper>
        </Fade>
      </Container>
    </Box>
  );
};

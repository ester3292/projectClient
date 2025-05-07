import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import LockResetIcon from "@mui/icons-material/LockReset";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

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

const steps = ["הזן את כתובת האימייל שלך", "הזן את קוד האימות", "צור סיסמה חדשה"];

const ForgotPassword = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleNext = async () => {
    setError("");
    
    if (activeStep === 0) {
      if (!email) {
        setError("אנא הזן את כתובת האימייל שלך");
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("אנא הזן כתובת אימייל תקינה");
        return;
      }
      
      setLoading(true);
      try {
        // Simulate API call to send verification code
        await new Promise(resolve => setTimeout(resolve, 1500));
        setActiveStep(prevStep => prevStep + 1);
      } catch (err) {
        setError("אירעה שגיאה בשליחת קוד האימות. אנא נסה שנית.");
      } finally {
        setLoading(false);
      }
    } else if (activeStep === 1) {
      if (!verificationCode) {
        setError("אנא הזן את קוד האימות");
        return;
      }
      
      setLoading(true);
      try {
        // Simulate API call to verify code
        await new Promise(resolve => setTimeout(resolve, 1500));
        setActiveStep(prevStep => prevStep + 1);
      } catch (err) {
        setError("קוד האימות שגוי. אנא נסה שנית.");
      } finally {
        setLoading(false);
      }
    } else if (activeStep === 2) {
      if (!newPassword || !confirmPassword) {
        setError("אנא הזן את הסיסמה החדשה ואשר אותה");
        return;
      }
      
      if (newPassword !== confirmPassword) {
        setError("הסיסמאות אינן תואמות");
        return;
      }
      
      if (newPassword.length < 8) {
        setError("הסיסמה חייבת להכיל לפחות 8 תווים");
        return;
      }
      
      setLoading(true);
      try {
        // Simulate API call to reset password
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSuccess(true);
      } catch (err) {
        setError("אירעה שגיאה באיפוס הסיסמה. אנא נסה שנית.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
    setError("");
  };

  const handleClose = () => {
    setActiveStep(0);
    setEmail("");
    setVerificationCode("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess(false);
    onClose();
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <AnimatedTextField
            autoFocus
            margin="dense"
            id="email"
            label="כתובת אימייל"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: <EmailIcon color="primary" sx={{ mr: 1 }} />,
            }}
          />
        );
      case 1:
        return (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              קוד אימות נשלח לכתובת האימייל {email}
            </Typography>
            <AnimatedTextField
              autoFocus
              margin="dense"
              id="verificationCode"
              label="קוד אימות"
              fullWidth
              variant="outlined"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </>
        );
      case 2:
        return (
          <>
            <AnimatedTextField
              autoFocus
              margin="dense"
              id="newPassword"
              label="סיסמה חדשה"
              type="password"
              fullWidth
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                startAdornment: <LockResetIcon color="primary" sx={{ mr: 1 }} />,
              }}
            />
            <AnimatedTextField
              margin="dense"
              id="confirmPassword"
              label="אימות סיסמה"
              type="password"
              fullWidth
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                startAdornment: <LockResetIcon color="primary" sx={{ mr: 1 }} />,
              }}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        איפוס סיסמה
      </DialogTitle>
      <DialogContent>
        {!success ? (
          <>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {renderStepContent()}
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 3,
            }}
          >
            <CheckCircleOutlineIcon
              color="success"
              sx={{ fontSize: 60, mb: 2 }}
            />
            <Typography variant="h6" gutterBottom>
              הסיסמה אופסה בהצלחה!
            </Typography>
            <Typography variant="body1" align="center" color="text.secondary">
              ניתן כעת להתחבר למערכת עם הסיסמה החדשה שלך.
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        {!success ? (
          <>
            <Button onClick={handleClose} color="inherit">
              ביטול
            </Button>
            {activeStep > 0 && (
              <Button onClick={handleBack} disabled={loading}>
                חזרה
              </Button>
            )}
            <Button
              onClick={handleNext}
              variant="contained"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              {activeStep === steps.length - 1 ? "סיים" : "המשך"}
            </Button>
          </>
        ) : (
          <Button onClick={handleClose} variant="contained" fullWidth>
            חזרה להתחברות
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPassword;
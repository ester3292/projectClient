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
  CircularProgress,
  Alert,
  MenuItem,
  Divider,
  useMediaQuery,
  IconButton,
  Zoom,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

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

const SendButton = styled(Button)(({ theme }) => ({
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

const issueTypes = [
  { value: "login", label: "בעיות התחברות" },
  { value: "password", label: "איפוס סיסמה" },
  { value: "data", label: "בעיות בנתונים" },
  { value: "performance", label: "בעיות ביצועים" },
  { value: "feature", label: "בקשת תכונה חדשה" },
  { value: "other", label: "אחר" },
];

const ContactSupport = ({ open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issueType, setIssueType] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validation
    if (!name.trim()) {
      setError("אנא הזן את שמך");
      return;
    }
    
    if (!email.trim()) {
      setError("אנא הזן את כתובת האימייל שלך");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("אנא הזן כתובת אימייל תקינה");
      return;
    }
    
    if (!issueType) {
      setError("אנא בחר את סוג הבעיה");
      return;
    }
    
    if (!message.trim()) {
      setError("אנא הזן את תיאור הבעיה");
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form and show success message
      setSuccess(true);
    } catch (err) {
      setError("אירעה שגיאה בשליחת הפנייה. אנא נסה שנית.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      // Reset form when closing
      if (success) {
        setName("");
        setEmail("");
        setIssueType("");
        setMessage("");
        setError("");
        setSuccess(false);
      }
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
      fullScreen={fullScreen}
      TransitionComponent={Zoom}
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : "16px",
          overflow: "hidden",
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          background: theme.palette.primary.main,
          color: "white",
          py: 2
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SupportAgentIcon sx={{ mr: 1, fontSize: 28 }} />
          <Typography variant="h6" component="div" fontWeight="bold">
            צור קשר עם התמיכה
          </Typography>
        </Box>
        <IconButton 
          edge="end" 
          color="inherit" 
          onClick={handleClose} 
          aria-label="close"
          sx={{ 
            transition: "transform 0.2s",
            "&:hover": { transform: "rotate(90deg)" }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ py: 3 }}>
        {!success ? (
          <Box component="form" onSubmit={handleSubmit} noValidate>
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
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
            
            <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3 }}>
              אנו כאן כדי לעזור לך! אנא מלא את הטופס הבא ונחזור אליך בהקדם האפשרי.
            </Typography>
            
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mb: 3 }}>
              <AnimatedTextField
                fullWidth
                required
                label="שם מלא"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
              />
              
              <AnimatedTextField
                fullWidth
                required
                label="אימייל"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                InputProps={{
                  startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
            </Box>
            
            <AnimatedTextField
              select
              fullWidth
              required
              label="סוג הבעיה"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              variant="outlined"
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: <HelpOutlineIcon color="action" sx={{ mr: 1 }} />,
              }}
            >
              {issueTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </AnimatedTextField>
            
            <AnimatedTextField
              fullWidth
              required
              label="תיאור הבעיה"
              multiline
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              variant="outlined"
              placeholder="אנא תאר את הבעיה בפירוט רב ככל האפשר..."
            />
          </Box>
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h5" gutterBottom fontWeight="bold">
              פנייתך התקבלה בהצלחה!
            </Typography>
            <Typography variant="body1" paragraph>
              תודה שפנית אלינו. צוות התמיכה שלנו יצור איתך קשר בהקדם האפשרי.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              מספר פנייה: {Math.floor(Math.random() * 900000) + 100000}
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Typography variant="body2" color="text.secondary">
              זמן תגובה ממוצע: 24 שעות בימי עסקים
            </Typography>
          </Box>
        )}
      </DialogContent>
      
      {!success && (
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleClose} 
            color="inherit"
            disabled={loading}
          >
            ביטול
          </Button>
          <SendButton
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
            sx={{
              py: 1,
              px: 3,
              background: "linear-gradient(45deg, #001064 30%, #283593 90%)",
            }}
          >
            שלח פנייה
          </SendButton>
        </DialogActions>
      )}
      
      {success && (
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleClose} 
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: "8px",
              fontWeight: "bold",
              background: "linear-gradient(45deg, #001064 30%, #283593 90%)",
            }}
          >
            סגור
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ContactSupport;

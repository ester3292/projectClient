import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudentsThunk } from "../redux/slices/getAllStudents";
import { deleteStudentThunk } from "../redux/slices/deleteStudentThunk";
import { addStudentThunk } from "../redux/slices/addStudentThunk";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Fade,
  Alert,
  CircularProgress,
  Divider,
  Grid,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIcon from "@mui/icons-material/Phone";
import ClassIcon from "@mui/icons-material/Class";
import KeyIcon from "@mui/icons-material/Key";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: "rgba(26, 35, 126, 0.05)",
  },
  transition: "background-color 0.2s",
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

export const ShowStudents = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [myclass, setClass] = useState("");
  const students = useSelector(state => state.student.arr);
  const [viewAllStudents, setViewAllStudents] = useState(false);
  const [addStudent, setAddStudent] = useState(false);
  const loading = useSelector(state => state.student.loading);
  const error = useSelector(state => state.student.error);
  const success = useSelector(state => state.student.success);
  
  // New state for student registration success message
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);

  const refreshTable = () => {
    dispatch(getAllStudentsThunk());
  };

  const handleAddStudent = () => {
    if (id && phone && firstName && lastName && myclass) {
      dispatch(addStudentThunk({
        id: id,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        class: parseInt(myclass, 10)
      })).then((result) => {
        if (!result.error) {
          // Show registration success message
          setShowRegistrationSuccess(true);
          refreshTable();
        }
      });
      setAddStudent(false);
      clearForm();
    }
  };

  const clearForm = () => {
    setId("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setClass("");
  };

  const handleDeleteStudent = async (student) => {
    await dispatch(deleteStudentThunk({ details: student }));
    refreshTable();
  };

  // Handle closing the registration success message
  const handleCloseRegistrationSuccess = () => {
    setShowRegistrationSuccess(false);
  };

  return (
    <Fade in={true} timeout={800}>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Typography variant="h5" component="h2" fontWeight="bold" color="primary">
            ניהול תלמידים
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setAddStudent(true)}
              sx={{ mr: 2, borderRadius: "8px" }}
            >
              הוספת תלמיד
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={viewAllStudents ? <VisibilityOffIcon /> : <VisibilityIcon />}
              onClick={() => {
                setViewAllStudents(!viewAllStudents);
                if (!viewAllStudents) {
                  dispatch(getAllStudentsThunk());
                }
              }}
              sx={{ borderRadius: "8px" }}
            >
              {viewAllStudents ? "הסתר תלמידים" : "הצג כל התלמידים"}
            </Button>
          </Box>
        </Box>
        
        
        <Snackbar
          open={showRegistrationSuccess}
          autoHideDuration={6000}
          onClose={handleCloseRegistrationSuccess}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseRegistrationSuccess} 
            severity="success" 
            variant="filled"
            sx={{ width: '100%', fontWeight: 'bold' }}
          >
            רישום התלמיד בוצע בהצלחה!
          </Alert>
        </Snackbar>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            הפעולה בוצעה בהצלחה
          </Alert>
        )}
        <Dialog
          open={addStudent}
          onClose={() => setAddStudent(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "16px",
              p: 1
            }
          }}
        >
          <DialogTitle>
            <Typography variant="h5" component="div" fontWeight="bold" color="primary">
              הוספת תלמיד חדש
            </Typography>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ py: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormField>
                  <TextField
                    fullWidth
                    label="מספר זהות"
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
                    label="טלפון"
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
              <Grid item xs={12} md={6}>
                <FormField>
                  <TextField
                    fullWidth
                    label="כיתה"
                    required
                    type="number"
                    variant="outlined"
                    value={myclass}
                    onChange={(e) => setClass(e.target.value)}
                  />
                  <IconWrapper>
                    <ClassIcon color="primary" />
                  </IconWrapper>
                </FormField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setAddStudent(false);
                clearForm();
              }}
            >
              ביטול
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              onClick={handleAddStudent}
              disabled={!id || !firstName || !lastName || !phone || !myclass || loading}
            >
              שמירה
            </Button>
          </DialogActions>
        </Dialog>
        {viewAllStudents && (
          <Box sx={{ position: "relative" }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
              </Box>
            ) : students && students.length > 0 ? (
              <TableContainer component={Paper} sx={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>מספר זהות</StyledTableCell>
                      <StyledTableCell>שם פרטי</StyledTableCell>
                      <StyledTableCell>שם משפחה</StyledTableCell>
                      <StyledTableCell>טלפון</StyledTableCell>
                      <StyledTableCell>כיתה</StyledTableCell>
                      <StyledTableCell align="center">פעולות</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((student) => (
                      <StyledTableRow key={student.id}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.firstName}</TableCell>
                        <TableCell>{student.lastName}</TableCell>
                        <TableCell>{student.phone}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell align="center">
                          <Tooltip title="מחיקת תלמיד">
                            <IconButton
                              color="error"
                              onClick={() => handleDeleteStudent(student)}
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Alert severity="info">
                לא נמצאו תלמידים במערכת
              </Alert>
            )}
                       <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                startIcon={<RefreshIcon />}
                onClick={refreshTable}
                disabled={loading}
              >
                רענון נתונים
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Fade>
  );
};
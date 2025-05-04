import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTeacherThunk } from "../redux/slices/addTeacherThunk";
import { getAllTeachersThunk } from "../redux/slices/getAllTeachersThunk";
import { deleteTeacherThunk } from "../redux/slices/deleteTeacherThunk";
import {
    Box,
    Button,
    Checkbox,
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
    FormControlLabel,
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
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

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

export const ShowTeachers = () => {
    const dispatch = useDispatch();
    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [educator, setEducator] = useState(false);
    const teachers = useSelector(state => state.teacher.arr);
    const loading = useSelector(state => state.teacher.loading);
    const error = useSelector(state => state.teacher.error);
    const success = useSelector(state => state.teacher.success);
    const [viewAllTeachers, setViewAllTeachers] = useState(false);
    const [addTeacher, setAddTeacher] = useState(false);
    
    // New state for teacher assignment success message
    const [showAssignmentSuccess, setShowAssignmentSuccess] = useState(false);

    const refreshTable = () => {
        dispatch(getAllTeachersThunk());
    };

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
                if (!result.error) {
                    // Show assignment success message
                    setShowAssignmentSuccess(true);
                    refreshTable();
                }
            });
            setAddTeacher(false);
            clearForm();
        }
    };

    const clearForm = () => {
        setId("");
        setFirstName("");
        setLastName("");
        setPhone("");
        setEmail("");
        setEducator(false);
    };

    const handleDeleteTeacher = async (teacher) => {
        await dispatch(deleteTeacherThunk({ details: teacher }));
        refreshTable();
    };

    // Handle closing the assignment success message
    const handleCloseAssignmentSuccess = () => {
        setShowAssignmentSuccess(false);
    };

    return (
        <Fade in={true} timeout={800} width={1100}>
            <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                    <Typography variant="h5" component="h2" fontWeight="bold" color="primary">
                        ניהול מורים
                    </Typography>
                    <Box>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => setAddTeacher(true)}
                            sx={{ mr: 2, borderRadius: "8px" }}
                        >
                            הוספת מורה
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={viewAllTeachers ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            onClick={() => {
                                setViewAllTeachers(!viewAllTeachers);
                                if (!viewAllTeachers) {
                                    dispatch(getAllTeachersThunk());
                                }
                            }}
                            sx={{ borderRadius: "8px" }}
                        >
                            {viewAllTeachers ? "הסתר מורים" : "הצג כל המורים"}
                        </Button>
                    </Box>
                </Box>

                {/* Teacher assignment success message */}
                <Snackbar
                    open={showAssignmentSuccess}
                    autoHideDuration={6000}
                    onClose={handleCloseAssignmentSuccess}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert 
                        onClose={handleCloseAssignmentSuccess} 
                        severity="success" 
                        variant="filled"
                        sx={{ width: '100%', fontWeight: 'bold' }}
                    >
                        שיבוץ המורה בוצע בהצלחה!
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
                    open={addTeacher}
                    onClose={() => setAddTeacher(false)}
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
                            הוספת מורה חדש
                        </Typography>
                    </DialogTitle>
                    <Divider />
                    <DialogContent sx={{ py: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormField>
                                    <TextField
                                        fullWidth
                                        label="סיסמה"
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
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 3 }}>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setAddTeacher(false);
                                clearForm();
                            }}
                        >
                            ביטול
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                            onClick={handleAddTeacher}
                            disabled={!id || !firstName || !lastName || !phone || !email}
                        >
                            שמירה
                        </Button>
                    </DialogActions>
                </Dialog>
                {viewAllTeachers && (
                    <Box sx={{ position: "relative" }}>
                        {loading ? (
                            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                                <CircularProgress />
                            </Box>
                        ) : teachers && teachers.length > 0 ? (
                            <TableContainer component={Paper} sx={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>מזהה</StyledTableCell>
                                            <StyledTableCell>מחנך/ת</StyledTableCell>
                                            <StyledTableCell>שם פרטי</StyledTableCell>
                                            <StyledTableCell>שם משפחה</StyledTableCell>
                                            <StyledTableCell>טלפון</StyledTableCell>
                                            <StyledTableCell>אימייל</StyledTableCell>
                                            <StyledTableCell align="center">פעולות</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {teachers.map((teacher) => (
                                            <StyledTableRow key={teacher.id}>
                                                <TableCell>{teacher.id}</TableCell>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={teacher.educator}
                                                        disabled
                                                        icon={<FavoriteBorder />}
                                                        checkedIcon={<Favorite />}
                                                        color="primary"
                                                    />
                                                </TableCell>
                                                <TableCell>{teacher.firstName}</TableCell>
                                                <TableCell>{teacher.lastName}</TableCell>
                                                <TableCell>{teacher.phone}</TableCell>
                                                <TableCell>{teacher.email}</TableCell>
                                                <TableCell align="center">
                                                    <Tooltip title="מחיקת מורה">
                                                        <IconButton
                                                            color="error"
                                                            onClick={() => handleDeleteTeacher(teacher)}
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
                                לא נמצאו מורים במערכת
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
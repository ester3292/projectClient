import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTeacherThunk } from "../redux/slices/addTeacherThunk";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";

import SaveIcon from "@mui/icons-material/Save";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import { Favorite, FavoriteBorder } from "@mui/icons-material";


export const NewTeacher=()=>{
    const dispatch = useDispatch();
    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [educator, setEducator] = useState(false);
    const loading = useSelector(state => state.teacher.loading);
    const success = useSelector(state => state.teacher.success);
    const [addTeacher, setAddTeacher] = useState(false);
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
    const handleAddTeacher = () => {
        if (id && phone && firstName && lastName && email) {
            dispatch(addTeacherThunk({
                id: id,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                educator: educator
            }));
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


}
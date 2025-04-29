import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMarkForStudentThunk } from "../redux/slices/addMarkForStudentThunk";
import { getStudentThunk } from "../redux/slices/getStudentThunk";
import { resetMarkForStudent } from "../redux/slices/studentSlice";
import { useNavigate } from "react-router-dom";
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
  Fade,
  Alert,
  CircularProgress,
  Divider,
  Grid,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SaveIcon from '@mui/icons-material/Save';
import EditNoteIcon from '@mui/icons-material/EditNote';
import EmojiSymbolsIcon from '@mui/icons-material/EmojiSymbols';
import NumbersIcon from '@mui/icons-material/Numbers';
import KeyIcon from '@mui/icons-material/Key';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CloseIcon from '@mui/icons-material/Close';

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

const MarkChip = styled(Chip)(({ theme, mark }) => ({
  fontWeight: "bold",
  backgroundColor: 
    mark >= 90 ? theme.palette.success.light :
    mark >= 70 ? theme.palette.info.light :
    mark >= 55 ? theme.palette.warning.light :
    theme.palette.error.light,
  color: 
    mark >= 90 ? theme.palette.success.contrastText :
    mark >= 70 ? theme.palette.info.contrastText :
    mark >= 55 ? theme.palette.warning.contrastText :
    theme.palette.error.contrastText,
}));

export const UpdateMarks = () => {
  const success = useSelector(state => state.mark.success);
  const teacherId = useSelector(state => state.teacher.id);
  const marks = useSelector(state => state.student.marks);
  const loading = useSelector(state => state.mark.loading);
  const error = useSelector(state => state.mark.error);
  
  const [notes, setNotes] = useState("");
  const [subject, setSubject] = useState("");
  const [mark, setMark] = useState("");
  const [halfA, setHalfA] = useState("");
  const [id, setID] = useState("");
  const [addMark, setAddMark] = useState(true);
  const [returnToAboutAs, setReturnToAboutAs] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetMarkForStudent());
  }, []);

  useEffect(() => {
    if(returnToAboutAs === true)
      navigate(`../aboutAs`);
  }, [returnToAboutAs]);

  const handleSubmit = async () => {
    if (id && subject && mark) {
      await dispatch(addMarkForStudentThunk({ 
        StudentId: id, 
        Subject: subject, 
        Mark: mark, 
        Notes: notes, 
        TeacherId: teacherId, 
        HalfA: halfA 
      }));
      await dispatch(getStudentThunk(id));
      setAddMark(false);
    }
  };

  const handleCancel = () => {
    setAddMark(false);
    setReturnToAboutAs(true);
  };

  return (
    <Fade in={true} timeout={800}>
      <Box>
        <Dialog 
          open={addMark} 
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
              הוספת ציון חדש
            </Typography>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ py: 3 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormField>
                  <TextField
                    fullWidth
                    label="מספר זהות תלמיד"
                    required
                    type="number"
                    variant="outlined"
                    value={id}
                    onChange={(e) => setID(e.target.value)}
                  />
                  <IconWrapper>
                    <KeyIcon color="primary" />
                  </IconWrapper>
                </FormField>
              </Grid>
              <Grid item xs={12}>
                <FormField>
                  <TextField
                    fullWidth
                    label="מקצוע"
                    required
                    variant="outlined"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  <IconWrapper>
                    <EmojiSymbolsIcon color="primary" />
                  </IconWrapper>
                </FormField>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormField>
                  <TextField
                    fullWidth
                    label="ציון"
                    required
                    type="number"
                    variant="outlined"
                    value={mark}
                    onChange={(e) => setMark(e.target.value)}
                    inputProps={{ min: 0, max: 100 }}
                  />
                  <IconWrapper>
                    <NumbersIcon color="primary" />
                  </IconWrapper>
                </FormField>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormField>
                  <TextField
                    fullWidth
                    label="מחצית (0-א, 1-ב)"
                    required
                    type="number"
                    variant="outlined"
                    value={halfA}
                    onChange={(e) => setHalfA(e.target.value)}
                    inputProps={{ min: 0, max: 1 }}
                  />
                  <IconWrapper>
                    <EventAvailableIcon color="primary" />
                  </IconWrapper>
                </FormField>
              </Grid>
              <Grid item xs={12}>
                <FormField>
                  <TextField
                    fullWidth
                    label="הערות"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <IconWrapper>
                    <EditNoteIcon color="primary" />
                  </IconWrapper>
                </FormField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button 
              variant="outlined" 
              startIcon={<CloseIcon />}
              onClick={handleCancel}
            >
              ביטול
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              onClick={handleSubmit}
              disabled={!id || !subject || !mark || loading}
            >
              שמירה
            </Button>
          </DialogActions>
        </Dialog>

        {success && (
          <Box sx={{ mt: 4 }}>
            <Alert severity="success" sx={{ mb: 3 }}>
              הציון נוסף בהצלחה
            </Alert>
            
            {marks && marks.length > 0 && (
              <TableContainer component={Paper} sx={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>מקצוע</StyledTableCell>
                      <StyledTableCell>ציון</StyledTableCell>
                      <StyledTableCell>הערות</StyledTableCell>
                      <StyledTableCell>מזהה מורה</StyledTableCell>
                      <StyledTableCell>מחצית</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {marks.map((x, index) => (
                      <StyledTableRow key={index}>
                        <TableCell>{x.subject}</TableCell>
                        <TableCell>
                          <MarkChip 
                            label={x.mark} 
                            mark={x.mark} 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell>{x.notes || "-"}</TableCell>
                        <TableCell>{x.teacherId}</TableCell>
                        <TableCell>
                          <Chip 
                            label={x.halfA === 0 ? "מחצית א'" : "מחצית ב'"} 
                            color={x.halfA === 0 ? "primary" : "secondary"} 
                            size="small" 
                            variant="filled" 
                          />
                        </TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}
      </Box>
    </Fade>
  );
};

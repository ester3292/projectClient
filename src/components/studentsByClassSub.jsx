import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsByClassSubThunk } from "../redux/slices/getStudentsByClassSubThunk";
import { resetFind } from "../redux/slices/teacherSlice";
import { updateMarkThunk } from "../redux/slices/updateMarkThunk";
import { addMarkForStudentThunk } from "../redux/slices/addMarkForStudentThunk";
import { getStudentsByClassSubHalfThunk } from "../redux/slices/getStudentsByClassSubHalfThunk";
import { deleteMarkThunk } from "../redux/slices/deleteMarkThunk";
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
  Chip,
  ButtonGroup,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EditNoteIcon from '@mui/icons-material/EditNote';
import EmojiSymbolsIcon from '@mui/icons-material/EmojiSymbols';
import NumbersIcon from '@mui/icons-material/Numbers';
import RestoreFromTrashSharpIcon from '@mui/icons-material/RestoreFromTrashSharp';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import ClassIcon from '@mui/icons-material/Class';
import SearchIcon from '@mui/icons-material/Search';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

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
    cursor: "pointer",
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

export const StudentsByClassSub = () => {
  const find = useSelector(state => state.teacher.find);
  const IdTeacher = useSelector(state => state.teacher.id);
  const loading = useSelector(state => state.teacher.loading);
  const error = useSelector(state => state.teacher.error);

  const [myclass, setClass] = useState("");
  const [selected, setSelected] = useState(-1);
  const [sub, setSub] = useState("");
  const [halfA, setHalfA] = useState(-1);
  const [wichHalf, setWichHalf] = useState(false);
  const [perfectMark, setPerfectMark] = useState({});
  const [markToUpdate, setMarkToUpdate] = useState({});
  const [markToUpdate2, setMarkToUpdate2] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetFind());
    setMarkToUpdate({ ...markToUpdate, teacherId: IdTeacher, subject: sub });
    setMarkToUpdate2({ ...markToUpdate2, teacherId: IdTeacher, subject: sub });
  }, []);

  const refreshTable = async () => {
    setSearchPerformed(true);
    if (halfA !== -1)
      await dispatch(getStudentsByClassSubHalfThunk({
        sub: sub,
        myclass: parseInt(myclass, 10),
        halfA: parseInt(halfA, 10)
      }));
    else
      dispatch(getStudentsByClassSubThunk({
        sub: sub,
        myclass: parseInt(myclass, 10)
      }));
  };

  const handleSelectHalf = (half) => {
    setWichHalf(true);
    setHalfA(half);
    setMarkToUpdate({ ...markToUpdate, halfA: half });
    setMarkToUpdate2({ ...markToUpdate2, halfA: half });
  };

  const handleRowClick = (student) => {
    setPerfectMark(student.marksForStudent);
    setMarkToUpdate2({ ...markToUpdate2, studentId: student.id });
    setSelected(student.id);

    if (student.marksForStudent) {
      setMarkToUpdate({
        ...markToUpdate,
        id: student.marksForStudent.id,
        mark: student.marksForStudent.mark,
        notes: student.marksForStudent.notes,
        halfA: student.marksForStudent.halfA
      });
    }
    setShowDialog(true);
  };

  const handleDeleteMark = async (mark, e) => {
    e.stopPropagation();
    if (mark != null) {
      await dispatch(deleteMarkThunk({ details: mark }));
      refreshTable();
    }
  };

  const handleSaveMark = async () => {
    setMarkToUpdate({ ...markToUpdate, halfA: halfA });
    setMarkToUpdate2({ ...markToUpdate2, halfA: halfA });

    if (perfectMark) {
      await dispatch(updateMarkThunk({ details: { ...markToUpdate, studentId: selected } }));
    } else {
      await dispatch(addMarkForStudentThunk(markToUpdate2));
    }

    refreshTable();
    setShowDialog(false);
  };

  return (
    <Fade in={true} timeout={800}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" fontWeight="bold" color="primary" sx={{ mb: 4 }}>
          ציונים לפי כיתה ומקצוע
        </Typography>

        <Card sx={{ mb: 4, borderRadius: '16px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>
              בחירת מחצית
            </Typography>
            <ButtonGroup variant="contained" color="primary" sx={{ mb: 3 }}>
              <Button
                onClick={() => handleSelectHalf(1)}
                variant={halfA === 1 ? "contained" : "outlined"}
                startIcon={<EventAvailableIcon />}
              >
                מחצית ב'
              </Button>
              <Button
                onClick={() => handleSelectHalf(0)}
                variant={halfA === 0 ? "contained" : "outlined"}
                startIcon={<EventAvailableIcon />}
              >
                מחצית א'
              </Button>
              <Button
                onClick={() => handleSelectHalf(-1)}
                variant={halfA === -1 ? "contained" : "outlined"}
                startIcon={<EventAvailableIcon />}
              >
                כל המחציות
              </Button>
            </ButtonGroup>

            {wichHalf && (
              <Grid container spacing={2} alignItems="flex-end">
                <Grid item xs={12} md={4}>
                  <FormField>
                    <TextField
                      fullWidth
                      label="מקצוע"
                      required
                      variant="outlined"
                      value={sub}
                      onChange={(e) => {
                        setSub(e.target.value);
                        setMarkToUpdate({ ...markToUpdate, subject: e.target.value });
                        setMarkToUpdate2({ ...markToUpdate2, subject: e.target.value });
                      }}
                    />
                    <IconWrapper>
                      <EmojiSymbolsIcon color="primary" />
                    </IconWrapper>
                  </FormField>
                </Grid>
                <Grid item xs={12} md={4}>
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
                <Grid item xs={12} md={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
                    onClick={refreshTable}
                    disabled={!sub || !myclass || loading}
                  >
                    חיפוש
                  </Button>
                </Grid>
              </Grid>
            )}
          </CardContent>
        </Card>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {searchPerformed && myclass && (
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              ציונים לכיתה {myclass} במקצוע: {sub}
              {halfA === 0 ? " (מחצית א')" : halfA === 1 ? " (מחצית ב')" : " (כל המחציות)"}
            </Typography>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
              </Box>
            ) : find && find.length > 0 ? (
              <TableContainer component={Paper} sx={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>מזהה</StyledTableCell>
                      <StyledTableCell>שם פרטי</StyledTableCell>
                      <StyledTableCell>שם משפחה</StyledTableCell>
                      <StyledTableCell>טלפון</StyledTableCell>
                      <StyledTableCell>כיתה</StyledTableCell>
                      <StyledTableCell>ציון</StyledTableCell>
                      <StyledTableCell align="center">פעולות</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {find.map((student) => (
                      <StyledTableRow key={student.id} onClick={() => handleRowClick(student)}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.firstName}</TableCell>
                        <TableCell>{student.lastName}</TableCell>
                        <TableCell>{student.phone}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>
                          {student.marksForStudent ? (
                            <MarkChip
                              label={student.marksForStudent.mark}
                              mark={student.marksForStudent.mark}
                              size="small"
                            />
                          ) : (
                            <Chip label="אין ציון" variant="outlined" size="small" />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="מחיקת ציון">
                            <IconButton
                              color="error"
                              onClick={(e) => handleDeleteMark(student.marksForStudent, e)}
                              size="small"
                              disabled={!student.marksForStudent}
                            >
                              <RestoreFromTrashSharpIcon />
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
                לא נמצאו תלמידים בכיתה זו או שלא קיימים ציונים במקצוע זה
              </Alert>
            )}
          </Box>
        )}

        <Dialog
          open={showDialog}
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
              {perfectMark ? "עדכון ציון" : "הוספת ציון חדש"}
            </Typography>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ py: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormField>
                  <TextField
                    fullWidth
                    label="מקצוע"
                    variant="outlined"
                    value={sub}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <IconWrapper>
                    <EmojiSymbolsIcon color="primary" />
                  </IconWrapper>
                </FormField>
              </Grid>
              <Grid item xs={12}>
                <FormField>
                  <TextField
                    fullWidth
                    label="ציון"
                    required
                    type="number"
                    variant="outlined"
                    defaultValue={perfectMark && perfectMark.mark}
                    onChange={(e) => {
                      setMarkToUpdate({ ...markToUpdate, mark: e.target.value });
                      setMarkToUpdate2({ ...markToUpdate2, mark: e.target.value });
                    }}
                    inputProps={{ min: 0, max: 100 }}
                  />
                  <IconWrapper>
                    <NumbersIcon color="primary" />
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
                    defaultValue={perfectMark && perfectMark.notes}
                    onChange={(e) => {
                      setMarkToUpdate({ ...markToUpdate, notes: e.target.value });
                      setMarkToUpdate2({ ...markToUpdate2, notes: e.target.value });
                    }}
                  />
                  <IconWrapper>
                    <EditNoteIcon color="primary" />
                  </IconWrapper>
                </FormField>
              </Grid>
              {halfA === -1 && (
                <Grid item xs={12}>
                  <FormField>
                    <TextField
                      fullWidth
                      label="מחצית (0-א, 1-ב)"
                      required
                      type="number"
                      variant="outlined"
                      defaultValue={perfectMark && perfectMark.halfA}
                      onChange={(e) => {
                        setMarkToUpdate({ ...markToUpdate, halfA: e.target.value });
                        setMarkToUpdate2({ ...markToUpdate2, halfA: e.target.value });
                      }}
                      inputProps={{ min: 0, max: 1 }}
                    />
                    <IconWrapper>
                      <EventAvailableIcon color="primary" />
                    </IconWrapper>
                  </FormField>
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              variant="outlined"
              startIcon={<CloseIcon />}
              onClick={() => setShowDialog(false)}
            >
              ביטול
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              onClick={handleSaveMark}
              disabled={loading}
            >
              שמירה
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Fade>
  );
};

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentThunk } from "../redux/slices/getStudentThunk";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Fade,
  CircularProgress,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SubjectIcon from "@mui/icons-material/Subject";
import GradeIcon from "@mui/icons-material/Grade";
import NotesIcon from "@mui/icons-material/Notes";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

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

export const ShowStudentMarks = () => {
  const success = useSelector(state => state.mark.success);
  const marks = useSelector(state => state.student.marks);
  const id = useSelector(state => state.student.id);
  const loading = useSelector(state => state.student.loading);
  const error = useSelector(state => state.student.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudentThunk(id));
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Fade in={true} timeout={800}>
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" fontWeight="bold" color="primary" gutterBottom>
            ציוני התלמיד
          </Typography>
          <Typography variant="body1" color="textSecondary">
            מספר זהות: {id}
          </Typography>
        </Box>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            הפעולה בוצעה בהצלחה
          </Alert>
        )}

        {marks && marks.length > 0 ? (
          <TableContainer component={Paper} sx={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <SubjectIcon sx={{ mr: 1 }} />
                      מקצוע
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <GradeIcon sx={{ mr: 1 }} />
                      ציון
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <NotesIcon sx={{ mr: 1 }} />
                      הערות
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <PersonIcon sx={{ mr: 1 }} />
                      מזהה מורה
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CalendarTodayIcon sx={{ mr: 1 }} />
                      מחצית א'?
                    </Box>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {marks.map((mark, index) => (
                  <StyledTableRow key={index}>
                    <TableCell>{mark.subject}</TableCell>
                    <TableCell>
                      <MarkChip 
                        label={mark.mark} 
                        mark={mark.mark} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>{mark.notes || "-"}</TableCell>
                    <TableCell>{mark.teacherId}</TableCell>
                    <TableCell>
                      <Chip 
                        label={mark.halfA ? "כן" : "לא"} 
                        color={mark.halfA ? "primary" : "default"} 
                        size="small" 
                        variant={mark.halfA ? "filled" : "outlined"} 
                      />
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Alert severity="info">
            לא נמצאו ציונים לתלמיד זה
          </Alert>
        )}
      </Box>
    </Fade>
  );
};

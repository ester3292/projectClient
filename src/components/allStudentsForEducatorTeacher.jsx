import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsByClassThunk } from "../redux/slices/getStudentsByClassThunk";
import { useNavigate } from "react-router-dom";
import { getStudentThunk } from "../redux/slices/getStudentThunk";
import { editId } from "../redux/slices/studentSlice";
import { resetStudents } from "../redux/slices/teacherSlice";
import {
  Box,
  Button,
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
  Card,
  CardContent,
  Grid,
  Chip,
  Tooltip,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import ClassIcon from '@mui/icons-material/Class';
import PhoneIcon from '@mui/icons-material/Phone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
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

const StudentAvatar = styled(Box)(({ theme, index }) => {
  const colors = [
    theme.palette.primary.light,
    theme.palette.secondary.light,
    theme.palette.success.light,
    theme.palette.info.light,
    theme.palette.warning.light,
  ];

  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: colors[index % colors.length],
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: "1rem",
    marginRight: theme.spacing(1),
  };
});

export const AllStudentsForEducatorTeacher = () => {
  const students = useSelector(state => state.teacher.students);
  const loading = useSelector(state => state.teacher.loading);
  const error = useSelector(state => state.teacher.error);
  const [myclass, setClass] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetStudents());
  }, []);

  const showStudentMarks = async (id) => {
    await dispatch(editId(id));
    await dispatch(getStudentThunk(id));
    navigate(`../showStudentMarks`);
  };

  const handleSearch = async () => {
    if (myclass) {
      setSearchPerformed(true);
      const myclass2 = parseInt(myclass, 10);
      await dispatch(getStudentsByClassThunk(myclass2));
    }
  };

  return (
    <Fade in={true} timeout={800} width={1000000}>
      <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
        <Typography variant="h4" component="h1" fontWeight="bold" color="primary" sx={{ mb: 4, display: "flex", alignItems: "center" }}>
          <PeopleAltIcon sx={{ mr: 1, fontSize:42 }} />
          חיפוש תלמידים
        </Typography>

        <Card sx={{ mb: 4, borderRadius: '16px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>
              חיפוש לפי כיתה
            </Typography>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={12} md={8}>
                <FormField>
                  <TextField
                    fullWidth
                    label="קוד כיתה"
                    required
                    type="number"
                    variant="outlined"
                    value={myclass}
                    onChange={(e) => setClass(e.target.value)}
                    placeholder="הזן קוד כיתה לחיפוש"
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
                  onClick={handleSearch}
                  disabled={!myclass || loading}
                >
                  חיפוש
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {searchPerformed && (
          <Box>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
              </Box>
            ) : students && students.length > 0 ? (
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="h6" color="primary">
                    תלמידים בכיתה {myclass}
                  </Typography>
                  <Chip
                    label={`${students.length} תלמידים`}
                    color="primary"
                    variant="outlined"
                    icon={<PeopleAltIcon />}
                  />
                </Box>

                <TableContainer component={Paper} sx={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>מזהה</StyledTableCell>
                        <StyledTableCell>שם פרטי</StyledTableCell>
                        <StyledTableCell>שם משפחה</StyledTableCell>
                        <StyledTableCell>טלפון</StyledTableCell>
                        <StyledTableCell>כיתה</StyledTableCell>
                        <StyledTableCell align="center">פעולות</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {students.map((student, index) => (
                        <StyledTableRow key={student.id} onClick={() => showStudentMarks(student.id)}>
                          <TableCell>{student.id}</TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <StudentAvatar index={index}>
                                {student.firstName.charAt(0)}
                              </StudentAvatar>
                              {student.firstName}
                            </Box>
                          </TableCell>
                          <TableCell>{student.lastName}</TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <PhoneIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                              {student.phone}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={student.class}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="צפייה בציונים">
                              <IconButton
                                color="primary"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  showStudentMarks(student.id);
                                }}
                                size="small"
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ) : (
              <Alert severity="info" icon={<PeopleAltIcon />}>
                לא נמצאו תלמידים בכיתה זו
              </Alert>
            )}
          </Box>
        )}
      </Box>
    </Fade>
  );
};

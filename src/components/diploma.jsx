import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAchivmentsById } from "../redux/slices/getAchivmentsById";
import { getAchivmentsByFullName } from "../redux/slices/getAchivmentsByFullName";
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
  Card,
  CardContent,
  CardHeader,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import KeyIcon from '@mui/icons-material/Key';
import CloseIcon from '@mui/icons-material/Close';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontSize: 16,
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

const DiplomaCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.common.white,
  marginBottom: theme.spacing(4),
}));

const DiplomaContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const MarkChip = styled(Box)(({ theme, mark }) => ({
  display: "inline-block",
  padding: "4px 12px",
  borderRadius: "12px",
  fontWeight: "bold",
  fontSize: "1rem",
  backgroundColor: 
    mark >= 90 ? theme.palette.success.main :
    mark >= 70 ? theme.palette.info.main :
    mark >= 55 ? theme.palette.warning.main :
    theme.palette.error.main,
  color: theme.palette.common.white,
}));

const AverageBox = styled(Box)(({ theme, avg }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  backgroundColor: 
    avg >= 90 ? theme.palette.success.main :
    avg >= 70 ? theme.palette.info.main :
    avg >= 55 ? theme.palette.warning.main :
    theme.palette.error.main,
  color: theme.palette.common.white,
  margin: "0 auto",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
}));

export const Diploma = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [returnToAboutAs, setReturnToAboutAs] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showDialog, setShowDialog] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const achivments = useSelector(state => state.student.achivments);
  const firstNameStudent = useSelector(state => state.student.firstName);
  const lastNameStudent = useSelector(state => state.student.lastName);
  const classStudent = useSelector(state => state.student.className);
  const error = useSelector(state => state.student.error);

  useEffect(() => {
    if (returnToAboutAs === true) {
      navigate(`../aboutAs`);
      setFirstName("");
      setLastName("");
    }
  }, [returnToAboutAs]);

  const getStudentsAchievement = async () => {
    setLoading(true);
    try {
      if (id) {
        await dispatch(getAchivmentsById({ id }));
        setId("");
      } else if (firstName && lastName) {
        await dispatch(getAchivmentsByFullName({ lastName, firstName }));
      }
      setShowDialog(false);
      setShowTable(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateOverallAverage = () => {
    if (!achivments || !achivments.completeMark || achivments.completeMark.length === 0) return 0;
    
    const sum = achivments.completeMark.reduce((total, subject) => total + subject.avg, 0);
    return (sum / achivments.completeMark.length).toFixed(1);
  };

  const overallAverage = calculateOverallAverage();

  return (
    <Fade in={true} timeout={800}>
      <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
        <Typography variant="h4" component="h1" fontWeight="bold" color="primary" sx={{ mb: 4, display: "flex", alignItems: "center" }}>
          <SchoolIcon sx={{ mr: 1, fontSize: 32 }} />
          תעודות תלמידים
        </Typography>

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
              חיפוש תלמיד
            </Typography>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ py: 3 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormField>
                  <TextField
                    fullWidth
                    label="מזהה תלמיד"
                    type="number"
                    variant="outlined"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    helperText="חפש לפי מזהה או לפי שם מלא"
                  />
                  <IconWrapper>
                    <KeyIcon color="primary" />
                  </IconWrapper>
                </FormField>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2, textAlign: "center" }}>
                  - או -
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormField>
                  <TextField
                    fullWidth
                    label="שם פרטי"
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
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <IconWrapper>
                    <BadgeIcon color="primary" />
                  </IconWrapper>
                </FormField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button 
              variant="outlined" 
              startIcon={<CloseIcon />}
              onClick={() => {
                setReturnToAboutAs(true);
                setShowDialog(false);
              }}
            >
              ביטול
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              onClick={getStudentsAchievement}
              disabled={(!id && (!firstName || !lastName)) || loading}
            >
              חיפוש
            </Button>
          </DialogActions>
        </Dialog>

        {showTable && (
          <Fade in={true} timeout={500}>
            <Box>
              <DiplomaCard>
                <DiplomaContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Box>
                      <Typography variant="h4" fontWeight="bold" gutterBottom>
                        תעודת הישגים
                      </Typography>
                      <Typography variant="h6">
                        {firstNameStudent} {lastNameStudent}
                      </Typography>
                      <Typography variant="subtitle1">
                        כיתה {classStudent}
                      </Typography>
                    </Box>
                    <AverageBox avg={overallAverage}>
                      <Typography variant="h3" fontWeight="bold">
                        {overallAverage}
                      </Typography>
                      <Typography variant="caption">
                        ממוצע כללי
                      </Typography>
                    </AverageBox>
                  </Box>
                </DiplomaContent>
              </DiplomaCard>

              {achivments && achivments.completeMark && achivments.completeMark.length > 0 ? (
                <TableContainer component={Paper} sx={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>מקצוע</StyledTableCell>
                        <StyledTableCell align="center">מחצית א'</StyledTableCell>
                        <StyledTableCell align="center">מחצית ב'</StyledTableCell>
                        <StyledTableCell align="center">ממוצע</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {achivments.completeMark.map((subject, index) => (
                        <StyledTableRow key={index}>
                          <TableCell>
                            <Typography variant="subtitle1" fontWeight="medium">
                              {subject.subject}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            {subject.markA ? (
                              <MarkChip mark={subject.markA.mark}>
                                {subject.markA.mark}
                              </MarkChip>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {subject.markB ? (
                              <MarkChip mark={subject.markB.mark}>
                                {subject.markB.mark}
                              </MarkChip>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <MarkChip mark={subject.avg}>
                                {subject.avg}
                              </MarkChip>
                              {subject.avg >= 90 && (
                                <StarIcon sx={{ ml: 1, color: "gold" }} />
                              )}
                            </Box>
                          </TableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Alert severity="info" icon={<EmojiEventsIcon />}>
                  לא נמצאו ציונים עבור תלמיד זה
                </Alert>
              )}

              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setShowTable(false);
                    setShowDialog(true);
                  }}
                >
                  חזרה לחיפוש
                </Button>
              </Box>
            </Box>
          </Fade>
        )}
      </Box>
    </Fade>
  );
};

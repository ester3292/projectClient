import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsByClassSubThunk } from "../redux/slices/getStudentsByClassSubThunk";
import { resetFind } from "../redux/slices/teacherSlice";
import AdvancedCharts from './AdvancedCharts';
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
  InputAdornment,
  Avatar,
  Container,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Snackbar,
  Backdrop,
  useTheme,
  useMediaQuery,
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
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import RefreshIcon from '@mui/icons-material/Refresh';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import GradeIcon from '@mui/icons-material/Grade';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

// Styled Components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(1.5),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: "rgba(26, 35, 126, 0.08)",
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

const PageHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: theme.spacing(2),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  }
}));

const StatsCard = styled(Card)(({ theme, color }) => ({
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  borderLeft: `4px solid ${color || theme.palette.primary.main}`,
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  }
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

export const StudentsByClassSub = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
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
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [confirmDelete, setConfirmDelete] = useState({ open: false, mark: null });
  
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
    } else {
      // Reset mark fields when adding new mark
      setMarkToUpdate({
        ...markToUpdate,
        mark: '',
        notes: '',
        halfA: halfA !== -1 ? halfA : 0
      });
    }
    setShowDialog(true);
  };

  const handleDeleteMark = async (mark, e) => {
    if (e) e.stopPropagation();
    setConfirmDelete({ open: false, mark: null });
    
    if (mark != null) {
      try {
        await dispatch(deleteMarkThunk({ details: mark }));
        setSnackbar({
          open: true,
          message: 'הציון נמחק בהצלחה',
          severity: 'success'
        });
        refreshTable();
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'שגיאה במחיקת הציון',
          severity: 'error'
        });
      }
    }
  };

  const handleConfirmDelete = (mark, e) => {
    e.stopPropagation();
    setConfirmDelete({ open: true, mark });
  };

  const handleSaveMark = async () => {
    // Validate mark
    if (!markToUpdate.mark && !markToUpdate2.mark) {
      setSnackbar({
        open: true,
        message: 'נא להזין ציון',
        severity: 'error'
      });
      return;
    }

    // Ensure mark is between 0-100
    const markValue = parseInt(markToUpdate.mark || markToUpdate2.mark, 10);
    if (isNaN(markValue) || markValue < 0 || markValue > 100) {
      setSnackbar({
        open: true,
        message: 'הציון חייב להיות בין 0 ל-100',
        severity: 'error'
      });
      return;
    }

    try {
      setMarkToUpdate({ ...markToUpdate, halfA: halfA === -1 ? 0 : halfA });
      setMarkToUpdate2({ ...markToUpdate2, halfA: halfA === -1 ? 0 : halfA });

      if (perfectMark) {
        await dispatch(updateMarkThunk({ details: { ...markToUpdate, studentId: selected } }));
        setSnackbar({
          open: true,
          message: 'הציון עודכן בהצלחה',
          severity: 'success'
        });
      } else {
        await dispatch(addMarkForStudentThunk(markToUpdate2));
        setSnackbar({
          open: true,
          message: 'הציון נוסף בהצלחה',
          severity: 'success'
        });
      }
      
      refreshTable();
      setShowDialog(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'שגיאה בשמירת הציון',
        severity: 'error'
      });
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleExportData = () => {
    handleMenuClose();
    setSnackbar({
      open: true,
      message: 'הנתונים יוצאו בהצלחה',
      severity: 'success'
    });
  };

  const handlePrintData = () => {
    handleMenuClose();
    window.print();
  };

  // Calculate statistics
  const calculateStats = () => {
    if (!find || find.length === 0) return { avg: 0, passing: 0, failing: 0, highest: 0, lowest: 0 };
    
    const marks = find
      .filter(student => student.marksForStudent)
      .map(student => student.marksForStudent.mark);
    
    if (marks.length === 0) return { avg: 0, passing: 0, failing: 0, highest: 0, lowest: 0 };
    
    const sum = marks.reduce((acc, mark) => acc + mark, 0);
    const avg = Math.round(sum / marks.length);
    const passing = marks.filter(mark => mark >= 55).length;
    const failing = marks.length - passing;
    const highest = Math.max(...marks);
    const lowest = Math.min(...marks);
    
    return { avg, passing, failing, highest, lowest, total: find.length, withMarks: marks.length };
  };

  const stats = calculateStats();

  return (
    <Fade in={true} timeout={800}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <PageHeader>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <GradeIcon sx={{ fontSize: 32, color: "#1a237e", mr: 1.5 }} />
            <Typography variant="h5" component="h1" fontWeight="bold" color="#1a237e">
              ציונים לפי כיתה ומקצוע
            </Typography>
          </Box>
          
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={refreshTable}
              disabled={!searchPerformed || !sub || !myclass || loading}
              sx={{ borderRadius: "8px" }}
            >
              רענן
            </Button>
            
            <Button
              variant="outlined"
              startIcon={
              <MoreVertIcon />}
              onClick={handleMenuOpen}
              sx={{ borderRadius: "8px" }}
            >
              אפשרויות
            </Button>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: { borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }
              }}
            >
              <MenuItem onClick={handleExportData}>
                <DownloadIcon sx={{ mr: 1 }} />
                ייצוא לאקסל
              </MenuItem>
              <MenuItem onClick={handlePrintData}>
                <PrintIcon sx={{ mr: 1 }} />
                הדפסה
              </MenuItem>
            </Menu>
          </Box>
        </PageHeader>

        <StyledCard sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom fontWeight="bold">
              בחירת מחצית
            </Typography>
            <ButtonGroup 
              variant="contained" 
              color="primary" 
              sx={{ 
                mb: 3.5,
                boxShadow: '0 4px 12px rgba(26, 35, 126, 0.2)',
                borderRadius: '12px',
                '& .MuiButton-root': {
                  borderRadius: '12px',
                  px: 3,
                  py: 1.2,
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease'
                }
              }}
            >
              <Button
                onClick={() => handleSelectHalf(1)}
                variant={halfA === 1 ? "contained" : "outlined"}
                startIcon={<EventAvailableIcon />}
                sx={{
                  bgcolor: halfA === 1 ? 'primary.main' : 'transparent',
                  color: halfA === 1 ? 'white' : 'primary.main',
                  '&:hover': {
                    bgcolor: halfA === 1 ? 'primary.dark' : 'rgba(26, 35, 126, 0.08)'
                  }
                }}
              >
                מחצית ב'
              </Button>
              <Button
                onClick={() => handleSelectHalf(0)}
                variant={halfA === 0 ? "contained" : "outlined"}
                startIcon={<EventAvailableIcon />}
                sx={{
                  bgcolor: halfA === 0 ? 'primary.main' : 'transparent',
                  color: halfA === 0 ? 'white' : 'primary.main',
                  '&:hover': {
                    bgcolor: halfA === 0 ? 'primary.dark' : 'rgba(26, 35, 126, 0.08)'
                  }
                }}
              >
                מחצית א'
              </Button>
              <Button
                onClick={() => handleSelectHalf(-1)}
                variant={halfA === -1 ? "contained" : "outlined"}
                startIcon={<EventAvailableIcon />}
                sx={{
                  bgcolor: halfA === -1 ? 'primary.main' : 'transparent',
                  color: halfA === -1 ? 'white' : 'primary.main',
                  '&:hover': {
                    bgcolor: halfA === -1 ? 'primary.dark' : 'rgba(26, 35, 126, 0.08)'
                  }
                }}
              >
                כל המחציות
              </Button>
            </ButtonGroup>
            
            {wichHalf && (
              <Fade in={wichHalf} timeout={500}>
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
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmojiSymbolsIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                          }
                        }}
                      />
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
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ClassIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                          }
                        }}
                      />
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
                      sx={{
                        py: 1.5,
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(26, 35, 126, 0.2)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 16px rgba(26, 35, 126, 0.3)',
                        }
                      }}
                    >
                      חיפוש
                    </Button>
                  </Grid>
                </Grid>
              </Fade>
            )}
          </CardContent>
        </StyledCard>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3, 
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(211, 47, 47, 0.1)'
            }}
          >
            {error}
          </Alert>
        )}

        {searchPerformed && myclass && find && (
          <Fade in={true} timeout={800}>
            <Box>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" color="primary" gutterBottom fontWeight="bold">
                  ציונים לכיתה {myclass} במקצוע: {sub}
                  {halfA === 0 ? " (מחצית א')" : halfA === 1 ? " (מחצית ב')" : " (כל המחציות)"}
                </Typography>
                
                {/* Statistics Cards */}
                <Grid container spacing={3} sx={{ mt: 2, mb: 4 }}>
                  <Grid item xs={12} sm={6} md={2.4}>
                    <StatsCard color={theme.palette.primary.main}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            ממוצע כיתתי
                          </Typography>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
                            <BarChartIcon fontSize="small" />
                          </Avatar>
                        </Box>
                        <Typography variant="h4" component="div" fontWeight="bold" color="primary.main">
                          {stats.avg || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          מתוך {stats.withMarks} תלמידים עם ציונים
                        </Typography>
                      </CardContent>
                    </StatsCard>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={2.4}>
                    <StatsCard color={theme.palette.success.main}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            עוברים
                          </Typography>
                          <Avatar sx={{ bgcolor: 'success.main', width: 36, height: 36 }}>
                            <CheckCircleIcon fontSize="small" />
                          </Avatar>
                        </Box>
                        <Typography variant="h4" component="div" fontWeight="bold" color="success.main">
                          {stats.passing || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {stats.withMarks > 0 ? `${Math.round((stats.passing / stats.withMarks) * 100)}%` : '0%'} מהתלמידים
                        </Typography>
                      </CardContent>
                    </StatsCard>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={2.4}>
                    <StatsCard color={theme.palette.error.main}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            נכשלים
                          </Typography>
                          <Avatar sx={{ bgcolor: 'error.main', width: 36, height: 36 }}>
                            <ErrorIcon fontSize="small" />
                          </Avatar>
                        </Box>
                        <Typography variant="h4" component="div" fontWeight="bold" color="error.main">
                          {stats.failing || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {stats.withMarks > 0 ? `${Math.round((stats.failing / stats.withMarks) * 100)}%` : '0%'} מהתלמידים
                        </Typography>
                      </CardContent>
                    </StatsCard>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={2.4}>
                    <StatsCard color="#4caf50">
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            הציון הגבוה ביותר
                          </Typography>
                          <Avatar sx={{ bgcolor: '#4caf50', width: 36, height: 36 }}>
                            <GradeIcon fontSize="small" />
                          </Avatar>
                        </Box>
                        <Typography variant="h4" component="div" fontWeight="bold" color="#4caf50">
                          {stats.highest || 0}
                        </Typography>
                      </CardContent>
                    </StatsCard>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={2.4}>
                    <StatsCard color="#f44336">
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            הציון הנמוך ביותר
                          </Typography>
                          <Avatar sx={{ bgcolor: '#f44336', width: 36, height: 36 }}>
                            <GradeIcon fontSize="small" />
                          </Avatar>
                        </Box>
                        <Typography variant="h4" component="div" fontWeight="bold" color="#f44336">
                          {stats.lowest || 0}
                        </Typography>
                      </CardContent>
                    </StatsCard>
                  </Grid>
                </Grid>
                
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs 
                    value={tabValue} 
                    onChange={handleTabChange}
                    textColor="primary"
                    indicatorColor="primary"
                    variant={isMobile ? "fullWidth" : "standard"}
                  >
                    <Tab 
                      label="טבלת ציונים" 
                      icon={<FilterListIcon />} 
                      iconPosition="start"
                      sx={{ fontWeight: 'medium' }}
                    />
                    <Tab 
                      label="סטטיסטיקה" 
                      icon={<BarChartIcon />} 
                      iconPosition="start"
                      sx={{ fontWeight: 'medium' }}
                    />
                  </Tabs>
                </Box>
              </Box>

              <TabPanel value={tabValue} index={0}>
                {loading ? (
                  <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                    <CircularProgress />
                  </Box>
                ) : find && find.length > 0 ? (
                  <StyledCard sx={{ overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader>
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
                                    sx={{ fontWeight: 'bold', minWidth: '45px' }}
                                  />
                                ) : (
                                  <Chip 
                                    label="אין ציון" 
                                    variant="outlined" 
                                    size="small" 
                                    sx={{ borderRadius: '8px' }}
                                  />
                                )}
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                  <Tooltip title="הוספה/עדכון ציון">
                                    <IconButton
                                      color="primary"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleRowClick(student);
                                      }}
                                      size="small"
                                      sx={{ 
                                        mx: 0.5,
                                        '&:hover': { 
                                          backgroundColor: 'rgba(26, 35, 126, 0.1)' 
                                        }
                                      }}
                                    >
                                      <EditNoteIcon />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="מחיקת ציון">
                                    <span>
                                      <IconButton
                                        color="error"
                                        onClick={(e) => handleConfirmDelete(student.marksForStudent, e)}
                                        size="small"
                                        disabled={!student.marksForStudent}
                                        sx={{ 
                                          mx: 0.5,
                                          '&:hover': { 
                                            backgroundColor: 'rgba(211, 47, 47, 0.1)' 
                                          }
                                        }}
                                      >
                                        <RestoreFromTrashSharpIcon />
                                      </IconButton>
                                    </span>
                                  </Tooltip>
                                </Box>
                              </TableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </StyledCard>
                ) : (
                  <Alert 
                    severity="info" 
                    sx={{ 
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                      py: 2
                    }}
                  >
                    <Typography variant="body1">
                      לא נמצאו תלמידים בכיתה זו או שלא קיימים ציונים במקצוע זה
                    </Typography>
                  </Alert>
                )}
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
  {loading ? (
    <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
      <CircularProgress />
    </Box>
  ) : find && find.length > 0 ? (
    <>
      {/* Keep your existing stats cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Your existing stats cards code */}
      </Grid>
      
      {/* Add the advanced charts component */}
      <AdvancedCharts 
        students={find} 
        marks={find.map(student => student.marksForStudent).filter(Boolean)} 
        subject={sub} 
      />
    </>
  ) : (
    <Alert
      severity="info"
      sx={{
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        py: 2
      }}
    >
      <Typography variant="body1">
        לא נמצאו נתונים להצגת סטטיסטיקה
      </Typography>
    </Alert>
  )}
</TabPanel>
            </Box>
          </Fade>
        )}

        {/* Mark Dialog */}
        <Dialog
          open={showDialog}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "16px",
              p: 1,
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
            }
          }}
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: perfectMark ? 'primary.main' : 'success.main', mr: 2 }}>
                {perfectMark ? <EditNoteIcon /> : <GradeIcon />}
              </Avatar>
              <Typography variant="h5" component="div" fontWeight="bold" color="primary">
                {perfectMark ? "עדכון ציון" : "הוספת ציון חדש"}
              </Typography>
            </Box>
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
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmojiSymbolsIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      }
                    }}
                  />
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <NumbersIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      }
                    }}
                  />
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                          <EditNoteIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      }
                    }}
                  />
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
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EventAvailableIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        }
                      }}
                    />
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
              sx={{ 
                borderRadius: '10px',
                px: 3,
                py: 1
              }}
            >
              ביטול
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              onClick={handleSaveMark}
              disabled={loading}
              sx={{ 
                borderRadius: '10px',
                px: 3,
                py: 1,
                boxShadow: '0 4px 12px rgba(26, 35, 126, 0.2)',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(26, 35, 126, 0.3)',
                }
              }}
            >
              שמירה
            </Button>
          </DialogActions>
        </Dialog>

        {/* Confirmation Dialog for Delete */}
        <Dialog
          open={confirmDelete.open}
          onClose={() => setConfirmDelete({ open: false, mark: null })}
          PaperProps={{
            sx: {
              borderRadius: "16px",
              p: 1,
              maxWidth: '400px'
            }
          }}
        >
          <DialogTitle>
            <Typography variant="h6" component="div" fontWeight="bold" color="error">
              אישור מחיקת ציון
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              האם אתה בטוח שברצונך למחוק את הציון? פעולה זו אינה ניתנת לביטול.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              variant="outlined"
              onClick={() => setConfirmDelete({ open: false, mark: null })}
              sx={{ borderRadius: '10px' }}
            >
              ביטול
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeleteMark(confirmDelete.mark)}
              sx={{ 
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(211, 47, 47, 0.2)',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(211, 47, 47, 0.3)',
                }
              }}
            >
              מחק ציון
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setSnackbar({ ...snackbar, open: false })} 
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: '100%', borderRadius: '10px' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* Backdrop for loading states */}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </Fade>
  );
};

export default StudentsByClassSub;
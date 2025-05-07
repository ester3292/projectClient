import React, { useState, useEffect } from "react";
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
  InputAdornment,
  Chip,
  Avatar,
  Card,
  CardContent,
  TablePagination,
  MenuItem,
  Menu,
  Tabs,
  Tab,
  useTheme,
  alpha,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  Backdrop,
  DialogContentText,
  ListItemIcon,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Icons
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
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import WarningIcon from "@mui/icons-material/Warning";
import GroupIcon from "@mui/icons-material/Group";
import InfoIcon from "@mui/icons-material/Info";

// Styled components
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

const StyledBadge = styled(Chip)(({ theme }) => ({
  fontWeight: 'bold',
  borderRadius: '16px',
}));

const StatsCard = styled(Card)(({ theme, color }) => ({
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  height: '100%',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
  },
  background: color ? `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)` : theme.palette.background.paper,
  color: color ? theme.palette.common.white : theme.palette.text.primary,
}));

export const ShowStudents = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // Form state
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [myclass, setClass] = useState("");

  // UI state
  const [viewAllStudents, setViewAllStudents] = useState(false);
  const [addStudent, setAddStudent] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("lastName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Redux state
  const students = useSelector(state => state.student.arr);
  const loading = useSelector(state => state.student.loading);
  const error = useSelector(state => state.student.error);
  const success = useSelector(state => state.student.success);

  // Notification state
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  // Fetch students on component mount
  useEffect(() => {
    if (viewAllStudents) {
      dispatch(getAllStudentsThunk());
    }
  }, [dispatch, viewAllStudents]);

  // Computed values
  const filteredStudents = students ? students.filter(student => {
    const matchesSearch = searchQuery === "" ||
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.includes(searchQuery);

    const matchesClass = filterClass === "" || student.class.toString() === filterClass;

    return matchesSearch && matchesClass;
  }) : [];

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    let comparison = 0;

    if (sortBy === "id") {
      comparison = a.id.localeCompare(b.id);
    } else if (sortBy === "firstName") {
      comparison = a.firstName.localeCompare(b.firstName);
    } else if (sortBy === "lastName") {
      comparison = a.lastName.localeCompare(b.lastName);
    } else if (sortBy === "class") {
      comparison = a.class - b.class;
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  const paginatedStudents = sortedStudents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const uniqueClasses = students ?
    [...new Set(students.map(student => student.class))].sort((a, b) => a - b) :
    [];

  const classDistribution = uniqueClasses.map(classNum => ({
    class: classNum,
    count: students.filter(s => s.class === classNum).length
  }));

  // Event handlers
  const refreshTable = () => {
    dispatch(getAllStudentsThunk());
    setNotification({
      open: true,
      message: 'הנתונים עודכנו בהצלחה',
      severity: 'info'
    });
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

  const handleDeleteConfirm = (student) => {
    setStudentToDelete(student);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteStudent = async () => {
    if (studentToDelete) {
      await dispatch(deleteStudentThunk({ details: studentToDelete }));
      setNotification({
        open: true,
        message: `התלמיד ${studentToDelete.firstName} ${studentToDelete.lastName} נמחק בהצלחה`,
        severity: 'success'
      });
      refreshTable();
      setDeleteConfirmOpen(false);
      setStudentToDelete(null);
    }
  };

  const handleCloseRegistrationSuccess = () => {
    setShowRegistrationSuccess(false);
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const handleMenuOpen = (event, student) => {
    setAnchorEl(event.currentTarget);
    setSelectedStudent(student);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedStudent(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Fade in={true} timeout={800}>
      <Box>
        {/* Header section */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
              <GroupIcon />
            </Avatar>
            <Typography variant="h5" component="h2" fontWeight="bold" color="primary">
              ניהול תלמידים
            </Typography>
          </Box>

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

        {/* Notifications */}
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

        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={notification.severity}
            variant="filled"
            sx={{ width: '100%', fontWeight: 'bold' }}
          >
            {notification.message}
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

        {/* Add Student Dialog */}
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                <PersonIcon />
              </Avatar>
              <Typography variant="h5" component="div" fontWeight="bold" color="primary">
                הוספת תלמיד חדש
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
                    label="מספר זהות"
                    required
                    type="number"
                    variant="outlined"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ClassIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
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

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            sx: {
              borderRadius: "16px",
              p: 1
            }
          }}
        >
          <DialogTitle id="alert-dialog-title">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: theme.palette.error.main, mr: 2 }}>
                <WarningIcon />
              </Avatar>
              <Typography variant="h6" component="div" fontWeight="bold" color="error">
                אישור מחיקת תלמיד
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {studentToDelete && (
                <>
                  האם אתה בטוח שברצונך למחוק את התלמיד
                  <Box component="span" sx={{ fontWeight: 'bold', mx: 0.5 }}>
                    {`${studentToDelete.firstName} ${studentToDelete.lastName}`}
                  </Box>
                  מהמערכת? פעולה זו אינה ניתנת לביטול.
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              onClick={() => setDeleteConfirmOpen(false)}
              variant="outlined"
            >
              ביטול
            </Button>
            <Button
              onClick={handleDeleteStudent}
              color="error"
              variant="contained"
              autoFocus
              startIcon={<DeleteIcon />}
            >
              מחיקה
            </Button>
          </DialogActions>
        </Dialog>

        {viewAllStudents && (
          <Box sx={{ position: "relative" }}>
            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={4.5}>
                <StatsCard color={theme.palette.primary.main}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="h4" component="div" fontWeight="bold">
                          {students ? students.length : 0}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          סה"כ תלמידים
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                        <GroupIcon />
                      </Avatar>
                    </Box>
                  </CardContent>
                </StatsCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4.5}>
                <StatsCard color={theme.palette.secondary.main}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="h4" component="div" fontWeight="bold">
                          {uniqueClasses.length}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          מספר כיתות
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                        <ClassIcon />
                      </Avatar>
                    </Box>
                  </CardContent>
                </StatsCard>
              </Grid>
            </Grid>

            {/* Tabs for different views */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="student view tabs"
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="טבלה" icon={<VisibilityIcon />} iconPosition="start" />
                <Tab label="סטטיסטיקות כיתות" icon={<ClassIcon />} iconPosition="start" />
              </Tabs>
            </Box>

            {/* Table View */}
            {tabValue === 0 && (
              <>
                {/* Search and Filter Bar */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mb: 2, gap: 2 }}>

                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<FilterListIcon />}
                    onClick={toggleFilters}
                    sx={{ borderRadius: '8px' }}
                  >
                    סינון
                  </Button>

                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<SortIcon />}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    sx={{ borderRadius: '8px' }}
                  >
                    מיון
                  </Button>

                  <Box sx={{ flexGrow: 1 }} />
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<RefreshIcon />}
                    onClick={refreshTable}
                    disabled={loading}
                    sx={{ borderRadius: '8px' }}
                  >
                    רענון
                  </Button>
                </Box>

                {/* Sort Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && !selectedStudent}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem
                    onClick={() => { handleSort("lastName"); setAnchorEl(null); }}
                    selected={sortBy === "lastName"}
                  >
                    מיון לפי שם משפחה {sortBy === "lastName" && (sortDirection === "asc" ? "↑" : "↓")}
                  </MenuItem>
                  <MenuItem
                    onClick={() => { handleSort("firstName"); setAnchorEl(null); }}
                    selected={sortBy === "firstName"}
                  >
                    מיון לפי שם פרטי {sortBy === "firstName" && (sortDirection === "asc" ? "↑" : "↓")}
                  </MenuItem>
                  <MenuItem
                    onClick={() => { handleSort("class"); setAnchorEl(null); }}
                    selected={sortBy === "class"}
                  >
                    מיון לפי כיתה {sortBy === "class" && (sortDirection === "asc" ? "↑" : "↓")}
                  </MenuItem>
                </Menu>

                {/* Student Action Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && Boolean(selectedStudent)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                      <EditIcon fontSize="small" />
                    </ListItemIcon>
                    עריכת פרטים
                  </MenuItem>
                  <MenuItem onClick={() => {
                    handleMenuClose();
                    handleDeleteConfirm(selectedStudent);
                  }}>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <Typography color="error">מחיקת תלמיד</Typography>
                  </MenuItem>
                </Menu>

                {/* Filter Collapse */}
                <Collapse in={showFilters} timeout="auto" unmountOnExit>
                  <Paper sx={{ p: 2, mb: 2, borderRadius: '8px' }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      סינון תלמידים
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel id="class-filter-label">סינון לפי כיתה</InputLabel>
                          <Select
                            labelId="class-filter-label"
                            value={filterClass}
                            onChange={(e) => setFilterClass(e.target.value)}
                            label="סינון לפי כיתה"
                          >
                            <MenuItem value="">
                              <em>כל הכיתות</em>
                            </MenuItem>
                            {uniqueClasses.map((classNum) => (
                              <MenuItem key={classNum} value={classNum.toString()}>
                                כיתה {classNum}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            setFilterClass("");
                            setSearchQuery("");
                          }}
                        >
                          נקה סינון
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Collapse>

                {loading ? (
                  <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                    <CircularProgress />
                  </Box>
                ) : filteredStudents.length > 0 ? (
                  <>
                    <TableContainer
                      component={Paper}
                      sx={{
                        borderRadius: "12px",
                        overflow: "hidden",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                        mb: 2
                      }}
                    >
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
                          {paginatedStudents.map((student) => (
                            <StyledTableRow key={student.id}>
                              <TableCell>{student.id}</TableCell>
                              <TableCell>{student.firstName}</TableCell>
                              <TableCell>{student.lastName}</TableCell>
                              <TableCell>{student.phone}</TableCell>
                              <TableCell>
                                <StyledBadge
                                  label={`כיתה ${student.class}`}
                                  color="primary"
                                  size="small"
                                  variant="outlined"
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Tooltip title="אפשרויות נוספות">
                                  <IconButton
                                    size="small"
                                    onClick={(e) => handleMenuOpen(e, student)}
                                  >
                                    <MoreVertIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="מחיקת תלמיד">
                                  <IconButton
                                    color="error"
                                    onClick={() => handleDeleteConfirm(student)}
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

                    <TablePagination
                      component="div"
                      count={filteredStudents.length}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      labelRowsPerPage="שורות בעמוד:"
                      labelDisplayedRows={({ from, to, count }) => `${from}-${to} מתוך ${count}`}
                      rowsPerPageOptions={[5, 10, 25, 50]}
                    />
                  </>
                ) : (
                  <Alert severity="info" icon={<InfoIcon />} sx={{ borderRadius: '8px' }}>
                    {searchQuery || filterClass ?
                      "לא נמצאו תלמידים התואמים את החיפוש" :
                      "לא נמצאו תלמידים במערכת"}
                  </Alert>
                )}
              </>
            )}

            {/* Class Statistics View */}
            {tabValue === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  התפלגות תלמידים לפי כיתות
                </Typography>

                {classDistribution.length > 0 ? (
                  <Grid container spacing={2}>
                    {classDistribution.map((item) => (
                      <Grid item xs={12} sm={6} md={4} key={item.class}>
                        <Card sx={{
                          borderRadius: '12px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                          }
                        }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Box>
                                <Typography variant="h6" color="primary" fontWeight="bold">
                                  כיתה {item.class}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  מספר תלמידים
                                </Typography>
                                <Typography variant="h4" fontWeight="bold">
                                  {item.count}
                                </Typography>
                              </Box>
                              <Avatar
                                sx={{
                                  width: 60,
                                  height: 60,
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  color: theme.palette.primary.main
                                }}
                              >
                                <ClassIcon sx={{ fontSize: 30 }} />
                              </Avatar>
                            </Box>

                            <Box sx={{ mt: 2 }}>
                              <Typography variant="body2" color="text.secondary">
                                אחוז מכלל התלמידים
                              </Typography>
                              <Typography variant="body1" fontWeight="bold">
                                {Math.round((item.count / students.length) * 100)}%
                              </Typography>
                              <Box
                                sx={{
                                  mt: 1,
                                  width: '100%',
                                  height: 8,
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  borderRadius: 4,
                                  overflow: 'hidden'
                                }}
                              >
                                <Box
                                  sx={{
                                    width: `${(item.count / students.length) * 100}%`,
                                    height: '100%',
                                    bgcolor: theme.palette.primary.main,
                                    borderRadius: 4
                                  }}
                                />
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Alert severity="info">
                    אין נתונים זמינים להצגה
                  </Alert>
                )}
              </Box>
            )}

            {/* Loading Backdrop */}
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </Box>
        )}
      </Box>
    </Fade>
  );
};
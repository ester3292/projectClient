import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTeacherThunk } from "../redux/slices/addTeacherThunk";
import { getAllTeachersThunk } from "../redux/slices/getAllTeachersThunk";
import { deleteTeacherThunk } from "../redux/slices/deleteTeacherThunk";
import { updateTeacherThunk } from "../redux/slices/updateTeacherThunk"; 
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
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
  Avatar,
  Card,
  CardContent,
  InputAdornment,
  Chip,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  useTheme,
  alpha,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  Backdrop,
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
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import WarningIcon from "@mui/icons-material/Warning";
import CloseIcon from "@mui/icons-material/Close";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PrintIcon from "@mui/icons-material/Print";
import InfoIcon from "@mui/icons-material/Info";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import WorkIcon from "@mui/icons-material/Work";

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

export const ShowTeachers = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  
  // Form state
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [educator, setEducator] = useState(false);
  
  // UI state
  const [viewAllTeachers, setViewAllTeachers] = useState(false);
  const [addTeacher, setAddTeacher] = useState(false);
  const [filterEducator, setFilterEducator] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("lastName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);
  
  // Redux state
  const teachers = useSelector(state => state.teacher.arr);
  const loading = useSelector(state => state.teacher.loading);
  const error = useSelector(state => state.teacher.error);
  const success = useSelector(state => state.teacher.success);
  
  // Notification state
  const [showAssignmentSuccess, setShowAssignmentSuccess] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  
  // Fetch teachers on component mount
  useEffect(() => {
    if (viewAllTeachers) {
      dispatch(getAllTeachersThunk());
    }
  }, [dispatch, viewAllTeachers]);
  
  // Computed values
  const filteredTeachers = teachers ? teachers.filter(teacher => {
    const matchesEducator = filterEducator === "all" || 
      (filterEducator === "educator" && teacher.educator) || 
      (filterEducator === "regular" && !teacher.educator);
    
    return matchesEducator;
  }) : [];
  
  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === "id") {
      comparison = a.id.localeCompare(b.id);
    } else if (sortBy === "firstName") {
      comparison = a.firstName.localeCompare(b.firstName);
    } else if (sortBy === "lastName") {
      comparison = a.lastName.localeCompare(b.lastName);
    } else if (sortBy === "email") {
      comparison = a.email.localeCompare(b.email);
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  });
  
  const paginatedTeachers = sortedTeachers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  
  const educatorCount = teachers ? teachers.filter(teacher => teacher.educator).length : 0;
  const regularTeacherCount = teachers ? teachers.length - educatorCount : 0;
  
  // Event handlers
  const refreshTable = () => {
    dispatch(getAllTeachersThunk());
    setNotification({
      open: true,
      message: 'הנתונים עודכנו בהצלחה',
      severity: 'info'
    });
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

  const handleDeleteConfirm = (teacher) => {
    setTeacherToDelete(teacher);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteTeacher = async () => {
    if (teacherToDelete) {
      await dispatch(deleteTeacherThunk({ details: teacherToDelete }));
      setNotification({
        open: true,
        message: `המורה ${teacherToDelete.firstName} ${teacherToDelete.lastName} נמחק/ה בהצלחה`,
        severity: 'success'
      });
      refreshTable();
      setDeleteConfirmOpen(false);
      setTeacherToDelete(null);
    }
  };

  const handleCloseAssignmentSuccess = () => {
    setShowAssignmentSuccess(false);
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
  
  const handleMenuOpen = (event, teacher) => {
    setAnchorEl(event.currentTarget);
    setSelectedTeacher(teacher);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTeacher(null);
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleExportData = () => {
    // Implementation for exporting data
    setNotification({
      open: true,
      message: 'הנתונים יוצאו בהצלחה',
      severity: 'success'
    });
  };
  
  const handlePrintData = () => {
    // Implementation for printing data
    window.print();
  };

  return (
    <Fade in={true} timeout={800}>
      <Box>
        {/* Header section */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: theme.palette.secondary.main, mr: 2 }}>
              <SupervisorAccountIcon />
            </Avatar>
            <Typography variant="h5" component="h2" fontWeight="bold" color="secondary">
              ניהול מורים
            </Typography>
          </Box>
          
          <Box>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={() => setAddTeacher(true)}
              sx={{ mr: 2, borderRadius: "8px" }}
            >
              הוספת מורה
            </Button>
            <Button
              variant="outlined"
              color="secondary"
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

        {/* Notifications */}
        <Snackbar
          open={showAssignmentSuccess}
          autoHideDuration={6000}
          onClose={handleCloseAssignmentSuccess}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
        
        {/* Add Teacher Dialog */}
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: theme.palette.secondary.main, mr: 2 }}>
                <PersonIcon />
              </Avatar>
              <Typography variant="h5" component="div" fontWeight="bold" color="secondary">
                הוספת מורה חדש
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
                    variant="outlined"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon color="secondary" />
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
                          <PersonIcon color="secondary" />
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
                          <BadgeIcon color="secondary" />
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
                    label="אימייל"
                    required
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="secondary" />
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
                          <PhoneIcon color="secondary" />
                        </InputAdornment>
                      ),
                    }}
                  />
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
                      color="secondary"
                    />
                  }
                  label={
                    <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                      מחנך/ת כיתה
                      <Tooltip title="מחנכי כיתות אחראים על כיתה ספציפית ומקבלים הרשאות נוספות במערכת">
                        <InfoIcon fontSize="small" color="action" sx={{ ml: 1 }} />
                      </Tooltip>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setAddTeacher(false);
                clearForm();
              }}
            >
              ביטול
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              onClick={handleAddTeacher}
              disabled={!id || !firstName || !lastName || !phone || !email || loading}
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
                אישור מחיקת מורה
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {teacherToDelete && (
                <>
                  האם אתה בטוח שברצונך למחוק את המורה 
                  <Box component="span" sx={{ fontWeight: 'bold', mx: 0.5 }}>
                    {`${teacherToDelete.firstName} ${teacherToDelete.lastName}`}
                  </Box>
                  מהמערכת? פעולה זו אינה ניתנת לביטול.
                  {teacherToDelete.educator && (
                    <Box sx={{ mt: 2, p: 1, bgcolor: alpha(theme.palette.warning.main, 0.1), borderRadius: 1 }}>
                      <Typography color="warning.main" fontWeight="bold">
                        שים לב: מורה זה הוא מחנך כיתה. מחיקתו תסיר את שיוך הכיתה.
                      </Typography>
                    </Box>
                  )}
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
              onClick={handleDeleteTeacher} 
              color="error" 
              variant="contained" 
              autoFocus
              startIcon={<DeleteIcon />}
            >
              מחיקה
            </Button>
          </DialogActions>
        </Dialog>
        
        {viewAllTeachers && (
          <Box sx={{ position: "relative" }}>
            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard color={theme.palette.secondary.main}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="h4" component="div" fontWeight="bold">
                          {teachers ? teachers.length : 0}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          סה"כ מורים
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                        <GroupIcon />
                      </Avatar>
                    </Box>
                  </CardContent>
                </StatsCard>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard color={theme.palette.primary.main}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="h4" component="div" fontWeight="bold">
                          {educatorCount}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          מחנכי כיתות
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                        <SchoolIcon />
                      </Avatar>
                    </Box>
                  </CardContent>
                </StatsCard>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="h4" component="div" fontWeight="bold" color="secondary">
                          {regularTeacherCount}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          מורים מקצועיים
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1), color: theme.palette.secondary.main }}>
                        <WorkIcon />
                      </Avatar>
                    </Box>
                  </CardContent>
                </StatsCard>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="h4" component="div" fontWeight="bold" color="secondary">
                          {teachers && teachers.length > 0 
                            ? Math.round((educatorCount / teachers.length) * 100) 
                            : 0}%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          אחוז מחנכים
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1), color: theme.palette.secondary.main }}>
                        <AssignmentIndIcon />
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
                aria-label="teacher view tabs"
                indicatorColor="secondary"
                textColor="secondary"
              >
                <Tab label="טבלת מורים" icon={<VisibilityIcon />} iconPosition="start" />
                <Tab label="סטטיסטיקות" icon={<InfoIcon />} iconPosition="start" />
              </Tabs>
            </Box>
            
            {/* Table View */}
            {tabValue === 0 && (
              <>
                {/* Filter and Actions Bar */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mb: 2, gap: 2 }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<FilterListIcon />}
                    onClick={toggleFilters}
                    sx={{ borderRadius: '8px' }}
                  >
                    סינון
                  </Button>
                  
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<SortIcon />}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    sx={{ borderRadius: '8px' }}
                  >
                    מיון
                  </Button>
                  
                  <Box sx={{ flexGrow: 1 }} />
                  <Button
                    variant="outlined"
                    color="secondary"
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
                  open={Boolean(anchorEl) && !selectedTeacher}
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
                    onClick={() => { handleSort("email"); setAnchorEl(null); }}
                    selected={sortBy === "email"}
                  >
                    מיון לפי אימייל {sortBy === "email" && (sortDirection === "asc" ? "↑" : "↓")}
                  </MenuItem>
                </Menu>
                
                {/* Teacher Action Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && Boolean(selectedTeacher)}
                  onClose={handleMenuClose}
                >
                
                  <MenuItem onClick={() => {
                    handleMenuClose();
                    handleDeleteConfirm(selectedTeacher);
                  }}>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <Typography color="error">מחיקת מורה</Typography>
                  </MenuItem>
                </Menu>
                
                {/* Filter Collapse */}
                <Collapse in={showFilters} timeout="auto" unmountOnExit>
                  <Paper sx={{ p: 2, mb: 2, borderRadius: '8px' }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      סינון מורים
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel id="educator-filter-label">סינון לפי תפקיד</InputLabel>
                          <Select
                            labelId="educator-filter-label"
                            value={filterEducator}
                            onChange={(e) => setFilterEducator(e.target.value)}
                            label="סינון לפי תפקיד"
                          >
                            <MenuItem value="all">
                              <em>כל המורים</em>
                            </MenuItem>
                            <MenuItem value="educator">מחנכי כיתות בלבד</MenuItem>
                            <MenuItem value="regular">מורים מקצועיים בלבד</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <Button 
                          variant="outlined" 
                          color="secondary"
                          onClick={() => {
                            setFilterEducator("all");
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
                    <CircularProgress color="secondary" />
                  </Box>
                ) : filteredTeachers.length > 0 ? (
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
                            <StyledTableCell>מזהה</StyledTableCell>
                            <StyledTableCell>תפקיד</StyledTableCell>
                            <StyledTableCell>שם פרטי</StyledTableCell>
                            <StyledTableCell>שם משפחה</StyledTableCell>
                            <StyledTableCell>טלפון</StyledTableCell>
                            <StyledTableCell>אימייל</StyledTableCell>
                            <StyledTableCell align="center">פעולות</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {paginatedTeachers.map((teacher) => (
                            <StyledTableRow key={teacher.id}>
                              <TableCell>{teacher.id}</TableCell>
                              <TableCell>
                                {teacher.educator ? (
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Favorite color="secondary" sx={{ mr: 1 }} />
                                    מחנך/ת כיתה
                                  </Box>
                                ) : (
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FavoriteBorder color="action" sx={{ mr: 1 }} />
                                    מורה מקצועי/ת
                                  </Box>
                                )}
                              </TableCell>
                              <TableCell>{teacher.firstName}</TableCell>
                              <TableCell>{teacher.lastName}</TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <PhoneIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                                  {teacher.phone}
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <EmailIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                                  {teacher.email}
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Tooltip title="אפשרויות נוספות">
                                  <IconButton
                                    size="small"
                                    onClick={(e) => handleMenuOpen(e, teacher)}
                                  >
                                    <MoreVertIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="מחיקת מורה">
                                  <IconButton
                                    color="error"
                                    onClick={() => handleDeleteConfirm(teacher)}
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
                      count={filteredTeachers.length}
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
                    {filterEducator !== "all" ? 
                      "לא נמצאו מורים התואמים את הסינון" : 
                      "לא נמצאו מורים במערכת"}
                  </Alert>
                )}
              </>
            )}
            
            {/* Statistics View */}
            {tabValue === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  סטטיסטיקות מורים
                </Typography>
                
                <Grid container spacing={3}>
                  {/* Educator vs Regular Teachers Chart */}
                  <Grid item xs={12} md={6}>
                    <Card sx={{ 
                      borderRadius: '12px', 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                      p: 2,
                      height: '100%'
                    }}>
                      <Typography variant="h6" color="secondary" fontWeight="bold" gutterBottom>
                        התפלגות תפקידים
                      </Typography>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mt: 3, mb: 2 }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Avatar 
                            sx={{ 
                              width: 80, 
                              height: 80, 
                              bgcolor: alpha(theme.palette.secondary.main, 0.1),
                              color: theme.palette.secondary.main,
                              mx: 'auto',
                              mb: 1
                            }}
                          >
                            <Favorite sx={{ fontSize: 40 }} />
                          </Avatar>
                          <Typography variant="h5" fontWeight="bold" color="secondary">
                            {educatorCount}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            מחנכי כיתות
                          </Typography>
                        </Box>
                        
                        <Box sx={{ textAlign: 'center' }}>
                          <Avatar 
                            sx={{ 
                              width: 80, 
                              height: 80, 
                              bgcolor: alpha(theme.palette.grey[500], 0.1),
                              color: theme.palette.grey[700],
                              mx: 'auto',
                              mb: 1
                            }}
                          >
                            <FavoriteBorder sx={{ fontSize: 40 }} />
                          </Avatar>
                          <Typography variant="h5" fontWeight="bold" color="text.primary">
                            {regularTeacherCount}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            מורים מקצועיים
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ mt: 3 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          יחס מחנכים למורים מקצועיים
                        </Typography>
                        <Box 
                          sx={{ 
                            mt: 1, 
                            width: '100%', 
                            height: 20, 
                            bgcolor: alpha(theme.palette.grey[500], 0.1),
                            borderRadius: 10,
                            overflow: 'hidden',
                            display: 'flex'
                          }}
                        >
                          {teachers && teachers.length > 0 && (
                            <>
                              <Box 
                                sx={{ 
                                  width: `${(educatorCount / teachers.length) * 100}%`, 
                                  height: '100%', 
                                  bgcolor: theme.palette.secondary.main,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }} 
                              >
                                {educatorCount > 0 && (educatorCount / teachers.length) * 100 > 15 && (
                                  <Typography variant="caption" color="white" fontWeight="bold">
                                    {Math.round((educatorCount / teachers.length) * 100)}%
                                  </Typography>
                                )}
                              </Box>
                              <Box 
                                sx={{ 
                                  width: `${(regularTeacherCount / teachers.length) * 200}%`, 
                                  height: '100%', 
                                  bgcolor: theme.palette.grey[400],
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }} 
                              >
                                {regularTeacherCount > 0 && (regularTeacherCount / teachers.length) * 100 > 15 && (
                                  <Typography variant="caption" color="white" fontWeight="bold">
                                    {Math.round((regularTeacherCount / teachers.length) * 100)}%
                                  </Typography>
                                )}
                              </Box>
                            </>
                          )}
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                  
                  {/* Teacher Information Card */}
                  <Grid item xs={12} md={6}>
                    <Card sx={{ 
                      borderRadius: '12px', 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                      p: 2,
                      height: '100%'
                    }}>
                      <Typography variant="h6" color="secondary" fontWeight="bold" gutterBottom>
                        נתוני מורים כלליים
                      </Typography>
                      
                      <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Paper 
                              elevation={0} 
                              sx={{ 
                                p: 2, 
                                bgcolor: alpha(theme.palette.secondary.main, 0.05),
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <Avatar sx={{ bgcolor: theme.palette.secondary.main, mr: 2 }}>
                                <GroupIcon />
                              </Avatar>
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  סך הכל מורים במערכת
                                </Typography>
                                <Typography variant="h5" fontWeight="bold" color="secondary">
                                  {teachers ? teachers.length : 0}
                                </Typography>
                              </Box>
                            </Paper>
                          </Grid>
                          
                          <Grid item xs={12} sm={6}>
                            <Paper 
                              elevation={0} 
                              sx={{ 
                                p: 2, 
                                bgcolor: alpha(theme.palette.success.main, 0.05),
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                height: '100%'
                              }}
                            >
                              <Avatar sx={{ bgcolor: theme.palette.success.main, mr: 2 }}>
                                <Favorite />
                              </Avatar>
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  מחנכי כיתות
                                </Typography>
                                <Typography variant="h6" fontWeight="bold" color="success.main">
                                  {educatorCount}
                                </Typography>
                              </Box>
                            </Paper>
                          </Grid>
                          
                          <Grid item xs={12} sm={6}>
                            <Paper 
                              elevation={0} 
                              sx={{ 
                                p: 2, 
                                bgcolor: alpha(theme.palette.info.main, 0.05),
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                height: '100%'
                              }}
                            >
                              <Avatar sx={{ bgcolor: theme.palette.info.main, mr: 2 }}>
                                <FavoriteBorder />
                              </Avatar>
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  מורים מקצועיים
                                </Typography>
                                <Typography variant="h6" fontWeight="bold" color="info.main">
                                  {regularTeacherCount}
                                </Typography>
                              </Box>
                            </Paper>
                          </Grid>
                          
                          <Grid item xs={12}>
                            <Paper 
                              elevation={0} 
                              sx={{ 
                                p: 2, 
                                bgcolor: alpha(theme.palette.warning.main, 0.05),
                                borderRadius: 2
                              }}
                            >
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                יחס מחנכים למורים מקצועיים
                              </Typography>
                              <Typography variant="h6" fontWeight="bold" color="warning.main">
                                {teachers && teachers.length > 0 
                                  ? `${Math.round((educatorCount / teachers.length) * 100)}% / ${Math.round((regularTeacherCount / teachers.length) * 100)}%` 
                                  : "אין נתונים"}
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
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

export default ShowTeachers;
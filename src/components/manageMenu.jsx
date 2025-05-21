import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Fade,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import { useDispatch, useSelector } from "react-redux";
import { div } from "framer-motion/m";
import { resetDetails } from "../redux/slices/teacherSlice";

const MenuCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  height: "100%",
  borderRadius: "16px",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
  },
}));

const MenuIcon = styled(Box)(({ theme }) => ({
  fontSize: "3rem",
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  borderRadius: "16px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
}));

export const ManageMenu = () => {
  const navigate = useNavigate();
  const educator = useSelector((state) => state.teacher.educator);
  const dispatch = useDispatch();

  const handleEnd = () => {
    dispatch(resetDetails());
    navigate("/");
  }
  const handleClose = () => {
    navigate(`../aboutAs`);
  }

  return <>{educator &&
    <Fade in={true} timeout={800} >
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary" align="center">
          תפריט ניהול
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph sx={{ mb: 6 }}>
          ניהול מורים ותלמידים במערכת
        </Typography>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <MenuCard onClick={() => navigate(`../showTeachers`)}>
              <MenuIcon>
                <PeopleAltIcon fontSize="inherit" />
              </MenuIcon>
              <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                ניהול מורים
              </Typography>
              <Typography variant="body1" color="textSecondary">
                הוספה, עריכה וצפייה בפרטי המורים במערכת
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3, borderRadius: "30px", px: 4 }}
                startIcon={<PeopleAltIcon />}
              >
                כניסה לניהול מורים
              </Button>
            </MenuCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <MenuCard onClick={() => navigate(`../showStudents`)}>
              <MenuIcon>
                <SchoolIcon fontSize="inherit" />
              </MenuIcon>
              <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                ניהול תלמידים
              </Typography>
              <Typography variant="body1" color="textSecondary">
                הוספה, עריכה וצפייה בפרטי התלמידים במערכת
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3, borderRadius: "30px", px: 4 }}
                startIcon={<SchoolIcon />}
              >
                כניסה לניהול תלמידים
              </Button>
            </MenuCard>
          </Grid>
        </Grid>

        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </Container>
    </Fade>}

    <Dialog
      open={!educator}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          p: 1
        }
      }}
    >

      <Divider />
      <DialogContent sx={{ py: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            מתנצלים, אינך מורה בעל הרשאות גישה למערכת
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          variant="outlined"
          onClick={handleEnd}
        >
          להתנתקות
        </Button>
        <Button
          variant="outlined"
          onClick={handleClose}
        >
          לחזרה
        </Button>
      </DialogActions>
    </Dialog>











  </>
};

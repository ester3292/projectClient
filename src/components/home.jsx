import React from "react";
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Container, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea,
  Fade,
  Zoom
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SchoolIcon from "@mui/icons-material/School";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const HeroSection = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #1a237e 0%, #283593 100%)",
  color: "white",
  padding: theme.spacing(10, 0),
  textAlign: "center",
  borderRadius: "0 0 50% 50% / 20px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "30px",
  padding: "10px 25px",
  fontWeight: "bold",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
  transition: "all 0.3s",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
  },
}));

const StatsBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderRadius: "15px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 80,
  height: 80,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.light,
  marginBottom: theme.spacing(2),
  "& svg": {
    fontSize: 40,
    color: theme.palette.primary.dark,
  },
}));

export const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "הוספת ציונים",
      description: "הוספת ציונים לתלמידים בקלות ובמהירות עם ממשק ידידותי למשתמש",
      icon: <PersonAddIcon />,
      action: () => navigate("/menu/updateMarks"),
      image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "חיפוש תלמידים",
      description: "מנוע חיפוש מתקדם למציאת תלמידים לפי שם, כיתה או מזהה",
      icon: <SearchIcon />,
      action: () => navigate("/menu/allStudentsForEducatorTeacher"),
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "ניתוח ציונים",
      description: "צפייה וניתוח ציונים לפי כיתה ומקצוע עם גרפים וסטטיסטיקות",
      icon: <AssessmentIcon />,
      action: () => navigate("/menu/studentsByClassSub"),
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "הפקת תעודות",
      description: "יצירת תעודות מקצועיות ואיכותיות בלחיצת כפתור",
      icon: <SchoolIcon />,
      action: () => navigate("/menu/diploma"),
      image: "https://images.unsplash.com/photo-1564585222527-c2777a5bc6cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  const stats = [
    { value: "98%", label: "שביעות רצון מורים", icon: <CheckCircleIcon color="success" fontSize="large" /> },
    { value: "15,000+", label: "תלמידים במערכת", icon: <PersonAddIcon color="primary" fontSize="large" /> },
    { value: "500+", label: "בתי ספר", icon: <SchoolIcon color="secondary" fontSize="large" /> },
    { value: "50,000+", label: "תעודות הופקו", icon: <TrendingUpIcon color="primary" fontSize="large" /> }
  ];

  return (
    <Fade in={true} timeout={1000}>
      <Box>
        <HeroSection>
          <Container>
            <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
              ברוכים הבאים למערכת ניהול הציונים
            </Typography>
            <Typography variant="h5" paragraph sx={{ maxWidth: "800px", mx: "auto", mb: 4 }}>
              פלטפורמה מתקדמת לניהול ציונים, הפקת תעודות וניתוח הישגי תלמידים
            </Typography>
            <Box sx={{ mt: 4 }}>
              <ActionButton
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate("/menu/updateMarks")}
                sx={{ mx: 1 }}
              >
                הוספת ציון
              </ActionButton>
              <ActionButton
                variant="outlined"
                color="inherit"
                size="large"
                onClick={() => navigate("/menu/diploma")}
                sx={{ mx: 1, bgcolor: "rgba(255,255,255,0.1)" }}
              >
                הפקת תעודות
              </ActionButton>
            </Box>
          </Container>
        </HeroSection>

        <Container sx={{ mt: 8, mb: 8 }}>
          <Typography variant="h3" component="h2" align="center" gutterBottom fontWeight="bold">
            הכלים שלנו
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" paragraph sx={{ mb: 6 }}>
            כל מה שצריך כדי לנהל ציונים ותעודות ביעילות ובמקצועיות
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Zoom in={true} style={{ transitionDelay: `${index * 150}ms` }}>
                  <FeatureCard>
                    <CardActionArea onClick={feature.action}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={feature.image}
                        alt={feature.title}
                      />
                      <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                          <FeatureIcon>
                            {feature.icon}
                          </FeatureIcon>
                        </Box>
                        <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
                          {feature.title}
                        </Typography>
                        <Typography>
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </FeatureCard>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Box sx={{ bgcolor: "#f5f5f5", py: 8 }}>
          <Container>
            <Typography variant="h3" component="h2" align="center" gutterBottom fontWeight="bold">
              למה לבחור בנו?
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph sx={{ mb: 6 }}>
              מערכת מובילה בתחום ניהול הציונים והתעודות במערכת החינוך
            </Typography>

            <Grid container spacing={3}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Fade in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                    <StatsBox>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        {stat.icon}
                      </Box>
                      <Typography variant="h3" component="p" fontWeight="bold" color="primary">
                        {stat.value}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        {stat.label}
                      </Typography>
                    </StatsBox>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Container sx={{ mt: 8, mb: 8 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
                ממשק ידידותי למורים
              </Typography>
              <Typography variant="body1" paragraph>
                המערכת שלנו מציעה ממשק אינטואיטיבי וקל לשימוש, המאפשר למורים להזין ציונים, לנהל כיתות ולהפיק תעודות בקלות ובמהירות.
              </Typography>
              <Typography variant="body1" paragraph>
                עם כלים מתקדמים לניתוח נתונים, המורים יכולים לקבל תובנות משמעותיות על ביצועי התלמידים ולהתאים את שיטות ההוראה בהתאם.
              </Typography>
              <ActionButton
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate("/menu/aboutAs")}
                sx={{ mt: 2 }}
              >
                למד עוד
              </ActionButton>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Teacher using computer"
                sx={{
                  width: "100%",
                  borderRadius: "15px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                }}
              />
            </Grid>
          </Grid>
        </Container>

        <Box sx={{ bgcolor: "primary.main", color: "white", py: 6 }}>
          <Container>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={8} textAlign="center">
                <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
                  מוכנים להתחיל?
                </Typography>
                <Typography variant="h6" paragraph>
                  הצטרפו לאלפי מורים שכבר משתמשים במערכת שלנו לניהול ציונים והפקת תעודות
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <ActionButton
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => navigate("/menu")}
                    sx={{ mx: 1 }}
                  >
                    התחל עכשיו
                  </ActionButton>
                  <ActionButton
                    variant="outlined"
                    color="inherit"
                    size="large"
                    onClick={() => navigate("/menu/aboutAs")}
                    sx={{ mx: 1, bgcolor: "rgba(255,255,255,0.1)" }}
                  >
                    מידע נוסף
                  </ActionButton>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Fade>
  );
};

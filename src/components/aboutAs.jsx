import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Paper,
  Divider,
  useTheme,
  alpha,
  styled,
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import TimelineIcon from "@mui/icons-material/Timeline";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";
import BarChartIcon from "@mui/icons-material/BarChart";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CloudIcon from "@mui/icons-material/Cloud";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.primary.main, 0.03),
  padding: theme.spacing(10, 0),
  overflow: "hidden",
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(12, 0),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: "relative",
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
  display: "inline-block",
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: "-8px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "60px",
    height: "4px",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "2px",
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 16px 40px rgba(0, 0, 0, 0.12)",
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  "& svg": {
    fontSize: "2rem",
  },
}));

const TimelineItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
  },
}));

const TeamMemberCard = styled(Card)(({ theme }) => ({
  height: "100%",
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 16px 40px rgba(0, 0, 0, 0.12)",
  },
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  marginBottom: theme.spacing(2),
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
  border: `4px solid ${alpha(theme.palette.primary.main, 0.2)}`,
}));

const SocialButtonsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(1),
}));

const SocialButton = styled(Button)(({ theme }) => ({
  minWidth: "40px",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  padding: 0,
}));

const ContactCard = styled(Card)(({ theme }) => ({
  height: "100%",
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)",
  },
}));

const ContactIcon = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(0.5, 0),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: theme.spacing(1, 3),
  fontWeight: 600,
}));

const LeadershipBadge = styled(Box)(({ theme }) => ({
  display: "inline-block",
  padding: theme.spacing(1, 2),
  borderRadius: "8px",
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
}));

const AboutAs = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const timelineRef = useRef(null);

  // Data for the page
  const features = [
    {
      title: "ניהול ציונים מתקדם",
      description: "מערכת חכמה לניהול ציונים המאפשרת למורים לנהל את הציונים בקלות ובמהירות",
      icon: <AssignmentIcon />,
    },
    {
      title: "הפקת תעודות",
      description: "הפקת תעודות מקצועיות ומותאמות אישית בלחיצת כפתור",
      icon: <SchoolIcon />,
    },
    {
      title: "ניתוח נתונים",
      description: "כלים מתקדמים לניתוח נתונים והפקת תובנות על הישגי התלמידים",
      icon: <BarChartIcon />,
    },
    {
      title: "אבטחה מתקדמת",
      description: "אבטחת מידע ברמה הגבוהה ביותר להגנה על פרטיות התלמידים והנתונים",
      icon: <SecurityIcon />,
    },
    {
      title: "ממשק מהיר וידידותי",
      description: "ממשק משתמש אינטואיטיבי וקל לשימוש המאפשר עבודה יעילה ומהירה",
      icon: <SpeedIcon />,
    },
    {
      title: "גיבוי בענן",
      description: "גיבוי אוטומטי של כל הנתונים בענן לשמירה על המידע ונגישות מכל מקום",
      icon: <CloudIcon />,
    },
  ];

  const teamMembers = [
    {
      name: "דוד ישראלי",
      role: "מנכ\"ל ומייסד",
      bio: "בעל 15 שנות ניסיון בתחום החינוך והטכנולוגיה. הקים את החברה מתוך חזון לשפר את מערכת החינוך באמצעות טכנולוגיה.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "מיכל כהן",
      role: "סמנכ\"לית פיתוח",
      bio: "מומחית בפיתוח תוכנה עם התמחות במערכות חינוכיות. מובילה את צוות הפיתוח ואחראית על החדשנות הטכנולוגית.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];

  const timeline = [
    {
      year: "2015",
      title: "הקמת החברה",
      description: "הקמת החברה על ידי צוות של אנשי חינוך וטכנולוגיה במטרה לשפר את ניהול הציונים במערכת החינוך",
    },
    {
      year: "2017",
      title: "השקת הגרסה הראשונה",
      description: "השקת הגרסה הראשונה של מערכת ניהול הציונים עם תמיכה ב-50 בתי ספר",
    },
    {
      year: "2019",
      title: "הרחבת השירותים",
      description: "הוספת מודול הפקת תעודות והרחבת השירותים לכלל מערכת החינוך",
    },
    {
      year: "2021",
      title: "שדרוג טכנולוגי",
      description: "שדרוג המערכת לטכנולוגיות חדישות והוספת כלי ניתוח נתונים מתקדמים",
    },
    {
      year: "2023",
      title: "התרחבות בינלאומית",
      description: "התחלת פעילות בינלאומית והתאמת המערכת למוסדות חינוך ברחבי העולם",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <Box sx={{ position: "relative", zIndex: 2 }}>
            <LeadershipBadge>
              <StarIcon sx={{ fontSize: 16, verticalAlign: "middle", mr: 0.5 }} />
              מובילים בתחום החינוך
            </LeadershipBadge>
            
            <Typography 
              variant="h2" 
              component="div" 
              gutterBottom 
              sx={{ 
                fontWeight: "bold",
                mb: 1
              }}
            >
              מערכת ניהול ציונים
            </Typography>
            
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom 
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              אודות המערכת
            </Typography>
            
            <Typography 
              variant="h5" 
              paragraph 
              sx={{ 
                maxWidth: "800px", 
                mx: "auto", 
                mb: 4,
                opacity: 0.9
              }}
            >
              מערכת ניהול ציונים ותעודות מתקדמת המשרתת אלפי מורים ובתי ספר ברחבי הארץ
            </Typography>
            
            <ActionButton
              onClick={() => navigate("/logIn")}
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              התחבר עכשיו
            </ActionButton>
          </Box>
        </Container>
      </HeroSection>

      {/* Vision Section */}
      <Container sx={{ mt: 10, mb: 10 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box>
              <Typography 
                variant="h3" 
                component="h2" 
                gutterBottom 
                fontWeight="bold" 
                color="primary"
                sx={{ mt: 2, mb: 3 }}
              >
                החזון שלנו
              </Typography>
              
              <Typography 
                variant="body1" 
                paragraph 
                fontSize="1.1rem"
                sx={{ 
                  mb: 3, 
                  lineHeight: 1.8,
                  color: alpha(theme.palette.text.primary, 0.85)
                }}
              >
                אנו מאמינים שטכנולוגיה יכולה לשפר משמעותית את תהליכי ההוראה והלמידה. המערכת שלנו נועדה להקל על עבודת המורים ולאפשר להם להתמקד במה שחשוב באמת - חינוך והוראה איכותיים.
              </Typography>
              
              <Typography 
                variant="body1" 
                paragraph 
                fontSize="1.1rem"
                sx={{ 
                  mb: 4, 
                  lineHeight: 1.8,
                  color: alpha(theme.palette.text.primary, 0.85)
                }}
              >
                המטרה שלנו היא לספק כלים טכנולוגיים מתקדמים שיסייעו למורים לנהל

Copy


AboutAs.jsx
המשך מאיפה שעצרת



Context
— none fetched
                המטרה שלנו היא לספק כלים טכנולוגיים מתקדמים שיסייעו למורים לנהל את הציונים בצורה יעילה, להפיק תעודות מקצועיות ולקבל תובנות משמעותיות על הישגי התלמידים.
              </Typography>
              
              <List>
                {[
                  "פיתוח מערכת ידידותית למשתמש",
                  "שיפור תהליכי הערכה וניהול ציונים",
                  "הנגשת מידע חינוכי לכל בעלי העניין",
                  "שמירה על פרטיות ואבטחת מידע",
                  "התאמה אישית לצרכי בתי הספר",
                ].map((item, index) => (
                  <StyledListItem key={index} disableGutters>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </StyledListItem>
                ))}
              </List>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
              alt="חזון החברה"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "16px",
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.12)",
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), py: 10 }}>
        <Container>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <SectionTitle variant="h3" component="h2">
              היתרונות שלנו
            </SectionTitle>
            
            <Typography 
              variant="h6" 
              color="textSecondary" 
              paragraph 
              sx={{ 
                mt: 3,
                mb: 6, 
                maxWidth: "800px", 
                mx: "auto",
                opacity: 0.8
              }}
            >
              הכירו את היתרונות המרכזיים של מערכת ניהול הציונים שלנו
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FeatureCard elevation={2}>
                  <CardContent sx={{ p: 4, textAlign: "center" }}>
                    <FeatureIcon>
                      {feature.icon}
                    </FeatureIcon>
                    
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom 
                      fontWeight="bold"
                      sx={{ mb: 2 }}
                    >
                      {feature.title}
                    </Typography>
                    
                    <Typography 
                      variant="body1"
                      sx={{ 
                        color: alpha(theme.palette.text.primary, 0.8),
                        lineHeight: 1.7
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Timeline Section */}
      <Container sx={{ mt: 10, mb: 10 }} ref={timelineRef}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Chip 
            icon={<TimelineIcon />} 
            label="ההיסטוריה שלנו" 
            color="primary" 
            sx={{ mb: 2 }}
          />
          
          <SectionTitle variant="h3" component="h2">
            ההיסטוריה שלנו
          </SectionTitle>
          
          <Typography 
            variant="h6" 
            color="textSecondary" 
            paragraph 
            sx={{ 
              mt: 3,
              mb: 6, 
              maxWidth: "800px", 
              mx: "auto",
              opacity: 0.8
            }}
          >
            הדרך שעברנו מאז הקמת החברה ועד היום
          </Typography>
        </Box>
        
        <Box sx={{ maxWidth: "800px", mx: "auto" }}>
          {timeline.map((item, index) => (
            <TimelineItem key={index} elevation={2}>
              <Box sx={{ display: "flex", alignItems: "baseline", mb: 1 }}>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  fontWeight="bold" 
                  color="primary"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "8px",
                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                  }}
                >
                  {item.year}
                </Typography>
                <Typography 
                  variant="h6" 
                  component="h4" 
                  fontWeight="bold" 
                  sx={{ ml: 2 }}
                >
                  {item.title}
                </Typography>
              </Box>
              <Typography 
                variant="body1"
                sx={{ 
                  color: alpha(theme.palette.text.primary, 0.8),
                  lineHeight: 1.7
                }}
              >
                {item.description}
              </Typography>
            </TimelineItem>
          ))}
        </Box>
      </Container>

      {/* Team Section */}
      <Box 
        sx={{ 
          bgcolor: alpha(theme.palette.primary.main, 0.03), 
          py: 10,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "5px",
            background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          }
        }}
      >
        <Container>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Chip 
              icon={<StarIcon />} 
              label="הצוות שלנו" 
              color="primary"
              sx={{ mb: 2 }}
            />
            
            <SectionTitle variant="h3" component="h2">
              הצוות שלנו
            </SectionTitle>
            
            <Typography 
              variant="h6" 
              color="textSecondary" 
              paragraph 
              sx={{ 
                mt: 3,
                mb: 6, 
                maxWidth: "800px", 
                mx: "auto",
                opacity: 0.8
              }}
            >
              הכירו את האנשים שעומדים מאחורי המערכת
            </Typography>
          </Box>
          
          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={5} key={index}>
                <TeamMemberCard elevation={3}>
                  <LargeAvatar 
                    src={member.image} 
                    alt={member.name}
                  />
                  
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    fontWeight="bold" 
                    gutterBottom
                  >
                    {member.name}
                  </Typography>
                  
                  <Typography 
                    variant="subtitle1" 
                    color="primary" 
                    gutterBottom
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      color: "white",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      display: "inline-block",
                      mb: 2,
                      fontWeight: "medium",
                    }}
                  >
                    {member.role}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    align="center" 
                    sx={{ 
                      mb: 3,
                      lineHeight: 1.7,
                      color: alpha(theme.palette.text.primary, 0.8),
                    }}
                  >
                    {member.bio}
                  </Typography>
                  
                  <SocialButtonsContainer>
                    <SocialButton color="primary" variant="contained">
                      <LinkedInIcon fontSize="small" />
                    </SocialButton>
                    <SocialButton color="primary" variant="contained">
                      <TwitterIcon fontSize="small" />
                    </SocialButton>
                    <SocialButton color="primary" variant="contained">
                      <EmailIcon fontSize="small" />
                    </SocialButton>
                  </SocialButtonsContainer>
                </TeamMemberCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Container sx={{ mt: 10, mb: 10 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Chip 
            icon={<PhoneIcon />} 
            label="צור קשר" 
            color="primary"
            sx={{ mb: 2 }}
          />
          
          <SectionTitle variant="h3" component="h2">
            צור קשר
          </SectionTitle>
          
          <Typography 
            variant="h6" 
            color="textSecondary" 
            paragraph 
            sx={{ 
              mt: 3,
              mb: 6, 
              maxWidth: "800px", 
              mx: "auto",
              opacity: 0.8
            }}
          >
            יש לכם שאלות? אנחנו כאן כדי לעזור
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <ContactCard elevation={2}>
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <ContactIcon>
                  <LocationOnIcon fontSize="large" />
                </ContactIcon>
                
                <Typography 
                  variant="h5" 
                  component="h3" 
                  fontWeight="bold" 
                  gutterBottom
                  sx={{ mb: 2 }}
                >
                  כתובת
                </Typography>
                
                <Typography 
                  variant="body1"
                  sx={{ 
                    mb: 1,
                    color: alpha(theme.palette.text.primary, 0.8),
                  }}
                >
                  רחוב הברוש 15, תל אביב
                </Typography>
                
                <Typography 
                  variant="body1"
                  sx={{ 
                    color: alpha(theme.palette.text.primary, 0.8),
                  }}
                >
                  ישראל, 6473115
                </Typography>
              </Box>
            </ContactCard>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <ContactCard elevation={2}>
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <ContactIcon>
                  <EmailIcon fontSize="large" />
                </ContactIcon>
                
                <Typography 
                  variant="h5" 
                  component="h3" 
                  fontWeight="bold" 
                  gutterBottom
                  sx={{ mb: 2 }}
                >
                  דוא"ל
                </Typography>
                
                <Typography 
                  variant="body1"
                  sx={{ 
                    mb: 1,
                    color: alpha(theme.palette.text.primary, 0.8),
                  }}
                >
                  chaya1234@schoolgrade.co.il
                </Typography>
                
                <Typography 
                  variant="body1"
                  sx={{ 
                    color: alpha(theme.palette.text.primary, 0.8),
                  }}
                >
                  ester1234@schoolgrade.co.il
                </Typography>
              </Box>
            </ContactCard>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <ContactCard elevation={2}>
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <ContactIcon>
                  <PhoneIcon fontSize="large" />
                </ContactIcon>
                
                <Typography 
                  variant="h5" 
                  component="h3" 
                  fontWeight="bold" 
                  gutterBottom
                  sx={{ mb: 2 }}
                >
                  טלפון
                </Typography>
                
                <Typography 
                  variant="body1"
                  sx={{ 
                    mb: 1,
                    color: alpha(theme.palette.text.primary, 0.8),
                  }}
                >
                  03-1234567
                </Typography>
                
                <Typography 
                  variant="body1"
                  sx={{ 
                    color: alpha(theme.palette.text.primary, 0.8),
                  }}
                >
                  050-1234567
                </Typography>
              </Box>
            </ContactCard>
          </Grid>
        </Grid>
        
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Typography 
            variant="h5" 
            component="h3" 
            gutterBottom
            sx={{ mb: 3 }}
          >
            עקבו אחרינו ברשתות החברתיות
          </Typography>
          
          <Box sx={{ mt: 2 }}>
            <SocialButton 
              color="primary" 
              variant="contained" 
              sx={{ mx: 1 }}
            >
              <FacebookIcon />
            </SocialButton>
            
            <SocialButton 
              color="primary" 
              variant="contained" 
              sx={{ mx: 1 }}
            >
              <TwitterIcon />
            </SocialButton>
            
            <SocialButton 
              color="primary" 
              variant="contained" 
              sx={{ mx: 1 }}
            >
              <TwitterIcon />
            </SocialButton>
            
            <SocialButton 
              color="primary" 
              variant="contained" 
              sx={{ mx: 1 }}
            >
              <LinkedInIcon />
            </SocialButton>
            
            <SocialButton 
              color="primary" 
              variant="contained" 
              sx={{ mx: 1 }}
            >
              <InstagramIcon />
            </SocialButton>
          </Box>
        </Box>
      </Container>

      {/* CTA Section */}
      <Box 
        sx={{ 
          bgcolor: alpha(theme.palette.primary.main, 0.05), 
          py: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container>
          <Box 
            sx={{ 
              textAlign: "center", 
              maxWidth: "800px", 
              mx: "auto",
              p: 4,
              borderRadius: "16px",
              backgroundColor: "white",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom 
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              מוכנים להתחיל?
            </Typography>
            
            <Typography 
              variant="h6" 
              paragraph 
              sx={{ 
                mb: 4,
                color: alpha(theme.palette.text.primary, 0.8),
              }}
            >
              הצטרפו לאלפי מורים ובתי ספר שכבר משתמשים במערכת שלנו
            </Typography>
            
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
              <ActionButton
                onClick={() => navigate("/signUp")}
                variant="contained"
                color="primary"
                size="large"
              >
                הרשמה עכשיו
              </ActionButton>
              
              <ActionButton
                onClick={() => navigate("/contact")}
                variant="outlined"
                color="primary"
                size="large"
              >
                יצירת קשר
              </ActionButton>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutAs;
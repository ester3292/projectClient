import React, { useEffect, useRef } from "react";
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
  useTheme,
  useMediaQuery,
  IconButton,
  Chip,
  alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SchoolIcon from "@mui/icons-material/School";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Animated components with framer-motion
const MotionBox = ({ children, ...props }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  return (
    <Box
      ref={ref}
      component={motion.div}
      initial="hidden"
      animate={controls}
      {...props}
    >
      {children}
    </Box>
  );
};

// Styled components with enhanced animations
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.light} 100%)`,
  color: "white",
  padding: theme.spacing(12, 0, 14),
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  borderRadius: "0 0 50% 50% / 40px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(8, 0, 10),
    borderRadius: "0 0 50% 50% / 20px",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "url('/assets/grid-pattern.svg')",
    backgroundSize: "cover",
    opacity: 0.1,
    zIndex: 0,
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: 16,
  overflow: "hidden",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
  "&:hover": {
    transform: "translateY(-12px) scale(1.02)",
    boxShadow: "0 20px 30px rgba(0, 0, 0, 0.15)",
    "& .MuiCardMedia-root": {
      transform: "scale(1.1)",
    },
  },
  "& .MuiCardMedia-root": {
    transition: "transform 0.6s ease",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "30px",
  padding: "12px 28px",
  fontWeight: "bold",
  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
  transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  position: "relative",
  overflow: "hidden",
  zIndex: 1,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent)",
    transform: "translateX(-100%)",
    zIndex: -1,
  },
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    "&::before": {
      transform: "translateX(100%)",
      transition: "all 0.7s ease",
    },
  },
  "&:active": {
    transform: "translateY(-2px)",
    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
  },
}));

const StatsBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3, 2),
  textAlign: "center",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 16,
  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-8px) scale(1.03)",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.12)",
    "& .stats-icon": {
      transform: "scale(1.2) rotate(10deg)",
    },
    "& .stats-value": {
      transform: "scale(1.1)",
      color: theme.palette.primary.main,
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "5px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    zIndex: 1,
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 80,
  height: 80,
  borderRadius: "50%",
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  marginBottom: theme.spacing(2),
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  "& svg": {
    fontSize: 40,
    color: theme.palette.primary.main,
    transition: "all 0.4s ease",
  },
}));

const ScrollDownButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  bottom: 20,
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  color: "white",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  animation: "bounce 2s infinite",
  "@keyframes bounce": {
    "0%, 20%, 50%, 80%, 100%": {
      transform: "translate(-50%, 0)",
    },
    "40%": {
      transform: "translate(-50%, -15px)",
    },
    "60%": {
      transform: "translate(-50%, -7px)",
    },
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  marginBottom: theme.spacing(1),
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -8,
    left: "50%",
    transform: "translateX(-50%)",
    width: 80,
    height: 4,
    borderRadius: 2,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const HighlightChip = styled(Chip)(({ theme }) => ({
  fontWeight: "bold",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  marginBottom: theme.spacing(3),
  "& .MuiChip-icon": {
    color: theme.palette.primary.main,
  },
}));


const DeviceFrame = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  maxWidth: 600,
  margin: "0 auto",
  "& .device-screen": {
    width: "100%",
    // borderRadius: 8,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
    border: "10px solid #333",
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  "& .device-notch": {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "30%",
    height: 25,
    backgroundColor: "#333",
    borderRadius: "0 0 15px 15px",
    zIndex: 10,
  },
}));

export const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const scrollToFeatures = () => {
    document.getElementById("features-section").scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      title: "הוספת ציונים",
      description: "הוספת ציונים לתלמידים בקלות ובמהירות עם ממשק ידידותי למשתמש וסינכרון אוטומטי",
      icon: <PersonAddIcon />,
      action: () => navigate("/menu/updateMarks"),
      image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      color: theme.palette.primary.main,
      delay: 0,
    },
    {
      title: "חיפוש תלמידים",
      description: "מנוע חיפוש מתקדם למציאת תלמידים לפי שם, כיתה, מזהה או נתונים אחרים במהירות",
      icon: <SearchIcon />,
      action: () => navigate("/menu/allStudentsForEducatorTeacher"),
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      color: theme.palette.secondary.main,
      delay: 0.1,
    },
    {
      title: "ניתוח ציונים",
      description: "צפייה וניתוח ציונים לפי כיתה ומקצוע עם גרפים וסטטיסטיקות מתקדמות לקבלת תובנות",
      icon: <AssessmentIcon />,
      action: () => navigate("/menu/studentsByClassSub"),
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      color: theme.palette.success.main,
      delay: 0.2,
    },
    {
      title: "הפקת תעודות",
      description: "יצירת תעודות מקצועיות ואיכותיות בלחיצת כפתור עם אפשרויות עיצוב מתקדמות",
      icon: <SchoolIcon />,
     

      action: () => navigate("/menu/diploma"),
      image: "https://images.unsplash.com/photo-1564585222527-c2777a5bc6cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      color: theme.palette.warning.main,
      delay: 0.3,
    }
  ];

  const stats = [
    { 
      value: "98%", 
      label: "שביעות רצון מורים", 
      icon: <CheckCircleIcon fontSize="large" />, 
      color: theme.palette.success.main,
      description: "מהמורים מדווחים על שיפור ביעילות העבודה"
    },
    { 
      value: "15,000+", 
      label: "תלמידים במערכת", 
      icon: <PersonAddIcon fontSize="large" />, 
      color: theme.palette.primary.main,
      description: "תלמידים מנוהלים באמצעות המערכת שלנו"
    },
    { 
      value: "500+", 
      label: "בתי ספר", 
      icon: <SchoolIcon fontSize="large" />, 
      color: theme.palette.secondary.main,
      description: "מוסדות חינוך ברחבי הארץ משתמשים במערכת"
    },
    { 
      value: "50,000+", 
      label: "תעודות הופקו", 
      icon: <TrendingUpIcon fontSize="large" />, 
      color: theme.palette.info.main,
      description: "תעודות איכותיות נוצרו באמצעות הפלטפורמה"
    }
  ];

  const benefits = [
    {
      icon: <SpeedIcon fontSize="large" />,
      title: "מהירות וביצועים",
      description: "ממשק מהיר ויעיל המאפשר עבודה שוטפת ללא עיכובים, גם בעומסים גבוהים"
    },
    {
      icon: <SecurityIcon fontSize="large" />,
      title: "אבטחה מתקדמת",
      description: "הגנה מקסימלית על נתוני התלמידים עם הצפנה מתקדמת ואמצעי אבטחה קפדניים"
    },
    {
      icon: <VerifiedIcon fontSize="large" />,
      title: "דיוק ואמינות",
      description: "מערכת מדויקת המבטיחה שכל הנתונים והציונים מנוהלים בצורה אמינה ומדויקת"
    },
    {
      icon: <SupportAgentIcon fontSize="large" />,
      title: "תמיכה מקצועית",
      description: "צוות תמיכה זמין לעזור בכל שאלה או בעיה, עם זמני תגובה מהירים במיוחד"
    }
  ];

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const fadeInUpVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInRightVariants = {
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInLeftVariants = {
    hidden: { x: 60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const scaleInVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <Box style={{width:"570vh"}} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} >
      {/* Hero Section with Animated Background */}
      <HeroSection>
        <Container maxWidth="lg">
          <MotionBox
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            sx={{ position: "relative", zIndex: 2 }}
          >
            <MotionBox variants={itemVariants}>
              <HighlightChip 
                icon={<StarIcon />} 
                label="המערכת המובילה לניהול ציונים" 
                size="medium"
              />
            </MotionBox>
            
            <MotionBox variants={itemVariants}>
              <Typography 
                variant={isMobile ? "h3" : "h2"} 
                component="h1" 
                gutterBottom 
                fontWeight="bold"
                sx={{
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                  background: "linear-gradient(45deg, #fff, #f0f0f0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 3
                }}
              >
                ברוכים הבאים למערכת ניהול הציונים
              </Typography>
            </MotionBox>
            
            <MotionBox variants={itemVariants}>
              <Typography 
                variant={isMobile ? "body1" : "h5"} 
                paragraph 
                sx={{ 
                  maxWidth: "800px", 
                  mx: "auto", 
                  mb: 4,
                  opacity: 0.9,
                  lineHeight: 1.6
                }}
              >
                פלטפורמה מתקדמת לניהול ציונים, הפקת תעודות וניתוח הישגי תלמידים
                בממשק חדשני ואינטואיטיבי המותאם לצרכי המורים והמוסדות החינוכיים
              </Typography>
            </MotionBox>
            
            <MotionBox variants={itemVariants} sx={{ mt: 5 }}>
              <ActionButton
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate("/menu/updateMarks")}
                sx={{ 
                  mx: 1,
                  mb: isMobile ? 2 : 0,
                  fontSize: isMobile ? 14 : 16,
                  px: isMobile ? 3 : 4
                }}
                endIcon={<ArrowForwardIcon />}
              >
                הוספת ציון
              </ActionButton>
              
              <ActionButton
                variant="outlined"
                color="inherit"
                size="large"
                onClick={() => navigate("/menu/diploma")}
                sx={{ 
                  mx: 1, 
                  bgcolor: "rgba(255,255,255,0.15)",
                  borderColor: "rgba(255,255,255,0.3)",
                  fontSize: isMobile ? 14 : 16,
                  px: isMobile ? 3 : 4,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.25)",
                    borderColor: "rgba(255,255,255,0.5)",
                  }
                }}
                startIcon={<PlayArrowIcon />}
              >
                הפקת תעודות
              </ActionButton>
            </MotionBox>
          </MotionBox>
        </Container>
        
        {/* Animated scroll down button */}
        <ScrollDownButton onClick={scrollToFeatures} aria-label="גלול למטה">
          <KeyboardArrowDownIcon />
        </ScrollDownButton>
        
        {/* Animated background particles */}
        <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
          {[...Array(8)].map((_, i) => (
            <Box
              key={i}
              component={motion.div}
              sx={{
                position: "absolute",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: "50%",
                pointerEvents: "none",
              }}
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`
                ],
                x: [
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`
                ],
              }}
              transition={{
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
              }}
            />
          ))}
        </Box>
      </HeroSection>

      {/* Features Section */}
      <Container sx={{ mt: 10, mb: 10 }} id="features-section">
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          sx={{ textAlign: "center", mb: 6 }}
        >
          <MotionBox variants={fadeInUpVariants}>
            <SectionTitle variant="h3" component="h2" fontWeight="bold">
              הכלים שלנו
            </SectionTitle>
          </MotionBox>
          
          <MotionBox variants={fadeInUpVariants}>
            <Typography 
              variant="h6" 
              color="textSecondary" 
              paragraph 
              sx={{ 
                maxWidth: 700, 
                mx: "auto", 
                mt: 2,
                mb: 6,
                opacity: 0.8
              }}
            >
              כל מה שצריך כדי לנהל ציונים ותעודות ביעילות ובמקצועיות
              עם ממשק חדשני וטכנולוגיה מתקדמת
            </Typography>
          </MotionBox>
        </MotionBox>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <MotionBox
                variants={scaleInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: feature.delay }}
              >
                <FeatureCard 
                  sx={{ 
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "4px",
                      background: feature.color,
                    }
                  }}
                >
                  <CardActionArea 
                    onClick={feature.action}
                    sx={{ height: "100%", display: "flex", flexDirection: "column" }}
                  >
                    <Box sx={{ position: "relative", overflow: "hidden" }}>
                      <CardMedia
                        component="img"
                        height="160"
                        image={feature.image}
                        alt={feature.title}
                      />
                      <Box 
                        sx={{ 
                          position: "absolute", 
                          top: 0, 
                          left: 0, 
                          right: 0, 
                          bottom: 0, 
                          background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7) 100%)" 
                        }} 
                      />
                    </Box>
                    
                    <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 3 }}>
                      <Box 
                        sx={{ 
                          display: "flex", 
                          justifyContent: "center", 
                          mb: 2,
                          transform: "translateY(-50%)",
                          marginTop: "-40px"
                        }}
                      >
                        <FeatureIcon 
                          className="feature-icon"
                          sx={{ 
                            boxShadow: `0 8px 20px ${alpha(feature.color, 0.3)}`,
                            backgroundColor: alpha(feature.color, 0.1),
                            border: `2px solid ${alpha(feature.color, 0.3)}`,
                            "& svg": { color: feature.color }
                          }}
                        >
                          {feature.icon}
                        </FeatureIcon>
                      </Box>
                      
                      <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="h3" 
                        fontWeight="bold"
                        sx={{ mb: 2 }}
                      >
                        {feature.title}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </FeatureCard>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box 
        sx={{ 
          bgcolor: alpha(theme.palette.primary.light, 0.05), 
          py: 10,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
           
            backgroundImage: "url('/assets/pattern-dots.svg')",
            backgroundSize: "20px 20px",
            opacity: 0.05,
            zIndex: 0,
          }
        }}
      >
        <Container>
          <MotionBox
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            sx={{ textAlign: "center", mb: 8, position: "relative", zIndex: 1 }}
          >
            <MotionBox variants={fadeInUpVariants}>
              <SectionTitle variant="h3" component="h2" fontWeight="bold">
                למה לבחור בנו?
              </SectionTitle>
            </MotionBox>
            
            <MotionBox variants={fadeInUpVariants}>
              <Typography 
                variant="h6" 
                color="textSecondary" 
                paragraph 
                sx={{ 
                  maxWidth: 700, 
                  mx: "auto", 
                  mt: 2,
                  opacity: 0.8
                }}
              >
                מערכת מובילה בתחום ניהול הציונים והתעודות במערכת החינוך
                עם אלפי משתמשים מרוצים
              </Typography>
            </MotionBox>
          </MotionBox>

          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <MotionBox
                  variants={scaleInVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <StatsBox>
                    <Box 
                      className="stats-icon"
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        mb: 2,
                        transition: "all 0.4s ease",
                        color: stat.color
                      }}
                    >
                      {stat.icon}
                    </Box>
                    
                    <Typography 
                      variant="h4" 
                      component="p" 
                      fontWeight="bold" 
                      className="stats-value"
                      sx={{ 
                        color: "text.primary",
                        transition: "all 0.4s ease",
                        mb: 1
                      }}
                    >
                      {stat.value}
                    </Typography>
                    
                    <Typography 
                      variant="h6" 
                      color="primary"
                      fontWeight="medium"
                      sx={{ mb: 1 }}
                    >
                      {stat.label}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ mt: 1, fontSize: "0.875rem" }}
                    >
                      {stat.description}
                    </Typography>
                  </StatsBox>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container sx={{ mt: 12, mb: 12 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <MotionBox
              variants={fadeInRightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <HighlightChip 
                icon={<VerifiedIcon />} 
                label="ממשק ידידותי למורים" 
                size="medium"
              />
              
              <Typography 
                variant="h3" 
                component="h2" 
                gutterBottom 
                fontWeight="bold"
                sx={{ mt: 2, mb: 3 }}
              >
                חווית משתמש מתקדמת
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ mb: 3, opacity: 0.8, lineHeight: 1.7 }}>
                המערכת שלנו מציעה ממשק אינטואיטיבי וקל לשימוש, המאפשר למורים להזין ציונים, 
                לנהל כיתות ולהפיק תעודות בקלות ובמהירות, ללא צורך בידע טכני מוקדם.
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ mb: 4, opacity: 0.8, lineHeight: 1.7 }}>
                עם כלים מתקדמים לניתוח נתונים, המורים יכולים לקבל תובנות משמעותיות על ביצועי 
                התלמידים ולהתאים את שיטות ההוראה בהתאם, תוך חיסכון בזמן ומשאבים יקרים.
              </Typography>
              
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {benefits.map((benefit, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      display: "flex", 
                      alignItems: "flex-start",
                      gap: 2,
                      p: 2,
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
                        transform: "translateX(-5px)",
                      }
                    }}
                    component={motion.div}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Box 
                      sx={{ 
                        color: theme.palette.primary.main,
                        mt: 0.5
                      }}
                    >
                      {benefit.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {benefit.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {benefit.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              
              <Box sx={{ mt: 4 }}>
                <ActionButton
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate("/menu/aboutAs")}
                  endIcon={<ArrowForwardIcon />}
                >
                  למד עוד
                </ActionButton>
              </Box>
            </MotionBox>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <MotionBox
              variants={fadeInLeftVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <DeviceFrame>
                <Box sx={{ position: "relative" }}>
                  <Box className="device-notch" />
                  <Box 
                    className="device-screen"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 1,
                    }}
                  >
                    <Box 
                      component="img"
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      alt="Teacher using computer"
                      sx={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </Box>
                </Box>
                
                <Box 
                  sx={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    gap: 2,
                    mt: 3
                  }}
                >
                  
                </Box>
              </DeviceFrame>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>

      {/* Responsive Design Showcase */}
      <Box 
        sx={{ 
          bgcolor: theme.palette.primary.main, 
          color: "white", 
          py: 8,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 40%)",
            zIndex: 0,
          }
        }}
      >
        <Container>
          <MotionBox
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            sx={{ position: "relative", zIndex: 1 }}
          >
            <Grid container spacing={4} justifyContent="center" alignItems="center">
              <Grid item xs={12} md={8} textAlign="center">
                <MotionBox variants={fadeInUpVariants}>
                  <Typography 
                    variant="h4" 
                    component="h2" 
                    gutterBottom 
                    fontWeight="bold"
                    sx={{
                      textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                    }}
                  >
                    מוכנים להתחיל?
                  </Typography>
                </MotionBox>
                
                <MotionBox variants={fadeInUpVariants}>
                  <Typography 
                    variant="h6" 
                    paragraph
                    sx={{ 
                      maxWidth: 700, 
                      mx: "auto", 
                      opacity: 0.9,
                      mb: 4
                    }}
                  >
                    הצטרפו לאלפי מורים שכבר משתמשים במערכת שלנו לניהול ציונים והפקת תעודות
                    וגלו כיצד ניתן לחסוך זמן יקר ולשפר את תהליכי העבודה
                  </Typography>
                </MotionBox>
                
                <MotionBox variants={fadeInUpVariants} sx={{ mt: 3 }}>
                  <ActionButton
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => navigate("/menu")}
                    sx={{ 
                      mx: 1,
                      mb: isMobile ? 2 : 0,
                      fontSize: isMobile ? 14 : 16,
                      px: isMobile ? 3 : 4
                    }}
                    endIcon={<ArrowForwardIcon />}
                  >
                    התחל עכשיו
                  </ActionButton>
                  
                  <ActionButton
                    variant="outlined"
                    color="inherit"
                    size="large"
                    onClick={() => navigate("/menu/aboutAs")}
                    sx={{ 
                      mx: 1, 
                      bgcolor: "rgba(255,255,255,0.15)",
                      borderColor: "rgba(255,255,255,0.3)",
                      fontSize: isMobile ? 14 : 16,
                      px: isMobile ? 3 : 4,
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.25)",
                        borderColor: "rgba(255,255,255,0.5)",
                      }
                    }}
                  >
                    מידע נוסף
                  </ActionButton>
                </MotionBox>
              </Grid>
            </Grid>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
};
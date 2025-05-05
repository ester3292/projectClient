import React, { useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Button,
  useTheme,
  useMediaQuery,
  Link,
  IconButton,
  Chip,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SchoolIcon from "@mui/icons-material/School";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TimelineIcon from "@mui/icons-material/Timeline";
import SecurityIcon from "@mui/icons-material/Security";
import SupportIcon from "@mui/icons-material/Support";
import DevicesIcon from "@mui/icons-material/Devices";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { editId } from "../redux/slices/studentSlice";

// Styled components with enhanced animations
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(rgba(26, 35, 126, 0.85), rgba(26, 35, 126, 0.95)), url(https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  color: "white",
  padding: theme.spacing(12, 0),
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70px",
    background: "linear-gradient(to top left, white 0%, white 50%, transparent 50%)",
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
  "&:hover": {
    transform: "translateY(-12px)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
    "& .feature-icon": {
      transform: "scale(1.1) rotate(5deg)",
      boxShadow: `0 10px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
    },
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 16px",
  transition: "all 0.4s ease",
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
}));

const TeamMemberCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  borderRadius: "16px",
  overflow: "hidden",
  position: "relative",
  "&:hover": {
    transform: "translateY(-12px)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
    "& .member-avatar": {
      transform: "scale(1.05)",
      boxShadow: `0 15px 35px ${alpha(theme.palette.primary.main, 0.3)}`,
    },
    "& .social-buttons": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: 140,
  height: 140,
  marginBottom: theme.spacing(3),
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
  border: `4px solid ${theme.palette.primary.main}`,
  transition: "all 0.4s ease",
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0, 0.5),
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
  },
}));

const SocialButtonsContainer = styled(Box)(({ theme }) => ({
  opacity: 0,
  transform: "translateY(10px)",
  transition: "all 0.4s ease",
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1.5, 0),
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateX(5px)",
  },
}));

const TimelineItem = styled(Box)(({ theme }) => ({
  position: "relative",
  paddingLeft: theme.spacing(5),
  paddingBottom: theme.spacing(5),
  "&::before": {
    content: '""',
    position: "absolute",
    left: "9px",
    top: 0,
    bottom: 0,
    width: "3px",
    backgroundColor: alpha(theme.palette.primary.main, 0.3),
  },
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    top: "8px",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.main,
    boxShadow: `0 0 0 5px ${alpha(theme.palette.primary.main, 0.2)}`,
    transition: "all 0.3s ease",
  },
  "&:hover::after": {
    transform: "scale(1.2)",
    boxShadow: `0 0 0 8px ${alpha(theme.palette.primary.main, 0.2)}`,
  },
}));

const ContactCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: "100%",
  borderRadius: "16px",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  overflow: "hidden",
  position: "relative",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    "& .contact-icon": {
      transform: "scale(1.1) rotate(10deg)",
      boxShadow: `0 15px 35px ${alpha(theme.palette.primary.main, 0.3)}`,
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "5px",
    background: theme.palette.primary.main,
  },
}));

const ContactIcon = styled(Avatar)(({ theme }) => ({
  width: 70,
  height: 70,
  margin: "0 auto 20px",
  transition: "all 0.4s ease",
  boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "30px",
  padding: theme.spacing(1.5, 4),
  fontWeight: "bold",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)",
    transform: "translateX(-100%)",
  },
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    "&::after": {
      transform: "translateX(100%)",
      transition: "transform 0.6s ease",
    },
  },
}));

const HighlightChip = styled(Chip)(({ theme }) => ({
  borderRadius: "30px",
  fontWeight: "bold",
  backgroundColor: alpha(theme.palette.secondary.main, 0.1),
  color: theme.palette.secondary.main,
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
  boxShadow: `0 3px 10px ${alpha(theme.palette.secondary.main, 0.2)}`,
  marginBottom: theme.spacing(2),
  "& .MuiChip-icon": {
    color: theme.palette.secondary.main,
  },
}));

// Motion components
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionGrid = motion(Grid);

// Animation variants
const fadeInUpVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInLeftVariants = {
  hidden: { x: -60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInRightVariants = {
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

export const AboutAs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const timelineRef = useRef(null);
  const id = useSelector((state) => state.teacher.id);
  const dispatch = useDispatch();
  const features = [
    {
      title: "ניהול ציונים מתקדם",
      description: "מערכת מתקדמת לניהול ציונים עם אפשרויות סינון, חיפוש וניתוח נתונים",
      icon: <TimelineIcon fontSize="large" color="primary" />,
    },
    {
      title: "הפקת תעודות מקצועיות",
      description: "יצירת תעודות איכותיות ומקצועיות בעיצוב מותאם אישית",
      icon: <SchoolIcon fontSize="large" color="primary" />,
    },
    {
      title: "אבטחת מידע",
      description: "אבטחת מידע ברמה הגבוהה ביותר לשמירה על פרטיות התלמידים והציונים",
      icon: <SecurityIcon fontSize="large" color="primary" />,
    },
    {
      title: "תמיכה טכנית 24/7",
      description: "צוות תמיכה זמין בכל שעות היממה לפתרון בעיות ומענה לשאלות",
      icon: <SupportIcon fontSize="large" color="primary" />,
    },
    {
      title: "גישה מכל מכשיר",
      description: "גישה למערכת מכל מכשיר - מחשב, טאבלט או טלפון נייד",
      icon: <DevicesIcon fontSize="large" color="primary" />,
    },
  ];

  const teamMembers = [
    {

      name: "אסתר מורגנשטרן",
      role: "מנכ\"ל ומייסד",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      bio: "מפתחת Full Stack מעצבת מערכות מוכרת עם ניסיון עשיר בבניית מערכות ניהול מידע מורכבות, יזם טכנולוגי עם ניסיון עשיר בתחום החינוך והטכנולוגיה",
    },
    {
      name: "חיה זנדר",
      role: "ראש צוות פיתוח",
      image: "https://randomuser.me/api/portraits/women/62.jpg",
      bio: "מפתחת Full Stack עם ניסיון עשיר בבניית מערכות ניהול מידע מורכבות, ניסיון עשיר בהטמעת מערכות טכנולוגיות במוסדות חינוך וידע טכנולוגי - חינוכי רב",
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

  // Parallax effect for timeline
  useEffect(() => {
    if (id === -2) {
      dispatch(editId(-1));
    }
    const handleScroll = () => {
      if (timelineRef.current) {
        const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
          const rect = item.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

          if (isVisible) {
            const distance = window.innerHeight - rect.top;
            const percentage = Math.min(distance / window.innerHeight, 1);
            item.style.transform = `translateX(${(1 - percentage) * 20}px)`;
            item.style.opacity = percentage;
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box >
      {/* Hero Section with Particles */}
      <HeroSection width={1900}>
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          sx={{ position: "relative", zIndex: 2 }}
        >
          <Container>
            <MotionBox
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <MotionBox variants={fadeInUpVariants}>
                <HighlightChip
                  icon={<StarIcon />}
                  label="מובילים בתחום החינוך"
                  size="medium"
                />
              </MotionBox>

              <MotionTypography
                variant="h2"
                component="div"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)"
                }}
                variants={fadeInUpVariants}
              >
                מערכת ניהול ציונים
              </MotionTypography>

              <MotionTypography
                variant="h3"
                component="h1"
                gutterBottom
                fontWeight="bold"
                sx={{ textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
                variants={fadeInUpVariants}
              >
                אודות המערכת
              </MotionTypography>

              <MotionTypography
                variant="h5"
                paragraph
                sx={{
                  maxWidth: "800px",
                  mx: "auto",
                  mb: 4,
                  opacity: 0.9
                }}
                variants={fadeInUpVariants}
              >
                מערכת ניהול ציונים ותעודות מתקדמת המשרתת אלפי מורים ובתי ספר ברחבי הארץ
              </MotionTypography>

              <MotionBox variants={fadeInUpVariants}>
                <ActionButton
                  onClick={() => navigate("/logIn")}
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                >
                  התחבר עכשיו
                </ActionButton>
              </MotionBox>
            </MotionBox>
          </Container>
        </MotionBox>

        {/* Animated particles */}
        <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
          {[...Array(20)].map((_, i) => (
            <MotionBox
              key={i}
              sx={{
                position: "absolute",
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                opacity: [0.7, 0.1, 0.7],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </Box>
      </HeroSection>

      {/* Vision Section */}
      <Container sx={{ mt: 10, mb: 10 }}>
        <MotionGrid
          container
          spacing={6}
          alignItems="center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Grid item xs={12} md={6}>
            <MotionBox variants={fadeInRightVariants}>
              <HighlightChip
                icon={<StarIcon />}
                label="החזון שלנו"
                size="medium"
              />

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
                המטרה שלנו היא לספק כלים טכנולוגיים מתקדמים שיסייעו למורים לנהל את הציונים והתעודות בצורה יעילה, מדויקת ונוחה, תוך שמירה על סטנדרטים גבוהים של אבטחת מידע ופרטיות.
              </Typography>

              <Box sx={{ mt: 3 }}>
                <List>
                  {[
                    "מעל 500 בתי ספר משתמשים במערכת",
                    "יותר מ-15,000 תלמידים מנוהלים במערכת",
                    "98% שביעות רצון בקרב המורים",
                    "תמיכה טכנית זמינה 24/7"
                  ].map((item, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      <StyledListItem>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{
                            fontSize: "1.1rem",
                            fontWeight: "medium"
                          }}
                        />
                      </StyledListItem>
                    </MotionBox>
                  ))}
                </List>
              </Box>
            </MotionBox>
          </Grid>

          <Grid item xs={12} md={6}>
            <MotionBox
              variants={fadeInLeftVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Team meeting"
                sx={{
                  width: "100%",
                  borderRadius: "20px",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                  transform: "perspective(1000px) rotateY(-5deg)",
                  transition: "all 0.5s ease",
                  "&:hover": {
                    transform: "perspective(1000px) rotateY(0deg)",
                  }
                }}
              />
            </MotionBox>
          </Grid>
        </MotionGrid>
      </Container>

      {/* Features Section */}
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
          <MotionBox
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            sx={{ textAlign: "center", mb: 6 }}
          >
            <MotionBox variants={fadeInUpVariants}>
              <HighlightChip
                icon={<StarIcon />}
                label="היתרונות שלנו"
                size="medium"
              />
            </MotionBox>

            <MotionTypography
              variant="h3"
              component="h2"
              gutterBottom
              fontWeight="bold"
              color="primary"
              variants={fadeInUpVariants}
              sx={{ mt: 2 }}
            >
              היתרונות שלנו
            </MotionTypography>

            <MotionTypography
              variant="h6"
              color="textSecondary"
              paragraph
              sx={{
                mb: 6,
                maxWidth: "800px",
                mx: "auto",
                opacity: 0.8
              }}
              variants={fadeInUpVariants}
            >
              המערכת שלנו מציעה מגוון יתרונות שהופכים את ניהול הציונים והתעודות לפשוט, יעיל ומדויק
            </MotionTypography>
          </MotionBox>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <MotionBox
                  variants={scaleInVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FeatureCard>
                    <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 4 }}>
                      <FeatureIcon className="feature-icon">
                        {feature.icon}
                      </FeatureIcon>

                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h3"
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
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Timeline Section */}
      <Container sx={{ mt: 10, mb: 10 }} ref={timelineRef}>
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          sx={{ textAlign: "center", mb: 6 }}
        >
          <MotionBox variants={fadeInUpVariants}>
            <HighlightChip
              icon={<TimelineIcon />}
              label="ההיסטוריה שלנו"
              size="medium"
            />
          </MotionBox>

          <MotionTypography



            variant="h3"
            component="h2"
            gutterBottom
            fontWeight="bold"
            color="primary"
            variants={fadeInUpVariants}
            sx={{ mt: 2 }}
          >
            ההיסטוריה שלנו
          </MotionTypography>

          <MotionTypography
            variant="h6"
            color="textSecondary"
            paragraph
            sx={{
              mb: 6,
              maxWidth: "800px",
              mx: "auto",
              opacity: 0.8
            }}
            variants={fadeInUpVariants}
          >
            הדרך שעברנו מאז הקמת החברה ועד היום
          </MotionTypography>
        </MotionBox>

        <Box sx={{ maxWidth: "800px", mx: "auto" }}>
          {timeline.map((item, index) => (
            <MotionBox
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <TimelineItem>
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
            </MotionBox>
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
          <MotionBox
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            sx={{ textAlign: "center", mb: 6 }}
          >
            <MotionBox variants={fadeInUpVariants}>
              <HighlightChip
                icon={<StarIcon />}
                label="הצוות שלנו"
                size="medium"
              />
            </MotionBox>

            <MotionTypography
              variant="h3"
              component="h2"
              gutterBottom
              fontWeight="bold"
              color="primary"
              variants={fadeInUpVariants}
              sx={{ mt: 2 }}
            >
              הצוות שלנו
            </MotionTypography>

            <MotionTypography
              variant="h6"
              color="textSecondary"
              paragraph
              sx={{
                mb: 6,
                maxWidth: "800px",
                mx: "auto",
                opacity: 0.8
              }}
              variants={fadeInUpVariants}
            >
              הכירו את האנשים שעומדים מאחורי המערכת
            </MotionTypography>
          </MotionBox>

          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={5} key={index}>
                <MotionBox
                  variants={scaleInVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <TeamMemberCard>
                    <LargeAvatar
                      src={member.image}
                      alt={member.name}
                      className="member-avatar"
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

                    <SocialButtonsContainer className="social-buttons">
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
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Container sx={{ mt: 10, mb: 10 }}>
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          sx={{ textAlign: "center", mb: 6 }}
        >
          <MotionBox variants={fadeInUpVariants}>
            <HighlightChip
              icon={<PhoneIcon />}
              label="צור קשר"
              size="medium"
            />
          </MotionBox>

          <MotionTypography
            variant="h3"
            component="h2"
            gutterBottom
            fontWeight="bold"
            color="primary"
            variants={fadeInUpVariants}
            sx={{ mt: 2 }}
          >
            צור קשר
          </MotionTypography>

          <MotionTypography
            variant="h6"
            color="textSecondary"
            paragraph
            sx={{
              mb: 6,
              maxWidth: "800px",
              mx: "auto",
              opacity: 0.8
            }}
            variants={fadeInUpVariants}
          >
            יש לכם שאלות? אנחנו כאן כדי לעזור
          </MotionTypography>
        </MotionBox>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <MotionBox
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1 }}
            >
              <ContactCard>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <ContactIcon
                    sx={{ bgcolor: "primary.main" }}
                    className="contact-icon"
                  >
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
            </MotionBox>
          </Grid>

          <Grid item xs={12} md={4}>
            <MotionBox
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.2 }}
            >
              <ContactCard>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <ContactIcon
                    sx={{ bgcolor: "primary.main" }}
                    className="contact-icon"
                  >
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
            </MotionBox>
          </Grid>

          <Grid item xs={12} md={4}>
            <MotionBox
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.3 }}
            >
              <ContactCard>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <ContactIcon
                    sx={{ bgcolor: "primary.main" }}
                    className="contact-icon"
                  >
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
            </MotionBox>
          </Grid>
        </Grid>

        <MotionBox
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          sx={{ textAlign: "center", mt: 8 }}
        >
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
              sx={{
                mx: 1,
                transition: "all 0.3s ease",
              }}
            >
              <FacebookIcon />
            </SocialButton>

            <SocialButton
              color="primary"
              variant="contained"
              sx={{
                mx: 1,
                transition: "all 0.3s ease",
              }}
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
              sx={{
                mx: 1,
                transition: "all 0.3s ease",
              }}
            >
              <InstagramIcon />
            </SocialButton>
          </Box>
        </MotionBox>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: "white",
          py: 8,
          mt: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container>
          <MotionGrid
            container
            spacing={4}
            justifyContent="center"


            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Grid item xs={12} md={8} sx={{ textAlign: "center" }}>
              <MotionBox variants={fadeInUpVariants}>
                <Typography
                  variant="h3"
                  component="h2"
                  gutterBottom
                  fontWeight="bold"
                  sx={{ textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
                >
                  מוכנים להתחיל?
                </Typography>

                <Typography
                  variant="h6"
                  paragraph
                  sx={{
                    mb: 4,
                    maxWidth: "700px",
                    mx: "auto",
                    opacity: 0.9
                  }}
                >
                  הצטרפו לאלפי מורים ובתי ספר שכבר משתמשים במערכת ניהול הציונים שלנו
                </Typography>

                <Box sx={{ mt: 3 }}>
                  <ActionButton
                    onClick={() => navigate("/logIn")}
                    variant="contained"
                    color="secondary"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      mr: 2,
                      boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 12px 25px rgba(0,0,0,0.3)",
                      }
                    }}
                  >
                    התחבר עכשיו
                  </ActionButton>

                  <ActionButton
                    onClick={() => navigate("/contact")}
                    variant="outlined"
                    size="large"
                    sx={{
                      color: "white",
                      borderColor: "white",
                      "&:hover": {
                        borderColor: "white",
                        backgroundColor: "rgba(255,255,255,0.1)",
                      }
                    }}
                  >
                    צור קשר
                  </ActionButton>
                </Box>
              </MotionBox>
            </Grid>
          </MotionGrid>

          {/* Animated particles for CTA section */}
          {[...Array(15)].map((_, i) => (
            <MotionBox
              key={i}
              sx={{
                position: "absolute",
                width: Math.random() * 8 + 4,
                height: Math.random() * 8 + 4,
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 80 - 40],
                x: [0, Math.random() * 80 - 40],
                opacity: [0.7, 0.1, 0.7],
              }}
              transition={{
                duration: Math.random() * 8 + 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </Container>
      </Box>
    </Box>
  );
};

export default AboutAs;
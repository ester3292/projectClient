import React from "react";
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
  Fade,
  Zoom,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
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
import { useNavigate } from "react-router-dom";

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(rgba(26, 35, 126, 0.9), rgba(26, 35, 126, 0.9)), url(https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "white",
  padding: theme.spacing(10, 0),
  textAlign: "center",
  position: "relative",
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
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  borderRadius: "16px",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
  },
}));

const TeamMemberCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  },
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  marginBottom: theme.spacing(2),
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  border: `4px solid ${theme.palette.primary.main}`,
}));

const SocialButton = styled(Button)(({ theme }) => ({
  minWidth: "auto",
  padding: theme.spacing(1),
  borderRadius: "50%",
  margin: theme.spacing(0, 0.5),
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 0),
}));

const TimelineItem = styled(Box)(({ theme }) => ({
  position: "relative",
  paddingLeft: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  "&::before": {
    content: '""',
    position: "absolute",
    left: "7px",
    top: 0,
    bottom: 0,
    width: "2px",
    backgroundColor: theme.palette.primary.main,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    top: "8px",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.main,
  },
}));

const ContactCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: "100%",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

export const AboutAs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
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
      role: "designer מנכ\" ל ומייסד",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: " מפתחת Full Stack מעצבת מערכות מוכרת עם ניסיון עשיר בבניית מערכות ניהול מידע מורכבות, יזם טכנולוגי עם ניסיון עשיר בתחום החינוך והטכנולוגיה",
    },
    
    {
      name: "חיה זנדר",
      role: "ראש צוות פיתוח",
      image: "https://randomuser.me/api/portraits/men/62.jpg",
      bio:   "מפתחת Full Stack  עם ניסיון עשיר בבניית מערכות ניהול מידע מורכבות, ניסיון עשיר בהטמעת מערכות טכנולוגיות במוסדות חינוך וידע טכנולוגי - חינוכי רב"
      ,
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
      <HeroSection>
        <Container>
          <Fade in={true} timeout={1000}>
            <Box>


              <Typography variant="h2" component="div" gutterBottom sx={{ fontWeight: "bold" }}>
                מערכת ניהול ציונים
              </Typography>
              <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                אודות המערכת
              </Typography>
              <Typography variant="h5" paragraph sx={{ maxWidth: "800px", mx: "auto", mb: 4 }}>
                מערכת ניהול ציונים ותעודות מתקדמת המשרתת אלפי מורים ובתי ספר ברחבי הארץ
              </Typography>
              <Button
                  onClick={() => navigate("/logIn")}
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ mx: 1, px: 4, py: 1.5, borderRadius: "30px", fontWeight: "bold" }}
                >
                  התחבר עכשיו
                </Button>
            </Box>
          </Fade>
        </Container>
      </HeroSection>

      <Container sx={{ mt: 8, mb: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={1000}>
              <Box>
                <Typography variant="h3" component="h2" gutterBottom fontWeight="bold" color="primary">
                  החזון שלנו
                </Typography>
                <Typography variant="body1" paragraph fontSize="1.1rem">
                  אנו מאמינים שטכנולוגיה יכולה לשפר משמעותית את תהליכי ההוראה והלמידה. המערכת שלנו נועדה להקל על עבודת המורים ולאפשר להם להתמקד במה שחשוב באמת - חינוך והוראה איכותיים.
                </Typography>
                <Typography variant="body1" paragraph fontSize="1.1rem">
                  המטרה שלנו היא לספק כלים טכנולוגיים מתקדמים שיסייעו למורים לנהל את הציונים והתעודות בצורה יעילה, מדויקת ונוחה, תוך שמירה על סטנדרטים גבוהים של אבטחת מידע ופרטיות.
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <List>
                    {["מעל 500 בתי ספר משתמשים במערכת", "יותר מ-15,000 תלמידים מנוהלים במערכת", "98% שביעות רצון בקרב המורים", "תמיכה טכנית זמינה 24/7"].map((item, index) => (
                      <StyledListItem key={index}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={item} primaryTypographyProps={{ fontSize: "1.1rem" }} />
                      </StyledListItem>

                    ))}
                  </List>
                </Box>
              </Box>
            </Fade>
          </Grid>
          <Grid item xs={12} md={6}>
            <Zoom in={true} timeout={1000}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Team meeting"
                sx={{
                  width: "100%",
                  borderRadius: "20px",
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
                }}
              />
            </Zoom>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ bgcolor: "#f5f5f5", py: 8 }}>
        <Container>
          <Typography variant="h3" component="h2" align="center" gutterBottom fontWeight="bold" color="primary">
            היתרונות שלנו
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" paragraph sx={{ mb: 6, maxWidth: "800px", mx: "auto" }}>
            המערכת שלנו מציעה מגוון יתרונות שהופכים את ניהול הציונים והתעודות לפשוט, יעיל ומדויק
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Zoom in={true} style={{ transitionDelay: `${index * 150}ms` }}>
                  <FeatureCard>
                    <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 4 }}>
                      <Box sx={{ mb: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography gutterBottom variant="h5" component="h3" fontWeight="bold">
                        {feature.title}
                      </Typography>
                      <Typography variant="body1">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </FeatureCard>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom fontWeight="bold" color="primary">
          ההיסטוריה שלנו
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph sx={{ mb: 6, maxWidth: "800px", mx: "auto" }}>
          הדרך שעברנו מאז הקמת החברה ועד היום
        </Typography>

        <Box sx={{ maxWidth: "800px", mx: "auto" }}>
          {timeline.map((item, index) => (
            <Fade in={true} style={{ transitionDelay: `${index * 200}ms` }} key={index}>
              <TimelineItem>
                <Box sx={{ display: "flex", alignItems: "baseline", mb: 1 }}>
                  <Typography variant="h5" component="h3" fontWeight="bold" color="primary">
                    {item.year}
                  </Typography>
                  <Typography variant="h6" component="h4" fontWeight="bold" sx={{ ml: 2 }}>
                    {item.title}
                  </Typography>
                </Box>
                <Typography variant="body1">
                  {item.description}
                </Typography>
              </TimelineItem>
            </Fade>
          ))}
        </Box>
      </Container>

      <Box sx={{ bgcolor: "#f5f5f5", py: 8 }}>
        <Container>
          <Typography variant="h3" component="h2" align="center" gutterBottom fontWeight="bold" color="primary">
            הצוות שלנו
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" paragraph sx={{ mb: 6, maxWidth: "800px", mx: "auto" }}>
            הכירו את האנשים שעומדים מאחורי המערכת
          </Typography>

          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={22} sm={20} md={6} key={index}>
                <Zoom in={true} style={{ transitionDelay: `${index * 150}ms` }}>
                  <TeamMemberCard>
                    <LargeAvatar src={member.image} alt={member.name} />
                    <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" align="center" sx={{ mb: 2 }}>
                      {member.bio}
                    </Typography>
                    <Box>
                      <SocialButton color="primary" variant="outlined">
                        <LinkedInIcon fontSize="small" />
                      </SocialButton>
                      <SocialButton color="primary" variant="outlined">
                        <TwitterIcon fontSize="small" />
                      </SocialButton>
                      <SocialButton color="primary" variant="outlined">
                        <EmailIcon fontSize="small" />
                      </SocialButton>
                    </Box>
                  </TeamMemberCard>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom fontWeight="bold" color="primary">
          צור קשר
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph sx={{ mb: 6, maxWidth: "800px", mx: "auto" }}>
          יש לכם שאלות? אנחנו כאן כדי לעזור
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Fade in={true} timeout={1000}>
              <ContactCard>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <Avatar sx={{ bgcolor: "primary.main", width: 60, height: 60, mx: "auto", mb: 2 }}>
                    <LocationOnIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                    כתובת
                  </Typography>
                  <Typography variant="body1">
                    רחוב הברוש 15, תל אביב
                  </Typography>
                  <Typography variant="body1">
                    ישראל, 6473115
                  </Typography>
                </Box>
              </ContactCard>
            </Fade>
          </Grid>
          <Grid item xs={12} md={4}>
            <Fade in={true} timeout={1000} style={{ transitionDelay: "200ms" }}>
              <ContactCard>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <Avatar sx={{ bgcolor: "primary.main", width: 60, height: 60, mx: "auto", mb: 2 }}>
                    <EmailIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                    דוא"ל
                  </Typography>
                  <Typography variant="body1">
                    chaya123@schoolgrade.co.il
                  </Typography>
                  <Typography variant="body1">
                    ester12344@schoolgrade.co.il
                  </Typography>
                </Box>
              </ContactCard>
            </Fade>
          </Grid>
          <Grid item xs={12} md={4}>
            <Fade in={true} timeout={1000} style={{ transitionDelay: "400ms" }}>
              <ContactCard>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <Avatar sx={{ bgcolor: "primary.main", width: 60, height: 60, mx: "auto", mb: 2 }}>
                    <PhoneIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                    טלפון
                  </Typography>
                  <Typography variant="body1">
                    03-1234567
                  </Typography>
                  <Typography variant="body1">
                    050-1234567
                  </Typography>
                </Box>
              </ContactCard>
            </Fade>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="h5" component="h3" gutterBottom>
            עקבו אחרינו ברשתות החברתיות
          </Typography>
          <Box sx={{ mt: 2 }}>
            <SocialButton color="primary" variant="contained" sx={{ mx: 1 }}>
              <FacebookIcon />
            </SocialButton>
            <SocialButton color="primary" variant="contained" sx={{ mx: 1 }}>
              <TwitterIcon />
            </SocialButton>
            <SocialButton color="primary" variant="contained" sx={{ mx: 1 }}>
              <LinkedInIcon />
            </SocialButton>
            <SocialButton color="primary" variant="contained" sx={{ mx: 1 }}>
              <InstagramIcon />
            </SocialButton>
          </Box>
        </Box>
      </Container>

      <Box sx={{ bgcolor: "primary.main", color: "white", py: 6, mt: 8 }}>
        <Container>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={8} textAlign="center">
              <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
                מוכנים להצטרף אלינו?
              </Typography>
              <Typography variant="h6" paragraph>
                הצטרפו לאלפי מורים ובתי ספר שכבר משתמשים במערכת שלנו
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Button
                  onClick={() => navigate("/logIn")}
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ mx: 1, px: 4, py: 1.5, borderRadius: "30px", fontWeight: "bold" }}
                >
                  התחבר עכשיו
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  sx={{ mx: 1, px: 4, py: 1.5, borderRadius: "30px", bgcolor: "rgba(255,255,255,0.1)", fontWeight: "bold" }}
                >
                  הדגמה חינם
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

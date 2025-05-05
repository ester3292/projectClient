import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, StyledEngineProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { rtlCache } from "./components/rtlCatch";
import { CacheProvider } from "@emotion/react";
import { STORE } from './redux/store';

import { Menu } from "./components/menu";
import { Home } from "./components/home";
import { AboutAs } from "./components/aboutAs.jsx";
import { Login } from "./components/logIn";
import { AllStudentsForEducatorTeacher } from "./components/allStudentsForEducatorTeacher";
import { UpdateMarks } from "./components/updateMarks";
import { AddTeacher } from "./components/addTeacher.jsx";
import { StudentsByClassSub } from "./components/studentsByClassSub";
import { ManageMenu } from "./components/manageMenu";
import { Diploma } from "./components/diploma";
// Styles
import "./components/design.css";
import theme from "./components/theme.jsx";
import { ShowStudents } from "./components/showStudents.jsx";
import { ShowTeachers } from "./components/showTeachers.jsx";
import { ShowStudentMarks } from "./components/showStudentMarks.jsx";

function App() {
  return (
    <CacheProvider value={rtlCache}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={STORE}>
            <BrowserRouter>
              <Routes>
                
                <Route path="/" element={<AboutAs />} />
                <Route path="/logIn" element={<Login />} />
                <Route path="/addTeacher" element={<AddTeacher />} />
                <Route path="/menu" element={<Menu />}>
                  <Route path="home" element={<Home />} />
                  <Route path="aboutAs" element={<AboutAs />} />
                  <Route path="allStudentsForEducatorTeacher" element={<AllStudentsForEducatorTeacher />} />
                  <Route path="showStudentMarks" element={<ShowStudentMarks />}/>
                  <Route path="updateMarks" element={<UpdateMarks />} />
                  <Route path="studentsByClassSub" element={<StudentsByClassSub />} />
                  <Route path="manageMenu" element={<ManageMenu />} />
                  <Route path="showStudents" element={<ShowStudents />} />
                  <Route path="showTeachers" element={<ShowTeachers />} />
                  <Route path="diploma" element={<Diploma />} />
                  <Route index element={<Navigate to="home" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/logIn" replace />} />
              </Routes>

            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
}

export default App;

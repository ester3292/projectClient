import './design.css'
import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./logIn"
import { AllStudentsForEducatorTeacher } from "./allStudentsForEducatorTeacher"
import { Diploma } from "./diploma"
import { UpdateMarks } from "./updateMarks"
import { Menu } from "./menu"
import { ShowStudentMarks } from "./showStudentMarks"
import { StudentsByClassSub } from "./studentsByClassSub"
import { ManageMenu } from "./manageMenu"
import { ShowTeachers } from "./showTeachers"
import { ShowStudents } from "./showStudents"
import { AboutAs } from "./aboutAs"
import { Home } from "./home" 
import AddTeacher from './addTeacher'

export const Routing = () => {
    return <>
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
    </>
}

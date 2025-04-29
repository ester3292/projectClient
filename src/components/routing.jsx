import './design.css'
import { Route, Routes } from "react-router-dom"
import { LogIn } from "./logIn"
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
import { Home } from "./home" // Import from your local file, not from MUI icons

export const Routing = () => {
    return <>
        <Routes>
            <Route path="/home" element={<Home />}> </Route>
            <Route path="/logIn" element={<LogIn />}></Route>
            <Route path="/menu" element={<Menu />}>
                <Route path="aboutAs" element={<AboutAs />}></Route>
                <Route path="updateMarks" element={<UpdateMarks />}></Route>
                <Route path="diploma" element={<Diploma />}></Route>
                <Route path="studentsByClassSub" element={<StudentsByClassSub />}></Route>
                <Route path="showStudentMarks" element={<ShowStudentMarks />}></Route>
                <Route path="allStudentsForEducatorTeacher" element={<AllStudentsForEducatorTeacher />}> </Route>
                <Route path="home" element={<Home />}> </Route>
                <Route path="manageMenu" element={<ManageMenu />}>
                    <Route path="showTeachers" element={<ShowTeachers />}></Route>
                    <Route path="showStudents" element={<ShowStudents />}></Route>
                </Route>
            </Route>
            <Route path="/" element={<LogIn />}></Route>
        </Routes>
    </>
}

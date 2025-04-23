import { Button } from "@mui/material"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"



export const Menu = () => {
    const name = useSelector(state => state.teacher.firstName)
    const navigate = useNavigate()
    const findStudents = () => {
        navigate('allStudentsForEducatorTeacher')
    }
    const updateMarks = () => {
        navigate('updateMarks')
    }
    const getMarksByClassSub = () => {
        navigate('studentsByClassSub')
    }
    const manageMenu = () => {
        navigate('manageMenu')

    }
    useEffect(() => {
        navigate(`aboutAs`)
    
      }, []);  
    
    return <div>
        <br />
        <button className="buttonAtHome" onClick={() => updateMarks()}>הוספת ציון</button>
        <button className="buttonAtHome" onClick={() => findStudents()}>חיפוש תלמידים</button>
        <button className="buttonAtHome" onClick={() => getMarksByClassSub()}>ציונים ע"פ כיתה ומקצוע</button>
        <button className="buttonAtHome" onClick={() => manageMenu()}>תפריט ניהול</button>

        <button className="buttonAtHome" onClick={() => {
            navigate(`diploma`)
        }}> תעודות</button>
        <button className="userName"> {name}</button>
<Outlet></Outlet>
    </div>
}
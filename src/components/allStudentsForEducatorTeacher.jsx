import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsByClassThunk } from "../redux/slices/getStudentsByClassThunk";
import { Navigate, useNavigate } from "react-router-dom";
import { getStudentThunk } from "../redux/slices/getStudentThunk";
import { ShowStudentMarks } from "./showStudentMarks";
import { editId } from "../redux/slices/studentSlice";
import { resetStudents } from "../redux/slices/teacherSlice";
import { Button, TextField } from "@mui/material";

export const AllStudentsForEducatorTeacher = () => {
    // const educator = useSelector(state => state.teacher.educator);
    const students = useSelector(state => state.teacher.students);
    const [myclass, setClass] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(resetStudents())
    }, []);


    const showStudentMarks = async (id) => {
        await dispatch(editId(id))
        await getStudentThunk(id);
        navigate(`../showStudentMarks`)
    }

    return <div >
        <div>
            <TextField id="standard-basic" label="ClassCode" type="number" variant="standard" onChange={d => {
                setClass(d.target.value)
            }} ></TextField>
            <Button onClick={async d => {
                const myclass2 = parseInt(myclass, 10);
                await dispatch(getStudentsByClassThunk(myclass2))
            }}>ok</Button>
            {myclass !== 0 &&
                <table>
                    <thead>
                        <tr>
                            <th> id</th>
                            <th> firstName</th>
                            <th> lastName</th>
                            <th> phone</th>
                            <th> class</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(x => <><tr key={x.id} onClick={async () => {
                            showStudentMarks(x.id);
                        }
                        }>
                            <td >{x.id}</td>
                            <td >{x.firstName}</td>
                            <td >{x.lastName}</td>
                            <td >{x.phone}</td>
                            <td >{x.class}</td>
                        </tr></>
                        )}
                    </tbody>
                </table>}
        </div>

    </div>
}
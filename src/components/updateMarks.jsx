import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMarkForStudentThunk } from "../redux/slices/addMarkForStudentThunk";
import { getStudentThunk } from "../redux/slices/getStudentThunk";
import { Button, Dialog, TextField } from "@mui/material";
import { resetStudents } from "../redux/slices/teacherSlice";
import { resetMarkForStudent } from "../redux/slices/studentSlice";
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from "react-router-dom";
import EditNoteIcon from '@mui/icons-material/EditNote';
import EmojiSymbolsIcon from '@mui/icons-material/EmojiSymbols';
import NumbersIcon from '@mui/icons-material/Numbers';
import KeyIcon from '@mui/icons-material/Key';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

export const UpdateMarks = () => {

    const success = useSelector(state => state.mark.success);
    const teacherId = useSelector(state => state.teacher.id);
    const marks = useSelector(state => state.student.marks);
    const [notes, setNotes] = useState("");
    const [subject, setSubject] = useState("");
    const [mark, setMark] = useState(0);
    const [halfA, setHalfA] = useState(0);
    const [id, setID] = useState(0);
    const dispatch = useDispatch();
    const [addMark, setAddMark] = useState(true);
    const [returnToAboutAs, setReturnToAboutAs] = useState(false);
    const loading=useSelector(state=>state.mark.loading)
const navigate = useNavigate()
    useEffect(() => {
        dispatch(resetMarkForStudent());
        // setAddMark(true)
    }, []);
    useEffect(() => {
        if(returnToAboutAs === true)
            navigate(`../aboutAs`)
    }, [returnToAboutAs]);
    return <div>

        <Dialog open={addMark} >
            <div className="addMarkDialog">
            <h6>Add Mark:</h6>

                
                <TextField id="standard-basic" label="StudentId" type="number" variant="standard" onChange={d => {
                    setID(d.target.value)
                }} ></TextField><KeyIcon htmlColor="#1f51f7"/><br />
                <TextField id="standard-basic" label="Subject" variant="standard" onChange={async d => {
                    setSubject(d.target.value)
                }} ></TextField><EmojiSymbolsIcon color="primary"/><br />
                <TextField id="standard-basic" label="Mark" type="number" variant="standard" onChange={async d => {
                    setMark(d.target.value)
                }} ></TextField><NumbersIcon htmlColor="#667eea"/><br />
                <TextField id="standard-basic" label="Notes" variant="standard" onChange={async d => {
                    setNotes(d.target.value)
                }} ></TextField><EditNoteIcon htmlColor="#7141d2"/><br />
                <TextField id="standard-basic"  label="HalfA->0 HalfB->1" type="number" variant="standard" onChange={async d => {
                    setHalfA(d.target.value)
                }} ></TextField><EventAvailableIcon htmlColor="#a24b89"/><br />
<br />
                <Button onClick={async () => {
                    await dispatch(addMarkForStudentThunk({ StudentId: id, Subject: subject, Mark: mark, Notes: notes, TeacherId: teacherId, HalfA: halfA }))
                    await dispatch(getStudentThunk(id))
                    setAddMark(false);
                }}
                    color="primary"
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                >save</Button>
                 <Button onClick={async () => {
                    setAddMark(false);
                    setReturnToAboutAs(true)
                }}>cancel</Button><br />
               
            </div>
        </Dialog>
        {success && <table>
            <thead>
                <tr>
                    <th> subject</th>
                    <th> mark</th>
                    <th> notes</th>
                    <th> teacherId</th>
                    <th> Half</th>
                </tr>
            </thead>
            <tbody>

                {marks && <h1>aa</h1> &&
                    marks.map(x => <><tr key={x.id}>
                        <td >{x.subject}</td>
                        <td >{x.mark}</td>
                        <td >{x.notes}</td>
                        <td >{x.teacherId}</td>
                        <td >{x.halfA}</td>
                    </tr></>
                    )}
            </tbody>
        </table>

        }
    </div>
}

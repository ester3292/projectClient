import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsByClassSubThunk } from "../redux/slices/getStudentsByClassSubThunk";
import { resetFind } from "../redux/slices/teacherSlice";
import { Box, Button, Dialog, TextField } from "@mui/material";
import { AccountCircle, Subject } from "@mui/icons-material";
import { updateMarkThunk } from "../redux/slices/updateMarkThunk";
import { addMarkForStudentThunk } from "../redux/slices/addMarkForStudentThunk";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EditNoteIcon from '@mui/icons-material/EditNote';
import EmojiSymbolsIcon from '@mui/icons-material/EmojiSymbols';
import NumbersIcon from '@mui/icons-material/Numbers';
import { getStudentsByClassSubHalfThunk } from "../redux/slices/getStudentsByClassSubHalfThunk";
import RestoreFromTrashSharpIcon from '@mui/icons-material/RestoreFromTrashSharp';
import { deleteMarkThunk } from "../redux/slices/deleteMarkThunk";

export const StudentsByClassSub = () => {
    const find = useSelector(state => state.teacher.find);
    const IdTeacher = useSelector(state => state.teacher.id)
    const [myclass, setClass] = useState(0);
    const [selected, setSelected] = useState(-1);
    const [sub, setSub] = useState("");
    const [halfA, setHalfA] = useState(-1);
    const [wichHalf, setWichHalf] = useState(false);
    const [perfectMark, setPerfectMark] = useState({});
    const [markToUpdate, setMarkToUpdate] = useState({})//{ id: 0, subject: "", mark: 0, notes: "", teacherId: 0, studentId: 0 });
    const [markToUpdate2, setMarkToUpdate2] = useState({})//{ subject: "", mark: 0, notes: "", teacherId: 0, studentId: 0 });
    const [showDialog, setShowDialog] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetFind())
        setMarkToUpdate({ ...markToUpdate, teacherId: IdTeacher, subject: sub })
        setMarkToUpdate2({ ...markToUpdate2, teacherId: IdTeacher, subject: sub })

    }, []);

    const refreshTable = async () => {
        if (halfA !== -1)
            await dispatch(getStudentsByClassSubHalfThunk({ sub: sub, myclass: parseInt(myclass, 10), halfA: parseInt(halfA, 10) }))
        else dispatch(getStudentsByClassSubThunk({ sub: sub, myclass: parseInt(myclass, 10) }))
    }
    return <div>
        <br />
        <button className="halfButton" onClick={() => {
            setWichHalf(true)
            setHalfA(1)
            setMarkToUpdate({ ...markToUpdate, halfA: 1 })
            setMarkToUpdate2({ ...markToUpdate2, halfA: 1})
        }}>מחצית ב</button>
        <button className="halfButton" onClick={() => {
            setWichHalf(true)
            setHalfA(0)
            setMarkToUpdate({ ...markToUpdate, halfA: 0 })
            setMarkToUpdate2({ ...markToUpdate2, halfA: 0})
        }}>מחצית א</button>
        <button className="halfButton" onClick={() => {
            setWichHalf(true)
            setHalfA(-1)
        }}>כלל הציונים</button>

        {wichHalf && <div><br />
            <Box style={{ marginLeft: "25%" }}
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off">
                <TextField id="standard-basic" label="Subject" variant="standard" onChange={async d => {
                    setSub(d.target.value)
                    setMarkToUpdate({ ...markToUpdate, subject: d.target.value })
                    setMarkToUpdate2({ ...markToUpdate2, subject: d.target.value })

                }} ></TextField>
                <TextField id="standard-basic" label="Class" type="number" variant="standard" onChange={async d => {
                    setClass(d.target.value)
                }} ></TextField>

                <Button onClick={async d => {
                    debugger
                    refreshTable()
                }}>ok</Button>

            </Box>
            {myclass !== 0 && <>

                <h4 className="title"> Marks for class {myclass} in :{sub} at half : {halfA === 0 ? "A" : halfA === 1 ? "B" : "ANY"}</h4>
                <table>
                    <thead>
                        <tr>
                            <th> id</th>
                            <th> firstName</th>
                            <th> lastName</th>
                            <th> phone</th>
                            <th> class</th>
                            <th> the mark</th>
                            <th> delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {find && find.map(x => <><tr onClick={() => {
                            setPerfectMark(x.marksForStudent)
                            setMarkToUpdate2({ ...markToUpdate2, studentId: x.id })
                            setSelected(x.id)
                            debugger
                            if (x.marksForStudent)
                                setMarkToUpdate({ ...markToUpdate, id: x.marksForStudent.id, mark: x.marksForStudent.mark, notes: x.marksForStudent.notes, halfA: x.marksForStudent.halfA })
                            setShowDialog(true)
                        }} key={x.id}>
                            <td>{x.id}</td>
                            <td >{x.firstName}</td>
                            <td >{x.lastName}</td>
                            <td >{x.phone}</td>
                            <td >{x.class}</td>
                            {x.marksForStudent ? <td >{x.marksForStudent.mark}</td> : <td >0</td>}
                            <td onClick={async () => {
                                if (x.marksForStudent != null) {
                                    await dispatch(deleteMarkThunk({ details: x.marksForStudent }))
                                    refreshTable()
                                }
                                setShowDialog(false);
                            }}>

                                <RestoreFromTrashSharpIcon color="error"/></td>
                        </tr>

                        </>

                        )}
                    </tbody>
                </table>
            </>
            }
            <Dialog open={showDialog} style={{ border: "1px black solid" }} >
                <div className="updateMark">
                    <h6>Update details for mark:</h6>

                    <Box>
                        <TextField id="standard-basic" label="Subject" variant="standard"
                            defaultValue={sub}
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                        ></TextField><EmojiSymbolsIcon htmlColor="#667eea"/><br />
                        <TextField id="standard-basic" label="Mark" variant="standard"
                            type="number" defaultValue={perfectMark && perfectMark.mark}
                            onChange={d => {
                                setMarkToUpdate({ ...markToUpdate, mark: d.target.value })
                                setMarkToUpdate2({ ...markToUpdate2, mark: d.target.value })
                            }}> </TextField><NumbersIcon color="primary" /><br />
                        <TextField id="standard-basic" label="Notes" variant="standard"
                            defaultValue={perfectMark && perfectMark.notes}
                            onChange={d => {
                                setMarkToUpdate({ ...markToUpdate, notes: d.target.value })
                                setMarkToUpdate2({ ...markToUpdate2, notes: d.target.value })
                            }}> </TextField><EditNoteIcon htmlColor="#a24b89" />
                        <br />
                        {halfA === -1 && <TextField id="standard-basic" label="HalfA->0 HalfB->1" variant="standard" type="number"
                            defaultValue={perfectMark && perfectMark.halfA}
                            onChange={d => {
                                setMarkToUpdate({ ...markToUpdate, halfA: d.target.value })
                                setMarkToUpdate2({ ...markToUpdate2, halfA: d.target.value })
                            }}> </TextField>
                        }
                        <br />
                        <Button onClick={async () => {
                            setMarkToUpdate({ ...markToUpdate, halfA: halfA })
                            setMarkToUpdate2({ ...markToUpdate2, halfA: halfA })
                            if (perfectMark) {
                                await dispatch(updateMarkThunk({ details: { ...markToUpdate, studentId: selected } }))
                                refreshTable()
                            }
                            else {
                                await dispatch(addMarkForStudentThunk(markToUpdate2))
                                refreshTable()
                            }
                            setShowDialog(false)
                        }}>
                            ok
                        </Button>
                        <Button onClick={() => {
                            setShowDialog(false)
                        }}>x</Button>
                    </Box>
                </div>
            </Dialog>

        </div >
        }
    </div >

}
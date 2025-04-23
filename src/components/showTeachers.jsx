import { Button, Checkbox, Dialog, Fade, Icon, Paper, Popper, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTeacherThunk } from "../redux/slices/addTeacherThunk";
import { getAllTeachersThunk } from "../redux/slices/getAllTeachersThunk";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ComputerIcon from '@mui/icons-material/Computer';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import KeyIcon from '@mui/icons-material/Key';
import RestoreFromTrashSharpIcon from '@mui/icons-material/RestoreFromTrashSharp';
import { deleteTeacherThunk } from "../redux/slices/deleteTeacherThunk";
import SaveIcon from '@mui/icons-material/Save';


export const ShowTeachers = () => {

    const dispatch = useDispatch();
    const [id, setId] = useState(0)
    const [firstName, setfirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [educator, setEducator] = useState(false)
    const teachers = useSelector(state => state.teacher.arr)
    const loading=useSelector(state=>state.teacher.loading)
    const [viewAllTeachers, setViewAllTeachers] = useState(false)
    const [addTeacher, setAddTeacher] = useState(false)
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const refreshTable = async () => {
        dispatch(getAllTeachersThunk());
    }


    return <div>

        <br />
        <br />
        <Button onClick={() => {
            setAddTeacher(true);
        }}>add teacher
        </Button>

        <Button onClick={async () => {
            setViewAllTeachers(!viewAllTeachers)
            dispatch(getAllTeachersThunk());
        }}>{viewAllTeachers ? "hide" : "view all teachers"}</Button>

        <Dialog open={addTeacher} >
            <div className="newTeacher">
                <h6>Add New Teacher:</h6>
                <TextField id="standard-basic" label="Password" required type="number"
                    variant="standard" onChange={async d => {
                        setId(d.target.value)
                    }} ></TextField><KeyIcon htmlColor="#1f51f7"/>
                <br />

                <TextField id="standard-basic" label="FirstName" required variant="standard" onChange={async d => {
                    setfirstName(d.target.value)
                }} ></TextField><PersonIcon color="primary"/>
                <br />
                <TextField id="standard-basic" label="LastName" required variant="standard" onChange={async d => {
                    setLastName(d.target.value)
                }} ></TextField><BadgeIcon htmlColor="#667eea"/>
                <br />
                <TextField id="standard-basic" label="Phone" required variant="standard" onChange={async d => {
                    setPhone(d.target.value)
                }} ></TextField><PhoneInTalkIcon htmlColor="#7141d2"/>

                <br />
                <TextField id="standard-basic" label="Email" required variant="standard" onChange={async d => {
                    setEmail(d.target.value)
                }} ></TextField><ComputerIcon htmlColor="#a24b89"/>
                <br />

                <label htmlFor="Educator">Educator:</label>
                <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onChange={d => { setEducator(!educator) }} />
                <br />
                <br />
                <Button
                    onClick={() => {
                        if (id && phone && firstName !== "" && lastName !== "" && email !== "")
                            dispatch(addTeacherThunk({ id: id, firstName: firstName, lastName: lastName, phone: phone, email: email, educator: educator }))
                        setAddTeacher(false);

                    }}
                    color="primary"
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                >Save</Button> 
        
               
                <Button onClick={() => {
                    setAddTeacher(false);
                }}>cancel</Button>
            </div>
        </Dialog>
     
        {viewAllTeachers &&
            <table className="manageTable">
                <thead>
                    <tr>
                        <th> Id</th>
                        <th> Educator</th>
                        <th> FirstName</th>
                        <th> LastName</th>
                        <th> Phone</th>
                        <th> Email</th>
                        <th> delete</th>
                    </tr>
                </thead>
                <tbody>

                    {teachers && <h1>aa</h1> &&
                        teachers.map(x => <><tr key={x.id}>
                            <td >{x.id}</td>
                            <td ><input type="checkbox" checked={x.educator} disabled /></td>
                            <td >{x.firstName}</td>
                            <td >{x.lastName}</td>
                            <td >{x.phone}</td>
                            <td >{x.email}</td>
                            <td onClick={async () => {
                                debugger
                                await dispatch(deleteTeacherThunk({ details: x }))
                                refreshTable()
                            }}>

                                <RestoreFromTrashSharpIcon color="error"/></td>
                        </tr></>
                        )}
                </tbody>
            </table>

        }
    </div>
}
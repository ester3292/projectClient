import { Button, Checkbox, Dialog, List, TextField } from "@mui/material"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import * as React from 'react';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ComputerIcon from '@mui/icons-material/Computer';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import KeyIcon from '@mui/icons-material/Key';
import RestoreFromTrashSharpIcon from '@mui/icons-material/RestoreFromTrashSharp';
import { getAllStudentsThunk } from "../redux/slices/getAllStudents";
import { deleteStudentThunk } from "../redux/slices/deleteStudentThunk";
import { addStudentThunk } from "../redux/slices/addStudentThunk";
import SaveIcon from '@mui/icons-material/Save';
import { useEffect } from "react";

export const ShowStudents = () => {

    const dispatch = useDispatch();
    const [id, setId] = useState(0)
    const [firstName, setfirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [myclass, setClass] = useState(0)
    const students = useSelector(state => state.student.arr)
    const [viewAllStudents, setViewAllStudents] = useState(false)
    const [addStudent, setAddStudent] = useState(false)
    const loading = useSelector(state => state.student.loading)
 
   
    return <div>

        <br />
        <br />
        <Button onClick={() => {
            setAddStudent(true);
        }}>add student
        </Button>

        <Button onClick={async () => {
            setViewAllStudents(!viewAllStudents)
            dispatch(getAllStudentsThunk());
        }}>{viewAllStudents ? "hide" : "view all Students"}</Button>

        <Dialog open={addStudent} >
            <div className="newStudent">
                <h6>Add New Student:</h6>
                <TextField id="standard-basic" label="StudentId" required type="number"
                    variant="standard" onChange={async d => {
                        setId(d.target.value)
                    }} ></TextField><KeyIcon htmlColor="#1f51f7" />
                <br />

                <TextField id="standard-basic" label="FirstName" required variant="standard" onChange={async d => {
                    setfirstName(d.target.value)
                }} ></TextField><PersonIcon color="primary" />
                <br />
                <TextField id="standard-basic" label="LastName" required variant="standard" onChange={async d => {
                    setLastName(d.target.value)
                }} ></TextField><BadgeIcon htmlColor="#667eea" />
                <br />
                <TextField id="standard-basic" label="Phone" required variant="standard" onChange={async d => {
                    setPhone(d.target.value)
                }} ></TextField><PhoneInTalkIcon htmlColor="#7141d2" />

                <br />
                <TextField id="standard-basic" label="Class" required variant="standard" onChange={async d => {
                    setClass(d.target.value)
                }} ></TextField><ComputerIcon htmlColor="#a24b89" />
                <br />

                <br />

                <Button onClick={() => {
                    if (id && phone && firstName !== "" && lastName !== "" && myclass) {
                        dispatch(addStudentThunk({ id: id, firstName: firstName, lastName: lastName, phone: phone, class: parseInt(myclass, 10) }))
                        setAddStudent(false);
                    }
                }} color="primary"
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                >Save</Button>
                <Button onClick={() => {
                    setAddStudent(false);
                }}>cancel</Button>
            </div>
        </Dialog>

        {viewAllStudents &&
            <table className="manageTable">
                <thead>
                    <tr>
                        <th> Id</th>
                        <th> FirstName</th>
                        <th> LastName</th>
                        <th> Phone</th>
                        <th> Class</th>
                        <th> delete</th>
                    </tr>
                </thead>
                <tbody>

                    {students && <h1>aa</h1> &&
                        students.map(x => <><tr key={x.id}>
                            <td >{x.id}</td>
                            <td >{x.firstName}</td>
                            <td >{x.lastName}</td>
                            <td >{x.phone}</td>
                            <td >{x.class}</td>
                            <td onClick={async () => {
                                debugger
                                await dispatch(deleteStudentThunk({ details: x }))
                            }}>

                                <RestoreFromTrashSharpIcon color="error" /></td>
                        </tr></>
                        )}
                </tbody>
            </table>

        }
    </div>
}
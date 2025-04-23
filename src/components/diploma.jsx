import { Button, Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import KeyIcon from '@mui/icons-material/Key';
import { useNavigate } from "react-router-dom";
import { getStudentThunk } from "../redux/slices/getStudentThunk";
import { getAchivmentsById } from "../redux/slices/getAchivmentsById";
import { getAchivmentsByFullName } from "../redux/slices/getAchivmentsByFullName";

export const Diploma = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState(0)
  const [firstName, setfirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [returnToAboutAs, setReturnToAboutAs] = useState(false);
  const [shoeTable, setShoeTable] = useState(false);
  const [shoeDialog, setShoeDialog] = useState(true);
  const navigate = useNavigate();
  const achivments = useSelector(state=>state.student.achivments);


  useEffect(() => {
    if (returnToAboutAs === true)
      navigate(`../aboutAs`)
  }, [returnToAboutAs]);



  const getStudentsAchievement = (id, firstName, lastName) => {
if(id)
{
  dispatch(getAchivmentsById({id}));
}
else if(firstName !== "" && lastName !== "")
  {
    dispatch(getAchivmentsByFullName(firstName,lastName));
  }
    setShoeDialog(false);
    setShoeTable(true);
  }

  return <div className="diploma">
    <Dialog open={shoeDialog} >
      <div className="studentDetails">
        <h6>Press Student Details:</h6>
        <TextField id="standard-basic" label="StudentId" type="number"
          variant="standard" onChange={async d => {
            setId(d.target.value)
          }} ></TextField><KeyIcon htmlColor="#667eea" />
        <br />

        <TextField id="standard-basic" label="FirstName" variant="standard" onChange={async d => {
          setfirstName(d.target.value)
        }} ></TextField><PersonIcon color="primary" />
        <br />
        <TextField id="standard-basic" label="LastName" variant="standard" onChange={async d => {
          setLastName(d.target.value)
        }} ></TextField><BadgeIcon htmlColor="#a24b89" />
        <br />
        <Button onClick={() => {
          if (id || (firstName !== "" && lastName !== "")) {
            getStudentsAchievement(id, firstName, lastName);
          }
        }} color="primary"
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >Ok</Button>
        <Button onClick={() => {
          setReturnToAboutAs(true);
          setShoeDialog(false);
        }}>cancel</Button>

      </div>
    </Dialog>

    {shoeTable && <div className="achivment">
      <div className="achivmentHeader">{firstName && firstName}</div>
<br />
      <table className="manageTable">
        <thead>
          <tr>
            <th> Subject</th>
            <th> HalfA</th>
            <th> HalfB</th>
            <th> Avg</th>
          </tr>
        </thead>
        <tbody>
          {achivments.completeMark && <h1>aa</h1> &&
            achivments.completeMark.map(x => <><tr key={x.id}>
              <td >{x.subject}</td>
              <td >{x.markA ?x.markA.mark:0}</td>
              <td >{x.markB ?x.markB.mark:0}</td>
              <td >{x.avg}</td>
           </tr></>
            )}
        </tbody>
      </table>
    </div>}
  </div>

}





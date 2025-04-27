import { logInThunk } from "../redux/slices/logInThunk";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './design.css';
import { editFirstName } from "../redux/slices/teacherSlice";
import { Button } from "@mui/material";


export const LogIn = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({ id: "", firstName: "", lastName: "" });
  const dispatch = useDispatch();
  const teachers = useSelector(state => state.teacher.arr)
  const id = useSelector(state => state.teacher.id)
  const firstName = useSelector(state => state.teacher.firstName)

  const ref = useRef()

  useEffect(() => {
    ref.current.showModal();
  }, []);

  useEffect(() => {
    console.log(teachers)
  }, [teachers])

  useEffect(() => {
    if (id === -1 && firstName === "bad") {
    }
    if (id !== -1) {
      navigate(`menu`)
    }
  }, [firstName])

  return <div>


    <div className="wrapper">
      <dialog className="loginAba" ref={ref}>
        <div className="picloginman"></div>
        <input className="loginInput" type="text" onChange={(e) => setDetails({ ...details, firstName: e.target.value })} placeholder="press your firstName:" />
        <div className="picloginpass"></div>
        <input className="loginInput2" type="text" onChange={(e) => setDetails({ ...details, id: e.target.value })} placeholder="press your id:" />
        <button className="loginButton" onClick={async () => {

          await dispatch(logInThunk(details.id));
          await dispatch(editFirstName(details.username))

          debugger
        }}

        ></button >
      </dialog>
    </div>


    {id === -1 && firstName === "bad" && <h1> not correct id !!</h1>}

  </div>
}
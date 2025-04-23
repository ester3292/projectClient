import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMarkForStudentThunk } from "../redux/slices/addMarkForStudentThunk";
import { getStudentThunk } from "../redux/slices/getStudentThunk";


export const ShowStudentMarks=()=>{

    const success = useSelector(state => state.mark.success);
    const marks = useSelector(state => state.student.marks);
    const id = useSelector(state => state.student.id);
     const dispatch = useDispatch();

     useEffect(() => {
        debugger
        dispatch(getStudentThunk(id));
      }, []);
    return <div>
        <br />
       <table>
                <thead>
                    <tr>
                        <th> Subject</th>
                        <th> Mark</th>
                        <th> Notes</th>
                        <th> TeacherId</th>
                        <th> HalfA?</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {marks  && <h1>aa</h1> &&
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
           
        
    </div>
}
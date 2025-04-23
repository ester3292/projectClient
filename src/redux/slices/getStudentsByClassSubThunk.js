import { createAsyncThunk } from "@reduxjs/toolkit";

export const getStudentsByClassSubThunk = createAsyncThunk(
   'getStudentsByClassAndSub', 
   async ({sub,myclass}) => {
        debugger
       const res = await fetch(`http://localhost:5244/api/Student/GetMarkByClass?sub=${sub}&myclass=${myclass}
`, {
        method: 'GET',
    })
       if (res.ok) {
           const data = await res.json();
           debugger
           console.log("fetch success get event");
           return data;
       } else {
           throw new Error('failed to fetch');
       }
   }
);
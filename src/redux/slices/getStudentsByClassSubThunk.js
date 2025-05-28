import { createAsyncThunk } from "@reduxjs/toolkit";

export const getStudentsByClassSubThunk = createAsyncThunk(
   'getStudentsByClassAndSub', 
   async ({sub,myclass}) => {
        
       const res = await fetch(`http://localhost:5244/api/Student/GetMarkByClass?sub=${sub}&myclass=${myclass}
`, {
        method: 'GET',
    })
       if (res.ok) {
           const data = await res.json();
           
           console.log("fetch success get event");
           return data;
       } else {
           throw new Error('failed to fetch');
       }
   }
);
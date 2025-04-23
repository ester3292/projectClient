import { createAsyncThunk } from "@reduxjs/toolkit";

export const getStudentsByClassSubHalfThunk = createAsyncThunk(
   'getStudentsByClassAndSubHalf', 
   async ({sub,myclass,halfA}) => {
        debugger
       const res = await fetch(`http://localhost:5244/api/Student/GetMarkByClassAndHalf?sub=${sub}&myclass=${myclass}&halfA=${halfA}`, {
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
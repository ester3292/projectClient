import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAchivmentsById = createAsyncThunk(
   'getAchivmentsById', 
   async ({id}) => {
        
       const res = await fetch(`http://localhost:5244/api/Student/GetFullAchivmentForStudentById?id=${id}`, {

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
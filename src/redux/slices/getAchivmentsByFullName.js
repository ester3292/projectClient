import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAchivmentsByFullName= createAsyncThunk(
   'getAchivmentsByFullName', 
   async (details) => {
        
       const res = await fetch(`http://localhost:5244/api/Student/GetFullAchivmentForStudentByFullName?firstName=${details.firstName}&lastName=${details.lastName}`, {
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
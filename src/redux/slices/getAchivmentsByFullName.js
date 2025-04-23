import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAchivmentsByFullName= createAsyncThunk(
   'getAchivmentsByFullName', 
   async ({firstName,lastName}) => {
        debugger
       const res = await fetch(`http://localhost:5244/api/Student/GetFullAchivmentForStudentByFullName?firstName=${firstName}&lastName=${lastName}`, {
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
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getStudentThunk = createAsyncThunk(
    
   'getStudent', 
   async (studentId) => {
    
      const res = await fetch(`http://localhost:5244/api/Student/GetById/${studentId}`, {
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
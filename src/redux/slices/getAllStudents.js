import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllStudentsThunk = createAsyncThunk(
    
   'getAllStudents', 
   async () => {
    debugger
      const res = await fetch(`http://localhost:5244/api/Student/GetAll`, {

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
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetClassNameByIdThunk = createAsyncThunk(
   'GetClassNameById', 
   async ({myclass}) => {
        
       const res = await fetch(`http://localhost:5244/api/Class/GetClassNameById?myclass=${myclass}`, {
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
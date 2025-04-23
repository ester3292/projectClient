import { createAsyncThunk } from "@reduxjs/toolkit";


export const getAllTeachersThunk = createAsyncThunk(
    'getTeachers', 
    async () => {
    const res = await fetch('http://localhost:5244/api/Teacher/GetAll')
    if (res.ok) {
        const data = await res.json();
        console.log("fetch");
               return data;
    }
    else {
        throw new Error('faild to fetch');
    }
    }
)

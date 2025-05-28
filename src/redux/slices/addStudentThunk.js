import { createAsyncThunk } from "@reduxjs/toolkit";

export const addStudentThunk = createAsyncThunk(
    'addStudent', 
    async (details) => {
        
        const res = await fetch('http://localhost:5244/api/Student/Add', {
        
        method: 'POST',
        body: JSON.stringify(details),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        // const data = await res.json();
        // console.log("fetch");
        // return data.token;

    }
    else {
        throw new Error('faild to fetch');
    }
    }
)
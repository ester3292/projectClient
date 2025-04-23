

import { createAsyncThunk } from "@reduxjs/toolkit";

export const addMarkForStudentThunk = createAsyncThunk(
    'addMark', 
    async (details) => {
    const res = await fetch('http://localhost:5244/api/Mark/Add', {
        method: 'POST',
        body: JSON.stringify(details),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        const data = await res;
        console.log("fetch");
        return data;

    }
    else {
        throw new Error('faild to fetch');
    }
    }
)
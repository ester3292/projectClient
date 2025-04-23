import { createAsyncThunk } from "@reduxjs/toolkit";


export const logInThunk = createAsyncThunk(
    'logIn', 
    async (id) => {
    const res = await fetch(`http://localhost:5244/api/Teacher/GetById/${id}`, {
        method: 'GET',
    })
    if (res.ok) {
        setTimeout(()=>{
        },2000)
        const data = await res.json();
        console.log("fetch");
        return data;
    }
    else {
        throw new Error('faild to fetch');
    }
    }
)

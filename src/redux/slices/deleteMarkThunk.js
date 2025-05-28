import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteMarkThunk = createAsyncThunk(
    'deleteMark',
    async ({details}) => {
        const res = await fetch('http://localhost:5244/api/Mark/Delete', {
            method: 'DELETE',
            body: JSON.stringify(details),
            headers: {
                'Content-Type': 'application/json'
            }
        })

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
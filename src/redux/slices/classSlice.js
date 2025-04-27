import { createSlice } from "@reduxjs/toolkit";
import { GetClassNameByIdThunk } from "./getClassNameByCodeThunk";


export const INITAIL_STATE_CLASS = {
    loading: false,
    code: 0,
    name: ""
}
export const classSlice = createSlice({
    name: 'class',
    initialState: INITAIL_STATE_CLASS,
    reducers: {
        editCode: (state, action) => {
            state.code = action.payload;
        },
        editName: (state, action) => {
            state.name = action.payload;
        }
    },
    extraReducers: (builder) => {


        //getAchivmentsById
        // הוספת מקרה שהט'נק התחיל
        builder.addCase(GetClassNameByIdThunk.pending, (state) => {
        });
        //  הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(GetClassNameByIdThunk.fulfilled, (state, action) => {
            state.name = action.payload;

        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(GetClassNameByIdThunk.rejected, (state, action) => {
            console.log("action: ", action);
        });

    }
});

export const { editCode,editName } = classSlice.actions;
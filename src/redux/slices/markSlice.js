import { createSlice } from "@reduxjs/toolkit";
import { addMarkForStudentThunk } from "./addMarkForStudentThunk";
import { updateMarkThunk } from "./updateMarkThunk";
import { deleteMarkThunk } from "./deleteMarkThunk";

export const INITAIL_STATE_MARK = {
    loading:false,
    id: 0,
    studentId: 0,
    subject:"",
    mark: 0,
    notes:"",
    teacherId:0,
    halfA:0,
    success:0
}
export const markSlice = createSlice({
    name: 'mark',
    initialState: INITAIL_STATE_MARK,
    reducers: {

        editStudentId: (state, action) => {
            state.studentId= action.payload;
        },
        editSubject: (state, action) => {
            state.subject = action.payload;
        },
        editMark: (state, action) => {
            state.mark = action.payload;
        },
        editNotes: (state, action) => {
            state.notes = action.payload;
        },
        editTeacherId: (state, action) => {
            state.teacherId = action.payload;
        }
    },
    extraReducers: (builder) => {
//addMarkForStudentThunk
       // הוספת מקרה שהט'נק התחיל
       builder.addCase(addMarkForStudentThunk.pending, (state) => {
       });
       // הוספת מקרה שהט'נק הסתיים בהצלחה
       builder.addCase(addMarkForStudentThunk.fulfilled, (state, action) => {
        
      state.success = 1;
       });
       // הוספת מקרה שהט'נק נכשל 
       builder.addCase(addMarkForStudentThunk.rejected, (state, action) => {
        state.success = 0;
           console.log("action: ", action);
       });
        

//deleteMarkThunk
       // הוספת מקרה שהט'נק התחיל
       builder.addCase(deleteMarkThunk.pending, (state) => {
    });
    // הוספת מקרה שהט'נק הסתיים בהצלחה
    builder.addCase(deleteMarkThunk.fulfilled, (state, action) => {
   state.success = 1;
    });
    // הוספת מקרה שהט'נק נכשל 
    builder.addCase(deleteMarkThunk.rejected, (state, action) => {
     state.success = 0;
        console.log("action: ", action);
    });  
//updateMarkThunk
        // הוספת מקרה שהט'נק התחיל
        builder.addCase(updateMarkThunk.pending, (state) => {
        });
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(updateMarkThunk.fulfilled, (state, action) => {
            debugger
            // state.find = action.payload;
        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(updateMarkThunk.rejected, (state, action) => {
            console.log("action: ", action);
        });   
    }
});

export const { editTeacherId,editNotes,editMark,editSubject,editStudentId } = markSlice.actions;
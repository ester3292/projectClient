import { createSlice } from "@reduxjs/toolkit";
import { getStudentThunk } from "./getStudentThunk";
import { deleteStudentThunk } from "./deleteStudentThunk";
import { getAllStudentsThunk } from "./getAllStudents";
import { addStudentThunk } from "./addStudentThunk";
import { getAchivmentsByFullName } from "./getAchivmentsByFullName";
import { getAchivmentsById } from "./getAchivmentsById";
import { GetClassNameByIdThunk } from "./getClassNameByCodeThunk";

export const INITAIL_STATE_STUDENT = {
    loading:false,
    id: "",
    firstName: "",
    lastName:"",
    phone:"",
    class:-1,
    className:"",
    marks:[],
    arr:[],
    achivments:[]
}
export const studentSlice = createSlice({
    name: 'student',
    initialState: INITAIL_STATE_STUDENT,
    reducers: {
        editId: (state, action) => {
            state.id = action.payload;
        },
        editFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        editLastName: (state, action) => {
            state.lastName = action.payload;
        },
        editPhone: (state, action) => {
            state.phone = action.payload;
        },
        editClass: (state, action) => {
            state.class = action.payload;
        },
        editMarks: (state, action) => {
            state.class = action.payload;
        },
        resetMarkForStudent: (state) => {
            state.marks = [{}]
        }
    },
    extraReducers: (builder) => {

       // הוספת מקרה שהט'נק התחיל
       builder.addCase(getStudentThunk.pending, (state) => {
       });
      //  הוספת מקרה שהט'נק הסתיים בהצלחה
       builder.addCase(getStudentThunk.fulfilled, (state, action) => {
        state.id = action.payload.id;
            state.lastName = action.payload.lastName;
            state.firstName = action.payload.firstName;
            state.phone = action.payload.phone;
            state.class=action.payload.class;
            state.marks=action.payload.marksForStudents;
       });
       // הוספת מקרה שהט'נק נכשל 
       builder.addCase(getStudentThunk.rejected, (state, action) => {
           console.log("action: ", action);
       });
//getAllStudents
  // הוספת מקרה שהט'נק התחיל
  builder.addCase(getAllStudentsThunk.pending, (state) => {
});
//  הוספת מקרה שהט'נק הסתיים בהצלחה
builder.addCase(getAllStudentsThunk.fulfilled, (state, action) => {
 state.arr = action.payload;
    
});
// הוספת מקרה שהט'נק נכשל 
builder.addCase(getAllStudentsThunk.rejected, (state, action) => {
    console.log("action: ", action);
});      
//deleteStudentThunk
       // הוספת מקרה שהט'נק התחיל
       builder.addCase(deleteStudentThunk.pending, (state) => {
    });
    // הוספת מקרה שהט'נק הסתיים בהצלחה
    builder.addCase(deleteStudentThunk.fulfilled, (state, action) => {
        state.arr=action.payload;
    });
    // הוספת מקרה שהט'נק נכשל 
    builder.addCase(deleteStudentThunk.rejected, (state, action) => {
        console.log("action: ", action);
    });          
 //add Student
        // הוספת מקרה שהט'נק התחיל
        builder.addCase(addStudentThunk.pending, (state) => {
            console.log("startaddStudent");
            state.loading=true;
        });
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(addStudentThunk.fulfilled, (state, action) => {
            console.log("wowaddStudent");
            state.loading=false;
        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(addStudentThunk.rejected, (state, action) => {
            console.log("addStudent נכשל");
            state.loading=false;
        });
//getAchivmentsByFullName
    // הוספת מקרה שהט'נק התחיל
    builder.addCase(getAchivmentsByFullName.pending, (state) => {
    });
    //  הוספת מקרה שהט'נק הסתיים בהצלחה
    builder.addCase(getAchivmentsByFullName.fulfilled, (state, action) => {
    state.achivments = action.payload;
        
    });
    // הוספת מקרה שהט'נק נכשל 
    builder.addCase(getAchivmentsByFullName.rejected, (state, action) => {
        console.log("action: ", action);
    }); 
//getAchivmentsById
    // הוספת מקרה שהט'נק התחיל
    builder.addCase(getAchivmentsById.pending, (state) => {
    });
    //  הוספת מקרה שהט'נק הסתיים בהצלחה
    builder.addCase(getAchivmentsById.fulfilled, (state, action) => {
    state.achivments = action.payload;
    state.id=action.payload.id;
    state.firstName=action.payload.firstName;
    state.lastName=action.payload.lastName;
    state.className=action.payload.class;
        
    });
    // הוספת מקרה שהט'נק נכשל 
    builder.addCase(getAchivmentsById.rejected, (state, action) => {
        console.log("action: ", action);
    });  
      
    }
});

export const { editFirstName, editLastName, editPhone,editClass,editMarks ,editId,resetMarkForStudent} = studentSlice.actions;
import { createSlice } from "@reduxjs/toolkit";
import { logInThunk } from "./logInThunk";
import { getAllTeachersThunk } from "./getAllTeachersThunk";
import { addTeacherThunk } from "./addTeacherThunk";
import { getStudentsByClassThunk } from "./getStudentsByClassThunk";
import { getStudentsByClassSubThunk } from "./getStudentsByClassSubThunk";
import { getStudentsByClassSubHalfThunk } from "./getStudentsByClassSubHalfThunk";
import { deleteTeacherThunk } from "./deleteTeacherThunk";
import { updateTeacherThunk } from "./updateTeacherThunk";

export const INITAIL_STATE_TEACHER = {
    loading: false,
    id: -1,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    educator: false,
    arr: [],
    students: [{
        id: 0,
        firstName: "",
        lastName: "",
        phone: "",
        class: -1
    }],
    find: [{}]

}
export const teacherSlice = createSlice({
    name: 'teacher',
    initialState: INITAIL_STATE_TEACHER,
    reducers: {

        editFirstName: (state, action) => {
            state.username = action.payload;
        },
        editLastName: (state, action) => {
            state.password = action.payload;
        },
        editPhone: (state, action) => {
            state.password = action.payload;
        },
        editEmail: (state, action) => {
            state.password = action.payload;
        },
        editClass: (state, action) => {
            state.password = action.payload;
        },
        resetArr: (state) => {
            state.arr = [{
                id: 0,
                firstName: "",
                lastName: "",
                phone: "",
                class: -1
            }]
        },
        resetStudents: (state) => {
            state.students = [{
                id: 0,
                firstName: "",
                lastName: "",
                phone: "",
                class: -1
            }]
        },
        resetFind: (state) => {
            state.find = [{}]
        }
    },
    extraReducers: (builder) => {

        //get teachers
        // הוספת מקרה שהט'נק התחיל
        builder.addCase(getAllTeachersThunk.pending, (state) => {
            console.log("start");
        });
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(getAllTeachersThunk.fulfilled, (state, action) => {
            state.arr = action.payload;
            console.log("wow");
        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(getAllTeachersThunk.rejected, (state, action) => {
        });
        //login
        // הוספת מקרה שהט'נק התחיל
        builder.addCase(logInThunk.pending, (state) => {
            console.log("startlogin");

        });
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(logInThunk.fulfilled, (state, action) => {
            state.id = action.payload.id;
            state.lastName = action.payload.lastName;
            state.firstName = action.payload.firstName;
            state.email = action.payload.email;
            state.educator = action.payload.educator;
            console.log("wowlogin");
        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(logInThunk.rejected, (state, action) => {
            state.id = -2;
            // state.firstName = "bad"
            console.log("נכשל");
        });
        //add teacher
        // הוספת מקרה שהט'נק התחיל
        builder.addCase(addTeacherThunk.pending, (state) => {
            console.log("startAddteacher");
            state.loading = true;

        });
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(addTeacherThunk.fulfilled, (state, action) => {
            console.log("wowAddteacher");
            state.loading = false;

        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(addTeacherThunk.rejected, (state, action) => {
            console.log("Addteacher נכשל");
            state.loading = false;
        });
        //get students by class
        // הוספת מקרה שהט'נק התחיל
        builder.addCase(getStudentsByClassThunk.pending, (state) => {
            console.log("startgetStudentsByClassThunk");
        });
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(getStudentsByClassThunk.fulfilled, (state, action) => {
            debugger
            if (action.payload) { state.students = action.payload; }

            console.log(state.students);
            console.log("wowgetStudentsByClassThunk");
        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(getStudentsByClassThunk.rejected, (state, action) => {
            console.log("getStudentsByClassThunk נכשל");
        });
        //get students by sub &&  class
        // הוספת מקרה שהט'נק התחיל
        builder.addCase(getStudentsByClassSubThunk.pending, (state) => {
            console.log("startgetStudentsByClassSubThunk");
        });
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(getStudentsByClassSubThunk.fulfilled, (state, action) => {
            debugger
            if (action.payload) { state.find = action.payload; }

            console.log(state.students);
            console.log("wowgetStudentsByClassSubThunk");
        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(getStudentsByClassSubThunk.rejected, (state, action) => {
            console.log("getStudentsByClassSubThunk נכשל");
        });
        //get students by sub &&  class && half
        // הוספת מקרה שהט'נק התחיל
        builder.addCase(getStudentsByClassSubHalfThunk.pending, (state) => {
            console.log("start getStudentsByClassSubHalfThunk");
        });
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(getStudentsByClassSubHalfThunk.fulfilled, (state, action) => {
            debugger
            if (action.payload) { state.find = action.payload; }

            console.log(state.students);
            console.log("wow getStudentsByClassSubHalfThunk");
        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(getStudentsByClassSubHalfThunk.rejected, (state, action) => {
            console.log("getStudentsByClassSubHalfThunk נכשל");
        });
        //deleteTeacher
        // הוספת מקרה שהט'נק התחיל
        builder.addCase(deleteTeacherThunk.pending, (state) => {
            console.log("start deleteTeacherThunk");
        });
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(deleteTeacherThunk.fulfilled, (state, action) => {
            debugger
            state.arr = action.payload;
            console.log("wow deleteTeacherThunk");
        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(deleteTeacherThunk.rejected, (state, action) => {
            console.log("deleteTeacherThunk נכשל");
        });
        //updateTeacherThunk
        // הוספת מקרה שהט'נק התחיל
        builder.addCase(updateTeacherThunk.pending, (state) => {
            console.log("start updateTeacherThunk");
        });
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(updateTeacherThunk.fulfilled, (state, action) => {
            debugger
            if (action.payload) { state.find = action.payload; }

            console.log(state.students);
            console.log("wow updateTeacherThunk");
        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(updateTeacherThunk.rejected, (state, action) => {
            console.log("updateTeacherThunk נכשל");
        });

    }
});

export const { editFirstName, editLastName, editClass, editPhone, editEmail, resetArr, resetStudents, resetFind } = teacherSlice.actions;
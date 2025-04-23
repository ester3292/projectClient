import { combineSlices, configureStore } from "@reduxjs/toolkit";
import {teacherSlice } from "./slices/teacherSlice";
import {studentSlice } from "./slices/studentSlice";
import { markSlice } from "./slices/markSlice";

const reducers = combineSlices(teacherSlice,studentSlice,markSlice);


export const STORE = configureStore({
    reducer: reducers,

})
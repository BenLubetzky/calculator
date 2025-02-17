import { configureStore } from "@reduxjs/toolkit";
import calcSlice from "./calcSlice";
import errorMessageSlice from "./errorMessageSlice";
import ansSlice from "./ansSlice";
import isOkSlice from "./isOkSlice";

/*
The redux store, made up of 4 components:
calc - used for storing the calculation and the result of the calculation later on
errorMessage - used for storing error messages in case some are encountered
ans - used for storing the last value of the result, by default is 0
isOk - used for storing a value that says wether the error message should be displayed or not
*/
const store = configureStore({
    reducer:{
        calc: calcSlice.reducer,
        errorMessage: errorMessageSlice.reducer,
        ans: ansSlice.reducer,
        isOk: isOkSlice.reducer
    }
})

export default store;
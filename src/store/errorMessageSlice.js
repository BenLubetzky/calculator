import { createSlice } from "@reduxjs/toolkit";

/*
Responsible for saving error messages if there are, by default there are none,
can only keep one error message at a time
*/
const errorMessageSlice = createSlice({
    name: 'errorMessage',
    initialState: {errorMessage: ''},
    reducers:{
        //setting up a new error message
        setErrorMessage(state, action){
            state.errorMessage = action.payload;
        },
        //clearing up the error messages so that none appear
        clearErrorMessage(state, action){
            state.errorMessage = '';
        }
    }
});

export const errorMessageActions = errorMessageSlice.actions;

export default errorMessageSlice;
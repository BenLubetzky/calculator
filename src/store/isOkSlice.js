import { createSlice } from "@reduxjs/toolkit";

/*
The slice reponsible for telling if the error message should appear or not,
if isOk = True an error message will not appear and for isOk = false the erorr message will appear
*/
const isOkSlice = createSlice({
    name:'isOk',
    initialState: {isOk: true},
    reducers:{
        //setting up the value of isOk
        setIsOk(state, action){
            state.isOk = action.payload;
        }
    }
});

export const isOkActions = isOkSlice.actions;

export default isOkSlice;
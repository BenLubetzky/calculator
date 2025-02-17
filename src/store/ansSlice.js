import { createSlice } from "@reduxjs/toolkit";


/*
The slice responsible for storing the value of ans, ans will keep the value of the last result saved in it
by default it will be 0
*/
const ansSlice = createSlice({
    name: 'ans',
    initialState: {ans: '0'},
    reducers:{
        //setting ans, will be used after a result is calculated
        setAns(state, action){
            state.ans = action.payload;
        }
    }
});

export const ansActions = ansSlice.actions;

export default ansSlice;
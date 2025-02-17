import { createSlice } from "@reduxjs/toolkit";

/*
 The slice reponsible for holding the data that will be displayed on the screen of the calculator,
 used later for calculation too
*/
const calcSlice = createSlice({
    name: 'calc',
    initialState: {calc: ""},
    reducers:{
        //upading the entire screen of calculation 
        updateCalc(state, action){
            state.calc = action.payload;
        },
        //adding a sign to the calculation
        addtoCalc(state, action){
            state.calc += action.payload;
        },
        //clearing the screen, basically starting from nothing
        clearCalc(state){
            state.calc = "";
        }
    }
})

export const calcActions = calcSlice.actions;

export default calcSlice;

import React from 'react'
import './DisplayCalculationsStyle.css';
import { useSelector } from 'react-redux';

/*
The function component responsible for displaying calculations and the result on the screen, 
you can see it visually as the green rectangle in the calculator
*/
function DisplayCalculations() {

  //getting the displayed calculation through redux store with useSelector hook
  const calcDisplay = useSelector(state => state.calc.calc);
  return (
    <div className='container'>
      {calcDisplay}
    </div>
  )
}

export default DisplayCalculations
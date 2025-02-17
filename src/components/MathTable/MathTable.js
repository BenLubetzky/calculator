import React from 'react'
import MathTableStyles from './MathTableStyles.css';
import CalcButton from '../CalcButton/CalcButton';
import { calcSigns } from '../../constants';

let i = 0

/*
The function component that represents all the buttons, kind of like a list of them or their container, 
will display CalcButton function components, each one is a button on the calculator
*/
function MathTable() {
  return (
    <div className='MathContainer'>
            {calcSigns.map(sign=>{
                return <CalcButton key={i++} sign={sign}/>
            })}
    </div>
  )
}

export default MathTable
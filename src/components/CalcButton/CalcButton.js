import React from 'react'
import styles from './CalcButton.module.css';
import { addSign } from '../../addSign';

/* 
A function component responsible for displaying a sign on a calculator button, the sign that will be displayed
will be given through the props from the MathTable function component
*/
function CalcButton({sign}) {
  
  //adding a sign, will add a sign on the screen of the calculator when pressed
  const addSignCalc = () =>{
    addSign(sign);
  }
  return (
    <div className={styles.container}>
        <button className={styles.btnCalc} onClick={addSignCalc}>{sign}</button>
    </div>
  )
}

export default CalcButton
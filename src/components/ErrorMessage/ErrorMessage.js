import React, { useDebugValue } from 'react'
import styles from './ErrorMessage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { isOkActions } from '../../store/isOkSlice';

/*
The function component responsible for displaying an error message in case there is
*/
function ErrorMessage() {
  const dispatch = useDispatch();

  //this function is connected to the small x on the top left of the error message,
  //when clicked it will remove the error Message by changing the state of isOk
  const removeErrorMessage = () =>{
    dispatch(isOkActions.setIsOk(true));
  }
  const errorMessage = useSelector(state=>state.errorMessage.errorMessage);

  return (
    <div className={styles.container}>
        <div className={styles.topContainer}>
            <h2>Error!</h2>
            <button onClick={removeErrorMessage}>x</button>
        </div>
        <h3>
            {errorMessage}
        </h3>
        
    </div>
  )
}

export default ErrorMessage
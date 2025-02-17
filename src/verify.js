  import store from "./store/store";
  import { errorMessageActions } from "./store/errorMessageSlice";
  import { isOkActions } from "./store/isOkSlice";

  const SIGNS = ['+','-','*','%'];
  const S = ['1','2','3','4','5','6','7','8','9','e'];

  
  //used for validating signs before parenthesis, '-' before parenthesis is not checked here, because it's transformed into '-1 * ' beforehand.
  const verifySignsBeforeAfterParenthesis = calcArray =>{
    for (let i = 0; i < calcArray.length - 1; i++){
      if (calcArray[i] === '('){
        if (SIGNS.includes(calcArray[i + 1])){
          store.dispatch(isOkActions.setIsOk(false));
          store.dispatch(errorMessageActions.setErrorMessage("Can't have a + - % * after (."));
          return false;
        }
        else if(calcArray[i + 1] === ')'){
          store.dispatch(isOkActions.setIsOk(false));
          store.dispatch(errorMessageActions.setErrorMessage("Can't have a ) immediately after (."));
          return false;
        }
      }

      else if(S.includes(calcArray[i])){
        if (calcArray[i + 1] === '('){
          store.dispatch(isOkActions.setIsOk(false));
          store.dispatch(errorMessageActions.setErrorMessage("Need to include a + - % * sign before (."));
          return false;
        }
      }
      else if(calcArray[i] === ')'){
        if (!SIGNS.includes(calcArray[i + 1]) && calcArray[i + 1] !== ')'){
          store.dispatch(isOkActions.setIsOk(false));
          store.dispatch(errorMessageActions.setErrorMessage("Need to include + - % * sign after )."));
          return false;
        }
      }
    }
    return true;
  }

  //used for checking for signs '+,-*,%', at the start or the end
  const verifyStartEnd = calcArray =>{
    if (SIGNS.includes(calcArray[calcArray.length - 1])){
      store.dispatch(isOkActions.setIsOk(false));
      store.dispatch(errorMessageActions.setErrorMessage("Can't end with + - % * signs."));
      return false;
    }
    if(SIGNS.includes(calcArray[0])){
      store.dispatch(isOkActions.setIsOk(false));
      store.dispatch(errorMessageActions.setErrorMessage("Can't start with + - % * signs."));
      return false;
      }
    return true;
    }

    //used for making sure there are 2 signs in a row
    const verifySigns = calcArray =>{
        for (let i = 1; i < calcArray.length; i++){
          if (SIGNS.includes(calcArray[i]) && SIGNS.includes(calcArray[i - 1])){
            store.dispatch(isOkActions.setIsOk(false));
            store.dispatch(errorMessageActions.setErrorMessage("Can't have 2 + - % * signs in a row."));

            return false;
          }
        }
        return true;
      };

    //used for validating the parenthesis, that is every opening parenthesis has a closing one, and the order makes sense
    const verifyParenthesis = calc =>{
      const stack = [];
        for (let i = 0; i < calc.length; i++){
          if (calc[i] === '('){
            stack.push(calc[i]);
          }
          else if(calc[i] === ')'){
            if (stack.length === 0){
              store.dispatch(isOkActions.setIsOk(false));
              store.dispatch(errorMessageActions.setErrorMessage("Closing ')' must have a corresponging '('"));

              return false;
            }else{
              stack.pop()
            }
          }
        }
        if(stack.length !== 0){
          store.dispatch(isOkActions.setIsOk(false));
          store.dispatch(errorMessageActions.setErrorMessage("Opening '(' must have a corresponding ')'"));

          return false;
        }
      
        return true;
      };

      //used for checking all the functions of validation, used before calling the final calculation
      const verifyAll = (calc, calcArray, passed) => {
        passed = verifyParenthesis(calc) && verifySigns(calcArray) && verifyStartEnd(calcArray) && verifySignsBeforeAfterParenthesis(calcArray);
        return passed;
      };

  export {verifyAll};
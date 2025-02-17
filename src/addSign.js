  import store from "./store/store";
  import { calcActions } from "./store/calcSlice";
  import { isOkActions } from "./store/isOkSlice";
  import { S, SIGNS } from "./constants";
  import { verifyAll } from "./verify";
  import { prepareArraySigns, prepareArrays } from "./Preparation";
  import { calcFinalResults } from "./Calculating";

    //function used for autocompleting 'e', that is if a number is before 'e' then '*' will automatically appear if needed
    const autoComplete = () =>{
        const calcDisplay = store.getState().calc.calc;
        if (!calcDisplay){
          return 'e';
        }
        else if (calcDisplay[calcDisplay.length - 1] === ' ' || calcDisplay[calcDisplay.length - 1] === '('){
          return 'e';
        }
        else{
          return ' * e';
        }
      }
    
    //used for automcompleting a given number - sign. if there is a closing parenthesis before the number, will autocomplete with '*'
    const autoCompleteNum = (sign) =>{
      const calcDisplay = store.getState().calc.calc;
      const last = calcDisplay[calcDisplay.length  - 1];
      if (!calcDisplay){
        return sign;
      }
      else if(last === ' ' || S.includes(last)){
        return sign;
      }
      else if(last === ')' || last === 'e'){
        return ' * ' + sign;
      }
      else{
        return sign;
      }
    }
    
    // in case a number is inserted before parenthesis, will autocomplete with '*'
    const autoCompleteParenthesis = () =>{
        const calcDisplay = store.getState().calc.calc;
        if (!calcDisplay){
            return '(';
        }
        const last = calcDisplay[calcDisplay.length - 1];
        if (S.includes(last)){
            return ' * (';
        }
            return '(';
        }
        
    //in case of negative number, will add the negative connected to the number
    const addNegative = () =>{
        const calcDisplay = store.getState().calc.calc;
        if (!calcDisplay){
            return '-';
        }
        const last = calcDisplay[calcDisplay.length - 1];
        if (last === ' '){
            return '-';
        }
        return ' - ';
    }
    
    // used in case of ce button, will remove the last thing written on the calculations
    const removeLast = calc =>{
      let end = calc.length - 1;
      while (end > 0 && calc[end] === ' '){
        end -= 1
      }
    
      if (end === 0){
        return ''
      }
    
      if (end > 0 && ['+', '-', '%', '*'].includes(calc[end])){
        end--;
      }
      const ans = calc.slice(0, end);
      return ans;
    }

    //used in case of adding a given sign, in case of '=' will be redirected to the calculating function 
    const addSign = (sign) =>{
      const calcDisplay = store.getState().calc.calc;
      const ans = store.getState().ans.ans;
      switch(sign){
        case 'AC':
          store.dispatch(calcActions.clearCalc());
          store.dispatch(isOkActions.setIsOk(true));
          break;
        case '-':
          store.dispatch(calcActions.addtoCalc(addNegative()));
          break;
        case '+':
        case '*':
        case '%':
          store.dispatch(calcActions.addtoCalc(` ${sign} `));
          break;
        case 'Ans':
          store.dispatch(calcActions.addtoCalc(ans));
          break;
        case '=':
          if (calcDisplay){
            calcResults(calcDisplay);
          }
          break;
        case 'ce':
          store.dispatch(calcActions.updateCalc(removeLast(calcDisplay)));
          break;
        case 'e':
          store.dispatch(calcActions.addtoCalc(autoComplete()));
          break;
        case '(':
          store.dispatch(calcActions.addtoCalc(autoCompleteParenthesis()));
          break;
        case ')':
          store.dispatch(calcActions.addtoCalc(sign));
          break;
        default:
          store.dispatch(calcActions.addtoCalc(autoCompleteNum(sign)));
          break;
      }
    };

    //used for getting an array of elements out of the calculating display, kind of like split() in python but slightly different
    const getCalcArray = calc =>{
      const result = [];
      calc = ' ' + calc;
      for (let i = 1; i < calc.length; i++){
        if (calc[i] === ' '){
          continue;
        }
        if (calc[i] === '(' || calc[i] === ')'){
          result.push(calc[i]);
          continue;
        }
        if (calc[i - 1] !== ' ' && calc[i - 1] !== '(' && calc[i - 1] !== ')'){
          result[result.length - 1] += calc[i]
        }
        else if(calc[i] != ' '){
          result.push(calc[i]);
        }
      }
      return result;
    
    };
    
    //in case of a negative sign before parenthesis, will transform it into '-1 * ' without the user knowing, used for calculating the arrya of elements more easily
    const modifyForNegative = calc =>{
      let new_calc = "";
    
      for (let i = 0; i < calc.length; i++){
        if (calc[i] === '-' && (i + 1) < calc.length && calc[i + 1] === '('){
          new_calc += '-1 * ';
        }else{
          new_calc += calc[i];
        }
      }
    
      return new_calc;
    }
  
    /*
      used for calculating the results saved in the display passed as argument - calc. using setTimeout in order to give the computer engouh time 
      to calculate whether the validation was successfull or not, in the meanwhile will display 'Calculating...' on the screen
    */
    const calcResults = calc => {
      store.dispatch(calcActions.updateCalc("Calculating..."));
      const calcArray = getCalcArray(modifyForNegative(calc));
      store.dispatch(isOkActions.setIsOk(true));
  
      let passed = verifyAll(calc, calcArray);
      setTimeout(()=>{
        if (!passed){
          store.dispatch(calcActions.updateCalc(calc));
        }else{
  
          const singsSeq = calcArray.filter(item=> item === '(' || item === ')' || SIGNS.includes(item));
          singsSeq.unshift('(');
          singsSeq.push(')');
          const signs = prepareArraySigns(singsSeq, []);
  
          calcArray.unshift('(');
          calcArray.push(')');
          const s = calcArray.filter(item=>!SIGNS.includes(item) || item === '(' || item === ')');
  
          const justs = prepareArrays(s, []);
          calcFinalResults(justs, signs);
        }
      }, 500);
  
  
      return '';
    }

  export {addSign}
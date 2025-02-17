import store from "./store/store";
import { ansActions } from "./store/ansSlice";
import { calcActions } from "./store/calcSlice";
import { e } from "./constants";

/*
The function used for calculating the final result, in case all the validations were passed successfully.
because we need to think about priority in those math operations, we start with the highest one, which is parenthesis, where we use recursion 
in order to calculate the value in the parenthesis before moving on. then we do a second pass over the elements connected with * %, where we still 
keep the order, and then finally we move onto addition and subtraction which is the lowest priority.
*/
const calcFinalResults = (nums, signs) =>{

    let j = 0
    //first pass - for parenthesis
    for (let i = 0; i < nums.length; i++){
      if (typeof nums[i] === 'object'){
        nums[i] = calcFinalResults(nums[i], signs[j++]);
      }
      else if(nums[i] === 'e'){
        nums[i] = e;
      }
      j++;
    }
    signs = signs.filter(sign=> typeof sign !== 'object');

    //second pass - for multiplication and division

    nums = nums.map(Number);
    const after = [];
    let res;
    for (let i = 0; i < nums.length - 1; i++){
      if (['+','-'].includes(signs[i])){
        after.push(nums[i]);
        continue;
      }
      if (signs[i] === '*'){
        res = nums[i] * nums[i + 1];
      } else{
        res = nums[i] / nums[i + 1];
      }
      nums[i + 1] = res;
    }
    after.push(nums[nums.length - 1]);

    //third pass - for addition and subtraction
    signs = signs.filter(sign => ['+','-'].includes(sign));
  
    for (let i = 0; i < after.length - 1; i++){
      if (signs[i] === '+'){
        after[i + 1] += after[i];
      }else{
        after[i + 1] = after[i] - after[i + 1];
      }
    }
    const finalResult = String(after[after.length - 1]);
    
    store.dispatch(ansActions.setAns(finalResult));
    store.dispatch(calcActions.updateCalc(finalResult));

    return finalResult;

  }

  export {calcFinalResults};
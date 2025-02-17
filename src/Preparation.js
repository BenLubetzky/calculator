//the function used for preparing the calculation on the display into an array form.
//the idea is that parenthesis are treated as arrays, this way we can use recursion on smaller parts of the calculation,
//by default the calculation display itself is inside parenthesis itself, the way we do this is very simple, we use recursion here
//with slicing in order to get the part within the parenthesis
const prepareArrays = (calcArray, tmp) =>{
    let i = 1;
    while (i < calcArray.length){
      if (calcArray[i] !== '(' && calcArray[i] !== ')'){
        tmp.push(calcArray[i]);
        i++;
      }
      else if(calcArray[i] === '('){
        let j = findNextClosingParenthesis(calcArray, i);
        tmp.push(prepareArrays(calcArray.slice(i, j + 1), []));
        i = j + 1
      }
      else{
        return tmp;
      }
    }
    return tmp;
  };

  //used for getting just the signs of the array, we are going to have to arrays, one for signs and one for numbers, useful because of nested arrays and organization
  //we use here recursion because of possible nested arrays
  const prepareArraySigns = (calcArray, tmp) =>{
    let i = 1;
    while (i < calcArray.length){
      if (calcArray[i] !== '(' && calcArray[i] !== ')'){
        tmp.push(calcArray[i]);
        i++;
      }
      else if(calcArray[i] === '('){
        let j = findNextClosingParenthesis(calcArray, i);
        tmp.push(prepareArraySigns(calcArray.slice(i, j + 1), []));
        i = j + 1
      }
      else{
        return tmp;
      }
    }
    return tmp;
  };

  //used for finding the next balanced closing parenthesis within an array, that means that we are looking for the next closing parenthesis that make sense, for example (() <-- would make sense
  //but (())<-- would make sense.
  const findNextClosingParenthesis = (arr, i) =>{
    let open = 0;
    for(let j = i; j < arr.length; j++){
      if (arr[j] === '('){
        open++;
      }
      else if(arr[j] === ')'){
        open--;
      }
      if (open === 0){
        return j;
      }
    }
  };

  export {prepareArrays, prepareArraySigns};
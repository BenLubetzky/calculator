import './App.css';
import DisplayCalculations from './components/DisplayCalculations/DisplayCalculations';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import MathTable from './components/MathTable/MathTable';
import { useSelector } from 'react-redux';

/*
The function component used for displaying and organizing all the other function components,
composed of an error message, the display rectangle on the top ( the green squre ), as well as the 
table of button underneath where user input is inserted
*/
function App() {
  const isOk = useSelector(store => store.isOk.isOk);

  return (
    <div className="App">
      {!isOk && <ErrorMessage/>}
      <div className="calculator">
        <DisplayCalculations/>
        <MathTable/>
      </div>
    </div>
  );
}

export default App;

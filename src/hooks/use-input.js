import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};
const reducer = (state = initialInputState, action) => {
  if(action.type === "INPUT") 
    return {value: action.value, isTouched: state.isTouched};
  if(action.type === "BLUR")
    return {value: state.value, isTouched: true};
  if(action.type === "RESET")
    return initialInputState;
    
  return initialInputState;
};

const useInput = (validation) => {
  const [inputState, dispatch] = useReducer(reducer, initialInputState);


  const valueIsValid = validation(inputState.value);

  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangedHandler = (e) => {
    dispatch({type: "INPUT", value: e.target.value});
  };

  const inputBlurHandler = (e) => {
    dispatch({type: "BLUR"});
  };

  const reset = () => {
    dispatch({type: "RESET"});
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangedHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;

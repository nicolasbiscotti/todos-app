import { useState } from "react";
import "./Input.css";

const initialState = {
  value: "",
  touched: false,
  errors: {},
};

const Input = ({ initialValue, errorMessage, children }) => {
  const [state, setState] = useState(() => {
    if (!initialValue) {
      return initialState;
    }
    return { ...initialState, value: initialValue };
  });

  const errorMsg = errorMessage || "el título no puede estar vacío";

  const handleChange = (e) => {
    const value = e.target.value;
    setState((prevState) => ({ ...prevState, value, errors: {} }));
  };
  const handleBlur = () => {
    if (state.value === "") {
      setState((prevState) => ({
        ...prevState,
        errors: { message: errorMsg },
        touched: true,
      }));
    }
    setState((prevState) => ({ ...prevState, touched: true }));
  };

  return children({ ...state, handleChange, handleBlur });
};

export default Input;

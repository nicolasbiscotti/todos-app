import { useState } from "react";

function FunForm({ initialValues, onSubmit, children }) {
  const [values, setValues] = useState(initialValues);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // validate
    onSubmit(values);
  };
  return children({ values, handleChange, handleSubmit });
}

export default FunForm;

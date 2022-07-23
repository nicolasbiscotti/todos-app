import { useState } from "react";

function FunForm({ initialValues, children }) {
  const [values, setValues] = useState(initialValues);
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };
  return children({ values, onChange });
}

export default FunForm;

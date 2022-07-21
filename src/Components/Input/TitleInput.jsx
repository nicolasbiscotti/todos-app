import Input from "./Input";

const TitleInput = ({ initialValue, errorMessage }) => (
  <Input initialValue={initialValue} errorMessage={errorMessage}>
    {({ value, touched, errors, handleChange, handleBlur }) => (
      <label className="App-input">
        <input
          name="todo-title"
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Escribí un item"
        />
        {errors.message && <span>Info: {errors.message}</span>}
      </label>
    )}
  </Input>
);

export default TitleInput;

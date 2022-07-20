import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "./Components/Button/Button";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>

      <div className="App-intro">
        <h2>Todo list</h2>
        <h4>¿Qué cosa tenés que terminar hoy?</h4>
      </div>

      <div className="App-input-todo-title">
        {/* <Input
          value={title}
          placeholder="Escribí un item"
          onInputChange={(e) => setTitle(e.target.value)}
        /> */}
      </div>

      <div className="App-todo-list">
        {/* <TodosList todos={todos} /> */}
      </div>

      <div className="App-add-button">
        <Button {...{attributes: {className: "add-big"}}} >{() => "Agregar"}</Button>
      </div>
    </div>
  );
}

export default App;

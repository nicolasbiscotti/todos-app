import logo from "./logo.svg";
import "./App.css";
import Button from "./Components/Button/Button";
import TitleInput from "./Components/Input/TitleInput";

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
        <TitleInput errorMessage="el título debe completarse" />
      </div>

      <div className="App-todo-list">{/* <TodosList todos={todos} /> */}</div>

      <div className="App-add-button">
        <Button {...{ attributes: { className: "add-big" } }}>
          {() => "Agregar"}
        </Button>
      </div>
    </div>
  );
}

export default App;

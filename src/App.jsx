import logo from "./logo.svg";
import "./App.css";
import Button from "./Components/Button/Button";
import TitleInput from "./Components/Input/TitleInput";
import TodosList from "./Components/ItemList/TodoList.jsx";
import { createDummyData } from "./test/fake/fakeList";
import { useState } from "react";

function App() {
  const [fakeList, setFakeList] = useState(createDummyData());

  const addTodo = (toAdd) => {
    setFakeList((prevState) =>
      prevState.map((todo) => ({ ...todo })).push(todo)
    );
  };
  const editTodo = (toUpdate) => {
    setFakeList((prevState) =>
      prevState.map((todo) => {
        if (todo.id === toUpdate.id) {
          return { ...toUpdate };
        }
        return { ...todo };
      })
    );
  };

  const deleteTodo = (toDelete) => {
    setFakeList((prevState) =>
      prevState
        .filter((todo) => todo.id !== toDelete.id)
        .map((todo) => ({ ...todo }))
    );
  };
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

      <div className="App-todo-list">
        <TodosList
          initialList={fakeList}
          onEditItem={editTodo}
          onDeleteItem={deleteTodo}
        />
      </div>

      <div className="App-add-button">
        <Button {...{ attributes: { className: "add-big", onClick: addTodo } }}>
          {() => "Agregar"}
        </Button>
      </div>
    </div>
  );
}

export default App;

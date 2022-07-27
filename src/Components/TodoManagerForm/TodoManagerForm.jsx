import { useEffect, useState } from "react";
import FunForm from "../FunForm/FunForm";
import TodoList from "../ItemList/TodoList";

const TodoManagerForm = ({ todoService }) => {
  const [todoList, setTodoList] = useState(todoService.getCurrentList());
  const [todoListStatus, setTodoListStatus] = useState("pending");

  todoService.subscribe("status", setTodoListStatus);
  todoService.subscribe("list", setTodoList);

  useEffect(() => {
    todoService.list();
  }, []);

  return (
    <FunForm>
      {() => {
        todoService.logFullState();
        if (todoListStatus === "pending") {
          return <div>Loading</div>;
        }
        return <TodoList initialList={todoList}></TodoList>;
      }}
    </FunForm>
  );
};
export default TodoManagerForm;

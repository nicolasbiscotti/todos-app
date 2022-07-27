import { useEffect, useState } from "react";
import FunForm from "../FunForm/FunForm";
import TodoList from "../ItemList/TodoList";

const TodoManagerForm = ({ todoService, children }) => {
  const [todoList, setTodoList] = useState(todoService.getCurrentList());
  const [todoListStatus, setTodoListStatus] = useState("pending");

  todoService.subscribe("status", setTodoListStatus);
  todoService.subscribe("list", setTodoList);

  useEffect(() => {
    todoService.list();
  }, []);

  return children({ todoList, todoListStatus });
};
export default TodoManagerForm;

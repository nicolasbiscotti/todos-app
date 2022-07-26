import { useEffect, useState } from "react";
import FunForm from "../FunForm/FunForm";
import TodoList from "../ItemList/TodoList";

const TodoManagerForm = ({ todoService, store }) => {
  const [list, setList] = useState(store.getState().todoList.list);
  const [status, setStatus] = useState(store.getState().todoList.status);

  store.subscribe(() => setStatus(store.getState().todoList.status));
  store.subscribe(() => setList(store.getState().todoList.list));

  useEffect(() => {
    todoService.list(store.getState().user.userId);
  }, []);

  return (
    <FunForm>
      {() => {
        console.log(store.getState());
        return status === "pending" ? (
          <h1>Loading</h1>
        ) : (
          <TodoList initialList={list}></TodoList>
        );
      }}
    </FunForm>
  );
};
export default TodoManagerForm;

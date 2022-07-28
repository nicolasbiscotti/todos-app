import { useEffect, useState } from "react";

const TodoManagerForm = ({ userService, todoService, children }) => {
  const [userId, setUserId] = useState(userService.getCurrentUser());
  const [todoList, setTodoList] = useState(todoService.getCurrentList());
  const [todoListStatus, setTodoListStatus] = useState("pending");

  useEffect(() => {
    if (userId === "") {
      userService.create().then((userId) => setUserId(userId));
    } else {
      todoService.list().then((list) => {
        setTodoList(list);
        setTodoListStatus("idle");
      });
    }
  }, [userId]);

  return children({ userId, todoList, todoListStatus });
};
export default TodoManagerForm;

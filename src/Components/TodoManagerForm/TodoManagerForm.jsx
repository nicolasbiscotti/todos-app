import { useSelector } from "react-redux";

const TodoManagerForm = ({ children }) => {
  const userId = useSelector((state) => state.userId);
  const todoList = useSelector((state) => state.todoList);
  const todoListStatus = useSelector((state) => state.status);

  return children({ userId, todoList, todoListStatus });
};
export default TodoManagerForm;

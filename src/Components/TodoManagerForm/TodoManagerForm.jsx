import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/model/hooks";
import { selectTodoList } from "../../lib/model/reducers/todos";
import { selectLoadingTodoList } from "../../lib/model/reducers/ui";
import { getUser, selectUserId } from "../../lib/model/reducers/user";

const TodoManagerForm = ({ children }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const todoList = useAppSelector(selectTodoList);
  const loadingTodoList = useAppSelector(selectLoadingTodoList);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return children({ userId, todoList, loadingTodoList });
};
export default TodoManagerForm;

import { fetchTodoListForUser, setTodos } from "../reducers/todos";
import { todoListLoaded } from "../reducers/ui";

export const processFetchTodoForUser = ({api}) => ({dispatch}) => next => async action => {
  next(action);

  if (action.type === fetchTodoListForUser.type) {
    const todoList = await api.todos.list(action.payload);
    dispatch(setTodos(todoList));
    dispatch(todoListLoaded());
  }
};

export const todosMiddleware = [processFetchTodoForUser];


import { apiRequestCreateTodo } from "../actions/apiActions";
import {
  createTodoError,
  createTodoForUser,
  fetchTodosForUser,
  setTodos,
  createTodoSuccess,
  updateTodos,
} from "../reducers/todos";
import { loadingTodoList, todoListLoaded } from "../reducers/ui";
import { selectUserId } from "../reducers/user";

export const processFetchTodoForUser =
  ({ api }) =>
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);

    if (action.type === fetchTodosForUser.type) {
      const todoList = await api.todos.list(action.payload);
      dispatch(setTodos(todoList));
      dispatch(todoListLoaded());
    }
  };

export const createTodoFlow =
  () =>
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === createTodoForUser.type) {
      const payload = { ...action.payload, userId: selectUserId(getState()) };
      if (!action.payload.message) {
        payload.message = "default message";
      }
      dispatch(
        apiRequestCreateTodo({
          payload,
          onSuccess: createTodoSuccess,
          onError: createTodoError,
        })
      );
      dispatch(loadingTodoList());
    }
  };

export const processCreateTodo =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === createTodoSuccess.type) {
      const payload = {
        id: action.payload.todoId,
        title: action.payload.title,
        message: action.payload.message,
        completed: action.payload.completed,
      };
      dispatch(updateTodos(payload));
      dispatch(todoListLoaded());
    }
  };

export const processCreateTodoError =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === createTodoError.type) {
    }
  };

export const todosMiddleware = [
  processFetchTodoForUser,
  createTodoFlow,
  processCreateTodo,
  processCreateTodoError,
];

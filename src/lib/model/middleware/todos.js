import { apiRequest } from "../actions/apiActions";
import {
  fetchTodosForUser,
  fetchTodosSuccess,
  fetchTodosError,
  setTodos,
  createTodoForUser,
  createTodoSuccess,
  createTodoError,
  addTodo,
  editTodoForUser,
  editTodoSuccess,
  editTodoError,
  editTodo,
} from "../reducers/todos";
import { loadingTodoList, todoListLoaded } from "../reducers/ui";
import { selectUserId } from "../reducers/user";

export const fetchTodosFlow =
  ({ api }) =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === fetchTodosForUser.type) {
      const data = {
        payload: action.payload,
        request: api.todos.list,
        onSuccess: fetchTodosSuccess,
        onError: fetchTodosError,
      };
      dispatch(apiRequest(data));
      dispatch(loadingTodoList());
    }
  };

export const processFetchTodoSuccess =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === fetchTodosSuccess.type) {
      dispatch(setTodos(action.payload));
      dispatch(todoListLoaded());
    }
  };
export const processFetchTodosError =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === fetchTodosError.type) {
    }
  };

export const createTodoFlow =
  ({ api }) =>
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === createTodoForUser.type) {
      const payload = { ...action.payload, userId: selectUserId(getState()) };
      if (!action.payload.message) {
        payload.message = "default message";
      }
      const data = {
        payload,
        request: api.todos.addItem,
        onSuccess: createTodoSuccess,
        onError: createTodoError,
      };
      dispatch(apiRequest(data));
      dispatch(loadingTodoList());
    }
  };

export const processCreateTodoSuccess =
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
      dispatch(addTodo(payload));
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

export const editTodoFlow =
  ({ api }) =>
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === editTodoForUser.type) {
      const data = {
        payload: {
          userId: selectUserId(getState()),
          todoId: action.payload.id,
          completed: !action.payload.completed,
        },
        onSuccess: editTodoSuccess,
        onError: editTodoError,
        request: api.todos.editItem,
      };
      dispatch(apiRequest(data));
      dispatch(loadingTodoList());
    }
  };

export const processEditTodoSuccess =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === editTodoSuccess.type) {
      dispatch(editTodo(action.payload));
      dispatch(todoListLoaded());
    }
  };

export const processEditTodoError =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === editTodoError.type) {
    }
  };

export const todosMiddleware = [
  fetchTodosFlow,
  processFetchTodoSuccess,
  processFetchTodosError,
  createTodoFlow,
  processCreateTodoSuccess,
  processCreateTodoError,
  editTodoFlow,
  processEditTodoSuccess,
  processEditTodoError,
];

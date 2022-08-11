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
  deleteTodoForUser,
  deleteTodoSuccess,
  deleteTodoError,
  deleteTodo,
} from "../reducers/todos";
import { loadingTodoList, todoListLoaded } from "../reducers/ui";
import { selectUserId } from "../reducers/user";

export const fetchTodosFlow =
  ({ api }) =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (fetchTodosForUser.match(action)) {
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

    if (fetchTodosSuccess.match(action)) {
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

    if (fetchTodosError.match(action)) {
    }
  };

export const createTodoFlow =
  ({ api }) =>
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (createTodoForUser.match(action)) {
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

    if (createTodoSuccess.match(action)) {
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

    if (createTodoError.match(action)) {
    }
  };

export const editTodoFlow =
  ({ api }) =>
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action);

    if (editTodoForUser.match(action)) {
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

    if (editTodoSuccess.match(action)) {
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

    if (editTodoError.match(action)) {
    }
  };

export const deleteTodoFlow =
  ({ api }) =>
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action);

    if (deleteTodoForUser.match(action)) {
      const data = {
        payload: {
          userId: selectUserId(getState()),
          todoId: action.payload.id,
        },
        request: api.todos.deleteItem,
        onSuccess: deleteTodoSuccess,
        onError: deleteTodoError,
      };
      dispatch(apiRequest(data));
      dispatch(loadingTodoList());
    }
  };

export const processDeleteTodoSuccess =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (deleteTodoSuccess.match(action)) {
      dispatch(deleteTodo(action.payload));
      dispatch(todoListLoaded());
    }
  };

export const processDeleteTodoError =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (deleteTodoError.match(action)) {
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
  deleteTodoFlow,
  processDeleteTodoSuccess,
  processDeleteTodoError,
];

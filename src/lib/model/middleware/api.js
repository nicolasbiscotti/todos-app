import { apiRequestCreateTodo } from "../actions/apiActions";

export const apiCreateTodoForUser =
  ({ api }) =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type === apiRequestCreateTodo.type) {
      const { onSuccess, onError } = action.meta;
      api.todos
        .addItem(action.payload)
        .then((todo) => dispatch(onSuccess(todo)))
        .catch((error) => dispatch(onError(error)));
    }
    return next(action);
  };

export const apiMiddleware = [apiCreateTodoForUser];

import {
  byCompletionOptions,
  clearFilterByCompletion,
  setFilterByCompletion,
} from "../reducers/filters";
import { filterByCompletion, resetTodoListForUser } from "../reducers/todos";

export const processSetFilterByCompletion =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (filterByCompletion.match(action)) {
      if (action.payload.id !== byCompletionOptions[0].id) {
        dispatch(setFilterByCompletion(action.payload));
      } else {
        dispatch(clearFilterByCompletion());
      }
    }
  };
export const processResetTodoList =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (resetTodoListForUser.match(action)) {
      dispatch(clearFilterByCompletion());
    }
  };

export const filtersMiddleware = [
  processSetFilterByCompletion,
  processResetTodoList,
];

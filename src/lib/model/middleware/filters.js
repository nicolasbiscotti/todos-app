import { filterByCompletionSuccess } from "../reducers/todos";

export const handleSetFilterByCompletion =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (filterByCompletionSuccess.match(action)) {
      
    }
  };

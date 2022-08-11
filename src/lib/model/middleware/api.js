import { apiRequest } from "../actions/apiActions";

export const api =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (apiRequest.match(action)) {
      const { onSuccess, onError, request } = action.meta;
      request(action.payload)
        .then((data) => dispatch(onSuccess(data)))
        .catch((error) => dispatch(onError(error)));
    }
    return next(action);
  };

export const apiMiddleware = [api];

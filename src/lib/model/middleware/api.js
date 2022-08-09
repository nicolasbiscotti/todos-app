import { apiRequest } from "../actions/apiActions";

export const api =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type === apiRequest.type) {
      const { onSuccess, onError, request } = action.meta;
      request(action.payload)
        .then((data) => dispatch(onSuccess(data)))
        .catch((error) => dispatch(onError(error)));
    }
    return next(action);
  };

export const apiMiddleware = [api];

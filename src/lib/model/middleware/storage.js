import { fetchTodosForUser } from "../reducers/todos";
import { fetchUser, searchUserInCache, setUser, storeUserInCache } from "../reducers/user";

export const processStoreUserInCache = ({storage}) => () => next => action => {
    next(action);

    if(action.type === storeUserInCache.type) {
      storage.setItem("userId", JSON.stringify(action.payload));
    }
};

export const getUserInCache = ({storage}) => ({dispatch}) => next => action => {
  next(action);

  if(action.type === searchUserInCache.type) {
    const userId = JSON.parse(storage.getItem("userId"));
    if (userId) {
      dispatch(setUser(userId));
      dispatch(fetchTodosForUser(userId));
    } else {
      dispatch(fetchUser());
    }
  }
}

export const storageMiddleware = [processStoreUserInCache, getUserInCache];

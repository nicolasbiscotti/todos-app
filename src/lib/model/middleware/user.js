import { loadingTodoList, todoListLoaded } from "../reducers/ui";
import { fetchUser, getUser, searchUserInCache, setUser, storeUserInCache } from "../reducers/user";

export const getUserFlow = () => ({ dispatch }) => next => action => {
    next(action);

    if(action.type === getUser.type) {
      dispatch(searchUserInCache());
      dispatch(loadingTodoList());
    }
  };

export const processfetchUser = ({api}) => ({ dispatch }) => next => async action => {
  next(action);

  if(action.type === fetchUser.type) {
    const userId = await api.user.createUser();
    dispatch(setUser(userId));
    dispatch(todoListLoaded());
    dispatch(storeUserInCache(userId));
  }

}

export const userMiddleware = [getUserFlow, processfetchUser];

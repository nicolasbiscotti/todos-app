import { apiRequest } from "../actions/apiActions";
import { getItem, storeItem } from "../actions/storageAction";
import { fetchTodosForUser } from "../reducers/todos";
import { loadingUser, userLoaded } from "../reducers/ui";
import { 
  fetchUser, 
  fetchUserError, 
  fetchUserSuccess, 
  getUser, 
  loadUserTodos, 
  setUserId, 
  updateUserId 
} from "../reducers/user";

export const getUserFlow = () => ({ dispatch }) => next => action => {
    next(action);

    if(getUser.match(action)) {
      const data = {
        key: "userId",
        onItemExists: loadUserTodos,
        onNonItem: fetchUser, 
      };
      dispatch(getItem(data));
    }
};

export const processLoadUserTodoList = () => ({ dispatch }) => next => action => {
  next(action);

  if (loadUserTodos.match(action)) {
    dispatch(setUserId(action.payload));
    dispatch(fetchTodosForUser(action.payload));
  }
};


export const fetchUserFlow = ({api}) => ({ dispatch }) => next => action => {
  next(action);

  if(fetchUser.match(action)) {
    const data = {
      request: api.user.createUser,
      onSuccess: fetchUserSuccess,
      onError: fetchUserError,
    }
    dispatch(apiRequest(data));
    dispatch(loadingUser());
  }
  
};

export const processFetchUserSuccess = () => ({dispatch}) => next => action => {
  next(action);
  
  if(fetchUserSuccess.match(action)) {
    dispatch(storeItem({key: "userId", value: action.payload}));
    dispatch(updateUserId(action.payload));
  }
  
};

export const processUpdateUserId = () => ({dispatch}) => next => action => {
  next(action);
  
  if (updateUserId.match(action)) {
    dispatch(setUserId(action.payload));
    dispatch(userLoaded());
  }

};

export const userMiddleware = [
  getUserFlow, 
  processLoadUserTodoList,
  fetchUserFlow, 
  processFetchUserSuccess,
  processUpdateUserId,
];

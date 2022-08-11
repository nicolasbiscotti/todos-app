import { getItem, storeItem } from "../actions/storageAction";

export const processGetItem = ({storage}) => ({dispatch}) => next => action => {
  next(action);

  if (getItem.match(action)) {
    const { key, onItemExists, onNonItem } = action.meta;
    const value = JSON.parse(storage.getItem(key));
    if (value) {
      dispatch(onItemExists(value));
    } else {
      dispatch(onNonItem());
    }
  }
};

export const processStoreItem = ({storage}) => () => next => action => {
    next(action);

    if(storeItem.match(action)) {
      const { key, value } = action.payload;
      storage.setItem(key, JSON.stringify(value));
    }
};

export const storageMiddleware = [processGetItem, processStoreItem];

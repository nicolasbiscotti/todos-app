import { getItem, storeItem } from "../actions/storageAction";

export const processGetItem = ({storage}) => ({dispatch}) => next => action => {
  next(action);

  if (action.type === getItem.type) {
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

    if(action.type === storeItem.type) {
      const { key, value } = action.payload;
      storage.setItem(key, JSON.stringify(value));
    }
};

export const storageMiddleware = [processGetItem, processStoreItem];

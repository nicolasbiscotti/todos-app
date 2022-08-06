import { combineReducers, configureStore } from "@reduxjs/toolkit";
import middleware from "./middleware";
import todos from "./reducers/todos";
import ui from "./reducers/ui";
import user from "./reducers/user";

const rootReducer = combineReducers({
  user: user,
  todos: todos,
  ui: ui,
});

export function setupStore(preloadedState, { api, storage }) {
  return configureStore({
    preloadedState,
    reducer: rootReducer,
    middleware: [...middleware].map((fn) => fn({ api, storage })),
  });
}

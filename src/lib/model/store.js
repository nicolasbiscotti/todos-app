import {
  configureStore,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";

const addTodo = createAsyncThunk("addTodo", async ({ title, message }) => {});

const deleteTodo = createAsyncThunk("deleteTodo", async (todoId) => {});

const setCompletion = createAsyncThunk(
  "setCompletion",
  async ({ completion, todoId }) => {}
);

const user = { userId: "", todoList: [], status: "idle" };

const fetchInitialState = async (cache) => {
  const userId = JSON.parse(cache.getItem("userId"));
  if (!userId) {
    const response = await fetch("/userId");
    const userId = await response.json();
    cache.setItem("userId", JSON.stringify(userId));
    return { userId, todoList: [], status: "idle" };
  }
  const response = await fetch(`/todo/${userId}`);
  const todoList = await response.json();
  return { userId, todoList, status: "idle" };
};

const userCases = (builder) => {
  builder
    .addCase(fetchTodoList.fulfilled, (state, action) => {
      return { ...state, todoList: action.payload };
    })
    .addCase(resetTodoList.fulfilled, (state, action) => {
      return { ...state, todoList: [] };
    })
    .addCase(filterByCompletion.fulfilled, (state, action) => {
      return { ...state, todoList: action.payload };
    })
    .addDefaultCase((state, action) => state);
};

export const fetchTodoList = createAsyncThunk(
  "fetchTodoList",
  async (userId) => {
    const response = await fetch(`/todo/${userId}`);
    const todoList = await response.json();
    return todoList;
  }
);

export const resetTodoList = createAsyncThunk(
  "resetTodoList",
  async (userId) => {
    const request = new Request(`/todo/${userId}/reset`, { method: "DELETE" });
    const response = await fetch(request);
    const result = await response.json();
    return result;
  }
);

export const filterByCompletion = createAsyncThunk(
  "filterByCompletion",
  async ({ userId, completed }) => {
    const response = await fetch(`/todo/${userId}/${completed}`);
    const filteredList = await response.json();
    return filteredList;
  }
);

const userReducer = async (cache) => {
  const initialState = await fetchInitialState(cache);
  const builderCallback = userCases;
  return createReducer(initialState, builderCallback);
};

const storeBuilder = () => {
  const config = {
    cache: localStorage,
  };
  const builder = {};
  const store = async () => {
    const reducer = await userReducer(config.cache);
    return configureStore({
      reducer,
    });
  };
  const cache = (cache) => {
    config.cache = cache;
    return builder;
  };
  const build = async () => {
    return await store();
  };
  builder.cache = cache;
  builder.build = build;
  return builder;
};

export default storeBuilder;

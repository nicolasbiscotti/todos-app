import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";

const stateBuilder = () => {
  const config = {};
  const builder = {};

  const state = {
    user: {
      userId: "",
      status: "idle", // "fulfilled" "pending" "rejected"
    },
    todoList: {
      list: [],
      status: "idle",
    },
  };

  const cache = (cache) => {
    config.cache = cache;
    return builder;
  };

  const build = () => {
    const cachedUserId = config.cache.getItem("userId");
    if (cachedUserId) {
      state.user.userId = JSON.parse(cachedUserId);
      return state;
    }
    return state;
  };

  builder.cache = cache;
  builder.build = build;

  return builder;
};

export const fetchUserId = createAsyncThunk("user/fetchUserId", async () => {});

const userSlice = (initialState) =>
  createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserId.fulfilled, (state, action) => {})
        .addCase(fetchUserId.pending, (state, action) => {})
        .addDefaultCase((state, action) => {});
    },
  });

export const fetchTodoList = createAsyncThunk(
  "todoList/fetchTodoList",
  async ({ userId, todoRepository }) => {
    const todoList = await todoRepository.list(userId);
    return todoList;
  }
);
const todoListSlice = (initialState) =>
  createSlice({
    name: "todoList",
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(fetchTodoList.fulfilled, (state, action) => {
          return { ...state, list: action.payload, status: "idle" };
        })
        .addCase(fetchTodoList.pending, (state, action) => {
          return { ...state, status: "pending" };
        })
        .addCase(fetchTodoList.rejected, (state, action) => {
          return { ...state, status: "rejected" };
        })
        .addDefaultCase((state, action) => ({ ...state }));
    },
  });

const storeBuilder = (cache) => {
  const build = () => {
    const preloadedState = stateBuilder().cache(cache).build();
    const user = userSlice(preloadedState.user).reducer;
    const todoList = todoListSlice(preloadedState.todoList).reducer;
    const store = configureStore({
      reducer: {
        user,
        todoList,
      },
    });
    return store;
  };

  const builder = { build };

  return builder;
};

export default storeBuilder;

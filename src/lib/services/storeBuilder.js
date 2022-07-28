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

export const fetchUserId = createAsyncThunk(
  "user/fetchUserId",
  async (userRepository) => {
    const userId = await userRepository.createUser();
    return userId;
  }
);

const userSlice = (cache) =>
  createSlice({
    name: "user",
    initialState: () => stateBuilder().cache(cache).build().user,
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserId.fulfilled, (state, action) => {
          const userId = action.payload;
          cache.setItem("userId", JSON.stringify(userId));
          return { ...state, userId, status: "idle" };
        })
        .addCase(fetchUserId.pending, (state, action) => {
          return { ...state, status: "pending" };
        })
        .addCase(fetchUserId.rejected, (state, action) => {
          return { ...state, status: "rejected" };
        })
        .addDefaultCase((state, action) => state);
    },
  });

export const fetchTodoList = createAsyncThunk(
  "todoList/fetchTodoList",
  async ({ userId, todoRepository }) => {
    const todoList = await todoRepository.list(userId);
    return todoList;
  }
);
const todoListSlice = (cache) =>
  createSlice({
    name: "todoList",
    initialState: () => stateBuilder().cache(cache).build().todoList,
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
        .addDefaultCase((state, action) => state);
    },
  });

const storeBuilder = (cache) => {
  const build = () => {
    const user = userSlice(cache).reducer;
    const todoList = todoListSlice(cache).reducer;
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

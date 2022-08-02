import {
  configureStore,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";

const user = { userId: "", todoList: [], status: "idle" };

const addTodo = createAsyncThunk("addTodo", async ({ title, message }) => {});

const deleteTodo = createAsyncThunk("deleteTodo", async (todoId) => {});

const setCompletion = createAsyncThunk(
  "setCompletion",
  async ({ completion, todoId }) => {}
);

const setUser = ({ storage, api }) =>
  createAsyncThunk("setUser", async () => {
    const userId = JSON.parse(storage.getItem("userId"));
    if (!userId) {
      const userId = await api.user.createUser();
      storage.setItem("userId", JSON.stringify(userId));
      return userId;
    }
    return userId;
  });

const getTodosForUser = ({ api }) =>
  createAsyncThunk("getTodosForUser", async (userId) => {
    const todoList = await api.todos.list(userId);
    return todoList;
  });

const resetTodoList = ({ api }) =>
  createAsyncThunk("resetTodoList", async (userId) => {
    const todoList = await api.todos.resetList(userId);
    return todoList;
  });

const filterByCompletion = ({ api }) =>
  createAsyncThunk("filterByCompletion", async ({ userId, completed }) => {
    const filteredList = await api.todos.filterByCompletion({userId, completed});
    return filteredList;
  });

const userCases = (actions) => (builder) => {
  builder
    .addCase(actions.setUser.fulfilled, (state, action) => {
      return { ...state, userId: action.payload, status: "fulfilled" };
    })
    .addCase(actions.getTodosForUser.fulfilled, (state, action) => {
      return { ...state, todoList: action.payload };
    })
    .addCase(actions.resetTodoList.fulfilled, (state, action) => {
      return { ...state, todoList: [] };
    })
    .addCase(actions.filterByCompletion.fulfilled, (state, action) => {
      return { ...state, todoList: action.payload };
    })
    .addDefaultCase((state, action) => state);
};

export default ({ storage, api }) => {
  const actions = {};

  actions.setUser = setUser({ storage, api });
  actions.getTodosForUser = getTodosForUser({ api });
  actions.resetTodoList = resetTodoList({ api });
  actions.filterByCompletion = filterByCompletion({ api });

  const builderCallback = userCases(actions);
  const initialState = { userId: "", todoList: [], status: "idle" };

  const reducer = createReducer(initialState, builderCallback);

  return {
    actions,
    store: configureStore({
      reducer,
    }),
  };
};

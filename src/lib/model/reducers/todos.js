import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  status: "idle",
};

export const fetchTodosForUser = createAction("[todos] fetch todos for user");
export const fetchTodosSuccess = createAction("[todos] fetch todos success");
export const fetchTodosError = createAction("[todos] fetch todos error");
export const setTodos = createAction("[todos] set todos");

export const createTodoForUser = createAction("[todos] create todo for user");
export const createTodoSuccess = createAction("[todos] create todo success");
export const createTodoError = createAction("[todos] create todo error");
export const updateTodos = createAction("[todos] update todos");

const todoSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(setTodos, (state, { payload }) => ({
        ...state,
        list: payload,
      }))
      .addCase(updateTodos, (state, { payload }) => ({
        ...state,
        list: [...state.list, payload],
      }))
      .addDefaultCase((state) => state);
  },
});

export const selectTodoList = (state) => state.todos.list;
export const selectTodoListStatus = (state) => state.todos.status;

export default todoSlice.reducer;

import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  status: "idle",
};

export const setTodos = createAction("[todos] set todos");
export const fetchTodoListForUser = createAction(
  "[todos] fetch todos for user"
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(setTodos, (state, action) => ({
      ...state,
      list: action.payload,
    }));
  },
});

export const selectTodoList = (state) => state.todos.list;
export const selectTodoListStatus = (state) => state.todos.status;

export default todoSlice.reducer;

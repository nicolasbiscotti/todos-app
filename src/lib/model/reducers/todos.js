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
export const addTodo = createAction("[todos] add todo");

export const editTodoForUser = createAction("[todos] edit todo for user");
export const editTodoSuccess = createAction("[todos] edit todo success");
export const editTodoError = createAction("[todos] edit todo error");
export const editTodo = createAction("[todos] edit todo");

const todoSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(setTodos, (state, { payload }) => ({
        ...state,
        list: payload,
      }))
      .addCase(addTodo, (state, { payload }) => ({
        ...state,
        list: [...state.list, payload],
      }))
      .addCase(editTodo, (state, action) => ({
        ...state,
        list: state.list.map((todo) => {
          if ((todo.id === action.payload.todoId)) {
            return { ...todo, completed: action.payload.completed };
          }
          return { ...todo };
        }),
      }))
      .addDefaultCase((state) => state);
  },
});

export const selectTodoList = (state) => state.todos.list;
export const selectTodoListStatus = (state) => state.todos.status;

export default todoSlice.reducer;

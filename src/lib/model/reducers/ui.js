import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  loadingUser: false,
  loadingTodoList: false,
};

export const showSpinner = createAction("[ui] show spinner");
export const hideSpinner = createAction("[ui] hide spinner");
export const loadingUser = createAction("[ui] loading user");
export const userLoaded = createAction("[ui] user loaded");
export const loadingTodoList = createAction("[ui] loading todo list");
export const todoListLoaded = createAction("[ui] todo list loaded");

const uiSlice = createSlice({
  name: "ui",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(showSpinner, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(hideSpinner, (state) => ({
        ...state,
        loading: false,
      }))
      .addCase(loadingUser, (state) => ({
        ...state,
        loadingUser: true,
      }))
      .addCase(userLoaded, (state) => ({
        ...state,
        loadingUser: false,
      }))
      .addCase(loadingTodoList, (state) => ({
        ...state,
        loadingTodoList: true,
      }))
      .addCase(todoListLoaded, (state) => ({
        ...state,
        loadingTodoList: false,
      }))
      .addDefaultCase((state) => state);
  },
});

export const selectLoading = (state) => state.ui.loadingUser;
export const selectLoadingTodoList = (state) => state.ui.loadingTodoList;

export default uiSlice.reducer;

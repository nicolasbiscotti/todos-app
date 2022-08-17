import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  loadingUser: false,
  loadingTodoList: false,
};

export const showModal = createAction("[ui] show modal");
export const hideModal = createAction("[ui] hide modal");
export const loadingUser = createAction("[ui] loading user");
export const userLoaded = createAction("[ui] user loaded");
export const loadingTodoList = createAction("[ui] loading todo list");
export const todoListLoaded = createAction("[ui] todo list loaded");

const uiSlice = createSlice({
  name: "ui",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(showModal, (state) => ({
        ...state,
        showModal: true,
      }))
      .addCase(hideModal, (state) => ({
        ...state,
        showModal: false,
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

export const selectShowModal = (state) => state.ui.showModal;
export const selectLoadingUser = (state) => state.ui.loadingUser;
export const selectLoadingTodoList = (state) => state.ui.loadingTodoList;

export default uiSlice.reducer;

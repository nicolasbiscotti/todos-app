import { createAction, createSlice } from "@reduxjs/toolkit";

export const byCompletionOptions = [
  { id: "byCompletion-option-0", text: "All", value: null },
  { id: "byCompletion-option-1", text: "Completed", value: true },
  { id: "byCompletion-option-2", text: "Not completed", value: false },
];

const initialState = {
  byCompletion: {
    id: "byCompletion-option-0",
    text: "All",
    value: null,
  },
};

export const setFilterByCompletion = createAction("[filters] set filter");

const filterSlice = createSlice({
  name: "filters",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(setFilterByCompletion, (state, { payload }) => ({
        ...state,
        byCompletion: payload,
      }))
      .addDefaultCase((state) => state);
  },
});

export const selectFilterByCompletionId = (state) =>
  state.filters.byCompletion.id;
export const selectFilterByCompletionText = (state) =>
  state.filters.byCompletion.text;
export const selectFilterByCompletion = (state) => state.filters.byCompletion;

export default filterSlice.reducer;

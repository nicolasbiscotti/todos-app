import { createAction, createSlice } from "@reduxjs/toolkit";

export const byCompletionOptions = [
  { id: "byCompletion-option-0", text: "All", value: null },
  { id: "byCompletion-option-1", text: "Completed", value: true },
  { id: "byCompletion-option-2", text: "Not completed", value: false },
];

const initialState = {
  filtersApplied: false,
  byCompletion: {
    id: "byCompletion-option-0",
    text: "All",
    value: null,
  },
};

export const setFilterByCompletion = createAction(
  "[filters] set filter by completion"
);
export const clearFilterByCompletion = createAction(
  "[filters] clear filter by completion"
);

const filterSlice = createSlice({
  name: "filters",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(setFilterByCompletion, (state, { payload }) => ({
        ...state,
        filtersApplied: true,
        byCompletion: payload,
      }))
      .addCase(clearFilterByCompletion, (state) => ({
        ...state,
        filtersApplied: false,
        byCompletion: byCompletionOptions[0],
      }))
      .addDefaultCase((state) => state);
  },
});

export const selectFilterByCompletionId = (state) =>
  state.filters.byCompletion.id;
export const selectFilterByCompletionText = (state) =>
  state.filters.byCompletion.text;
export const selectFilterByCompletion = (state) => state.filters.byCompletion;
export const selectFiltersApplied = (state) => state.filters.filtersApplied;

export default filterSlice.reducer;

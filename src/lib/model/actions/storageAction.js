import { createAction } from "@reduxjs/toolkit";

export const getItem = createAction(
  "[storage] get item",
  ({ key, onItemExists, onNonItem }) => ({
    meta: { key, onItemExists, onNonItem },
  })
);

export const storeItem = createAction("[storage] store item");

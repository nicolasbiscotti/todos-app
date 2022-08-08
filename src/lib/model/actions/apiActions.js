import { createAction } from "@reduxjs/toolkit";

export const apiRequestCreateTodo = createAction(
  "[app] create todo request",
  ({ payload, onSuccess, onError }) => ({
    payload,
    meta: { onSuccess, onError },
  })
);

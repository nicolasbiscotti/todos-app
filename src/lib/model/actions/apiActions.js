import { createAction } from "@reduxjs/toolkit";

export const apiRequest = createAction(
  "[app] API Request",
  ({ payload, onSuccess, onError, request }) => ({
    payload,
    meta: { onSuccess, onError, request },
  })
);

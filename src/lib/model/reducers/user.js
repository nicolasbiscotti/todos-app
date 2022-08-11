import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "no user",
  status: "idle",
};

export const getUser = createAction("[user] get user");
export const loadUserTodos = createAction("[user] load user's todos");

export const fetchUser = createAction("[user] fetch user");
export const fetchUserSuccess = createAction("[user] fetch user success");
export const fetchUserError = createAction("[user] fetch user error");
export const updateUserId = createAction("[user] update userId");

export const setUserId = createAction("[user] set user");

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(setUserId, (state, action) => ({
      ...state,
      userId: action.payload,
    }));
  },
});

export const selectUserId = (state) => state.user.userId;
export const selectUserIdStatus = (state) => state.user.status;

export default userSlice.reducer;

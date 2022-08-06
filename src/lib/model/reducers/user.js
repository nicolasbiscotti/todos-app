import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "no user",
  status: "idle",
};

export const setUser = createAction("[user] set user");
export const getUser = createAction("[user] get user");
export const searchUserInCache = createAction("[user] search user in cache");
export const fetchUser = createAction("[user] fetch user");
export const storeUserInCache = createAction("[user] store user in the cache");

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(setUser, (state, action) => ({
      ...state,
      userId: action.payload,
    }));
  },
});

export const selectUserId = (state) => state.user.userId;
export const selectUserIdStatus = (state) => state.user.status;

export default userSlice.reducer;

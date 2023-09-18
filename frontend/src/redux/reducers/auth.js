import { createSlice } from "@reduxjs/toolkit";

const initialAuth = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

const { actions, reducer } = authSlice;
export const { setCredentials } = actions;

export default reducer;

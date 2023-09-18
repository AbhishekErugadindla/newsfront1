import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, isSignedUp: false, username: "" },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.username = action.payload.username;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.username = "";
    },
    signup(state) {
      state.isSignedUp = true;
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});

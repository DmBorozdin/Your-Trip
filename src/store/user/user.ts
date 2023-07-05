import { createSlice } from "@reduxjs/toolkit";
import { AuthorizationStatus } from "../../const";

export interface User {
  auth: string;
  users: Array<{
    id: number;
    login: string;
    password: string;
  }>;
}

const initialState: User = {
  auth: AuthorizationStatus.NO_AUTH,
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    requireAuthorization(state, action) {
      state.auth = action.payload;
    },
    addUser(state, action) {
      state.users.push(action.payload);
    },
  },
});

export const { requireAuthorization, addUser } = userSlice.actions;

export default userSlice.reducer;

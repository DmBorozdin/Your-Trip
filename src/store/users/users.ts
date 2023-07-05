import { createSlice } from "@reduxjs/toolkit";
import { AuthorizationStatus } from "../../const";

interface Users {
  authUser: string;
  users: Array<{
    id: number;
    login: string;
    password: string;
  }>;
}

const initialState: Users = {
  authUser: AuthorizationStatus.NO_AUTH,
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    auth(state, action) {
      state.authUser = action.payload;
    },
    addUser(state, action) {
      state.users.push(action.payload);
    },
  },
});

export const { auth, addUser } = usersSlice.actions;

export default usersSlice.reducer;

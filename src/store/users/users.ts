import { createSlice } from "@reduxjs/toolkit";

interface Users {
  authUser: string | boolean;
  users: Array<{
    id: string;
    login: string;
    password: string;
  }>;
}

const initialState: Users = {
  authUser: false,
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
      state.authUser = action.payload.id;
    },
    logOut(state) {
      state.authUser = initialState.authUser;
    },
  },
});

export const { auth, addUser, logOut } = usersSlice.actions;

export default usersSlice.reducer;

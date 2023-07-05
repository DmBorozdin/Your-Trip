import { createReducer } from "@reduxjs/toolkit";
import { requireAuthorization, addUser } from "../action";
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

const user = createReducer(initialState, (builder) => {
  builder.addCase(requireAuthorization, (state, action) => {
    state.auth = action.payload;
  });
  builder.addCase(addUser, (state, action) => {
    state.users.push(action.payload);
  });
});

export { user };

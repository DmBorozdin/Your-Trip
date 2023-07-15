import { combineReducers } from "redux";
import users from "./users/users";
import { apiSlice } from "../services/apiSlice";

export default combineReducers({
  users,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

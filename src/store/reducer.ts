import { combineReducers } from "redux";
import users from "./users/users";
import offers from "./offers/offers";
import { apiSlice } from "../services/apiSlice";

export default combineReducers({
  users,
  offers,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

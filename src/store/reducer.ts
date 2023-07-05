import { combineReducers } from "redux";
import users from "./users/users";
import offers from "./offers/offers";

export default combineReducers({
  users,
  offers,
});

import { combineReducers } from "redux";
import { user } from "./user/user";
import { offers } from "./offers/offers";

export const NameSpace = {
  USER: `USER`,
  OFFERS: `OFFERS`,
};

export default combineReducers({
  [NameSpace.USER]: user,
  [NameSpace.OFFERS]: offers,
});

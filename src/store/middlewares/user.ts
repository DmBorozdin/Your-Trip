import { Middleware } from "@reduxjs/toolkit";
import { addUser } from "../users/users";
import { nanoid } from "@reduxjs/toolkit";

const userMiddleware: Middleware = () => (next) => (action) => {
  if (addUser.type === action.type) {
    action.payload = {
      ...action.payload,
      id: nanoid(8),
      favorites: {},
      history: [],
    };
  }

  return next(action);
};

export default userMiddleware;

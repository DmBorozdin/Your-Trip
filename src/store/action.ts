import { createAction } from "@reduxjs/toolkit";

interface User {
  login: string;
  password: string;
  id: number;
}

interface OFFER {
  price: number;
  name: string;
  type: string;
  rating: number;
  isMark: boolean;
  src: string;
}

export const ActionType = {
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  ADD_USER: `user/addUser`,
  LOAD_OFFERS: `offers/loadOffers`,
};

export const requireAuthorization = createAction(
  ActionType.REQUIRED_AUTHORIZATION,
  (status: string) => ({ payload: status })
);

export const addUser = createAction(ActionType.ADD_USER, (user: User) => ({
  payload: user,
}));

export const loadOffers = createAction(
  ActionType.LOAD_OFFERS,
  (offers: OFFER[]) => ({
    payload: offers,
  })
);

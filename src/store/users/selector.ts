import type { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const getUserData = (state: RootState) => state.users;

export const getFavorites = createSelector(
  [(state: RootState) => state.users],
  (users) => {
    const favorites = users.users.find(
      (user) => user.id === users.authUser
    )?.favorites;
    return favorites ? Object.values(favorites) : [];
  }
);

export const getFavoritesObj = createSelector(
  [(state: RootState) => state.users],
  (users) => {
    const favorites = users.users.find(
      (user) => user.id === users.authUser
    )?.favorites;
    return favorites || {};
  }
);

export const getAuthUser = (state: RootState) => state.users.authUser;

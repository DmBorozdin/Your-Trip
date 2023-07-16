import type { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const getUserData = (state: RootState) => state.users;

export const getFavorites = createSelector(getUserData, (users) => {
  const favorites = users.users.find(
    (user) => user.id === users.authUser
  )?.favorites;
  return favorites ? Object.values(favorites) : [];
});

export const getFavoritesObj = createSelector(getUserData, (users) => {
  const favorites = users.users.find(
    (user) => user.id === users.authUser
  )?.favorites;
  return favorites || {};
});

export const getAuthUserId = (state: RootState) => state.users.authUser;

export const getAuthUser = createSelector(getUserData, (users) =>
  users.users.find((user) => user.id === users.authUser)
);

export const getHistory = createSelector(getUserData, (users) => {
  const history = users.users.find(
    (user) => user.id === users.authUser
  )?.history;
  return history || [];
});

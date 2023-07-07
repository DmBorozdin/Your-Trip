import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

function loadFromLocalStorage() {
  const localStorageState = localStorage.getItem("users");
  if (localStorageState === null) return undefined;
  return { users: JSON.parse(localStorageState) };
}

export const store = configureStore({
  reducer,
  preloadedState: loadFromLocalStorage(),
});

export type RootState = ReturnType<typeof store.getState>;

const saveToLocalStorage = (state: RootState["users"]) =>
  localStorage.setItem("users", JSON.stringify(state));

store.subscribe(() => saveToLocalStorage(store.getState().users));

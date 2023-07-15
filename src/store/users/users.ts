import { createSlice } from "@reduxjs/toolkit";

interface Offer {
  badge: string;
  bubbleRating: {
    count: string;
    rating: number;
  };
  cardPhotos: Array<string>;
  id: string;
  isSponsored: boolean;
  priceForDisplay: string;
  title: string;
  isFavorite: boolean;
}

export interface Favorites {
  [index: string]: Offer;
}

interface Users {
  authUser: string;
  users: Array<{
    id: string;
    login: string;
    password: string;
    favorites: Favorites;
  }>;
}

const initialState: Users = {
  authUser: "",
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    auth(state, action) {
      state.authUser = action.payload;
    },
    addUser(state, action) {
      state.users.push(action.payload);
      state.authUser = action.payload.id;
    },
    logOut(state) {
      state.authUser = initialState.authUser;
    },
    addToFavorite(state, action) {
      const userIndex = state.users.findIndex(
        (user) => user.id === state.authUser
      );
      if (userIndex >= 0) {
        if (!state.users[userIndex].favorites[action.payload.id]) {
          state.users[userIndex].favorites[action.payload.id] = action.payload;
        } else {
          delete state.users[userIndex].favorites[action.payload.id];
        }
      }
    },
    addToFavoriteFromDetailsPage(state, action) {
      const userIndex = state.users.findIndex(
        (user) => user.id === state.authUser
      );
      if (userIndex >= 0) {
        if (!state.users[userIndex].favorites[action.payload.id]) {
          state.users[userIndex].favorites[action.payload.id] = {
            id: action.payload.id,
            title: action.payload.title,
            badge: "",
            bubbleRating: {
              count: String(action.payload.numberReviews),
              rating: action.payload.rating,
            },
            isSponsored: false,
            priceForDisplay: action.payload.price,
            cardPhotos: [
              action.payload.photos[0]
                .replace(/(?<=w=)1100/g, "300")
                .replace(/(?<=h=)500/g, "200"),
            ],
            isFavorite: true,
          };
        } else {
          delete state.users[userIndex].favorites[action.payload.id];
        }
      }
    },
  },
});

export const {
  auth,
  addUser,
  logOut,
  addToFavorite,
  addToFavoriteFromDetailsPage,
} = usersSlice.actions;

export default usersSlice.reducer;

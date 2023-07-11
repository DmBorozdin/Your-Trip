import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  adaptHotelsToClient,
  adaptLocationToClient,
  adaptTotalOffers,
} from "../../services/api";
import { AxiosInstance } from "axios";

interface Offers {
  location: {
    documentId: string;
    geoId: string;
    secondaryText: string;
    title: string;
  };
  offers: Array<{
    accentedLabel: boolean;
    badge: {
      size: string;
      type: string;
      year: string;
    };
    bubbleRating: {
      count: string;
      rating: number;
    };
    cardPhotos: Array<string>;
    id: string;
    isSponsored: boolean;
    priceForDisplay: string;
    secondaryInfo: null | string;
    title: string;
  }>;
  totalOffers: string;
  isLoading: boolean;
  isError: boolean;
}

interface FetchLocation {
  location: {
    documentId: string;
    geoId: string;
    secondaryText: string;
    title: string;
  };
  offers: Array<{
    accentedLabel: boolean;
    badge: {
      size: string;
      type: string;
      year: string;
    };
    bubbleRating: {
      count: string;
      rating: number;
    };
    cardPhotos: Array<string>;
    id: string;
    isSponsored: boolean;
    priceForDisplay: string;
    secondaryInfo: null | string;
    title: string;
  }>;
  totalOffers: string;
}

export const fetchLocation = createAsyncThunk<
  FetchLocation,
  { location: string; checkIn: string; checkOut: string },
  { extra: AxiosInstance }
>("offers/fetchLocation", async (searchParams, thunkAPI) => {
  const responceLocation = await thunkAPI.extra.get("/searchLocation", {
    params: { query: searchParams.location },
  });
  const location = adaptLocationToClient(responceLocation.data.data[0]);
  const responceHotels = await thunkAPI.extra.get("/searchHotels", {
    params: {
      geoId: location.geoId,
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      currencyCode: "USD",
    },
  });

  const totalOffers = adaptTotalOffers(responceHotels.data.data.sortDisclaimer);
  const offers = adaptHotelsToClient(responceHotels.data.data.data);
  return { location, offers, totalOffers };
});

const initialState: Offers = {
  location: {
    documentId: "",
    geoId: "",
    secondaryText: "",
    title: "",
  },
  offers: [],
  totalOffers: "",
  isLoading: false,
  isError: false,
};

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    loadOffers(state, action) {
      state.offers = action.payload;
    },
    loadLocation(state, action) {
      state.location = action.payload;
    },
    closeError(state) {
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLocation.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchLocation.fulfilled, (state, action) => {
      state.location = action.payload.location;
      state.offers = action.payload.offers;
      state.totalOffers = action.payload.totalOffers;
      state.isLoading = false;
    });
    builder.addCase(fetchLocation.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export const { loadOffers, loadLocation, closeError } = offersSlice.actions;

export default offersSlice.reducer;

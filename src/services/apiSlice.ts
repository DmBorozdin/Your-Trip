import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {
  formatPhotoUrl,
  getTransformedLocation,
  getTransformedOffers,
} from "../utils/api";

export interface Review {
  title: string;
  text: string;
  publishedDate: string;
  avatar: string;
}

export interface Amenities {
  hotel: string[];
  room: string[];
  roomTypes: string[];
}

export interface DetailedOffer {
  photos: string[];
  title: string;
  rating: number;
  numberReviews: number;
  rankingDetails: string;
  price: string;
  reviews: Review[];
  location: string;
  status: boolean;
  amenities: Amenities;
}

interface Photo {
  maxHeight: number;
  maxWidth: number;
  urlTemplate: string;
}

interface ReviewServer {
  title: string;
  text: string;
  bubbleRatingText: string;
  publishedDate: string;
  userProfile: {
    deprecatedContributionCount: string;
    avatar: Photo;
    photos: string[];
  };
}

export interface LocationServer {
  documentId: string;
  geoId: string;
  secondaryText: string;
  title: string;
  trackingItems: string;
}

export interface Location {
  geoId: string;
  title: string;
  status: boolean;
}

export interface LocationResponse {
  data: LocationServer[];
  message: string;
  status: boolean;
  timestamp: number;
}

export interface OfferResponce {
  accentedLabel: boolean;
  badge: {
    size?: string;
    type?: string;
    year?: string;
  };
  bubbleRating: {
    count: string;
    rating: number;
  };
  cardPhotos: Array<{
    sizes: Photo & { __typename: string };
    __typename: string;
  }>;
  id: string;
  isSponsored: boolean;
  priceDetails: string;
  priceForDisplay: string;
  priceSummary: null | string;
  primaryInfo: null | string;
  provider: string;
  secondaryInfo: null | string;
  strikethroughPrice: null | string;
  title: string;
}

export interface OffersResponce {
  data: { data: OfferResponce[]; sortDisclaimer: string };
  message: string;
  status: boolean;
  timestamp: number;
}

export interface Offer {
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

interface Search {
  location: string;
  checkIn: string;
  checkOut: string;
}

export interface OffersbyLocation {
  location: Location;
  offers: {
    status: boolean;
    offers: Offer[];
    totalOffers: string;
  };
}

const amenitiesTitle = {
  room: ["Comfort", "Room features", "Kitchen", "Entertainment", "Bath"],
  roomTypes: ["View", "Room types"],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTransformedOffer = (response: any): DetailedOffer => {
  const newAmenities: Amenities = {
    hotel: [],
    room: [],
    roomTypes: [],
  };
  response.data.amenitiesScreen.forEach(
    (element: { title: string; content: string[] }) => {
      if (amenitiesTitle.room.includes(element.title)) {
        newAmenities.room.push(...element.content);
      } else if (amenitiesTitle.roomTypes.includes(element.title)) {
        newAmenities.roomTypes.push(...element.content);
      } else {
        newAmenities.hotel.push(...element.content);
      }
    }
  );

  const adaptedResponce = {
    ...response.data,
    status: response.status,
    price: response.data.price.displayPrice || "0",
    photos: response.data.photos
      .filter((photo: Photo) => Number(photo.maxHeight) > 500)
      .map((photo: Photo) => formatPhotoUrl(photo.urlTemplate, "1100", "500")),
    rankingDetails: response.data.rankingDetails.replace(/<a>|<\/a>/g, ""),
    amenities: newAmenities,
    reviews: response.data.reviews.content.map((review: ReviewServer) => ({
      title: review.title,
      text: review.text.replace(/<br \/>/g, ""),
      publishedDate: review.publishedDate,
      avatar: review.userProfile.avatar.urlTemplate
        ? formatPhotoUrl(review.userProfile.avatar.urlTemplate, "100", "100")
        : "",
    })),
    location: response.data.location.address,
  };

  delete adaptedResponce.restaurantsNearby;
  delete adaptedResponce.qA;
  delete adaptedResponce.attractionsNearby;
  delete adaptedResponce.amenitiesScreen;
  delete adaptedResponce.about;
  delete adaptedResponce.geoPoint;

  return adaptedResponce;
};

export const API_KEY = process.env.REACT_APP_API_KEY as string;

export const apiSlice = createApi({
  reducerPath: "offers",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tripadvisor16.p.rapidapi.com/api/v1/hotels",
    timeout: 20000,
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
    },
  }),
  endpoints: (builder) => ({
    getOffer: builder.query({
      query: (offerParams: {
        offerId: string;
        checkIn: string;
        checkOut: string;
      }) => ({
        url: "/getHotelDetails",
        params: {
          id: offerParams.offerId,
          checkIn: offerParams.checkIn,
          checkOut: offerParams.checkOut,
          currencyCode: "USD",
        },
      }),
      transformResponse: getTransformedOffer,
    }),
    getAllOffers: builder.query<OffersbyLocation, Search>({
      async queryFn(searchParams, _queryApi, _extraOptions, fetchWithBQ) {
        const locationResponse = await fetchWithBQ({
          url: "/searchLocation",
          params: {
            query: searchParams.location,
          },
        });
        if (locationResponse.error) {
          return { error: locationResponse.error as FetchBaseQueryError };
        }
        const location = getTransformedLocation(
          locationResponse.data as LocationResponse
        );
        const offersResponce = await fetchWithBQ({
          url: "/searchHotels",
          params: {
            geoId: location.geoId,
            checkIn: searchParams.checkIn,
            checkOut: searchParams.checkOut,
            currencyCode: "USD",
          },
        });
        if (offersResponce.error) {
          return { error: offersResponce.error as FetchBaseQueryError };
        }
        const offersResponceData = offersResponce.data as OffersResponce;
        const offers = getTransformedOffers(offersResponceData);
        return { data: { location, offers } };
      },
    }),
  }),
});

export const { useGetOfferQuery, useGetAllOffersQuery } = apiSlice;

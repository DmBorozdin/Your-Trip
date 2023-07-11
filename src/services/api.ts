import axios from "axios";
import cloneDeep from "lodash.clonedeep";

interface Location {
  documentId: string;
  geoId: string;
  secondaryText: string;
  title: string;
  trackingItems?: string;
}

interface Hotel {
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
  cardPhotos: Array<{
    __typename: string;
    sizes: {
      maxHeight: number;
      maxWidth: number;
      urlTemplate: string;
      __typename: string;
    };
  }>;
  id: string;
  isSponsored: boolean;
  priceDetails?: null | string;
  priceForDisplay: string;
  priceSummary?: null | string;
  primaryInfo?: null | string;
  provider?: string;
  secondaryInfo: null | string;
  strikethroughPrice?: null | string;
  title: string;
}

export const api = axios.create({
  baseURL: `https://tripadvisor16.p.rapidapi.com/api/v1/hotels`,
  timeout: 20000,
  headers: {
    "X-RapidAPI-Key": "62ab79e14emshadbbb91302eff1bp14145fjsn5425d25881e0",
    "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
  },
});

export const adaptLocationToClient = (location: Location) => {
  const adaptedLocation = Object.assign({}, location, {
    title: location.title.replace(/<b>|<\/b>/g, ""),
    geoId: location.geoId.split(";")[1],
  });

  delete adaptedLocation.trackingItems;

  return adaptedLocation;
};

export const adaptHotelsToClient = (hotels: Array<Hotel>) => {
  return Array.from(
    new Set(
      hotels.map((hotel) => {
        const adaptedHotel = Object.assign({}, cloneDeep(hotel), {
          cardPhotos: hotel.cardPhotos.map((photo) =>
            photo.sizes.urlTemplate
              .replace(/\{width\}/, "300")
              .replace(/\{height\}/, "200")
          ),
          isFavorite: false,
        });

        delete adaptedHotel.priceDetails;
        delete adaptedHotel.priceSummary;
        delete adaptedHotel.primaryInfo;
        delete adaptedHotel.strikethroughPrice;
        delete adaptedHotel.provider;

        return adaptedHotel;
      })
    )
  );
};

export const adaptTotalOffers = (totalOffers: string) => {
  return totalOffers.replace(",", "").split(" ").slice(0, 3).join(" ");
};

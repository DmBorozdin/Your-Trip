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

export interface Location {
  geoId: string;
  title: string;
  status: boolean;
}

export interface OffersbyLocation {
  location: Location;
  offers: {
    status: boolean;
    offers: Offer[];
    totalOffers: string;
  };
}

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

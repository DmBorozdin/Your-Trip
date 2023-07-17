interface Photo {
  maxHeight: number;
  maxWidth: number;
  urlTemplate: string;
}

interface ReviewServer {
  title: string;
  text: string;
  publishedDate: string;
  userProfile: {
    avatar: Photo;
  };
}

export interface DetailedOfferServer {
  data: {
    photos: Photo[];
    title: string;
    rating: number;
    numberReviews: number;
    rankingDetails: string;
    price: {
      displayPrice: string;
    };
    reviews: {
      content: ReviewServer[];
    };
    location: {
      address: string;
    };
    status: boolean;
    amenitiesScreen: Array<{
      title: string;
      content: string[];
    }>;
  };
  status: boolean;
}

interface OfferServer {
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
    sizes: Photo;
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

export interface OffersServer {
  data: { data: OfferServer[]; sortDisclaimer: string };
  status: boolean;
}
interface LocationServer {
  documentId: string;
  geoId: string;
  secondaryText: string;
  title: string;
  trackingItems: string;
}

export interface LocationResponse {
  data: LocationServer[];
  status: boolean;
}

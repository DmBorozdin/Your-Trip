export interface Store {
  USER: {
    auth: string;
    users: Array<{
      login: string;
      password: string;
      id: number;
    }>;
  };
  OFFERS: {
    offers: Array<{
      price: number;
      name: string;
      type: string;
      rating: number;
      isMark: boolean;
      src: string;
    }>;
  };
}

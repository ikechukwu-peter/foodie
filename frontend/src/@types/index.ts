export interface IRECIPE_PAYLOAD {
  title: string;
  description: string;
  note?: string;
  ingredients: string;
  image: File;
}
export interface ILoginRes {
  email: string;
  token: string;
  id: string;
}

export interface IPAYLOAD {
  email: string;
  password: string;
}
export interface AUTH_TYPE {
  user: string;
  id: string;
  loading: boolean;
  onLogin: (payload: IPAYLOAD) => void;
  onLogout: () => void;
}

export interface IIMAGE {
  url: string;
  id: string;
}

export interface RECIPERES {
  _id: string;
  title: string;
  ingredients: string;
  note?: string;
  image: IIMAGE;
  description: string;
  user: {
    email: string;
  };
}

export interface RECIPEUSER {
  _id: string;
  title: string;
  ingredients: string;
  note?: string;
  image: IIMAGE;
  description: string;
  user: string;
}

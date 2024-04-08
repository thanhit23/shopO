export type Meta = {
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};

export type User = {
  role: 'user';
  avatar: string;
  isEmailVerified: boolean;
  lastLoginAt: null | string;
  gender: number;
  phoneNumber: string;
  location: string;
  name: string;
  email: string;
  id: string;
};

export type Product = {
  price: number;
  description: string;
  _id: string;
  name: string;
  totalComment: number;
  quantity: number;
  rating: number;
  sold: number;
  size: string[];
  slug: string;
  category: {
    name: string;
    _id: string;
  };
  brand: {
    name: string;
    _id: string;
    id?: string;
  };
  thumbnail: string;
  images: string[];
  deletedAt: null | undefined;
  createdAt: string;
  updatedAt: string;
};

export interface Comment {
  _id: string;
  user: {
    name: string;
    avatar: string;
    _id: string;
  };
  product: {
    name: string;
    thumbnail: string;
    _id: string;
  };
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  _id: string;
  user: {
    name: string;
    avatar: string;
    _id: string;
  };
  phoneNumber: number;
  fullName: string;
  customerNote: string;
  methodPayment: string;
  address: string;
  amount: number;
  quantity: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}

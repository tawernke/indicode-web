import { number } from "yup";

export type Product = {
  __typename?: "Product" | undefined;
  id: number;
  createdAt: string;
  updatedAt: string
  uuid: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  isSold: boolean;
  isPublic: boolean;
};

export type Order = {
  id: number;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  address2: string;
  city: string;
  country: string;
  zip: string;
  total: number;
  totalQuantity: number;
  shipped: boolean;
  orderItems?: OrderItem[]
};

export type OrderItem = {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  productId: number;
  orderId: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
export type Product = {
  __typename?: "Product" | undefined;
  id: number;
  uuid: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  isSold: boolean;
  isPublic: boolean;
};
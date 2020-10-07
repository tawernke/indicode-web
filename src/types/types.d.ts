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

export typr CartItem {
  product: Product;
  quantity: number;
};
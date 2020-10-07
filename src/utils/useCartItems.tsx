import { useReactiveVar } from "@apollo/client";
import { cartItemsVar } from "../pages/_app";
import { CartItem } from "../types/types";

export const useCartItems = () => {
  const cartItems = useReactiveVar(cartItemsVar);

  const deleteCartItem = (id: number) => {
    const filteredCartItems = cartItems.filter(
      (cartItem: CartItem) => cartItem.product.id !== id
    );
    cartItemsVar(filteredCartItems);
  };

  const addCartItem = (cartItem: CartItem) => {
    cartItemsVar([...cartItems, cartItem]);
  };

  const cartItemsCount = () => {
    return cartItems.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  };

  return {
    deleteCartItem,
    addCartItem,
    cartItems,
    cartItemsCount: cartItemsCount(),
  };
};

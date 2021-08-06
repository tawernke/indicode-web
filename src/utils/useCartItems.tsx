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

  const cartData = () => {
    return cartItems.reduce(
      ({ cartCount, cartTotal }, item) => {
        return {
          cartCount: cartCount + item.quantity,
          cartTotal: cartTotal + item.quantity * item.product.price,
        };
      },
      { cartCount: 0, cartTotal: 0 }
    );
  };

  const clearCart = () => {
    cartItemsVar([])
  }

  return {
    deleteCartItem,
    addCartItem,
    cartItems,
    cartData: cartData(),
    clearCart,
  };
};

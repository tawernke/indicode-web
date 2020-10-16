import { Box, Flex, Image, Text } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useCartItems } from "../utils/useCartItems";

declare const paypal: any;

interface CheckoutProps {
  shippingDetails: {
    emails: string;
    firstName: string;
    lastName: string;
    address: string;
    address2: string;
    country: string;
    zipCode: string;
  };
}

const Checkout: React.FC<CheckoutProps> = ({}) => {
  const [loadState, setLoadState] = useState({
    loading: false,
    loaded: false,
  });
  const {
    cartItems,
    cartData: { cartTotal },
  } = useCartItems();

  //Ensure paypal script is only loaded once
  useEffect(() => {
    if (!loadState.loading && !loadState.loaded) {
      setLoadState({ loading: true, loaded: false });
      const script = document.createElement("script");
      script.src = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string;
      script.addEventListener("load", () =>
        setLoadState({ loading: false, loaded: true })
      );
      document.body.appendChild(script);
    }
  }, [loadState]);
  
  
  const createOrder = (_: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: cartTotal,
          },
        },
      ],
    });
  };
  
  const onApprove = (_: any, actions: any) => {
    return actions.order.capture();
  };
  
  if (!loadState.loaded || !paypal) return null;
  const PayPalButton = paypal?.Buttons.driver("react", {
    React,
    ReactDOM,
  });
  return (
    <Box mt={10} pl={5} width={2 / 5}>
      <Box mb={4} borderBottom="1px" borderBottomColor="gray.200">
        {cartItems.map(({ product, quantity }) => {
          return (
            <Flex
              key={product.id}
              alignItems="center"
              justifyContent="space-between"
              pb={5}
            >
              <Box position="relative">
                <Image width={60} height={60} src={product.imageUrl} />
                <Text position="absolute" top={-10} right={-5}>
                  {quantity}
                </Text>
              </Box>
              <Text fontSize="sm" fontWeight="bold">
                £{product.price}
              </Text>
            </Flex>
          );
        })}
      </Box>
      <Box mb={4} borderBottom="1px" borderBottomColor="gray.200">
        <Flex mb={2} justifyContent="space-between">
          <Text fontSize="xs">Subtotal</Text>
          <Text fontSize="xs" fontWeight="bold">
            £{cartTotal}
          </Text>
        </Flex>
        <Flex mb={4} justifyContent="space-between">
          <Text fontSize="xs">Shipping</Text>
          <Text fontSize="xs">Free shipping within the UK!</Text>
        </Flex>
      </Box>
      <Box mb={4}>
        <Flex justifyContent="space-between">
          <Text fontWeight="bold" fontSize="lg">
            Total
          </Text>
          <Text fontWeight="bold" fontSize="lg">
            £{cartTotal}
          </Text>
        </Flex>
      </Box>
      <PayPalButton
        createOrder={(data: any, actions: any) => createOrder(data, actions)}
        onApprove={(data: any, actions: any) => onApprove(data, actions)}
      />
    </Box>
  );
};

export default Checkout;

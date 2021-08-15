import { Box, Flex, Heading, Image, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useCreateOrderMutation } from "../generated/graphql";
import { CheckoutState } from "../pages/checkout";
import { useCartItems } from "../utils/useCartItems";

declare const paypal: any;

interface CheckoutProps {
  shippingDetails: {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    address2: string;
    city: string;
    country: string;
    zip: string;
  };
  setView: (view: CheckoutState) => void;
}

const Payment: React.FC<CheckoutProps> = ({ shippingDetails, setView }) => {
  const [loadState, setLoadState] = useState({
    loading: false,
    loaded: false,
  });
  const {
    cartItems,
    cartData: { cartTotal, cartCount },
  } = useCartItems();
  const [createOrder] = useCreateOrderMutation();

  const orderItems = cartItems.map(({ product, quantity }) => {
    const { name, price, id, imageUrl } = product;
    return {
      productName: name,
      productId: id,
      quantity,
      price,
      imageUrl,
      total: price * quantity,
    };
  });

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

  const makeOrder = async (_: any, actions: any) => {
    const order = await actions.order.create({
      purchase_units: [
        {
          amount: {
            value: cartTotal,
          },
        },
      ],
    });
    return order;
  };

  const onApprove = async (_: any, actions: any) => {
    //No need to handle payment failure, the PayPal script automatically restarts the Checkout flow and prompts the buyer to select a different funding source
    await actions.order.capture();
    const { errors } = await createOrder({
      variables: {
        orderInput: {
          ...shippingDetails,
          total: cartTotal,
          totalQuantity: cartCount,
          orderItems,
        },
      },
    });

    if (errors?.length) {
      return setView("orderSaveFailed");
    }

    return setView("orderSaved");
  };

  if (!loadState.loaded || !paypal) return null;

  if (loadState.loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        position="absolute"
        left="50%"
        top="50%"
      />
    );
  }

  const PayPalButton = paypal?.Buttons.driver("react", {
    React,
    ReactDOM,
  });

  paypal.Buttons({
    onError: function (err: any) {
      console.log(err);
    },
  });
  return (
    <Box mt={10} pl={[0, 5]} width={["100%", 2 / 5]}>
      <Heading mb={10} fontSize="2xl">
        Checkout
      </Heading>
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
        createOrder={(data: any, actions: any) => makeOrder(data, actions)}
        onApprove={(data: any, actions: any) => onApprove(data, actions)}
      />
    </Box>
  );
};

export default Payment;

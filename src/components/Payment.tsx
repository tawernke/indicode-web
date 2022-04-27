import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useCreateOrderMutation } from '../generated/graphql';
import { CheckoutState } from '../pages/checkout';
import { useCartItems } from '../utils/useCartItems';
import {
  OnApproveData,
  OnApproveActions,
  CreateOrderActions,
} from '@paypal/paypal-js/types/components/buttons';
import { PayPalButtons } from '@paypal/react-paypal-js';

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

  const makeOrder = async (
    _: Record<string, unknown>,
    actions: CreateOrderActions,
  ) => {
    const order = await actions.order.create({
      purchase_units: [
        {
          amount: {
            value: cartTotal.toString(),
          },
        },
      ],
    });
    return order;
  };

  const onApprove = async (_: OnApproveData, actions: OnApproveActions) => {
    //No need to handle payment failure, the PayPal script automatically restarts the Checkout flow and prompts the buyer to select a different funding source
    await actions.order?.capture();
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
      return setView('orderSaveFailed');
    }

    return setView('orderSaved');
  };

  return (
    <Box mt={10} pl={[0, 5]} width={['100%', 2 / 5]}>
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
                <Image alt="product-image" width={60} height={60} src={product.imageUrl} />
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
      <PayPalButtons
        createOrder={(data, actions) => makeOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
    </Box>
  );
};

export default Payment;

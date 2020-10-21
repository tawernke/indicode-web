import React from "react";
import {
  Flex,
  Text,
  Image,
  Box,
  PseudoBox,
  Button,
  Link as ChakraLink,
} from "@chakra-ui/core";
import { PageLayout } from "../components/PageLayout";
import { useCartItems } from "../utils/useCartItems";
import Link from "next/link";

const Cart: React.FC = ({}) => {
  const {
    deleteCartItem,
    cartItems,
    cartData: { cartTotal },
  } = useCartItems();

  return (
    <PageLayout variant="regular">
      <Box py={10}>
        {cartItems.length ? (
          <>
            <Box
              as="table"
              w="100%"
              table-layout="auto"
              border-collapse="collapse"
            >
              <Box as="thead" p={4} textAlign="left">
                <PseudoBox as="tr" my={1}>
                  {["Product", "Price", "Quantity", "Total"].map((column) => {
                    return (
                      <PseudoBox
                        as="th"
                        p={[2, 4]}
                        borderBottom="1px"
                        borderBottomColor="gray.200"
                      >
                        {column}
                      </PseudoBox>
                    );
                  })}
                </PseudoBox>
              </Box>
              <Box as="tbody" p={4}>
                {cartItems.map(({ product, quantity }) => {
                  const { name, price, imageUrl } = product;
                  return (
                    <PseudoBox as="tr" my={1}>
                      <PseudoBox
                        as="td"
                        p={[2, 4]}
                        borderBottom="1px"
                        borderBottomColor="gray.200"
                      >
                        <Flex>
                          <Image
                            width={[1 / 2, 1 / 4]}
                            objectFit="contain"
                            src={imageUrl}
                          />
                          <Flex
                            ml={5}
                            my={2}
                            flexDirection="column"
                            justifyContent="space-between"
                          >
                            <Text fontWeight="bold">{name}</Text>
                            <ChakraLink
                              onClick={() => deleteCartItem(product.id)}
                              fontSize="xs"
                            >
                              Remove
                            </ChakraLink>
                          </Flex>
                        </Flex>
                      </PseudoBox>
                      <PseudoBox
                        as="td"
                        p={4}
                        borderBottom="1px"
                        borderBottomColor="gray.200"
                      >
                        <Text>£{price}</Text>
                      </PseudoBox>
                      <PseudoBox
                        as="td"
                        p={4}
                        borderBottom="1px"
                        borderBottomColor="gray.200"
                      >
                        <Text>{quantity}</Text>
                      </PseudoBox>
                      <PseudoBox
                        as="td"
                        p={4}
                        borderBottom="1px"
                        borderBottomColor="gray.200"
                      >
                        <Text>£{price * quantity}</Text>
                      </PseudoBox>
                    </PseudoBox>
                  );
                })}
              </Box>
            </Box>
            <Flex mt={6} flexDirection="column" alignItems="flex-end">
              <Flex mb={4}>
                <Text fontWeight="bold" mr={3}>
                  Subtotal
                </Text>
                <Text fontWeight="bold">
                  £{cartTotal}
                </Text>
              </Flex>
              <Link href="/checkout">
                <Button width="fit-content">Checkout</Button>
              </Link>
            </Flex>
          </>
        ) : (
          <Text>There are no items in your cart</Text>
        )}
      </Box>
    </PageLayout>
  );
};

export default Cart;

import React from "react";
import {
  Flex,
  Text,
  Image,
  Box,
  Link as ChakraLink,
  Button,
} from "@chakra-ui/react";
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
                <Box as="tr" my={1}>
                  {["Product", "Price", "Qty", "Total"].map((column) => {
                    return (
                      <Box
                        as="th"
                        p={[2, 4]}
                        borderBottom="1px"
                        borderBottomColor="gray.200"
                        key={column}
                      >
                        {column}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              <Box as="tbody" p={4}>
                {cartItems.map(({ product, quantity }) => {
                  const { name, price, imageUrl } = product;
                  return (
                    <Box as="tr" my={1} key={product.id}>
                      <Box
                        as="td"
                        p={[2, 4]}
                        borderBottom="1px"
                        borderBottomColor="gray.200"
                      >
                        <Flex>
                          <Image
                            width={["50%", "25%"]}
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
                      </Box>
                      <Box
                        as="td"
                        p={4}
                        borderBottom="1px"
                        borderBottomColor="gray.200"
                      >
                        <Text>£{price}</Text>
                      </Box>
                      <Box
                        as="td"
                        p={4}
                        borderBottom="1px"
                        borderBottomColor="gray.200"
                      >
                        <Text>{quantity}</Text>
                      </Box>
                      <Box
                        as="td"
                        p={4}
                        borderBottom="1px"
                        borderBottomColor="gray.200"
                      >
                        <Text>£{price * quantity}</Text>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Flex mt={6} flexDirection="column" alignItems="flex-end">
              <Flex mb={4}>
                <Text fontWeight="bold" mr={3}>
                  Subtotal
                </Text>
                <Text fontWeight="bold">£{cartTotal}</Text>
              </Flex>
              <Link href="/checkout">
                <Button>Checkout</Button>
              </Link>
            </Flex>
          </>
        ) : (
          <Text textAlign="center">There are no items in your cart</Text>
        )}
      </Box>
    </PageLayout>
  );
};

export default Cart;

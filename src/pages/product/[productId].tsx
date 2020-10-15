import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AddToCart } from "../../components/AddToCart";
import { PageLayout } from "../../components/PageLayout";
import { useProductQuery } from "../../generated/graphql";
import { useCartItems } from "../../utils/useCartItems";

const Product: React.FC = ({}) => {
  const router = useRouter();
  const [cartQuantity, setCartQuantity] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { addCartItem } = useCartItems();

  const uuid =
    typeof router.query.productId === "string" ? router.query.productId : "";
  const { data, loading } = useProductQuery({ variables: { uuid } });

  if (loading || !data?.product) return null;
  const { product } = data;
  const { imageUrl, name, price, quantity } = product;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCartQuantity(parseInt(e.target.value));
  };

  return (
    <PageLayout variant="regular">
      <Flex mt={20}>
        <Box width={1 / 2}>
          <img src={imageUrl} />
        </Box>
        <Box width={1 / 2} pl={10}>
          <Heading as="h1" size="2xl" fontWeight="bold" lineHeight="short">
            {name}
          </Heading>
          <Text mt={2}>£{price}</Text>
          {quantity > 1 && (
            <Box mt={8}>
              <Text>Quantity</Text>
              <Select mt={2} onChange={handleQuantityChange}>
                {[...Array(quantity).keys()].map((num) => (
                  <option key={num} selected={num + 1 === 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </Select>
            </Box>
          )}
          <Button
            onClick={() => {
              addCartItem({ product, quantity: cartQuantity });
              onOpen();
            }}
            mt={5}
          >
            Add to Cart
          </Button>
        </Box>
      </Flex>
      <AddToCart
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        product={product}
        quantity={cartQuantity}
      />
    </PageLayout>
  );
};

export default Product;

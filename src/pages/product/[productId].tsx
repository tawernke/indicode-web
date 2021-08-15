import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
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
      <Flex flexDirection={["column", "row"]} my={[10, 20]}>
        <Box width={["100%", "50%"]}>
          <img src={imageUrl} />
        </Box>
        <Box width={["100%", "50%"]} pl={[0, 10]}>
          <Heading
            as="h1"
            mt={[4, 0]}
            size="2xl"
            fontWeight="bold"
            lineHeight="short"
          >
            {name}
          </Heading>
          <Text mt={2}>£{price}</Text>
          {quantity > 1 && (
            <Box mt={8}>
              <Text>Quantity</Text>
              <Select mt={2} defaultValue={1} onChange={handleQuantityChange}>
                {[...Array(quantity).keys()].map((num) => (
                  <option key={num} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </Select>
            </Box>
          )}
          <Box mt={8}>
            {quantity > 0 ? (
              <Button
                onClick={() => {
                  addCartItem({ product, quantity: cartQuantity });
                  onOpen();
                }}
              >
                Add to Cart
              </Button>
            ) : (
              <Text>Sorry, this product is sold out</Text>
            )}
          </Box>
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

import { Box, Button, Flex, Heading, Select, Text } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { PageLayout } from "../../components/PageLayout";
import { useProductQuery } from "../../generated/graphql";
import { cartItemsVar } from "../_app";

const Product: React.FC = ({}) => {
  const router = useRouter();
  const uuid =
    typeof router.query.productId === "string" ? router.query.productId : "";
  const { data, loading } = useProductQuery({ variables: { uuid } });

  if (loading || !data?.product) return null;
  const { product } = data
  const { imageUrl, name, price, quantity } = product

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
              <Select mt={2}>
                {[...Array(quantity).keys()].map((num) => (
                  <option selected={num + 1 === 1} value={num + 1}>{num + 1}</option>
                ))}
              </Select>
            </Box>
          )}
          <Button onClick={() => cartItemsVar([...cartItemsVar(), product])} mt={5}>Add to Cart</Button>
        </Box>
      </Flex>
    </PageLayout>
  );
};

export default Product;

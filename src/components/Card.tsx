import { Box, Button, Flex, Image, PseudoBox, Text } from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Product } from "../types/types";

interface CardProps {
  product: Product;
  isAdmin: boolean;
}

const Card: React.FC<CardProps> = ({ product, isAdmin }) => {
  const router = useRouter();
  return (
    <Box
      cursor="pointer"
      px={2}
      width={1 / 3}
      pb={6}
      onClick={() => router.push(`/product/${product.uuid}`)}
    >
      <PseudoBox _hover={{ opacity: 0.6 }}>
        <Image rounded="md" src={product.imageUrl} />
      </PseudoBox>
      <Flex mt={2} justifyContent="space-between">
        <Text fontSize="xl" fontWeight="semibold" lineHeight="short">
          {product.name}
        </Text>
        {isAdmin && (
          <NextLink href={`admin/product/${product.uuid}/edit`}>
            <Button>Edit</Button>
          </NextLink>
        )}
      </Flex>
      <Text mt={2}>£{product.price}</Text>
    </Box>
  );
};

export default Card;

import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { StandardProductFragment } from "../generated/graphql";

interface CardProps {
  product: StandardProductFragment;
  isAdmin?: boolean;
}

const Card: React.FC<CardProps> = ({ product, isAdmin }) => {
  const router = useRouter();
  return (
    <Box
      cursor="pointer"
      px={2}
      w={[
        "50%", // base
        "33.33%", // 480px upwards
      ]}
      mb={10}
    >
      <Box _hover={{ opacity: 0.6 }}>
        <Image
          rounded="md"
          onClick={() => router.push(`/product/${product.uuid}`)}
          src={product.imageUrl}
        />
      </Box>
      <Flex mt={2} justifyContent="space-between">
        <Text fontSize="sm" fontWeight={500} lineHeight="short">
          {product.name}
        </Text>
        {isAdmin && (
          <NextLink href={`admin/product/${product.uuid}/edit`}>
            <Button>Edit</Button>
          </NextLink>
        )}
      </Flex>
      <Text fontSize="sm" mt={2}>
        £{product.price}
      </Text>
    </Box>
  );
};

export default Card;

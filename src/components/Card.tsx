import { Box, Image, Text } from '@chakra-ui/core';
import React from 'react'
import { Product } from '../types/types';

interface CardProps {
 product: Product
}

const Card: React.FC<CardProps> = ({product}) => {
    return (
      <Box px={2}>
        <Image rounded="md" src={product.imageUrl} />
        <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
          {product.name}
        </Text>
        <Text mt={2}>£{product.price}</Text>
      </Box>
    );
}

export default Card
import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AddToCart } from '../../components/AddToCart';
import { useProductQuery } from '../../generated/graphql';
import { useCartItems } from '../../utils/useCartItems';

const Product: React.FC = () => {
  const router = useRouter();
  const [cartQuantity, setCartQuantity] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { addCartItem } = useCartItems();

  const uuid =
    typeof router.query.productId === 'string' ? router.query.productId : '';
  const { data, loading } = useProductQuery({ variables: { uuid } });

  if (loading || !data?.product) return null;
  const { product } = data;
  const { imageUrl, name, price, quantity } = product;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCartQuantity(parseInt(e.target.value));
  };

  return (
    <>
      <Flex flexDirection={['column', 'row']} my={[10, 20]}>
        <Box as="span" position='relative' width={['100%', '50%']}>
          <Image 
            alt={name} 
            src={imageUrl} 
            width="100%" 
            height="100%"
            layout='responsive'
            objectFit='contain'
          />
        </Box>
        <Box width={['100%', '50%']} pl={[0, 10]}>
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
    </>
  );
};

export default Product;

import { Button, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import Card from '../../components/Card';
import { useProductsQuery } from '../../generated/graphql';
import NextLink from 'next/link';

const AllProducts: React.FC = () => {
  const { data, loading } = useProductsQuery({
    variables: {
      limit: 15,
    },
  });

  if (loading || !data) return null;

  const { publicProducts, privateProducts } = data;

  return (
    <>
      <NextLink passHref href="/admin/create-product">
        <Button mt={20} mr={4}>
          Add Product
        </Button>
      </NextLink>
      <NextLink passHref href="/admin/orders">
        <Button mt={20} mr={4}>
          View Orders
        </Button>
      </NextLink>
      <Heading mt={10} mb={6}>
        Public Products
      </Heading>
      <Flex flexWrap="wrap">
        {publicProducts.publicProducts.map((product) => {
          return <Card key={product.uuid} product={product} isAdmin />;
        })}
      </Flex>
      <Heading mb={6}>Private Products</Heading>
      <Flex pb={20} flexWrap="wrap">
        {privateProducts.privateProducts.map((product) => {
          return <Card key={product.uuid} product={product} isAdmin />;
        })}
      </Flex>
    </>
  );
};

export default AllProducts;

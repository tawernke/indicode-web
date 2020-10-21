import { Button, Flex, Heading } from "@chakra-ui/core";
import React from "react";
import Card from "../../components/Card";
import { PageLayout } from "../../components/PageLayout";
import { useProductsQuery } from "../../generated/graphql";
import { Product } from "../../types/types";
import { useAdminAuth } from "../../utils/useAuth";
import NextLink from "next/link";

interface AllProducts {
  publicProducts: Product[];
  privateProducts: Product[];
}

const AllProducts: React.FC = ({}) => {
  useAdminAuth();

  const { data, loading } = useProductsQuery();
  if (loading || !data) return null;

  const { publicProducts, privateProducts } = data.products.reduce(
    ({ publicProducts, privateProducts }: AllProducts, product) => {
      if (product.isPublic) {
        return {
          publicProducts: [...publicProducts, product],
          privateProducts,
        };
      }

      return {
        privateProducts: [...privateProducts, product],
        publicProducts,
      };
    },
    { publicProducts: [], privateProducts: [] }
  );

  return (
    <PageLayout>
      <NextLink href="/admin/create-product">
        <Button mt={20} mr={4}>
          Add Product
        </Button>
      </NextLink>
      <Heading mt={10} mb={6}>
        Public Products
      </Heading>
      <Flex flexWrap="wrap">
        {publicProducts.map((product) => {
          return <Card key={product.uuid} product={product} isAdmin />;
        })}
      </Flex>
      <Heading mb={6}>Private Products</Heading>
      <Flex pb={20} flexWrap="wrap">
        {privateProducts.map((product) => {
          return <Card key={product.uuid} product={product} isAdmin />;
        })}
      </Flex>
    </PageLayout>
  );
};

export default AllProducts;

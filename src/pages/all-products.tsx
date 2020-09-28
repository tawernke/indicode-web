import { SimpleGrid } from "@chakra-ui/core";
import React from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { useProductsQuery } from "../generated/graphql";
import Card from "../components/Card";
import { PageLayout } from "../components/PageLayout";

const AllProducts: React.FC = ({}) => {
  const [{ data, fetching }] = useProductsQuery();
  if (fetching) return null;

  return (
    <PageLayout>
      <SimpleGrid columns={3} spacing={2}>
        {data?.products.map((product) => {
          return <Card key={product.id} product={product} />;
        })}
      </SimpleGrid>
    </PageLayout>
  );
};

export default withUrqlClient(createUrqlClient)(AllProducts);

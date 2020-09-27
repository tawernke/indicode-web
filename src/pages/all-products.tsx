import { SimpleGrid } from "@chakra-ui/core";
import React from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { useProductsQuery } from "../generated/graphql";
import Card from "../components/Card";
import { NavBar } from "../components/Navbar";

const AllProducts: React.FC = ({}) => {
  const [{ data, fetching }] = useProductsQuery();
  if (fetching) return null;

  return (
    <>
      <NavBar />
      <SimpleGrid columns={3} spacing={2}>
        {data?.products.map((product) => {
          return <Card key={product.id} product={product} />;
        })}
      </SimpleGrid>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(AllProducts);

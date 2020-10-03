import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { PageLayout } from "../components/PageLayout";
import { usePublicProductsQuery } from "../generated/graphql";
import React from "react";
import { Flex, Image } from "@chakra-ui/core";
import Card from "../components/Card";
import { Wrapper } from "../components/Wrapper";

const Index = () => {
  const [{ data, fetching }] = usePublicProductsQuery();
  if (fetching || !data) return null;

  return (
    <PageLayout variant="full">
      <Image
        src="/hero.jpg"
        width={"100vw"}
        opacity={0.5}
        height={"calc(100vh - 77px)"}
        position="fixed"
        zIndex={-1}
      />
      <Wrapper>
        <Flex pt={20} flexWrap="wrap" justifyContent="center">
          {data?.publicProducts.map((product) => {
            return <Card key={product.uuid} product={product} />;
          })}
        </Flex>
      </Wrapper>
    </PageLayout>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);

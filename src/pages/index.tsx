import { PageLayout } from "../components/PageLayout";
import { usePublicProductsQuery } from "../generated/graphql";
import React from "react";
import { Button, Flex, Spinner, Text } from "@chakra-ui/core";
import Card from "../components/Card";

const Index = () => {
  const { data, loading, fetchMore, variables } = usePublicProductsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data)
    return (
      <Text>No products to show at the moment, please check back later</Text>
    );

  return (
    <PageLayout variant="full">
      {!data && loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          position="absolute"
          left="50%"
          top="50%"
        />
      ) : (
        <Flex mx={-2} pt={20} flexWrap="wrap" justifyContent="center">
          {data!.publicProducts.publicProducts.map((product) => {
            return <Card key={product.uuid} product={product} />;
          })}
        </Flex>
      )}

      {data && data.publicProducts.hasMore ? (
        <Flex>
          <Button
            isLoading={loading}
            m="auto"
            my={10}
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.publicProducts.publicProducts[
                      data.publicProducts.publicProducts.length - 1
                    ].createdAt,
                },
              });
            }}
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </PageLayout>
  );
};

export default Index;

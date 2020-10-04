import { PageLayout } from "../components/PageLayout";
import { usePublicProductsQuery } from "../generated/graphql";
import React from "react";
import { Button, Flex, Image, Spinner, Text } from "@chakra-ui/core";
import Card from "../components/Card";
import { Wrapper } from "../components/Wrapper";

const Index = () => {
  const { data, loading, fetchMore, variables } = usePublicProductsQuery({
    variables: {
      limit: 3,
      cursor: null
    },
    notifyOnNetworkStatusChange: true
  });
  console.log(data)
  if (!loading && !data)
    return (
      <Text>No products to show at the moment, please check back later</Text>
    );

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
        {!data && loading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          <Flex pt={20} flexWrap="wrap" justifyContent="center">
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
      </Wrapper>
    </PageLayout>
  );
};

export default Index;

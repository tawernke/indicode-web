import React from "react";
import { Box, Link, Flex, Button, Image } from "@chakra-ui/core";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";

export const NavBar: React.FC = () => {
  const apolloClient = useApolloClient()
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="tan" py={2} px={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <NextLink href="/">
          <Link>
            <Image src="/logo.jpg" height="75px" />
          </Link>
        </NextLink>
        <Box ml={"auto"}>
          {!loading && data?.me && (
            <Flex direction="column" align="center">
              <Flex mb={2}>
                <Box mr={5}>{data.me.username}</Box>
                <Button
                  onClick={async() => {
                    await logout()
                    await apolloClient.resetStore()
                  }}
                  isLoading={logoutFetching}
                  variant="link"
                >
                  Logout
                </Button>
              </Flex>
              <NextLink href="/admin/create-product">
                <Button mr={4}>Add Product</Button>
              </NextLink>
            </Flex>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

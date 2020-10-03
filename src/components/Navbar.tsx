import React from "react";
import { Box, Link, Flex, Button, Heading, Image } from "@chakra-ui/core";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

export const NavBar: React.FC = () => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
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
          {!fetching && data?.me && (
            <Flex direction="column" align="center">
              <Flex mb={2}>
                <Box mr={5}>{data.me.username}</Box>
                <Button
                  onClick={() => logout()}
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

import { Box, Button, Flex, Image, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useCartItems } from "../utils/useCartItems";

export const NavBar: React.FC = () => {
  const router = useRouter();
  const {
    cartData: { cartCount },
  } = useCartItems();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="tan" py={2} px={4}>
      <Flex flex={1} m="auto" align="center" maxW={900}>
        <NextLink href="/">
          <Link>
            <Image src="/logo.jpg" height="75px" />
          </Link>
        </NextLink>
        <Box ml={"auto"}>
          <Flex>
            <NextLink href="/cart">
              <Link mr={8}>Cart {cartCount > 0 && `(${cartCount})`}</Link>
            </NextLink>
            {!loading && data?.me && (
              <Button
                onClick={async () => {
                  await logout();
                  router.push("/");
                }}
                isLoading={logoutFetching}
                variant="link"
              >
                Logout
              </Button>
            )}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

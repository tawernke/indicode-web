import {
  Box,
  Flex,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuIcon from "@material-ui/icons/Menu";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useCartItems } from "../utils/useCartItems";

export const NavBar: React.FC = () => {
  const router = useRouter();
  const {
    cartData: { cartCount },
  } = useCartItems();
  const [logout] = useLogoutMutation();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="#E6D8CB" py={2} px={4}>
      <Flex flex={1} m="auto" align="center" maxW={900}>
        <NextLink href="/">
          <Link>
            <Image src="/logo.jpg" height="75px" />
          </Link>
        </NextLink>
        <Box ml={"auto"}>
          <Flex>
            {cartCount > 0 && (
              <NextLink href="/cart">
                <Link _hover={{ textDecoration: "none" }} mr={8}>
                  <ShoppingCartIcon />
                  <Box display="inline">
                    {`(${cartCount})`}
                  </Box>
                </Link>
              </NextLink>
            )}
            {!loading && data?.me && (
              <Menu placement="bottom-end">
                <MenuButton
                  cursor="pointer"
                  as={MenuIcon}
                  aria-label="Options"
                />
                <MenuList>
                  <MenuItem>
                    <Box w={"100%"} onClick={() => router.push("/admin")}>
                      Admin
                    </Box>
                  </MenuItem>
                  <MenuItem>
                    <Text
                      w={"100%"}
                      onClick={async () => {
                        await logout();
                        router.push("/");
                      }}
                    >
                      Logout
                    </Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

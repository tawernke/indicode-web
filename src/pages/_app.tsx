import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client/core";
import { ChakraProvider } from "@chakra-ui/react";
import { PaginatedPublicProducts } from "../generated/graphql";
import theme from "../theme";
import { CartItem } from "../utils/useCartItems";

export const cartItemsVar = makeVar<CartItem[]>([]);

function MyApp({ Component, pageProps }: any) {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          cartItems: {
            read() {
              return cartItemsVar();
            },
          },
        },
      },
      Agenda: {
        fields: {
          publicProducts: {
            keyArgs: [],
            merge(
              existing: PaginatedPublicProducts | undefined,
              incoming: PaginatedPublicProducts
            ): PaginatedPublicProducts {
              return {
                ...incoming,
                publicProducts: [
                  ...(existing?.publicProducts || []),
                  ...incoming.publicProducts,
                ],
              };
            },
          },
        },
      },
    },
  });

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    cache,
    credentials: "include",
  });

  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;

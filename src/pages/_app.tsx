import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client/core";
import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import { PaginatedPublicProducts } from "../generated/graphql";
import theme from "../theme";
import { CartItem } from "../types/types";

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
    uri: "http://localhost:4000/graphql",
    cache,
    credentials: "include",
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;

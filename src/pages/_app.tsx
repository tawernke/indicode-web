import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import theme from "../theme";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  makeVar
} from "@apollo/client";
import { PaginatedPublicProducts } from "../generated/graphql";
import { Product } from "../types/types";

export const cartItemsVar = makeVar<Product[]>([]);

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          cartItems: {
            read() {
              return cartItemsVar()
            }
          }
        }
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
                publicProducts: [...(existing?.publicProducts || []), ...incoming.publicProducts]
              };
            },
          },
        },
      },
    },
  }),
  credentials: "include",
});

function MyApp({ Component, pageProps }: any) {
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

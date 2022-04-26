import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client/core";
import { ChakraProvider } from "@chakra-ui/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { AppProps } from "next/app";
import { PaginatedPublicProducts } from "../generated/graphql";
import theme from "../theme";
import { CartItem } from "../utils/useCartItems";

export const cartItemsVar = makeVar<CartItem[]>([]);

function MyApp({ Component, pageProps }: AppProps) {
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

  const initialOptions = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
    currency: "GBP",
    intent: "capture",
    // "data-client-token": "abc123xyz==",
  };

  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <PayPalScriptProvider options={initialOptions}>
          <Component {...pageProps} />
        </PayPalScriptProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;

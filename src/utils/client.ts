import { ApolloClient, InMemoryCache, makeVar, NormalizedCacheObject } from "@apollo/client/core";
import { PaginatedPublicProducts } from "../generated/graphql";
import { CartItem } from "./useCartItems";

export const cartItemsVar = makeVar<CartItem[]>([]);

export const setupApollo = async (): Promise<ApolloClient<NormalizedCacheObject>> => {
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

  // await persistCache({
  //   cache,
  //   storage: window.localStorage as any,
  //   maxSize: false,
  // });

  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache,
    credentials: "include",
  });

  return client;
};

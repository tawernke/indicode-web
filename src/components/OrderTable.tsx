import { Box, PseudoBox, Checkbox, Text } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { Order } from "../types/types";

interface OrderTableProps {
  orders: Order[]
}

export const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
  const router = useRouter();
  return (
    <>
      {orders.length ? (
        <Box as="table" w="100%" table-layout="auto" border-collapse="collapse">
          <Box as="thead" p={4} textAlign="left">
            <PseudoBox as="tr" my={1}>
              {["Shipped", "Date", "Name", "Email", "Total"].map(
                (column, index) => {
                  return (
                    <PseudoBox
                      as="th"
                      p={[2, 4]}
                      borderBottom="1px"
                      borderBottomColor="gray.200"
                      key={index}
                    >
                      {column}
                    </PseudoBox>
                  );
                }
              )}
            </PseudoBox>
          </Box>
          <Box as="tbody" p={4}>
            {orders.map(
              ({
                id,
                createdAt,
                firstName,
                lastName,
                email,
                total,
                shipped,
              }) => {
                return (
                  <PseudoBox
                    as="tr"
                    cursor="pointer"
                    onClick={() => router.push(`/admin/orders/${id}`)}
                    my={1}
                    key={id}
                  >
                    <PseudoBox
                      as="td"
                      p={4}
                      borderBottom="1px"
                      borderBottomColor="gray.200"
                    >
                      <Checkbox
                        isChecked={shipped}
                        onChange={(e) =>
                          console.log(e)
                        }
                      />
                    </PseudoBox>
                    <PseudoBox
                      as="td"
                      p={4}
                      borderBottom="1px"
                      borderBottomColor="gray.200"
                    >
                      <Text>{createdAt}</Text>
                    </PseudoBox>
                    <PseudoBox
                      as="td"
                      p={4}
                      borderBottom="1px"
                      borderBottomColor="gray.200"
                    >
                      <Text>
                        {firstName} {lastName}
                      </Text>
                    </PseudoBox>
                    <PseudoBox
                      as="td"
                      p={4}
                      borderBottom="1px"
                      borderBottomColor="gray.200"
                    >
                      <Text>{email}</Text>
                    </PseudoBox>
                    <PseudoBox
                      as="td"
                      p={4}
                      borderBottom="1px"
                      borderBottomColor="gray.200"
                    >
                      <Text>£{total}</Text>
                    </PseudoBox>
                  </PseudoBox>
                );
              }
            )}
          </Box>
        </Box>
      ) : (
        <Text>There are currently no shipped orders</Text>
      )}
    </>
  );
};

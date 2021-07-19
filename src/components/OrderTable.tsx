import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  PseudoBox,
  Text,
} from "@chakra-ui/core";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useUpdateOrderMutation } from "../generated/graphql";
import { Order } from "../types/types";

interface OrderTableProps {
  orders: Order[];
  shippedOrders: boolean;
}

export const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  shippedOrders,
}) => {
  const router = useRouter();
  const [updateOrder] = useUpdateOrderMutation();
  return (
    <>
      {orders.length ? (
        <Box as="table" w="100%" table-layout="auto" border-collapse="collapse">
          <Box as="thead" p={4} textAlign="left">
            <PseudoBox as="tr" my={1}>
              {["Date", "Name", "Email", "Total", ""].map((column, index) => {
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
              })}
            </PseudoBox>
          </Box>
          <Box as="tbody" p={4}>
            {orders.map(
              ({ id, createdAt, firstName, lastName, email, total }) => {
                return (
                  <PseudoBox as="tr" cursor="pointer" my={1} key={id}>
                    <PseudoBox
                      as="td"
                      p={4}
                      borderBottom="1px"
                      borderBottomColor="gray.200"
                    >
                      <Text>
                        {moment(parseInt(createdAt)).format("MM/DD/YYYY")}
                      </Text>
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
                    <PseudoBox
                      as="td"
                      p={4}
                      borderBottom="1px"
                      borderBottomColor="gray.200"
                      zIndex={10}
                    >
                      <Menu>
                        <MenuButton>
                          <BsThreeDotsVertical />
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            onClick={() => router.push(`/admin/orders/${id}`)}
                          >
                            View Order
                          </MenuItem>
                          {!shippedOrders && (
                            <MenuItem
                              onClick={() =>
                                updateOrder({
                                  variables: {
                                    id,
                                    input: {
                                      shipped: true,
                                    },
                                  },
                                })
                              }
                            >
                              Mark as Shipped
                            </MenuItem>
                          )}
                        </MenuList>
                      </Menu>
                    </PseudoBox>
                  </PseudoBox>
                );
              }
            )}
          </Box>
        </Box>
      ) : (
        <Text>There are currently no orders</Text>
      )}
    </>
  );
};

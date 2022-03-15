import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  StandardOrderFragment,
  useUpdateOrderMutation,
} from "../generated/graphql";

interface OrderTableProps {
  orders: StandardOrderFragment[];
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
            <Box as="tr" my={1}>
              {["Date", "Name", "Email", "Total", ""].map((column, index) => {
                return (
                  <Box
                    as="th"
                    p={[2, 4]}
                    borderBottom="1px"
                    borderBottomColor="gray.200"
                    key={index}
                  >
                    {column}
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box as="tbody" p={4}>
            {orders.map(
              ({ id, createdAt, firstName, lastName, email, total }) => {
                return (
                  <Box as="tr" cursor="pointer" my={1} key={id}>
                    <Box
                      as="td"
                      p={4}
                      borderBottom="1px"
                      borderBottomColor="gray.200"
                    >
                      <Text>
                        {moment(parseInt(createdAt)).format("MM/DD/YYYY")}
                      </Text>
                    </Box>
                    <Box
                      as="td"
                      p={4}
                      borderBottom="1px"
                      borderBottomColor="gray.200"
                    >
                      <Text>
                        {firstName} {lastName}
                      </Text>
                    </Box>
                    <Box
                      as="td"
                      p={4}
                      borderBottom="1px"
                      borderBottomColor="gray.200"
                    >
                      <Text>{email}</Text>
                    </Box>
                    <Box
                      as="td"
                      p={4}
                      borderBottom="1px"
                      borderBottomColor="gray.200"
                    >
                      <Text>£{total}</Text>
                    </Box>
                    <Box
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
                    </Box>
                  </Box>
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

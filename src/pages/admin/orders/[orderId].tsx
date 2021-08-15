import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { useOrderQuery } from "../../../generated/graphql";

interface OrderDetailProps {}

const OrderDetail: React.FC<OrderDetailProps> = ({}) => {
  const router = useRouter();

  const id =
    typeof router.query.orderId === "string" ? router.query.orderId : "";
  const { data, loading } = useOrderQuery({ variables: { id } });

  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        position="absolute"
        left="50%"
        top="50%"
      />
    );
  }

  if (!data?.order) return null;
  const { order } = data;

  return (
    <PageLayout>
      <Heading
        as="h1"
        my={[6, 0]}
        size="2xl"
        fontWeight="bold"
        lineHeight="short"
      >
        Order Details
      </Heading>
      <Text>
        Shipped Status: {order.shipped ? "Shipped" : "Awaiting Shipment"}
      </Text>
      <Text>Order ID: {order.id}</Text>
      <Text pt={10} fontWeight="bold">
        Customer Details
      </Text>
      <Text>First Name: {order.firstName}</Text>
      <Text>Last Name: {order.lastName}</Text>
      <Text>Email: {order.email}</Text>
      <Text pt={10} fontWeight="bold">
        Shipping Address
      </Text>
      <Text>Street: {order.address}</Text>
      <Text>City: {order.city}</Text>
      <Text>Postal Code: {order.zip}</Text>
      <Text>Country: {order.country}</Text>
      <Text pt={10} fontWeight="bold">
        Order Items
      </Text>
      <Box
        as="table"
        w="100%"
        mb={10}
        table-layout="auto"
        border-collapse="collapse"
      >
        <Box as="thead" p={4} textAlign="left">
          <Box as="tr" my={1}>
            {["Name", "Price", "Quantity", "Total"].map((column, index) => {
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
          {order.orderItems.map(
            ({ id, productName, quantity, price, total }) => {
              return (
                <Box as="tr" cursor="pointer" my={1} key={id}>
                  <Box
                    as="td"
                    p={4}
                    borderBottom="1px"
                    borderBottomColor="gray.200"
                  >
                    <Text>{productName}</Text>
                  </Box>
                  <Box
                    as="td"
                    p={4}
                    borderBottom="1px"
                    borderBottomColor="gray.200"
                  >
                    <Text>£{price}</Text>
                  </Box>
                  <Box
                    as="td"
                    p={4}
                    borderBottom="1px"
                    borderBottomColor="gray.200"
                  >
                    <Text>{quantity}</Text>
                  </Box>
                  <Box
                    as="td"
                    p={4}
                    borderBottom="1px"
                    borderBottomColor="gray.200"
                  >
                    <Text>£{total}</Text>
                  </Box>
                </Box>
              );
            }
          )}
          <Box as="td" p={4} borderBottom="1px" borderBottomColor="gray.200">
            <Text></Text>
          </Box>
          <Box as="td" p={4} borderBottom="1px" borderBottomColor="gray.200">
            <Text></Text>
          </Box>
          <Box as="td" p={4} borderBottom="1px" borderBottomColor="gray.200">
            <Text></Text>
          </Box>
          <Box
            as="td"
            p={4}
            borderBottom="1px"
            fontWeight="bold"
            borderBottomColor="gray.200"
          >
            <Text>£{order.total}</Text>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default OrderDetail;

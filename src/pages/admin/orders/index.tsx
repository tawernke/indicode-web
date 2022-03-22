import { Box, Heading, Spinner } from "@chakra-ui/react";
import React from "react";
import { OrderTable } from "../../../components/OrderTable";
import { PageLayout } from "../../../components/PageLayout";
import { useOrdersQuery } from "../../../generated/graphql";
import { useAdminAuth } from "../../../utils/useAuth";

const ViewOrders: React.FC = ({}) => {
  useAdminAuth();
  const { data, loading } = useOrdersQuery();

  if (!data && loading) {
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

  if (!data) return null;

  const { shippedOrders, unShippedOrders } = data;

  return (
    <PageLayout>
      <Heading my={10}>Orders to Ship</Heading>
      <OrderTable
        shippedOrders={false}
        orders={unShippedOrders.unShippedOrders}
      />
      <Heading my={10}>Historical Orders</Heading>
      <Box mb={20}>
        <OrderTable shippedOrders={true} orders={shippedOrders.shippedOrders} />
      </Box>
    </PageLayout>
  );
};

export default ViewOrders;

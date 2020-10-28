import { Spinner, Text } from "@chakra-ui/core";
import { useRouter } from 'next/router';
import React from 'react';
import { PageLayout } from "../../../components/PageLayout";
import { useOrderQuery } from '../../../generated/graphql';

interface OrderDetailProps {

}

const OrderDetail: React.FC<OrderDetailProps> = ({}) => {
  const router = useRouter();
  
  const id =
    typeof router.query.orderId === "string" ? router.query.orderId : "";
  const { data, loading } = useOrderQuery({ variables: { id } });
  console.log(data)

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
    )
  }
  
  return (
    <PageLayout>
      <Text>Single Order</Text>
    </PageLayout>
  );
}

export default OrderDetail
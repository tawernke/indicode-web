import { Text } from '@chakra-ui/core';
import React from 'react'
import { PageLayout } from '../../components/PageLayout';
import { useOrdersQuery } from '../../generated/graphql';
import { useAdminAuth } from '../../utils/useAuth';

interface ViewOrdersProps {

}

const ViewOrders: React.FC<ViewOrdersProps> = ({}) => {
  useAdminAuth();

  const { data, loading } = useOrdersQuery();
  console.log(data)
  return (
    <PageLayout>
      <Text>Orders</Text>
    </PageLayout>
  );
}

export default ViewOrders
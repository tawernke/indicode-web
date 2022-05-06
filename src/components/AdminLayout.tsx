import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useAdminAuth } from '../utils/useAuth';
import { NavBar } from './Navbar';
import { Wrapper, WrapperVariant } from './Wrapper';

interface LayoutProps {
  variant?: WrapperVariant;
}

export const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  const { data, loading } = useAdminAuth();

  if (loading || !data) {
    return <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
      position="absolute"
      left="50%"
      top="50%"
    />;
  }

  if (!data.me) return null;
  
  return (
    <Box h={'100vh'} w={'100vw'}>
      <NavBar />
      <Wrapper variant={'regular'}>
        {children}
      </Wrapper>
    </Box>
  );
};

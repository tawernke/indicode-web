import { Box } from '@chakra-ui/react';
import React from 'react'

interface ButtonProps {

}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <Box
      as="button"
      bg="teal.500"
      py={2}
      px={4}
      ml={3}
      rounded="md"
      fontWeight="semibold"
      color="white"
    >
      {children}
    </Box>
  );
}

export default Button
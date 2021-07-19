import { PseudoBox } from '@chakra-ui/core';
import React from 'react'

interface ButtonProps {

}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <PseudoBox
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
    </PseudoBox>
  );
}

export default Button
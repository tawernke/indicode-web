import { Box } from "@chakra-ui/react";
import React from "react";

export type WrapperVariant = "small" | "regular" | "full"

interface WrapperProps {
  variant?: WrapperVariant
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant,
}) => {
  return (
    <Box
      mx="auto"
      px={[
        '20px',
        '0px'
      ]}
      maxW={variant === "regular" ? "900px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
};

import { Box } from "@chakra-ui/core";
import React from "react";

export type WrapperVariant = "small" | "regular" | "full"

interface WrapperProps {
  variant?: WrapperVariant
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      mx="auto"
      px={[
        '20px',
        '0px'
      ]}
      maxW={variant === "full" ? "100vw" : "regular" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
};

import { Box } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "./Navbar";
import { Wrapper, WrapperVariant } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
}

export const PageLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box h={"100vh"} w={"100vw"}>
      <NavBar />
      <Wrapper variant={"regular"}>{children}</Wrapper>
    </Box>
  );
};

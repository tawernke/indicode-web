import React from "react";
import { Wrapper, WrapperVariant } from "./Wrapper";
import { NavBar } from "./Navbar";

interface LayoutProps {
  variant?: WrapperVariant;
}

export const PageLayout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

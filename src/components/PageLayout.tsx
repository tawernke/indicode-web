import React from "react";
import { NavBar } from "./Navbar";
import { Wrapper, WrapperVariant } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
}

export const PageLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={"regular"}>{children}</Wrapper>
    </>
  );
};

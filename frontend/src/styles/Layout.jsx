import React from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";

const Layout = ({ children }) => {
  return (
    <LayoutStyled>
      <NavBar />
      {children}
    </LayoutStyled>
  );
};

const LayoutStyled = styled.div`
  width: 100%;
  height: 100%;
`;

export default Layout;

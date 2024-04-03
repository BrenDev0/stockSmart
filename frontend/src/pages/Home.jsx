import { useGlobalContext } from "../context/GlobalContext";
import ToolBar from "../components/Toolbar";
import styled from "styled-components";
import React from "react";
import History from "../components/History";
import Dashboard from "../components/Dashboard";
import { useState } from "react";
import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <MainStyled>
      <NavBar />
      <Dashboard />
    </MainStyled>
  );
};

const MainStyled = styled.main`
  width: 100vw;
  height: 100%;
`;

export default Home;

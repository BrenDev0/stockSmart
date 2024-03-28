import { useGlobalContext } from "../context/GlobalContext";
import ToolBar from "../components/Toolbar";
import styled from "styled-components";
import React from "react";
import History from "../components/History";
import Dashboard from "../components/Dashboard";
import { useState } from "react";

const Home = () => {
  const [display, setDisplay] = useState(1);

  function displayData() {
    switch (display) {
      case 1:
        return <Dashboard />;
      case 5:
        return <History />;
      default:
        return <Dashboard />;
    }
  }

  return (
    <div>
      <ToolBar display={display} setDisplay={setDisplay} />
      <MainStyled>{displayData()}</MainStyled>
    </div>
  );
};

const MainStyled = styled.main`
  width: 100%;
  height: 86vh;
`;

export default Home;

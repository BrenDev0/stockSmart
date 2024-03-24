import NavBar from "./components/Navbar";

import Dashboard from "./components/Dashboard";
import styled from "styled-components";
import { useState } from "react";
import TradeModal from "./components/TradeModal";
import { useGlobalContext } from "./context/GlobalContext";
import History from "./components/History";

function App() {
  const { tradeModal } = useGlobalContext();
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
    <>
      {tradeModal && <TradeModal />}
      <NavBar display={display} setDisplay={setDisplay} />

      <MainStyled>{displayData()}</MainStyled>
    </>
  );
}

const MainStyled = styled.main`
  width: 100%;
  height: 86vh;
`;

export default App;

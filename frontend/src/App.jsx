import NavBar from "./components/Navbar";
import GlobalStyle from "./styles/globalStyle";
import Dashboard from "./components/Dashboard";
import styled from "styled-components";
import { useState } from "react";
import TradeModal from "./components/TradeModal";
import { useGlobalContext } from "./context/GlobalContext";

function App() {
  const { tradeModal } = useGlobalContext();
  const [display, setDisplay] = useState(1);

  function displayData() {
    switch (display) {
      case 1:
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  }

  return (
    <>
      <GlobalStyle />
      {tradeModal && <TradeModal />}
      <NavBar display={display} setDisplay={setDisplay} />

      <MainStyled>{displayData()}</MainStyled>
    </>
  );
}

const MainStyled = styled.main`
  width: 100%;
  height: 100%;
`;

export default App;

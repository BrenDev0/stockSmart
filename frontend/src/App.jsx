import { useGlobalContext } from "./context/GlobalContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TradeModal from "./components/TradeModal";
import Home from "./pages/Home";

function App() {
  const { tradeModal } = useGlobalContext();

  return (
    <BrowserRouter>
      {tradeModal && <TradeModal />}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

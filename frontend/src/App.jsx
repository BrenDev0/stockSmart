import { useGlobalContext } from "./context/GlobalContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TradeModal from "./components/TradeModal";
import Home from "./pages/Home";
import Login from "./pages/Login";
import axios from "axios";
import Balances from "./components/Balances";
import { TradeProvider } from "./context/TradeContext";
import { WatchlistProvider } from "./context/WatchlistContext";

axios.defaults.withCredentials = true;

function App() {
  const { tradeModal, user } = useGlobalContext();

  return (
    <BrowserRouter>
      {tradeModal && <TradeModal />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

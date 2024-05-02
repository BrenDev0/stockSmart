import { useGlobalContext } from "./context/GlobalContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TradeModal from "./components/TradeModal";
import Home from "./pages/Home";
import Login from "./pages/Login";
import axios from "axios";
import News from "./pages/News";
import Pricing from "./pages/Pricing";
import History from "./pages/History";

axios.defaults.withCredentials = true;

function App() {
  const { tradeModal } = useGlobalContext();

  return (
    <BrowserRouter>
      {tradeModal && <TradeModal />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/news/:param" element={<News />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

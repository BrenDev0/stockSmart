import { useGlobalContext } from "./context/GlobalContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TradeModal from "./components/TradeModal";
import Home from "./pages/Home";
import Login from "./pages/Login";
import axios from "axios";
import News from "./pages/News";
import Pricing from "./pages/Pricing";

axios.defaults.withCredentials = true;

function App() {
  const { tradeModal, user } = useGlobalContext();

  return (
    <BrowserRouter>
      {tradeModal && <TradeModal />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/news/:param" element={<News />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

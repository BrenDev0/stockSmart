import { useGlobalContext } from "./context/GlobalContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TradeModal from "./components/TradeModal";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import axios from "axios";
import News from "./pages/News";
import Pricing from "./pages/Pricing";
import History from "./pages/History";
import WatchlistsPage from "./pages/WatchlistsPage";
import Valuation from "./pages/Valuation";

axios.defaults.withCredentials = true;

function App() {
  const { tradeModal } = useGlobalContext();

  return (
    <BrowserRouter>
      {tradeModal && <TradeModal />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/news/:param" element={<News />} />
        <Route path="/valuation" element={<Valuation />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/history" element={<History />} />
        <Route path="/watchlists" element={<WatchlistsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;

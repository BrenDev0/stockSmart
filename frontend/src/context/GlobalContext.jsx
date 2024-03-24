import { useContext, createContext, useState } from "react";
import axios from "axios";
import { quoteKey, detailKey } from "../keys";

const TRADE_URL = "http://localhost:5000/api/trade/";
const WATCHLIST_URL = "http://localhost:5000/api/watchlists/";
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  //balances state
  const [cashBalance, setCashBalance] = useState(0);
  //positions state--------------------------------------------------
  const [positions, setPositions] = useState([]);
  const [history, setHistory] = useState([]);
  //watchlist state -----------------------------------------
  const [watchlist, setwatchlist] = useState([]);
  const [editWatchlist, setEditWatchlist] = useState(false);
  const [selectedWl, setSelectedWl] = useState("Watchlists");
  //errors------------------------------------------------------------------
  const [error, setError] = useState(null);
  //modal displays and forms-----------------------------------------------------------
  const [tradeModal, setTradeModal] = useState(false);
  const [fullDisplay, setFullDisplay] = useState(false);

  const [form, setForm] = useState({
    ticker: "",
    shares: "",
    open: "",
    cost: "",
    mark: "",
    icon: "",
    logo: "",
  });

  const [search, setSearch] = useState("");
  const [details, setDetails] = useState({});
  const [quote, setQuote] = useState({});
  const [icon, setIcon] = useState("");
  const [logo, setLogo] = useState("");

  //---------------functions---------

  const companySearch = async (ticker) => {
    try {
      const [res1, res2] = await Promise.all([
        fetch(
          `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${quoteKey}`
        ),
        fetch(
          `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${detailKey}`
        ),
        ,
      ]);

      const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

      setQuote(data1);

      setDetails(data2.results);
      setLogo(`${data2.results.branding.logo_url}?apiKey=${detailKey}`);

      setIcon(`${data2.results.branding.icon_url}?apiKey=${detailKey}`);
    } catch (error) {
      console.log(error);
    }
  };

  // update or close trade modal

  const editTrade = async (ticker) => {
    await companySearch(ticker);
    setFullDisplay(true);
    setTradeModal(true);
  };

  //-------TRADE---------------------------------------

  // open a new position

  const newPosition = async (position) => {
    try {
      await axios.post(`${TRADE_URL}new-trade`, position);
      getPositions();
    } catch (error) {
      console.log(error);
    }
  };

  //get trade history
  const tradeHistory = async () => {
    const response = await axios.get(`${TRADE_URL}get-trades`);
    setHistory(response.data);
  };

  //get open positions
  const getPositions = async () => {
    const response = await axios.get(`${TRADE_URL}get-positions`);
    setPositions(response.data);
  };

  //update an open position
  const updatePosition = async (id, data) => {
    await axios.put(`${TRADE_URL}update-trade/${id}`, data);
    getPositions();
  };

  //delete a trade

  const deleteTrade = async (id) => {
    await axios.delete(`${TRADE_URL}delete-trade/${id}`);
    getPositions();
  };

  //-------------------WATCHLIST--------------
  //get watchlists
  const getWatchlists = async () => {
    const response = await axios.get(`${WATCHLIST_URL}get-watchlists`);
    setwatchlist(response.data);
  };

  // add a ticker to watchlist
  const addToWatchlist = async (id, ticker) => {
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${quoteKey}`
      );
      const data = await response.json();

      await axios.put(`${WATCHLIST_URL}add-to-watchlist/${id}`, {
        ticker: ticker,
        mark: data.c,
      });

      const select = await axios.get(`${WATCHLIST_URL}find-watchlist/${id}`);
      setSelectedWl(select.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  //delete an item from watchlist

  const deleteFromWatchlist = async (id, data) => {
    try {
      await axios.put(`${WATCHLIST_URL}remove-from-watchlist/${id}`, data);
      const select = await axios.get(`${WATCHLIST_URL}find-watchlist/${id}`);

      setSelectedWl(select.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        cashBalance,
        positions,
        history,
        watchlist,
        editWatchlist,
        selectedWl,
        error,
        tradeModal,
        fullDisplay,
        form,
        search,
        details,
        quote,
        icon,
        logo,
        setDetails,
        setQuote,
        setIcon,
        setSearch,
        setFullDisplay,
        setForm,
        tradeHistory,
        getPositions,
        updatePosition,
        deleteTrade,
        addToWatchlist,
        getWatchlists,
        setEditWatchlist,
        deleteFromWatchlist,
        setSelectedWl,
        setTradeModal,
        newPosition,
        companySearch,
        editTrade,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

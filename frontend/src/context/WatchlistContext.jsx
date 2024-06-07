import { createContext, useContext, useState } from "react";
import axios from "axios";
import { quoteKey } from "../keys";
import { useGlobalContext } from "./GlobalContext";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const WATCHLIST_URL = "http://localhost:5000/api/watchlists/";
  const { setError } = useGlobalContext();
  //state -----------------------------------------

  const [watchlist, setwatchlist] = useState([]);
  const [editWatchlist, setEditWatchlist] = useState(false);
  const [selectedWl, setSelectedWl] = useState("Watchlists");

  //functions --------------------------------------------------

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
      console.log(error);
      setError(error.response.data.message);
    }
  };

  //delete an item from watchlist

  const deleteFromWatchlist = async (wlid, id) => {
    try {
      await axios.put(`${WATCHLIST_URL}remove-from-watchlist/${wlid}`, {_id: id});
      await getWatchlists()
      const select = await axios.get(`${WATCHLIST_URL}find-watchlist/${wlid}`)
      setSelectedWl(select.data)
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };
  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        setwatchlist,
        editWatchlist,
        setEditWatchlist,
        selectedWl,
        setSelectedWl,
        deleteFromWatchlist,
        addToWatchlist,
        getWatchlists,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlistContext = () => useContext(WatchlistContext);

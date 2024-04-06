import { createContext, useContext, useState } from "react";
import { useGlobalContext } from "./GlobalContext";
import axios from "axios";

const TradeContext = createContext();

export const TradeProvider = ({ children }) => {
  const TRADE_URL = "http://localhost:5000/api/trade/";
  const { setError } = useGlobalContext();

  ///state ---------------------
  const [positions, setPositions] = useState([]);
  const [history, setHistory] = useState([]);

  //functions-----------------------------------

  // open a new position

  const newPosition = async (position) => {
    try {
      await axios.post(`${TRADE_URL}new-trade`, position);
      getPositions();
      tradeHistory();
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
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
    tradeHistory();
  };

  //delete a trade

  const deleteTrade = async (id) => {
    await axios.delete(`${TRADE_URL}delete-trade/${id}`);
    getPositions();
    tradeHistory();
  };

  return (
    <TradeContext.Provider
      value={{
        positions,
        setPositions,
        history,
        setHistory,
        updatePosition,
        deleteTrade,
        getPositions,
        tradeHistory,
        newPosition,
      }}
    >
      {children}
    </TradeContext.Provider>
  );
};

export const useTradeContext = () => {
  return useContext(TradeContext);
};

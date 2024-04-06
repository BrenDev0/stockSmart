import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import noLogo from "../images/arrow.jpg";
import { quoteKey, detailKey } from "../keys";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const USER_URL = "http://localhost:5000/api/user";
  const [user, setUser] = useState({
    user: "logged off",
    status: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  //modal displays and forms-----------------------------------------------------------
  const [tradeModal, setTradeModal] = useState(false);
  const [fullDisplay, setFullDisplay] = useState(false);
  const [dividendDisplay, setDividendDisplay] = useState(false);

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
  const getUser = async () => {
    try {
      setIsLoading(true);
      const user = await axios.get(USER_URL);
      setUser(user.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

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
      data2.results.branding
        ? setLogo(`${data2.results.branding.logo_url}?apiKey=${detailKey}`)
        : setLogo(noLogo);

      data2.results.branding
        ? setIcon(`${data2.results.branding.icon_url}?apiKey=${detailKey}`)
        : setIcon(noLogo);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  // update or close trade modal

  const editTrade = async (ticker) => {
    await companySearch(ticker);
    setFullDisplay(true);
    setTradeModal(true);
  };

  return (
    <GlobalContext.Provider
      value={{
        error,
        tradeModal,
        fullDisplay,
        form,
        search,
        details,
        quote,
        icon,
        logo,
        user,
        isLoading,
        dividendDisplay,
        setDividendDisplay,
        editTrade,
        setIsLoading,
        setUser,
        setError,
        setDetails,
        setQuote,
        setIcon,
        setSearch,
        setFullDisplay,
        setForm,
        setTradeModal,
        companySearch,
        getUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

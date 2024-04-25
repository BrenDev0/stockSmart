import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import { TradeProvider } from "./context/TradeContext.jsx";
import { WatchlistProvider } from "./context/WatchlistContext.jsx";
import GlobalStyle from "./styles/globalStyle.jsx";
import { ModelsProvider } from "./context/ModelsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalProvider>
    <TradeProvider>
      <WatchlistProvider>
        <GlobalStyle />
        <ModelsProvider>
          <App />
        </ModelsProvider>
      </WatchlistProvider>
    </TradeProvider>
  </GlobalProvider>
);

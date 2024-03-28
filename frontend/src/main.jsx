import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import { AuthcontexProvider } from "./context/authContext.jsx";
import GlobalStyle from "./styles/globalStyle.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthcontexProvider>
      <GlobalProvider>
        <GlobalStyle />
        <App />
      </GlobalProvider>
    </AuthcontexProvider>
  </React.StrictMode>
);

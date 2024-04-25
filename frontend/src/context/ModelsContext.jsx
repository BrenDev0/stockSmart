import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "./GlobalContext";

const ModelsContext = createContext();

export const ModelsProvider = ({ children }) => {
  const MODELS_URL = "http://localhost:5000/api/price-models/";
  const { setError } = useGlobalContext();
  const [pricingModels, setPricingModels] = useState([]);

  const newPriceModel = async (model) => {
    try {
      await axios.post(`${MODELS_URL}new-price-model`, model);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <ModelsContext.Provider
      value={{
        newPriceModel,
      }}
    >
      {children}
    </ModelsContext.Provider>
  );
};

export const useModelsContext = () => useContext(ModelsContext);

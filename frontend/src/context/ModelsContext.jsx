import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "./GlobalContext";

const ModelsContext = createContext();

export const ModelsProvider = ({ children }) => {
  const MODELS_URL = "http://localhost:5000/api/price-models/";
  const { setError } = useGlobalContext();
  const [pricingModels, setPricingModels] = useState([]);
  const { getUser } = useGlobalContext();
  //-------new model-----------------
  const newPriceModel = async (model) => {
    try {
      await axios.post(`${MODELS_URL}new-price-model`, model);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  //-----------------get models-------------

  const getPricingModels = async () => {
    try {
      await getUser();
      const res = await axios.get(`${MODELS_URL}get-pricing-models`);
      setPricingModels(res.data);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <ModelsContext.Provider
      value={{
        newPriceModel,
        getPricingModels,
        pricingModels,
      }}
    >
      {children}
    </ModelsContext.Provider>
  );
};

export const useModelsContext = () => useContext(ModelsContext);

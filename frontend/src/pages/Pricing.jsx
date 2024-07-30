import React, { useEffect, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Row from "../components/Row";
import { modelKey, quoteKey } from "../keys";
import axios from "axios";
import { money } from "../utils/money.format";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { useModelsContext } from "../context/ModelsContext";
import LoadingPage from "../components/Skeletons/LoadingPage";
import Layout from "../styles/Layout"
import PricingTable from "../components/PricingTable";
import MediansTable from "../components/MediansTable";
import CorrelationsTable from "../components/CorrelationsTable";
import PriceModelForm from "../components/PriceModelForm";

const Pricing = () => {
  const { user, getUser, isLoading, setIsLoading } = useGlobalContext();
  const {
    newPriceModel,
    getPricingModels,
    pricingModels,
    findModel,
    updateModel,
    deletePriceModel,
  } = useModelsContext();
  const navigate = useNavigate();
 
  useEffect(() => {
    getUser().then(getPricingModels());
    setTimeout(() => {
      if (user === null) {
        return null;
      }
      if (user) {
        return setIsLoading(false);
      }
      if (!user) {
        return navigate("/login");
      }
    }, 2000);
  }, [user]);

  const loadModel = async (id) => {
    setLoadingModel(true);
    const model = await findModel(id);
    setSelectModelDd(false);
    const updatedData = [];
    for (let i = 0; i < model.data.length; i++) {
      const res = await Promise.all([
        fetch(
          `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${model.data[i].ticker.toUpperCase()}?apikey=${modelKey}`
        ),
        fetch(
          `https://finnhub.io/api/v1/quote?symbol=${model.data[i].ticker.toUpperCase()}&token=${quoteKey}`
        )
      ]);

      const data = await Promise.all(res.map((r) => r.json()));
      
      updatedData.push({
        ticker: model.data[i].ticker.toUpperCase(),
        price: data[1].c,
        mc: data[0][0].marketCapTTM / 1000000,
        tbv: data[0][0].marketCapTTM / data[0][0].ptbRatioTTM / 1000000,
        fcf: data[0][0].marketCapTTM / data[0][0].pfcfRatioTTM / 1000000,
        rev: data[0][0].marketCapTTM / data[0][0].priceToSalesRatioTTM / 1000000,
        ni: data[0][0].marketCapTTM / data[0][0].peRatioTTM / 1000000,
        roe: data[0][0].roeTTM * 100,
        roic: data[0][0].roicTTM * 100,
        ptb: data[0][0].ptbRatioTTM,
        ps: data[0][0].priceToSalesRatioTTM,
        pe: data[0][0].peRatioTTM < 0 ? 0 : data[0][0].peRatioTTM,
        pfcf: data[0][0].pfcfRatioTTM < 0 ? 0 : data[0][0].pfcfRatioTTM,
      });
    }

    const newModel = await updateModel(id, { data: updatedData });
    setCompanies(
      updatedData.sort((a, b) => a.ticker.localeCompare(b.ticker))
    );
    setModel({ ...model, name: newModel.name });
    setLoadingModel(false);
  };

  const saveModel = async () => {
    try {
      if (!model.name) {
        return setError("Please add required title to model");
      }
      await newPriceModel(model);
      setCompanies([]);
      setMedianPe(null);
      setModel({ ...model, name: "" });
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  

  return isLoading ? (
    <LoadingPage />
  ) : (
    <Layout>
      <PricingStyled>
      <div className="model-features">
          <PriceModelForm />
          <MediansTable />
          <CorrelationsTable />
      </div>
      <div className="table">
        <PricingTable />
      </div>
    </PricingStyled>
    </Layout>
  );
};

const PricingStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;


  .model-features {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 25%;
    padding: 10px 0 10px 0;
  }

  .table {
    padding: 20px;
    width: 75%;
  }

`;

export default Pricing;

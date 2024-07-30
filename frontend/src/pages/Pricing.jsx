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
    loadingModel,
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
      {
        loadingModel ? 
          <div
          className="skeleton"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: '100%',
            height: "80vh",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <span
            style={{
              fontFamily: '"Dancing Script", cursive',
              color: "var(--red)",
              fontSize: "2rem",
            }}
          >
            StockSmart
          </span>
        </div>
        :
        <div className="table">
        <PricingTable />
      </div>
      }
    </PricingStyled>
    </Layout>
  );
};

const PricingStyled = styled.div`
  width: 100%;
  height: 90%;
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

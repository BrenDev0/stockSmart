import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Row from "../components/Row";
import { modelKey } from "../keys";
import axios from "axios";

const Pricing = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [model, setModel] = useState({
    name: "",
    data: companies,
  });

  const addToModel = async (e) => {
    e.preventDefualt();
    const res = await axios.get(
      `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${search.toUpperCase()}?apikey=${modelKey}`
    );
    const data = await res.json();

    console.log(data);
  };

  return (
    <PricingStyled>
      <NavBar />
      <div className="form-con">
        <form onSubmit={(e) => addToModel(e)}>
          <div className="form-inputs">
            <label htmlFor="">Model title</label>
            <input
              value={model.name}
              onChange={(e) => setModel({ ...model, name: e.target.value })}
              type="text"
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="">Add a company to the model</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="search"
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>

      <div className="model">
        <Row
          data={[
            "Company",
            "Market Cap",
            "EV",
            "Tangible Book",
            "Revenues",
            "Net Income",
            "ROE",
            "ROIC",
            "PTB",
            "PS",
            "PE",
          ]}
        />
      </div>
    </PricingStyled>
  );
};

const PricingStyled = styled.div`
  width: 100%;
  height: 100%;

  .form-con {
    background: var(--light);
    width: 25%;
    height: 25%;
    border-radius: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
  }

  .form-inputs {
    display: flex;
    flex-direction: column;
  }

  button {
    color: var(--dark);
    padding: 5px;
    border-radius: 10px;
    font-size: 1vw;
    width: 25%;
    transition: 0.5s;
    border: none;
  }

  button:active {
    transform: scale(1.2);
  }

  .model {
    width: 100%;
    padding: 10px;
  }
`;

export default Pricing;

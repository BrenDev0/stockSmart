import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Row from "../components/Row";
import { modelKey } from "../keys";
import axios from "axios";
import { money } from "../utils/money.format";

const Pricing = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [AveragePe, setAveragePe] = useState(null);
  const [AveragePs, setAveragePs] = useState(null);
  const [AveragePtb, setAveragePtb] = useState(null);
  const [AverageRoe, setAverageRoe] = useState(null);
  const [AverageRoic, setAverageRoic] = useState(null);

  const [model, setModel] = useState({
    name: "",
    data: companies,
  });

  useEffect(() => {
    if (companies.length > 0) {
      let pe = companies.map((com) => com.pe);
      setAveragePe(
        Number((pe.reduce((a, b) => a + b, 0) / pe.length).toFixed(2))
      );
      let ps = companies.map((com) => com.ps);
      setAveragePs(
        Number((ps.reduce((a, b) => a + b, 0) / ps.length).toFixed(2))
      );

      let ptb = companies.map((com) => com.ptb);
      setAveragePtb(
        Number((ptb.reduce((a, b) => a + b, 0) / ptb.length).toFixed(2))
      );
      let roe = companies.map((com) => com.roe);
      setAverageRoe(
        Number((roe.reduce((a, b) => a + b, 0) / roe.length).toFixed(2))
      );
      let roic = companies.map((com) => com.roic);
      setAverageRoic(
        Number((roic.reduce((a, b) => a + b, 0) / roic.length).toFixed(2))
      );
    }

    setModel({ ...model, data: companies });
  }, [companies]);

  const addToModel = (e) => {
    try {
      e.preventDefault();

      fetch(
        `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${search.toUpperCase()}?apikey=${modelKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCompanies([
            ...companies,
            {
              ticker: search.toUpperCase(),
              mc: data[0].marketCapTTM / 1000000000,
              ev: data[0].enterpriseValueTTM / 1000000000,
              tbv: (data[0].ptbRatioTTM * data[0].marketCapTTM) / 1000000000,
              rev:
                (data[0].priceToSalesRatioTTM * data[0].marketCapTTM) /
                1000000000,
              ni: (data[0].peRatioTTM * data[0].marketCapTTM) / 1000000000,
              roe: data[0].roeTTM * 100,
              roic: data[0].roicTTM * 100,
              ptb: data[0].ptbRatioTTM,
              ps: data[0].priceToSalesRatioTTM,
              pe: data[0].peRatioTTM,
            },
          ]);

          setSearch("");
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PricingStyled>
      <NavBar />
      <div className="model-features">
        <div className="con">
          <form onSubmit={addToModel}>
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
            <button>Add</button>
          </form>
        </div>

        <div className="con">
          <Row data={["AVERAGES"]} />
          <Row data={["PE", "PS", "PTB", "ROE", "ROIC"]} />
          {companies.length > 0 && (
            <Row
              data={[
                AveragePe,
                AveragePs,
                AveragePtb,
                AverageRoe + "%",
                AverageRoic + "%",
              ]}
            />
          )}
        </div>
        <div className="con">
          <Row data={["MEDIANS"]} />
          <Row data={["PE", "PS", "PTB", "ROE", "ROIC"]} />
        </div>
        <div className="con">
          <Row data={["MATRIX"]} />
          <Row data={["PE", "PS", "PTB", "ROE", "ROIC"]} />
        </div>
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
            "Remove",
          ]}
        />
        {companies
          ? companies.map((com) => {
              return (
                <Row
                  key={com.ticker}
                  data={[
                    com.ticker,
                    money.format(com.mc),
                    money.format(com.ev),
                    money.format(com.tbv),
                    money.format(com.rev),
                    money.format(com.ni),
                    Number(com.roe.toFixed(2)) + "%",
                    Number(com.roic.toFixed(2)) + "%",
                    Number(com.ptb.toFixed(2)),
                    Number(com.ps.toFixed(2)),
                    Number(com.pe.toFixed(2)),
                    <i
                      className="fa-regular fa-trash-can"
                      onClick={(e) => {
                        console.log(com.ticker);
                        setCompanies(
                          companies.filter((c) => c.ticker !== com.ticker)
                        );
                      }}
                    ></i>,
                  ]}
                />
              );
            })
          : null}
      </div>
    </PricingStyled>
  );
};

const PricingStyled = styled.div`
  width: 100%;
  height: 100%;

  .con {
    width: 25%;
    height: 100%;
    border-radius: 10px;
    margin: 5px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    background: var(--light);
    border-radius: 10px;
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

  .model-features {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 25%;
    width: 100%;
    padding-top: 10px;
  }

  .model {
    width: 100%;
    padding: 10px;
  }
`;

export default Pricing;

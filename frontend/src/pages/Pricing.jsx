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
  const [AveragePe, setAveragePe] = useState();
  const [AveragePs, setAveragePs] = useState();
  const [AveragePtb, setAveragePtb] = useState();
  const [AverageRoe, setAverageRoe] = useState();
  const [AverageRoic, setAverageRoic] = useState();
  const [medianPe, setMedianPe] = useState();
  const [medianPs, setMedianPs] = useState();
  const [medianPtb, setMedianPtb] = useState();
  const [medianRoe, setMedianRoe] = useState();
  const [medianRoic, setmedianRoic] = useState();
  const [revCor, setRevCor] = useState();
  const [niCor, setNiCor] = useState();
  const [tbvCor, setTbvCor] = useState();

  const [model, setModel] = useState({
    name: "",
    data: companies,
  });

  // ------------------ averages useEffect -----------------------------------
  useEffect(() => {
    if (companies.length > 0) {
      //----------------average pe -----------------------
      let pe = companies.map((com) => com.pe);
      setAveragePe(
        Number((pe.reduce((a, b) => a + b, 0) / pe.length).toFixed(2))
      );

      //----------------------------average ps --------------------------
      let ps = companies.map((com) => com.ps);
      setAveragePs(
        Number((ps.reduce((a, b) => a + b, 0) / ps.length).toFixed(2))
      );

      //------------------average ptb-----------------------
      let ptb = companies.map((com) => com.ptb);
      setAveragePtb(
        Number((ptb.reduce((a, b) => a + b, 0) / ptb.length).toFixed(2))
      );

      //-------------------average roe--------------------
      let roe = companies.map((com) => com.roe);
      setAverageRoe(
        Number((roe.reduce((a, b) => a + b, 0) / roe.length).toFixed(2))
      );

      //---------------average roic ---------------------------
      let roic = companies.map((com) => com.roic);
      setAverageRoic(
        Number((roic.reduce((a, b) => a + b, 0) / roic.length).toFixed(2))
      );
    }

    setModel({ ...model, data: companies });
  }, [companies]);

  //------------------------ medians useEffect---------------

  useEffect(() => {
    if (companies.length > 0) {
      //---------------------median pe ------------------
      let pe = companies.map((com) => com.pe).sort((a, b) => a - b);
      if (pe.length % 2 !== 0) {
        let place = (pe.length + 1) / 2;
        setMedianPe(Number(pe[place - 1].toFixed(2)));
      } else {
        let place1 = pe.length / 2;
        let place2 = place1 + 1;

        setMedianPe(Number(((pe[place1 - 1] + pe[place2 - 1]) / 2).toFixed(2)));
      }

      //-----------------median ps------------------------

      let ps = companies.map((com) => com.ps).sort((a, b) => a - b);
      if (ps.length % 2 !== 0) {
        let place = (ps.length + 1) / 2;
        setMedianPs(Number(ps[place - 1].toFixed(2)));
      } else {
        let place1 = ps.length / 2;
        let place2 = place1 + 1;

        setMedianPs(Number(((ps[place1 - 1] + ps[place2 - 1]) / 2).toFixed(2)));
      }
      //----------------------median ptb----------

      let ptb = companies.map((com) => com.ptb).sort((a, b) => a - b);
      if (ptb.length % 2 !== 0) {
        let place = (ptb.length + 1) / 2;
        setMedianPtb(Number(ptb[place - 1].toFixed(2)));
      } else {
        let place1 = ptb.length / 2;
        let place2 = place1 + 1;

        setMedianPtb(
          Number(((ptb[place1 - 1] + ptb[place2 - 1]) / 2).toFixed(2))
        );
      }

      //----------------median roe ---------------

      let roe = companies.map((com) => com.roe).sort((a, b) => a - b);
      if (roe.length % 2 !== 0) {
        let place = (roe.length + 1) / 2;

        setMedianRoe(Number(roe[place - 1].toFixed(2)));
      } else {
        let place1 = roe.length / 2;
        let place2 = place1 + 1;

        setMedianRoe(
          Number(((roe[place1 - 1] + roe[place2 - 1]) / 2).toFixed(2))
        );
      }

      //--------------------- median roic -----------------------
      let roic = companies.map((com) => com.roic).sort((a, b) => a - b);
      if (roic.length % 2 !== 0) {
        let place = (roic.length + 1) / 2;

        setmedianRoic(Number(roic[place - 1].toFixed(2)));
      } else {
        let place1 = roic.length / 2;
        let place2 = place1 + 1;

        setmedianRoic(
          Number(((roic[place1 - 1] + roic[place2 - 1]) / 2).toFixed(2))
        );
      }
    }
  }, [companies]);

  // ------------------------correlations useEffect ------------------

  useEffect(() => {
    if (companies.length > 1) {
      // -------------------------------revenue correlation to mc--------------------
      var sumX = companies.map((com) => com.mc).reduce((a, b) => a + b, 0);
      var sumY = companies.map((com) => com.rev).reduce((a, b) => a + b, 0);
      var sumXy = companies
        .map((com) => com.mc * com.rev)
        .reduce((a, b) => a + b, 0);
      var sumX2 = companies
        .map((com) => com.mc ** 2)
        .reduce((a, b) => a + b, 0);
      var sumY2 = companies
        .map((com) => com.rev ** 2)
        .reduce((a, b) => a + b, 0);
      var n = companies.length;
      var top = n * sumXy - sumX * sumY;
      var bottom = Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2));
      setRevCor(Number((top / bottom).toFixed(3)));

      //----------------------net income correlation ----------------
      var sumX = companies.map((com) => com.mc).reduce((a, b) => a + b, 0);
      var sumY = companies.map((com) => com.ni).reduce((a, b) => a + b, 0);
      var sumXy = companies
        .map((com) => com.mc * com.ni)
        .reduce((a, b) => a + b, 0);
      var sumX2 = companies
        .map((com) => com.mc ** 2)
        .reduce((a, b) => a + b, 0);
      var sumY2 = companies
        .map((com) => com.ni ** 2)
        .reduce((a, b) => a + b, 0);
      var n = companies.length;
      var top = n * sumXy - sumX * sumY;
      var bottom = Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2));
      setNiCor(Number((top / bottom).toFixed(3)));

      //-----------------------------tbv correlation-----------------
      var sumX = companies.map((com) => com.mc).reduce((a, b) => a + b, 0);
      var sumY = companies.map((com) => com.tbv).reduce((a, b) => a + b, 0);
      var sumXy = companies
        .map((com) => com.mc * com.tbv)
        .reduce((a, b) => a + b, 0);
      var sumX2 = companies
        .map((com) => com.mc ** 2)
        .reduce((a, b) => a + b, 0);
      var sumY2 = companies
        .map((com) => com.tbv ** 2)
        .reduce((a, b) => a + b, 0);
      var n = companies.length;
      var top = n * sumXy - sumX * sumY;
      var bottom = Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2));
      setTbvCor(Number((top / bottom).toFixed(3)));
    }
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
            <button>Search</button>
          </form>
        </div>

        <div className="con">
          <Row data={["AVERAGES"]} tag="chart-titles" />
          <Row data={["PE", "PS", "PTB", "ROE", "ROIC"]} tag="chart-headers" />
          {companies.length > 0 ? (
            <Row
              data={[
                AveragePe,
                AveragePs,
                AveragePtb,
                AverageRoe + "%",
                AverageRoic + "%",
              ]}
              tag="chart-data"
            />
          ) : null}
        </div>
        <div className="con">
          <Row data={["MEDIANS"]} tag="chart-titles" />
          <Row data={["PE", "PS", "PTB", "ROE", "ROIC"]} tag="chart-headers" />
          {companies.length > 0 ? (
            <Row
              data={[
                medianPe,
                medianPs,
                medianPtb,
                medianRoe + "%",
                medianRoic + "%",
              ]}
              tag="chart-data"
            />
          ) : null}
        </div>
        <div className="con">
          <Row data={["MATRIX"]} tag="chart-titles" />
          <Row data={["Correlation", "Market Cap"]} tag="chart-headers" />
          {companies.length > 1 ? (
            <>
              <Row data={["Market Cap", 1]} tag="chart-data" />
              <Row data={["Revenue", revCor]} tag="chart-data" />
              <Row data={["Net Income", niCor]} tag="chart-data" />
              <Row data={["Tbv", tbvCor]} tag="chart-data" />
            </>
          ) : null}
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
                        setCompanies(
                          companies.filter((c) => c.ticker !== com.ticker)
                        );
                      }}
                    ></i>,
                  ]}
                  tag="model-data"
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

  .btn-con {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  button {
    color: var(--dark);
    padding: 5px;
    border-radius: 10px;
    font-size: 1vw;
    width: 25%;
    transition: 0.5s;
    border: none;
    cursor: pointer;
    box-shadow: 2px 2px 2px var(--dark);
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
  //-------------------row backgrounds---------

  .chart-titles {
    background: var(--red);
  }
  .chart-headers {
    background: var(--dark);
  }
  .chart-data {
    background: var(--light);
  }

  .model-data {
    background: var(--light);
  }

  .model-data:nth-child(even) {
    background: var(--dark);
  }
`;

export default Pricing;

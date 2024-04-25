import React, { useEffect, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Row from "../components/Row";
import { modelKey } from "../keys";
import axios from "axios";
import { money } from "../utils/money.format";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { useModelsContext } from "../context/ModelsContext";

const Pricing = () => {
  const { user, getUser } = useGlobalContext();
  const { newPriceModel, getPricingModels, pricingModels } = useModelsContext();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [averagePe, setAveragePe] = useState();
  const [averagePs, setAveragePs] = useState();
  const [averagePfcf, setAveragePfcf] = useState();
  const [averagePtb, setAveragePtb] = useState();
  const [averageRoe, setAverageRoe] = useState();
  const [averageRoic, setAverageRoic] = useState();
  const [medianPe, setMedianPe] = useState();
  const [medianPs, setMedianPs] = useState();
  const [medianPfcf, setMedianPfcf] = useState();
  const [medianPtb, setMedianPtb] = useState();
  const [medianRoe, setMedianRoe] = useState();
  const [medianRoic, setmedianRoic] = useState();
  const [revCor, setRevCor] = useState();
  const [niCor, setNiCor] = useState();
  const [fcfCor, setFcfCor] = useState();
  const [tbvCor, setTbvCor] = useState();
  const [error, setError] = useState(null);
  const [newModel, setNewMOdel] = useState(false);
  const [savedModel, setSavedModel] = useState(false);
  const [selectModelDd, setSelectModelDd] = useState(false);

  const [model, setModel] = useState({
    name: "",
    data: companies,
  });

  const saveModel = async () => {
    try {
      if (!model.name) {
        return setError("Please add required title to model");
      }
      await newPriceModel(model);
      setCompanies([]);
      setModel({ ...model, name: "" });
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      await getUser();
      getPricingModels();
    };

    getData();
  }, []);

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

      //--------------------- average pfcf -----------------
      let pfcf = companies.map((com) => com.pfcf);
      setAveragePfcf(
        Number((pfcf.reduce((a, b) => a + b, 0) / pfcf.length).toFixed(2))
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

      //----------------------median pfcf ---------------
      let pfcf = companies.map((com) => com.pfcf).sort((a, b) => a - b);
      if (pfcf.length % 2 !== 0) {
        let place = (pfcf.length + 1) / 2;
        setMedianPfcf(Number(pfcf[place - 1].toFixed(2)));
      } else {
        let place1 = pfcf.length / 2;
        let place2 = place1 + 1;

        setMedianPfcf(
          Number(((pfcf[place1 - 1] + pfcf[place2 - 1]) / 2).toFixed(2))
        );
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

      //---------------------fcf correlation -------------------
      var sumX = companies.map((com) => com.mc).reduce((a, b) => a + b, 0);
      var sumY = companies.map((com) => com.fcf).reduce((a, b) => a + b, 0);
      var sumXy = companies
        .map((com) => com.mc * com.fcf)
        .reduce((a, b) => a + b, 0);
      var sumX2 = companies
        .map((com) => com.mc ** 2)
        .reduce((a, b) => a + b, 0);
      var sumY2 = companies
        .map((com) => com.fcf ** 2)
        .reduce((a, b) => a + b, 0);
      var n = companies.length;
      var top = n * sumXy - sumX * sumY;
      var bottom = Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2));
      setFcfCor(Number((top / bottom).toFixed(3)));

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
          setCompanies([
            ...companies,
            {
              ticker: search.toUpperCase(),
              mc: data[0].marketCapTTM / 1000000,
              tbv: (data[0].ptbRatioTTM * data[0].marketCapTTM) / 1000000,
              fcf: (data[0].pfcfRatioTTM * data[0].marketCapTTM) / 1000000,
              rev:
                (data[0].priceToSalesRatioTTM * data[0].marketCapTTM) / 1000000,
              ni: (data[0].peRatioTTM * data[0].marketCapTTM) / 1000000,
              roe: data[0].roeTTM * 100,
              roic: data[0].roicTTM * 100,
              ptb: data[0].ptbRatioTTM,
              ps: data[0].priceToSalesRatioTTM,
              pe: data[0].peRatioTTM,
              pfcf: data[0].pfcfRatioTTM,
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
          {!newModel && !savedModel ? (
            <div className="model-status">
              <span>Create a new model?</span>
              <button onClick={() => setNewMOdel(true)}>new</button>
              <span>Choose an existing model</span>
              <div className="select">
                <span>Select a model</span>
                <i
                  className="fa-solid fa-chevron-down"
                  onClick={() =>
                    selectModelDd
                      ? setSelectModelDd(false)
                      : setSelectModelDd(true)
                  }
                ></i>
              </div>

              {selectModelDd && (
                <ul className="drop-down">
                  {pricingModels ? (
                    pricingModels.map((mod) => {
                      return (
                        <li className="list-data" key={mod._id}>
                          {mod.name.toUpperCase()}
                        </li>
                      );
                    })
                  ) : (
                    <span>Create a new Model</span>
                  )}
                </ul>
              )}
            </div>
          ) : newModel ? (
            <form onSubmit={addToModel}>
              {error && (
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {error}
                </span>
              )}
              <div className="form-inputs">
                <label htmlFor="">Model title:</label>
                <input
                  value={model.name}
                  onChange={(e) =>
                    setModel({ ...model, name: e.target.value }, setError(null))
                  }
                  type="text"
                  placeholder="title"
                />
              </div>
              <div className="form-inputs">
                <label htmlFor="">Search:</label>
                <div className="search-bar">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="search"
                    required
                  />
                </div>
              </div>
              <button>Search</button>
            </form>
          ) : savedModel ? (
            <select name="" id="">
              select
            </select>
          ) : null}
        </div>

        <div className="con">
          <Row data={["AVERAGES"]} tag="chart-titles" />
          <Row
            data={["PS", "PE", "PFCF", "PTB", "ROE", "ROIC"]}
            tag="chart-headers"
          />
          {companies.length > 1 ? (
            <Row
              data={[
                averagePs,
                averagePe,
                averagePfcf,
                averagePtb,
                averageRoe + "%",
                averageRoic + "%",
              ]}
              tag="chart-data"
            />
          ) : null}
        </div>
        <div className="con">
          <Row data={["MEDIANS"]} tag="chart-titles" />
          <Row
            data={["PS", "PE", "PFCF", "PTB", "ROE", "ROIC"]}
            tag="chart-headers"
          />
          {companies.length > 1 ? (
            <Row
              data={[
                medianPs,
                medianPe,
                medianPfcf,
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
              <Row data={["FCF", fcfCor]} tag="chart-data" />
              <Row data={["TBV", tbvCor]} tag="chart-data" />
            </>
          ) : null}
        </div>
      </div>

      <div className="model">
        <Row
          data={[
            "Company",
            "Market Cap",
            "Tangible Book",
            "FCF",
            "Revenues",
            "Net Income",
            "ROE",
            "ROIC",
            "PTB",
            "PS",
            "PE",
            "PFCF",
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
                    money.format(com.tbv),
                    money.format(com.fcf),
                    money.format(com.rev),
                    money.format(com.ni),
                    Number(com.roe.toFixed(2)) + "%",
                    Number(com.roic.toFixed(2)) + "%",
                    Number(com.ptb.toFixed(2)),
                    Number(com.ps.toFixed(2)),
                    Number(com.pe.toFixed(2)),
                    Number(com.pfcf.toFixed(2)),
                    <i
                      className="fa-regular fa-trash-can"
                      onClick={() => {
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
        {companies.length > 0 && (
          <button onClick={() => saveModel()}>Save</button>
        )}
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

  .drop-down {
    background: var(--white);
  }

  .model-status {
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

    box-shadow: 2px 2px 2px var(--dark);
  }

  button:hover {
    transform: scale(1.2);
    cursor: pointer;
  }

  button:active {
    transform: translateX(-10px);
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
    display: flex;
    flex-direction: column;
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

  .model button {
    align-self: end;
    margin-top: 10px;
    background: var(--red);
    color: var(--white);
    width: 7%;
    margin-right: 10px;
  }

  .select {
    width: 75%;

    display: flex;
    background: var(--white);
    justify-content: space-around;
    align-items: center;
    border-radius: 10px;
    padding: 5px;
  }

  .select span {
    color: var(--dark);
  }

  .select i {
    color: var(--dark);
  }

  .drop-down {
    display: block;
    background: var(--white);
    position: absolute;
    z-index: 1;
    top: 32%;
    left: 6.5%;
    border-radius: 10px;
    border: 2px solid var(--dark);
    width: 15%;
  }

  .list-data {
    display: block;
    text-align: left;
    padding: 7px;
    width: 100%;
    color: var(--dark);
  }

  .list-data:hover {
    background: var(--red);
    color: var(--white);
    cursor: pointer;
  }

  .drop-down li:last-child {
    border-radius: 0 0 10px 10px;
  }
  .drop-down li:first-child {
    border-radius: 10px 10px 0 0;
  }

  .fa-chevron-down:hover {
    cursor: pointer;
  }
`;

export default Pricing;

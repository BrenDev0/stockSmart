import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import Chart from "../components/Chart";
import { detailKey } from "../keys";

const News = () => {
  const [spy, setSpy] = useState({});
  const [dia, setDia] = useState({});
  const [iwm, setIwm] = useState({});
  const [qqq, setQqq] = useState({});

  const todayDate = new Date().toISOString().slice(0, 10);
  const date = new Date();
  const chartYear =
    date.getFullYear() -
    1 +
    "-" +
    date.getMonth().toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0");
  const getChartData = () => {
    try {
      Promise.all([
        fetch(
          `https://api.polygon.io/v2/aggs/ticker/SPY/range/1/day/${chartYear}/${todayDate}?adjusted=true&sort=asc&limit=365&apiKey=${detailKey}`
        ),
        fetch(
          `https://api.polygon.io/v2/aggs/ticker/IWM/range/1/day/${chartYear}/${todayDate}?adjusted=true&sort=asc&limit=365&apiKey=${detailKey}`
        ),
        fetch(
          `https://api.polygon.io/v2/aggs/ticker/QQQ/range/1/day/${chartYear}/${todayDate}?adjusted=true&sort=asc&limit=365&apiKey=${detailKey}`
        ),
        fetch(
          `https://api.polygon.io/v2/aggs/ticker/DIA/range/1/day/${chartYear}/${todayDate}?adjusted=true&sort=asc&limit=365&apiKey=${detailKey}`
        ),
      ])
        .then((responses) => {
          return Promise.all(responses.map((response) => response.json()));
        })
        .then((data) => {
          let spyArr = [];
          let iwmArr = [];
          let qqqArr = [];
          let diaArr = [];

          for (
            let i = data[0].results.length - 1;
            i > data[0].results.length - 30;
            i--
          ) {
            spyArr.unshift({
              date: new Date(data[0].results[i].t).toLocaleDateString("en-US"),
              open: data[0].results[i].o,
              high: data[0].results[i].h,
              low: data[0].results[i].l,
              close: data[0].results[i].c,
            });
          }

          setSpy(spyArr);

          for (
            let i = data[1].results.length - 1;
            i > data[1].results.length - 30;
            i--
          ) {
            iwmArr.unshift({
              date: new Date(data[1].results[i].t).toLocaleDateString("en-US"),
              open: data[1].results[i].o,
              high: data[1].results[i].h,
              low: data[1].results[i].l,
              close: data[1].results[i].c,
            });
          }

          setIwm(iwmArr);

          for (
            let i = data[2].results.length - 1;
            i > data[2].results.length - 30;
            i--
          ) {
            qqqArr.unshift({
              date: new Date(data[2].results[i].t).toLocaleDateString("en-US"),
              open: data[2].results[i].o,
              high: data[2].results[i].h,
              low: data[2].results[i].l,
              close: data[2].results[i].c,
            });
          }

          setQqq(qqqArr);

          for (
            let i = data[3].results.length - 1;
            i > data[3].results.length - 30;
            i--
          ) {
            diaArr.unshift({
              date: new Date(data[3].results[i].t).toLocaleDateString("en-US"),
              open: data[3].results[i].o,
              high: data[3].results[i].h,
              low: data[3].results[i].l,
              close: data[3].results[i].c,
            });
          }

          setDia(diaArr);

          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getChartData();
  }, []);

  return (
    <NewsStyled>
      <div className="charts">
        <div className="chart-con">
          <span>SPY</span>
          <Chart data={spy} />
        </div>
        <div className="chart-con">
          <span>DIA</span>
          <Chart data={dia} />
        </div>
        <div className="chart-con">
          <span>QQQ</span>
          <Chart data={qqq} />
        </div>
        <div className="chart-con">
          <span>IWM</span>
          <Chart data={iwm} />
        </div>
      </div>
    </NewsStyled>
  );
};

const NewsStyled = styled.div`
  width: 100%;
  height: 100%;

  .charts {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 20px;
  }
  span {
    color: black;
  }

  tspan {
    font-size: 10px;
  }
  .chart-con {
    width: 25%;
    height: 25%;
    padding: 20px;
  }
`;

export default News;

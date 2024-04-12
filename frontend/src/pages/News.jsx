import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Chart from "../components/Chart";
import { detailKey, quoteKey } from "../keys";
import NewsArticle from "../components/NewsArticle";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";

const News = () => {
  const [spy, setSpy] = useState({});
  const [dia, setDia] = useState({});
  const [iwm, setIwm] = useState({});
  const [qqq, setQqq] = useState({});
  const [news, setNews] = useState();
  const [error, setError] = useState(null);

  const { param } = useParams();

  const todayDate = new Date().toISOString().slice(0, 10);
  const date = new Date();
  const chartYear = `${date.getFullYear()}-01-01`;

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
          let color = "";

          for (let i = 0; i < data[0].results.length; i++) {
            spyArr.push({
              date: new Date(data[0].results[i].t).toLocaleDateString("en-US"),
              open: data[0].results[i].o,
              high: data[0].results[i].h,
              low: data[0].results[i].l,
              close: data[0].results[i].c,
            });
          }

          spyArr[0].close > spyArr[spyArr.length - 1].close
            ? (color = "red")
            : (color = "green");
          setSpy({
            color: color,
            data: spyArr,
          });

          color = "";

          for (let i = 0; i < data[1].results.length; i++) {
            iwmArr.push({
              date: new Date(data[1].results[i].t).toLocaleDateString("en-US"),
              open: data[1].results[i].o,
              high: data[1].results[i].h,
              low: data[1].results[i].l,
              close: data[1].results[i].c,
            });
          }

          iwmArr[0].close > iwmArr[iwmArr.length - 1].close
            ? (color = "red")
            : (color = "green");
          setIwm({
            color: color,
            data: iwmArr,
          });

          color = "";

          for (let i = 0; i < data[2].results.length; i++) {
            qqqArr.push({
              date: new Date(data[2].results[i].t).toLocaleDateString("en-US"),
              open: data[2].results[i].o,
              high: data[2].results[i].h,
              low: data[2].results[i].l,
              close: data[2].results[i].c,
            });
          }

          qqqArr[0].close > qqqArr[qqqArr.length - 1].close
            ? (color = "red")
            : (color = "green");
          setQqq({
            color: color,
            data: qqqArr,
          });

          color = "";

          for (let i = 0; i < data[3].results.length; i++) {
            diaArr.push({
              date: new Date(data[3].results[i].t).toLocaleDateString("en-US"),
              open: data[3].results[i].o,
              high: data[3].results[i].h,
              low: data[3].results[i].l,
              close: data[3].results[i].c,
            });
          }

          diaArr[0].close > diaArr[diaArr.length - 1].close
            ? (color = "red")
            : (color = "green");
          setDia({
            color: color,
            data: diaArr,
          });

          color = "";
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getChartData();
  }, []);

  useEffect(() => {
    try {
      fetch(
        `https://finnhub.io/api/v1/news?category=${param}&token=${quoteKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          const newsData = [];
          for (let i = 0; i < data.length; i++) {
            newsData.push(data[i]);
          }
          setNews(newsData);
        });
    } catch (error) {
      setError(error);
    }
  }, []);

  return (
    <NewsStyled>
      <NavBar />
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
      <div className="news">
        {news ? (
          news.map((n) => {
            return (
              <div key={n.url} className="news-item">
                <div className="title">
                  <h3>
                    <a href={n.url} target="_blank">
                      {n.headline}
                    </a>
                  </h3>
                  <p>{n.summary}</p>
                </div>
                <img src={n.image} alt="" />
              </div>
            );
          })
        ) : (
          <p>Loading</p>
        )}
      </div>
    </NewsStyled>
  );
};

const NewsStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: left;

  .charts {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 25%;
    padding: 20px;
  }

  .news {
    width: 100%;
    height: 75%;
    overflow: scroll;
    padding: 15px;
  }

  .news::-webkit-scrollbar {
    display: none;
  }

  .news-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--dark);
    margin: 7px 0 7px 0;
    border-radius: 10px;
    padding: 15px;
    width: 100%;
    box-shadow: 2px 3px 5px var(--light);
  }

  img {
    width: 15%;
  }

  .chart-con {
    width: 100%;
    height: 100%;
    padding: 20px;
  }

  .chart-con span,
  p {
    color: var(--light);
  }

  .chart-con tspan {
    font-size: 10px;
  }
`;

export default News;

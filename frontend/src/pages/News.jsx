import React, { useEffect, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import Chart from "../components/Chart";
import { detailKey, quoteKey } from "../keys";
import NewsArticle from "../components/NewsArticle";
import Layout from "../styles/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import LoadingPage from "../components/Skeletons/LoadingPage";
import EtfCharts from "../components/EtfCharts";

const News = () => {
  const { getUser, user, isLoading, setIsLoading } = useGlobalContext();
  const navigate = useNavigate();

  const [news, setNews] = useState();
  const [error, setError] = useState(null);

  const { param } = useParams();

  useEffect(() => {
    getUser();
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

  return isLoading ? (
    <LoadingPage />
  ) : (
    <Layout>
      <NewsStyled>
        <EtfCharts />
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
    </Layout>
  );
};

const NewsStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: left;

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
`;

export default News;

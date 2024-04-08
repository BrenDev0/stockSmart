import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { quoteKey } from "../keys";
import { useGlobalContext } from "../context/GlobalContext";

const NewsArticle = () => {
  const [news, setNews] = useState();
  const [error, setError] = useState();
  const { isLoading, setIsLoading } = useGlobalContext();
  useEffect(() => {
    try {
      fetch("https://finnhub.io/api/v1/news?category=general&token=" + quoteKey)
        .then((res) => res.json())
        .then((data) => {
          const newsData = [];
          for (let i = 0; i < 25; i++) {
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
      {news ? (
        news.map((n) => {
          return (
            <div key={n.url} className="news-item">
              <h3>
                <a href={n.url} target="_blank">
                  {n.headline}
                </a>
              </h3>
            </div>
          );
        })
      ) : (
        <p>Loading</p>
      )}
    </NewsStyled>
  );
};

const NewsStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .news-item {
    display: flex;
    justify-content: left;
    align-items: center;
    background: var(--red);
    margin: 7px 0 7px 0;
    border-radius: 10px;
    padding: 5px;
    width: 100%;
    box-shadow: 2px 3px 5px var(--light);
  }

  a {
    font-size: 0.8vw;
  }
`;

export default NewsArticle;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { quoteKey } from "../keys";

const NewsArticle = ({ category, background, fullLayout }) => {
  const [news, setNews] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    try {
      fetch(
        `https://finnhub.io/api/v1/news?category=${category}&token=${quoteKey}`
      )
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
          return fullLayout ? (
            <div
              style={{ background: background }}
              key={n.url}
              className="news-item"
            >
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
          ) : (
            <div
              style={{ background: background }}
              key={n.url}
              className="news-item "
            >
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
    justify-content: space-between;
    align-items: center;
    margin: 7px 0 7px 0;
    border-radius: 10px;
    padding: 10px;
    width: 100%;
    box-shadow: 2px 3px 5px var(--light);
  }

  a {
    font-size: 1rem;
  }

  p {
    font-size: 0.9rem;
  }

  img {
    width: 15%;
    border-radius: 10px;
  }
`;

export default NewsArticle;

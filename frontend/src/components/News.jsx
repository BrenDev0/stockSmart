import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { quoteKey } from "../keys";

const News = () => {
  const [news, setNews] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    try {
      fetch("https://finnhub.io/api/v1/news?category=general&token=" + quoteKey)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const newsData = [];
          for (let i = 0; i < 10; i++) {
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
    margin: 10px 0 10px 0;
    border-radius: 10px;
    padding: 5px;
    width: 100%;
  }

  a {
    font-size: 0.8vw;
  }
`;

export default News;

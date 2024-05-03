import React, { useEffect } from "react";
import styled from "styled-components";
import Layout from "../styles/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import NewsPageSkeleton from "../components/Skeletons/NewsPageSkeleton";
import EtfCharts from "../components/EtfCharts";
import NewsArticle from "../components/NewsArticle";

const News = () => {
  const { getUser, user, isLoading, setIsLoading } = useGlobalContext();
  const navigate = useNavigate();

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

  return isLoading ? (
    <NewsPageSkeleton />
  ) : (
    <Layout>
      <NewsStyled>
        <EtfCharts />
        <div className="news">
          <NewsArticle
            category={param}
            background={"var(--dark)"}
            fullLayout={true}
          />
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
    padding: 15px;
  }
`;

export default News;

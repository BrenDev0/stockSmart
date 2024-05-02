import { useGlobalContext } from "../context/GlobalContext";
import styled from "styled-components";
import React, { useEffect } from "react";
import Dashboard from "../components/Dashboard";
import Layout from "../styles/Layout";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/Skeletons/LoadingPage";

const Home = () => {
  const { getUser, user, isLoading, setIsLoading } = useGlobalContext();

  const navigate = useNavigate();
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
    <LoadingPage />
  ) : (
    <Layout>
      <MainStyled>
        <Dashboard />
      </MainStyled>
    </Layout>
  );
};

const MainStyled = styled.main`
  width: 100%;
  height: 100%;
`;

export default Home;

import { useGlobalContext } from "../context/GlobalContext";
import styled from "styled-components";
import React, { useEffect } from "react";
import Dashboard from "../components/Dashboard";
import NavBar from "../components/NavBar";
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
    <MainStyled>
      <NavBar />
      <Dashboard />
    </MainStyled>
  );
};

const MainStyled = styled.main`
  width: 100%;
  height: 100%;
`;

export default Home;

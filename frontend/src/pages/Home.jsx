import { useGlobalContext } from "../context/GlobalContext";
import styled from "styled-components";
import React, { useEffect, useLayoutEffect } from "react";
import Dashboard from "../components/Dashboard";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Home = () => {
  const { user, getUser, isLoading, setIsLoading } = useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    getUser();
  }, []);

  useLayoutEffect(() => {
    user.status ? null : navigate("/login");
  }, [user]);
  return isLoading ? (
    <Loading />
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

import { useGlobalContext } from "../context/GlobalContext";
import styled from "styled-components";
import React, { useEffect } from "react";
import Dashboard from "../components/Dashboard";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Home = () => {
  const { user, isLoading, setIsLoading } = useGlobalContext();

  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      user.status ? setIsLoading(false) : navigate("/login");
    }, 2000);
  }, [user]);

  return (
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

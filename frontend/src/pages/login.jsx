import React, { useEffect } from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import img from "../images/stockmarket.jpeg";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/Skeletons/LoadingPage";

const Login = () => {
  const { user, isLoading, setIsLoading } = useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    user.status ? navigate("/") : setIsLoading(false);
  }, []);

  return isLoading ? (
    <LoadingPage />
  ) : (
    <LoginStyled>
      <LoginForm />
    </LoginStyled>
  );
};

const LoginStyled = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export default Login;

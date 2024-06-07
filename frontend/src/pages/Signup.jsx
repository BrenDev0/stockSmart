import React, { useEffect } from "react";
import styled from "styled-components";
import SignupForm from "../components/SignupForm";
import img from "../images/stockmarket.jpeg";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/Skeletons/LoadingPage";

const Login = () => {
  const { user, isLoading, setIsLoading } = useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
       null;
    }
    if (user) {
      return navigate("/");
    }
    if (!user) {
      setIsLoading(false);
    }
  }, [user]);

  return isLoading ? (
    <LoadingPage />
  ) : (
    <LoginStyled>
      <SignupForm />
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

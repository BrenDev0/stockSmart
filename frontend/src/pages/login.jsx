import React from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import img from "../images/stockmarket.jpeg";

const Login = () => {
  return (
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

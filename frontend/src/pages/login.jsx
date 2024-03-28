import React from "react";
import styled from "styled-components";
import Form from "../components/Form";
import img from "../images/stockmarket.jpeg";

const Login = () => {
  return (
    <LoginStyled>
      <Form />
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

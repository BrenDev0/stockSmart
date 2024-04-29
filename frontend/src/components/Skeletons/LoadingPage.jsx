import React from "react";
import styled from "styled-components";

const LoadingPage = () => {
  return (
    <LoadingPageStyled>
      <span className="skeleton">StockSmart</span>
    </LoadingPageStyled>
  );
};

const LoadingPageStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  padding: 50px;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: var(--red);
    font-size: 3rem;
    font-family: "Dancing Script", cursive;
    border-radius: 20px;
  }
`;

export default LoadingPage;

import React from "react";
import styled from "styled-components";
styled;

const PositionsHead = () => {
  return (
    <HeadStyled>
      <span id="no-border">Ticker</span>
      <span>Shares</span>
      <span>Average fill</span>
      <span>Invested</span>
      <span>Mark</span>
      <span>P/L</span>
      <span>Actions</span>
    </HeadStyled>
  );
};

const HeadStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  border-radius: 10px;
  background: var(--dark);

  span {
    font-size: 1.1vw;
    width: 100%;
    text-align: center;
    border-left: 2px solid var(--light);
  }

  #no-border {
    border: none;
  }
`;

export default PositionsHead;

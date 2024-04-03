import React from "react";
import styled from "styled-components";
styled;

const PositionsHead = (labels) => {
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
  background: rgba(43, 45, 66, 0.8);

  span {
    font-size: 1.1vw;
    width: 100%;
    text-align: center;
    border-left: 2px solid rgba(141, 153, 174, 0.8);
  }

  #no-border {
    border: none;
  }
`;

export default PositionsHead;

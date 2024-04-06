import React from "react";
import styled from "styled-components";

import { useTradeContext } from "../context/TradeContext";
import { useGlobalContext } from "../context/GlobalContext";

const PositionRow = ({
  icon,
  ticker,
  shares,
  averageFill,
  invested,
  mark,
  pl,
  style,
  _id,
}) => {
  const { deleteTrade } = useTradeContext();
  const { editTrade } = useGlobalContext();

  return (
    <RowStyled>
      <div className="data" id="ticker">
        <img src={icon} alt="icon" />
        <span>{ticker}</span>
      </div>
      <div className="data">
        <span>{shares}</span>
      </div>
      <div className="data">
        <span>{averageFill}</span>
      </div>
      <div className="data">
        <span>{invested}</span>
      </div>
      <div className="data">
        <span>{mark}</span>
      </div>
      <div className="data">
        <span style={style}>{pl}</span>
      </div>
      <div className="data">
        <div className="icons">
          <i
            className="fa-solid fa-money-bill-trend-up"
            onClick={() => editTrade(ticker)}
          ></i>
          <i className="fa-solid fa-chart-simple"></i>
          <i
            className="fa-regular fa-trash-can"
            onClick={() => {
              deleteTrade(_id);
            }}
          ></i>
        </div>
      </div>
    </RowStyled>
  );
};

const RowStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  background: rgba(141, 153, 174, 0.8);
  height: 60px;
  margin: 10px 0 10px 0;

  img {
    width: 45%;
    border-radius: 15px;
  }
  span {
    font-size: 1vw;
  }
  .icons {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .icons i:hover {
    cursor: pointer;
    transform: scale(1.2);
    transition: 0.5s;
  }

  .data {
    width: 100%;
    text-align: center;
    border-left: 2px solid rgba(43, 45, 66, 0.8);
  }

  #ticker {
    border: none;
    display: flex;
    justify-content: left;
    align-items: center;
    margin-left: 5px;
  }

  #ticker span {
    margin-left: 5px;
  }
`;

export default PositionRow;

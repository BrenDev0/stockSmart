import React, { useState } from "react";
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
  const { editTrade, setDividendDisplay } = useGlobalContext();
  const [positionDropDown, setPositionDropDown] = useState(false);

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
          <div id="options">
            <i
              className="fa-solid fa-money-bill-trend-up"
              onClick={() => setPositionDropDown(true)}
            ></i>
            {positionDropDown && (
              <ul className="drop-down">
                <li
                  className="list-data"
                  onMouseEnter={(e) => setPositionDropDown(true)}
                  onMouseLeave={(e) => setPositionDropDown(false)}
                  onClick={() => editTrade(ticker)}
                >
                  Adjust position
                </li>
                <li
                  onMouseEnter={(e) => setPositionDropDown(true)}
                  onMouseLeave={(e) => setPositionDropDown(false)}
                  onClick={() => {
                    editTrade(ticker);
                    setDividendDisplay(true);
                  }}
                  className="list-data"
                >
                  Dividend
                </li>
              </ul>
            )}
          </div>
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
  position: relative;

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

  .drop-down {
    display: block;
    background: var(--white);
    position: absolute;
    right: 5%;
    z-index: 1;
    border-radius: 10px;
  }

  .list-data {
    display: block;
    text-align: left;
    padding: 7px;
    width: 100%;

    color: var(--dark);
  }
  .list-data a {
    color: var(--dark);
  }

  .list-data:hover {
    background: var(--red);
    color: var(--white);
    cursor: pointer;
  }

  .list-data {
    font-size: 1vw;
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

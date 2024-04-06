import React, { useEffect } from "react";
import styled from "styled-components";

import { useTradeContext } from "../context/TradeContext";

const History = () => {
  const { history, tradeHistory } = useTradeContext();

  useEffect(() => {
    tradeHistory();
    console.log("history gathered");
  }, []);

  return (
    <HistoryStyled>
      <div className="chart-con">
        <div className="chart"></div>
      </div>

      <div className="history-con">
        <div className="table-head">
          <div className="data">
            <p>Type</p>
          </div>
          <div className="data">
            <p>Orientation</p>
          </div>
          <div className="data">
            <p>Profit/Loss</p>
          </div>
          <div className="data">
            <p>test</p>
          </div>
          <div className="data">
            <p>test</p>
          </div>
        </div>
      </div>
    </HistoryStyled>
  );
};

const HistoryStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  padding: 10px;

  .chart-con {
    display: flex;
    flex-direction: column;
    flex-basis: 50%;
    border: 1px solid black;
  }
  .history-con {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 50%;
    height: 100%;
    border: 1px solid black;
  }
  .table-head {
    width: 100%;
    background: rgba(239, 35, 60, 0.75);
    display: flex;
    border-radius: 10px;
    justify-content: space-between;
    align-items: center;
    height: 10%;
    padding: 5px;
  }
  .data {
    padding: 5px;
  }
`;

export default History;

import React from "react";
import styled from "styled-components";
import Chart from "./Chart";
import { todayDate, chartYear } from "../utils/Dates";

const EtfCharts = () => {
  return (
    <EtfCahrtsStyled>
      <Chart ticker={"SPY"} timeframe={chartYear} today={todayDate} />
      <Chart ticker={"DIA"} timeframe={chartYear} today={todayDate} />
      <Chart ticker={"QQQ"} timeframe={chartYear} today={todayDate} />
      <Chart ticker={"IWM"} timeframe={chartYear} today={todayDate} />
    </EtfCahrtsStyled>
  );
};

const EtfCahrtsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 25%;
  padding: 15px;
`;

export default EtfCharts;

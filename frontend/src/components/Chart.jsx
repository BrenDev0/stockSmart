import React, { useLayoutEffect, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import { detailKey } from "../keys";
import styled from "styled-components";

const Chart = ({ ticker, timeframe, today }) => {
  const [chartData, setChartData] = useState({});

  useLayoutEffect(() => {
    const formatData = async (ticker, timeframe, today) => {
      let arr = [];
      let color = "";
      const response = await fetch(
        `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${timeframe}/${today}?adjusted=true&sort=asc&limit=365&apiKey=${detailKey}`
      );
      const data = await response.json();

      for (let i = 0; i < data.results.length; i++) {
        arr.push({
          date: new Date(data.results[i].t).toLocaleDateString("en-US"),
          open: data.results[i].o,
          high: data.results[i].h,
          low: data.results[i].l,
          close: data.results[i].c,
        });
      }

      arr[0].close > arr[arr.length - 1].close
        ? (color = "red")
        : (color = "green");
      setChartData({
        color: color,
        data: arr,
      });
    };

    formatData(ticker, timeframe, today);
  }, []);
  return (
    <ChartStyled>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <AreaChart data={chartData.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={"date"} />
          <YAxis className="y-axis" domain={["dataMin", "dataMax"]} />
          <Tooltip />
          <Area
            dataKey="close"
            stroke={chartData.color}
            fill={chartData.color}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartStyled>
  );
};

const ChartStyled = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;

  span,
  p {
    color: var(--dark);
  }

  tspan {
    font-size: 10px;
  }
`;

export default Chart;

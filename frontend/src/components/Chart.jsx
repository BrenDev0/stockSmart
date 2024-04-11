import React from "react";

import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";

const Chart = ({ data }) => {
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <AreaChart data={data.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={"date"} />
        <YAxis className="y-axis" domain={["dataMin", "dataMax"]} />
        <Tooltip />
        <Area dataKey="close" stroke={data.color} fill={data.color} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;

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
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={"date"} />
        <YAxis className="y-axis" domain={["dataMin", "dataMax"]} />
        <Tooltip />
        <Area dataKey="close" stroke={"blue"} fill={"blue"} type={"monotone"} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;

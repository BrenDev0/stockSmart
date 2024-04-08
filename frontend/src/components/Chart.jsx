import React from "react";
import Chart from "chart.js";

const Chart = () => {
  const data = {
    labels: ["monday", "tuesday", "wedensday", "thursday", "friday"],
    datasets: [
      {
        label: "hello",
        data: [1, 2, 5, 6, 8],
        fill: false,
        borderColor: black,
      },
    ],
  };

  const chart = new Chart({
    type: line,
    data: data,
  });

  return <div></div>;
};

export default Chart;

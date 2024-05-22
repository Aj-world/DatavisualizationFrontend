import React from "react";
import { Chart } from "react-google-charts";

const options = {
  title: "Company Performance",
  hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
  vAxis: { minValue: 0 },
  chartArea: { width: "80%", height: "90%" },
};

const AreaChart = ({ result }) => {
  // Ensure result is an array and contains valid data
  const dataArray = Array.isArray(result) ? result : [];

  // Create the data array for the chart, focusing on numerical values
  const data = [
    ["Year", "Intensity", "Likelihood", "Relevance"],
    ...dataArray.map(item => [
      Number(item.Year),       // Year as a number
      Number(item.Intensity),  // Intensity as a number
      Number(item.Likelihood), // Likelihood as a number
      Number(item.Relevance),  // Relevance as a number
    ]),
  ];

  return (
    <Chart
      chartType="AreaChart"
      width="100%"
      height="600px"
      data={data}
      options={options}
    />
  );
};

export default AreaChart;

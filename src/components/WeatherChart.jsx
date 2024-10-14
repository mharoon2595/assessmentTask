import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import { LocationContext } from "./utils/Context";

export default function WeatherChart({ data }) {
  const { location } = useContext(LocationContext);

  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "Temperature (°C)",
        data: data.map((d) => d.temp),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Weather temperature trend for ${location}`,
      },
    },
  };

  return (
    <div className="overflow-x-auto">
      <div style={{ width: "800px", height: "400px" }}>
        <Line data={chartData} options={options} id="weather-chart" />
      </div>
    </div>
  );
}

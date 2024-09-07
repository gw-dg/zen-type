import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Graph({ data }) {
  const [time, wpm, rawWpm] = data;
  console.log("lol");
  const dat = {
    labels: time,
    datasets: [
      {
        data: wpm,
        label: "WPM",
        borderColor: "yellow",
        fill: false,
        tension: 0.4,
      },
      {
        data: rawWpm,
        label: "Raw WPM",
        borderColor: "red",
        fill: false,
        tension: 0.4,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time in Seconds", // Label for X-axis
          font: {
            size: 14, // Font size for label
          },
          color: "#e2dddd", // Font color for label
        },
      },
      y: {
        title: {
          display: true,
          text: "WPM in Minutes", // Label for Y-axis
          font: {
            size: 14, // Font size for label
          },
          color: "#e2dddd", // Font color for label
        },
      },
    },
  };

  return (
    <div className="graph">
      <Line data={dat} options={options} />
    </div>
  );
}

import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { NONAME } from "node:dns";
import React, { useEffect, useRef } from "react";
import classes from "./LineGraph.module.css";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  Legend,
  Title,
  Tooltip
);

export const LineGraph = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        //Bring in data
        labels: ["17/05", "18/05", "19/05", "20/05", "21/05"],
        datasets: [
          {
            label: "Số giờ sử dụng",
            data: [16, 17, 11, 20, 10],
            cubicInterpolationMode: "monotone",
            pointBackgroundColor: "#D8ECFF",
            borderColor: "#0B84F3",
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
        },
        //Customize chart options
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className={classes.graphContainer}>
      <canvas id="myChart" ref={chartRef} />
    </div>
  );
};

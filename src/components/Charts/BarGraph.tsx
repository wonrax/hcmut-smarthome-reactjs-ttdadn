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

export const BarGraph = (props: {
  data: { device_name: string; total: number }[];
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const labels: string[] = [];
    const data: number[] = [];
    for (const index in props.data) {
      labels.push(props.data[index].device_name);
      data.push(props.data[index].total);
    }
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        //Bring in data
        labels: labels,
        datasets: [
          {
            label: "Số giờ sử dụng trong tháng",
            data: data,
            borderColor: "#0B84F3",
            backgroundColor: "#D8ECFF",
            borderWidth: 2,
            maxBarThickness: 50,
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

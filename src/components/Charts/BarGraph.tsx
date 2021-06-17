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
  range: "month" | "week";
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
      type: "doughnut",
      data: {
        //Bring in data
        labels: labels,
        datasets: [
          {
            label: `Số giờ sử dụng trong ${
              props.range === "week" ? "tuần" : "tháng"
            }`,
            data: data,
            backgroundColor: ["#0B84F3", "#D8ECFF", "#FFFAC8", "#DBF8D7"],
            // borderColor: "#0B84F3",
            // backgroundColor: "#D8ECFF",
            // borderWidth: 2,
          },
        ],
      },
      options: {
        radius: 125,
        //   scales: {
        //     x: {
        //       grid: {
        //         display: false,
        //       },
        //     },
        //   },
        //Customize chart options
        layout: {
          padding: 16,
        },
        plugins: {
          legend: {
            labels: {
              // This more specific font property overrides the global property
              font: {
                size: 16,
              },
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [props.data, props.range]);

  return (
    <div className={classes.graphContainer}>
      <canvas id="myChart" ref={chartRef} />
    </div>
  );
};

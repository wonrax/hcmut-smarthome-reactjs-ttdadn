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

export const LineGraph = (props: { data: any; deviceType?: string }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const keys = [];
    for (const k in props.data) {
      keys.push(k);
    }
    keys.sort((a, b) => {
      const da = a.split("/");
      const db = b.split("/");
      var dateA = new Date(
        parseInt(da[2]),
        parseInt(da[1]) - 1,
        parseInt(da[0])
      );
      var dateB = new Date(
        parseInt(db[2]),
        parseInt(db[1]) - 1,
        parseInt(db[0])
      );
      return dateA.getTime() - dateB.getTime();
    });
    const sortedData = [];
    for (const k in keys) {
      var datum;
      if (props.deviceType === undefined) datum = props.data[keys[k]];
      else
        datum =
          props.deviceType === "temp"
            ? props.data[keys[k]]["mean-tempe"]
            : props.data[keys[k]]["humid"];
      sortedData.push(datum);
    }
    var label;
    if (props.deviceType === undefined) {
      label = "Số giờ sử dụng theo ngày";
    } else {
      label =
        props.deviceType === "temp"
          ? "Lịch sử nhiệt độ theo ngày"
          : "Lịch sử độ ẩm theo ngày";
    }
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        //Bring in data
        labels: keys,
        datasets: [
          {
            label: label,
            data: sortedData,
            cubicInterpolationMode: "monotone",
            pointBackgroundColor: "#D8ECFF",
            borderColor: "#0B84F3",
          },
        ],
      },
      options: {
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
  }, [props.data, props.deviceType]);

  return (
    <div className={classes.graphContainer}>
      <canvas id="myChart" ref={chartRef} />
    </div>
  );
};

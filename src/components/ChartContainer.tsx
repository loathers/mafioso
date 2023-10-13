import React from "react";
import { Chart, ChartData } from "chart.js/auto";

import {
  horizontalBarOptions,
  verticalBarOptions,
  lineTotalOptions,
  lineOptions,
  lineTotalMinOptions,
} from "../constants/chartOptions";
import combineClassnames from "../utilities/combineClassnames";

type MafiosoChartData = ChartData & { _type: string; _size: number };

type Props = {
  className: string;
  style: React.CSSProperties;
  chartData: MafiosoChartData;
};

export default function ChartContainer({ className, style, chartData }: Props) {
  const chartRef = React.useRef<HTMLCanvasElement>(null);
  const prevChartRef = React.useRef<Chart>();

  const chartSettings = getChartSettings(chartData._type);

  const chartConfig = {
    ...chartSettings,
    data: chartData,
  };

  // create the chart
  React.useEffect(() => {
    // remove old chart on change
    if (prevChartRef.current) {
      prevChartRef.current.destroy();
    }

    // instantiate chart.js on canvas
    if (chartData && chartRef.current !== null) {
      const chartCtx = chartRef.current.getContext("2d");
      if (chartCtx) prevChartRef.current = new Chart(chartCtx, chartConfig);
    }
  }, [prevChartRef, chartRef, chartData]);

  const containerStyle =
    chartData && getContainerStyles(chartData, chartData._type);

  return (
    <div
      id="chart-container"
      style={{ ...style, ...containerStyle }}
      className={combineClassnames("pad-6", className)}
    >
      <canvas ref={chartRef} />
    </div>
  );
}

function getContainerStyles(data: MafiosoChartData, type: string) {
  switch (type) {
    case "horizontalBar":
      return {
        height: data._size * 15 + 40,
        // width: '100%',
        margin: 20,
      };

    case "lineTotal":
    case "line":
      return {
        // width: Math.min(data._size * 20 + 100, 800),
        height: 600,
      };

    case "bar":
    default:
      return {
        // width: Math.min(data._size * 40 + 100, 800),
        height: 600,
      };
  }
}

function getChartSettings(type: string) {
  switch (type) {
    case "horizontalBar":
      return horizontalBarOptions;

    case "lineTotal":
      return lineTotalOptions;

    case "lineTotalMin":
      return lineTotalMinOptions;

    case "line":
      return lineOptions;

    case "bar":
    default:
      return verticalBarOptions;
  }
}

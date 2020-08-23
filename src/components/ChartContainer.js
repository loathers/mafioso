import React from 'react';
import Chart from 'chart.js';

import {horizontalBarOptions, verticalBarOptions, lineTotalOptions} from 'constants/chartOptions';
import combineClassnames from 'utilities/combineClassnames';

/** @returns {React.Component} */
export default function ChartContainer(props) {
  const {
    className,
    style,
    chartData,
  } = props;

  const chartRef = React.createRef();
  const prevChartRef = React.useRef();

  const chartConfig = {
    type: chartData._type,
    options: getChartSettings(chartData._type),
    data: chartData,
  };

  // create the chart
  React.useEffect(() => {
    // remove old chart on change
    if (prevChartRef.current !== undefined) {
      prevChartRef.current.destroy();
    }

    // instantiate chart.js on canvas
    if (chartData && chartRef.current !== null) {
      const chartCtx = chartRef.current.getContext('2d');
      prevChartRef.current = new Chart(chartCtx, chartConfig);
    }
  })

  const containerStyle = chartData && getContainerStyles(chartData, chartData._type);

  return (
    <div
      style={{...style, ...containerStyle}}
      className={combineClassnames('pad-6', className)}>
      <canvas ref={chartRef} />
    </div>
  )
}
function getContainerStyles(data, type) {
  switch (type) {
    case 'horizontalBar':
      return {
        height: data._size * 15 + 40,
        width: '100%',
        margin: 20,
      }

    case 'line':
      return {
        width: data._size * 20 + 100,
        height: 600,
      }

    case 'bar':
    default:
      return {
        width: data._size * 40 + 100,
        height: 600,
      }
  }
}
/**
 * @param {String} type
 * @return {Object}
 */
function getChartSettings(type) {
  switch (type) {
    case 'horizontalBar':
      return horizontalBarOptions;

    case 'line':
      return lineTotalOptions;

    case 'bar':
    default:
      return verticalBarOptions;
  }
}
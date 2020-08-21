import React from 'react';
import Chart from 'chart.js';

import combineClassnames from 'utilities/combineClassnames';

/** @returns {React.Component} */
export default function BarChartDisplay(props) {
  const {
    className,
    style,
    chartConfig,
  } = props;

  const chartRef = React.createRef();
  const prevChartRef = React.useRef();

  // create the chart
  React.useEffect(() => {
    // remove old chart on change
    if (prevChartRef.current !== undefined) {
      prevChartRef.current.destroy();
    }

    // instantiate chart.js on canvas
    if (chartConfig && chartRef.current !== null) {
      const chartCtx = chartRef.current.getContext('2d');
      prevChartRef.current = new Chart(chartCtx, chartConfig);
    }
  })

  return (
    <div style={style} className={combineClassnames('pad-6', className)}>
      <canvas ref={chartRef} />
    </div>
  )
}
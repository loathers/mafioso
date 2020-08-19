import React from 'react';
import Chart from 'chart.js';

import combineClassnames from 'utilities/combineClassnames';

export default function BarChartDisplay(props) {
  const {
    className,
    style,
    chartConfig,
  } = props;

  const chartRef = React.createRef();

  // create the chart
  React.useEffect(() => {
    if (chartConfig && chartRef && chartRef.current !== null) {
      const chartCtx = chartRef.current.getContext('2d');
      new Chart(chartCtx, chartConfig);
    }
  })

  return (
    <div style={style} className={combineClassnames('pad-6', className)}>
      <canvas ref={chartRef} />
    </div>
  )
}
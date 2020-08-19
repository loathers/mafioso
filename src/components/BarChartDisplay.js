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
      const gradient = chartCtx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(151,187,205,0.7)');
      gradient.addColorStop(1, 'rgba(151,187,205,0)');

      new Chart(chartCtx, chartConfig);
    }
  })

  return (
    <div style={style} className={combineClassnames('pad-3', className)}>
      <canvas ref={chartRef} />
    </div>
  )
}
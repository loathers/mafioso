import React from 'react';
import Chart from 'chart.js';

import combineClassnames from 'utilities/combineClassnames';

export default function BarChartDisplay(props) {
  const {
    className,
    style,
    chartData,
  } = props;

  const chartRef = React.createRef();

  React.useEffect(() => {
    if (chartRef && chartRef.current !== null) {
      const myChartRef = chartRef.current.getContext("2d");
      new Chart(myChartRef, {
        type: "line",
        data: {
            //Bring in data
            labels: ["Jan", "Feb", "March"],
            datasets: [
                {
                    label: "Sales",
                    data: [86, 67, 91],
                }
            ]
        },
      });
    }
  })

  return (
    <div style={style} className={combineClassnames('pad-3', className)}>
      <canvas
        ref={chartRef}
      />
    </div>
  )
}
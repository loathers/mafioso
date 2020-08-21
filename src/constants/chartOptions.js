export const horizontalBarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    yAxes: [{
      ticks: {
        fontColor: '#ececec',
      },
    }],
    xAxes: [{
      ticks: {
        fontColor: '#ececec',
        stepSize: 2,
      },
      gridLines: {
        color: '#353535',
      },
    }]
  }
}
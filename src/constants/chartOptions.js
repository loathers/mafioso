const COLOR_WHITE = '#ececec';
const COLOR_GRAY = '#353535';

export const horizontalBarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    yAxes: [{
      ticks: {
        fontColor: COLOR_WHITE,
      },
    }],
    xAxes: [{
      ticks: {
        fontColor: COLOR_WHITE,
        stepSize: 2,
      },
      gridLines: {
        color: COLOR_GRAY,
      },
    }]
  }
}
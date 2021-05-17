const COLOR_WHITE = '#ececec';
const COLOR_GRAY = '#353535';
const COLOR_DARK_GRAY = '#232222';

export const horizontalBarOptions = {
  type: 'horizontalBar',
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
export const verticalBarOptions = {
  type: 'bar',
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    yAxes: [{
      ticks: {
        fontColor: COLOR_WHITE,
        stepSize: 5,
      },
      gridLines: {
        color: COLOR_GRAY,
      },
    }],
    xAxes: [{
      ticks: {
        fontColor: COLOR_WHITE,
      },
    }]
  }
}
export const lineTotalOptions = {
  type: 'line',
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    yAxes: [{
      ticks: {
        fontColor: COLOR_WHITE,
        stepSize: 1000,
        // suggestedMax: 100,
        suggestedMin: -5000,
      },
      gridLines: {
        color: COLOR_DARK_GRAY,
      },
    }],
    xAxes: [{
      ticks: {
        fontColor: COLOR_WHITE,
      },
      gridLines: {
        color: COLOR_DARK_GRAY,
      },
    }]
  }
}
export const lineOptions = {
  type: 'line',
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
      gridLines: {
        color: COLOR_DARK_GRAY,
      },
    }],
    xAxes: [{
      ticks: {
        fontColor: COLOR_WHITE,
      },
      gridLines: {
        color: COLOR_DARK_GRAY,
      },
    }]
  }
}
export const lineTotalMinOptions = {
  type: 'line',
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    yAxes: [{
      ticks: {
        fontColor: COLOR_WHITE,
        stepSize: 10,
        suggestedMax: 500,
        suggestedMin: 0,
      },
      gridLines: {
        color: COLOR_DARK_GRAY,
      },
    }],
    xAxes: [{
      ticks: {
        fontColor: COLOR_WHITE,
      },
      gridLines: {
        color: COLOR_DARK_GRAY,
      },
    }]
  }
}

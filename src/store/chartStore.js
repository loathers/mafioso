// import {observable} from 'mobx';

import * as chartParserUtils from 'utilities/chartParserUtils';

/**
 * state and handler of the log data
 */
class ChartStore {
  constructor() {
    /**
     * literally all the entries
     * @type {ObservableArray<Entry>}
     */
    this.allEntries = [];
  }
  /** @type {Boolean} */
  get isReady() {
    return this.allEntries.length > 0;
  }
  /** @type {Array} */
  get locationChartData() {
    const data = chartParserUtils.createLocationData(this.allEntries.slice());

    const locationChartConfig = {
      type: 'horizontalBar',
      data: data,
      options: {
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
      },
    }

    return locationChartConfig;
  }
  /** @type {Array} */
  get familiarChartData() {
    const data = chartParserUtils.createFamiliarData(this.allEntries.slice());

    const locationChartConfig = {
      type: 'horizontalBar',
      data: data,
      options: {
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
              stepSize: 5,
            },
            gridLines: {
              color: '#353535',
            },
          }]
        }
      },
    }

    return locationChartConfig;
  }
}
/** export singleton */
export default new ChartStore();
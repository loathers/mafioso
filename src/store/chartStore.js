// import {observable} from 'mobx';

import {horizontalBarOptions, verticalBarOptions} from 'constants/chartOptions';

import * as chartParserUtils from 'utilities/chartParserUtils';
import {createColorList_purplePastel} from 'utilities/colorUtils';

/**
 * state and handler of the chart data
 */
class ChartStore {
  constructor() {
    /**
     * literally all the entries
     * @type {ObservableArray<Entry>}
     */
    this.allEntries = [];
    /** @type {String} */
    this.currentChartType = 'location';
  }
  /** @type {Boolean} */
  get isReady() {
    return this.allEntries.length > 0;
  }
  /** @type {ChartjsConfig | null} */
  get currentChartConfig() {
    switch(this.currentChartType) {
      case 'location':
        return this.locationChartData;

      case 'familiar':
        return this.familiarChartData;

      default:
        return null;
    }
  }
  /** @type {ChartjsConfig} */
  get locationChartData() {
    if (this.entryLength <= 0) {
      return null;
    }

    const chartData = chartParserUtils.createLocationData(this.allEntries.slice(), createColorList_purplePastel);
    const chartConfig = {
      containerStyle: {
        height: chartData._size * 15 + 40,
        width: '100%',
      },
      type: 'horizontalBar',
      data: chartData,
      options: horizontalBarOptions,
    }

    return chartConfig;
  }
  /** @type {ChartjsConfig} */
  get familiarChartData() {
    if (this.entryLength <= 0) {
      return null;
    }

    const chartData = chartParserUtils.createFamiliarData(this.allEntries.slice(), createColorList_purplePastel);
    const chartConfig = {
      containerStyle: {
        width: chartData._size * 40 + 100,
        height: 600,
      },
      type: 'bar',
      data: chartData,
      options: verticalBarOptions,
    }

    return chartConfig;
  }
  // --
  /** @type {Number} */
  get entryLength() {
    return this.allEntries.length;
  }
  // --
  /**
   * @param {String} chartType
   */
  onSwitchCurrentChart(chartType) {
    this.currentChartType = chartType;
  }
}
/** export singleton */
export default new ChartStore();
import {observable} from 'mobx';

import {horizontalBarOptions, verticalBarOptions, lineMeatTotalOptions} from 'constants/chartOptions';

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
    /** @type {Observable<String>} */
    this.currentChartType = observable.box('meatTotal');
  }
  /** @type {ChartjsConfig | null} */
  get currentChartConfig() {
    switch(this.currentChartType.get()) {
      case 'location':
        return this.locationChartData;

      case 'familiar':
        return this.familiarChartData;

      case 'meatTotal':
        return this.meatTotalGainedChartData;

      default:
        return null;
    }
  }
  /** @type {ChartjsConfig} */
  get locationChartData() {
    if (this.entriesLength <= 0) {
      return null;
    }

    const chartData = chartParserUtils.createLocationData(this.allEntries.slice(), createColorList_purplePastel);
    const chartConfig = {
      containerStyle: {
        height: chartData._size * 15 + 40,
        width: '100%',
        margin: 20,
      },
      type: 'horizontalBar',
      data: chartData,
      options: horizontalBarOptions,
    }

    return chartConfig;
  }
  /** @type {ChartjsConfig} */
  get familiarChartData() {
    if (this.entriesLength <= 0) {
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
  /** @type {ChartjsConfig} */
  get meatTotalGainedChartData() {
    if (this.entriesLength <= 0) {
      return null;
    }

    const chartData = chartParserUtils.createMeatTotalGainedData(this.allEntries.slice(), createColorList_purplePastel);
    const chartConfig = {
      containerStyle: {
        width: chartData._size * 20 + 100,
        height: 600,
      },
      type: 'line',
      data: chartData,
      options: lineMeatTotalOptions,
    }

    return chartConfig;
  }
  // --
  /** @type {Boolean} */
  get isReady() {
    return this.entriesLength > 0;
  }
  /** @type {Number} */
  get entriesLength() {
    return this.allEntries.length;
  }
  // --
  /**
   * @param {String} chartType
   */
  onSwitchCurrentChart(chartType) {
    this.currentChartType.set(chartType);
  }
}
/** export singleton */
export default new ChartStore();
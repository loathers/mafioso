// import {observable} from 'mobx';

import {horizontalBarOptions} from 'constants/chartOptions';

import * as chartParserUtils from 'utilities/chartParserUtils';
import {createColorList} from 'utilities/colorUtils';

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
    /** @type {ChartjsConfig | null} */
    this.currentChartConfig = this.familiarChartData;
  }
  /** @type {Boolean} */
  get isReady() {
    return this.allEntries.length > 0;
  }
  /** @type {ChartjsConfig} */
  get locationChartData() {
    const colorListGenerator = (length) => createColorList(length, ['rgb(237, 144, 238)', 'rgb(124, 158, 255)', 'rgb(139, 124, 255)']);
    const chartData = chartParserUtils.createLocationData(this.allEntries.slice(), colorListGenerator);
    const locationChartConfig = {
      type: 'horizontalBar',
      data: chartData,
      options: horizontalBarOptions,
    }

    return locationChartConfig;
  }
  /** @type {ChartjsConfig} */
  get familiarChartData() {
    const colorListGenerator = (length) => createColorList(length, ['rgb(237, 144, 238)', 'rgb(124, 158, 255)', 'rgb(139, 124, 255)']);
    const chartData = chartParserUtils.createFamiliarData(this.allEntries.slice(), colorListGenerator);
    const locationChartConfig = {
      type: 'bar',
      data: chartData,
      options: horizontalBarOptions,
    }

    return locationChartConfig;
  }
}
/** export singleton */
export default new ChartStore();
// import {observable} from 'mobx';

import {horizontalBarOptions} from 'constants/chartOptions';

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
    /** @type {ChartjsConfig | null} */
    this.currentChartConfig = this.familiarChartData;
  }
  /** @type {Boolean} */
  get isReady() {
    return this.allEntries.length > 0;
  }
  /** @type {ChartjsConfig} */
  get locationChartData() {
    if (this.entryLength <= 0) {
      return null;
    }

    const chartData = chartParserUtils.createLocationData(this.allEntries.slice(), createColorList_purplePastel);
    const chartConfig = {
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
      type: 'bar',
      data: chartData,
      options: horizontalBarOptions,
    }

    return chartConfig;
  }
  // --
  /** @type {Number} */
  get entryLength() {
    return this.allEntries.length;
  }
}
/** export singleton */
export default new ChartStore();
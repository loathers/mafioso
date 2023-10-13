import { IObservableValue, observable } from "mobx";

import { CHART_TYPES } from "../constants/CHART_TYPES";

import * as chartParserUtils from "../utilities/chartParserUtils";
import { createColorList_purplePastel } from "../utilities/colorUtils";
import Entry from "../classes/Entry";

/**
 * state and handler of the chart data
 */
class ChartStore {
  currentChartType: IObservableValue<string> = observable.box(
    CHART_TYPES.LOCATION,
  );
  allEntries: Entry[] = [];

  get currentChartData() {
    switch (this.currentChartType.get()) {
      case CHART_TYPES.LOCATION:
        return this.locationChartData;

      case CHART_TYPES.FAMILIAR:
        return this.familiarChartData;

      case CHART_TYPES.MEAT_TOTAL:
        return this.meatTotalGainedChartData;

      case "banished":
        return chartParserUtils.createAttributeTimeline(
          this.allEntries.slice(),
          "isBanished",
        );

      case "replaced":
        return chartParserUtils.createAttributeTimeline(
          this.allEntries.slice(),
          "isReplaced",
        );

      case CHART_TYPES.SCRAP_CHANGES:
        return chartParserUtils.createMinChangeTimeline(
          this.allEntries.slice(),
          "scrapChange",
          { isUsingTotals: true },
        );

      case CHART_TYPES.ENERGY_CHANGES:
        return chartParserUtils.createMinChangeTimeline(
          this.allEntries.slice(),
          "energyChange",
          { isUsingTotals: true },
        );

      default:
        return null;
    }
  }

  get locationChartData() {
    if (this.entriesLength <= 0) {
      return null;
    }

    return chartParserUtils.createLocationData(
      this.allEntries.slice(),
      createColorList_purplePastel,
    );
  }

  get familiarChartData() {
    if (this.entriesLength <= 0) {
      return null;
    }

    return chartParserUtils.createFamiliarData(
      this.allEntries.slice(),
      createColorList_purplePastel,
    );
  }

  get meatTotalGainedChartData() {
    if (this.entriesLength <= 0) {
      return null;
    }

    return chartParserUtils.createMeatTotalGainedData(
      this.allEntries.slice(),
      createColorList_purplePastel,
    );
  }

  get isReady() {
    return this.entriesLength > 0;
  }

  get entriesLength() {
    return this.allEntries.length;
  }

  get canDisplayCurrentChart() {
    return (
      this.isReady &&
      this.currentChartType.get() !== null &&
      this.currentChartData &&
      this.currentChartData._size > 0
    );
  }

  onSwitchCurrentChart(chartType: string) {
    this.currentChartType.set(chartType);
  }
}
/** export singleton */
export default new ChartStore();

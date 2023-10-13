import { Navigate } from "react-router-dom";
import { observer } from "mobx-react";
import { Helmet } from "react-helmet-async";

import { CHART_TYPES } from "../constants/CHART_TYPES";
import { HOME_URL } from "../constants/PAGE_URLS";

import appStore from "../store/appStore";
import chartStore from "../store/chartStore";

import ChartContainer from "../components/ChartContainer";
import Button from "../components/Button";

import combineClassnames from "../utilities/combineClassnames";

type Props = { className?: string };

export default observer(function ChartsPage({ className }: Props) {
  if (!appStore.isReady) {
    return <Navigate to={HOME_URL} replace />;
  }

  return (
    <div
      id="app-page-charts"
      className={combineClassnames("flex-row", className)}
    >
      <Helmet>
        <title>kolmafioso</title>
        <meta name="description" content="Mafioso charts page" />
      </Helmet>

      <ChartsMenu className="mar-r-2 flex-none" />

      <div className="flex-col aitems-center flex-auto">
        <div className="fontsize-7 f-bold talign-center">
          {chartStore.currentChartType.get()}
        </div>

        {chartStore.canDisplayCurrentChart && (
          <ChartContainer
            chartData={chartStore.currentChartData!}
            style={{ maxWidth: "70vw" }}
            className="width-full"
          />
        )}

        {!chartStore.canDisplayCurrentChart && (
          <div className="flex-row-center pad-6">
            There's not enough data to create this chart.
          </div>
        )}
      </div>
    </div>
  );
});

type ChartsMenuProps = {
  className?: string;
};

function ChartsMenu({ className }: ChartsMenuProps) {
  return (
    <div
      id="app-side-menu"
      className={combineClassnames("flex-col", className)}
    >
      <Button
        onClick={() => chartStore.onSwitchCurrentChart(CHART_TYPES.LOCATION)}
        className="pad-2 adjacent-mar-t-1"
      >
        Locations
      </Button>

      <Button
        onClick={() => chartStore.onSwitchCurrentChart(CHART_TYPES.FAMILIAR)}
        className="pad-2 adjacent-mar-t-1"
      >
        Familiars
      </Button>

      <Button
        onClick={() => chartStore.onSwitchCurrentChart(CHART_TYPES.MEAT_TOTAL)}
        className="pad-2 adjacent-mar-t-1"
      >
        Total Meat
      </Button>

      {/*<Button
        onClick={() => chartStore.onSwitchCurrentChart(CHART_TYPES.ENERGY_CHANGES)}
        className='pad-2 adjacent-mar-t-1'>
        Energy Over Time
      </Button>

      <Button
        onClick={() => chartStore.onSwitchCurrentChart(CHART_TYPES.SCRAP_CHANGES)}
        className='pad-2 adjacent-mar-t-1'>
        Scrap Over Time
      </Button>*/}
    </div>
  );
}

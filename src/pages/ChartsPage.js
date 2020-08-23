import React from 'react';
import {Redirect} from "react-router-dom";
import {observer} from 'mobx-react';

import {HOME_URL} from 'constants/PAGE_URLS';

import appStore from 'store/appStore';
import chartStore from 'store/chartStore';

import ChartContainer from 'components/ChartContainer';
import Button from 'components/Button';

import combineClassnames from 'utilities/combineClassnames';

/**
 * @param {Object} props
 * @returns {React.Component}
 */
export default observer(
function ChartsPage(props) {
  const {
    className,
  } = props;

  if (!appStore.isReady) {
    return <Redirect to={HOME_URL}/>
  }

  const chartConfig = chartStore.currentChartConfig;
  if (!chartStore.isReady || chartConfig === null || chartStore.currentChartType.get() === null) {
    return <div elementname='app-page-charts' className='fontsize-6 pad-6 flex-row-center'>Not enough data to create charts.</div>
  }

  return (
    <div
      elementname='app-page-charts'
      className={combineClassnames('flex-row', className)}>

      <ChartsMenu className='mar-r-2 flex-none' />

      <ChartContainer
        style={chartConfig.containerStyle}
        chartConfig={chartConfig}
        className='flex-auto' />
    </div>
  )
})
/** @returns {React.Component} */
function ChartsMenu(props) {
  const {
    className,
  } = props;

  return (
    <div
      elementname='app-side-menu'
      className={combineClassnames('flex-col', className)}>
      <Button
        onClick={() => chartStore.onSwitchCurrentChart('location')}
        className='pad-2 adjacent-mar-t-1'>
        Locations
      </Button>

      <Button
        onClick={() => chartStore.onSwitchCurrentChart('familiar')}
        className='pad-2 adjacent-mar-t-1'>
        Familiars
      </Button>

      <Button
        onClick={() => chartStore.onSwitchCurrentChart('meatTotal')}
        className='pad-2 adjacent-mar-t-1'>
        Meat Total
      </Button>
    </div>
  )
}
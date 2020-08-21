import React from 'react';
import {Redirect} from "react-router-dom";
import {observer} from 'mobx-react';

import {HOME_URL} from 'constants/PAGE_URLS';

import appStore from 'store/appStore';
import chartStore from 'store/chartStore';

import BarChartDisplay from 'components/BarChartDisplay';
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

  if (!chartStore.isReady) {
    return <div elementname='app-page-charts' className='fontsize-6 pad-6 flex-row-center'>Not enough data to create charts.</div>
  }

  // get the data set and set height based on it
  const chartConfig = chartStore.familiarChartData;

  return (
    <div
      elementname='app-page-charts'
      className={combineClassnames('flex-row', className)}>

      <ChartsPageMenu className='mar-r-2' />

      <BarChartDisplay
        style={chartConfig.containerStyle}
        chartConfig={chartConfig} />
    </div>
  )
})
/** @returns {React.Component} */
function ChartsPageMenu(props) {
  const {
    className,
  } = props;

  return (
    <div
      elementname='app-side-menu'
      className={combineClassnames('flex-col', className)}>
      <Button className='pad-2 adjacent-mar-t-1'>
        Locations
      </Button>

      <Button className='pad-2 adjacent-mar-t-1'>
        Familiars
      </Button>
    </div>
  )
}
import React from 'react';
import {Redirect} from "react-router-dom";
import {observer} from 'mobx-react';

import {HOME_URL} from 'constants/PAGE_URLS';

import appStore from 'store/appStore';
import chartStore from 'store/chartStore';

import BarChartDisplay from 'components/BarChartDisplay';

import combineClassnames from 'utilities/combineClassnames';

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
  const chartConfig = chartStore.locationChartData;
  const numDataPoints = chartConfig.data.labels.length;
  const canvasHeight = numDataPoints * 15 + 40;

  return (
    <div
      elementname='app-page-charts'
      className={combineClassnames('flex-col', className)}>
      <BarChartDisplay
        style={{height: canvasHeight}}
        chartConfig={chartConfig} />
    </div>
  )
})
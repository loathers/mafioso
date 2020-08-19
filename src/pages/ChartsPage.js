import React from 'react';
import {Redirect} from "react-router-dom";
import {observer} from 'mobx-react';

import {HOME_URL} from 'constants/PAGE_URLS';

import appStore from 'store/appStore';
import logStore from 'store/logStore';

import BarChartDisplay from 'components/BarChartDisplay';

import combineClassnames from 'utilities/combineClassnames';
import * as chartParserUtils from 'utilities/chartParserUtils';

export default observer(
function ChartsPage(props) {
  const {
    className,
  } = props;

  if (!appStore.isReady) {
    return <Redirect to={HOME_URL}/>
  }
  const data = chartParserUtils.createLocationData(logStore.allEntries.slice());
  const numDataPoints = data.labels.length;
  const canvasHeight = numDataPoints * 14 + 50;

  const locationChartConfig = {
    type: 'horizontalBar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
    },
  }

  return (
    <div
      elementname='app-page-charts'
      className={combineClassnames('flex-col', className)}>
      <BarChartDisplay
        style={{height: canvasHeight}}
        chartConfig={locationChartConfig} />
    </div>
  )
})
import React from 'react';
import {Redirect} from "react-router-dom";
import {observer} from 'mobx-react';

import {HOME_URL} from 'constants/PAGE_URLS';

import appStore from 'store/appStore';
// import logStore from 'store/logStore';

import BarChartDisplay from 'components/BarChartDisplay';

import combineClassnames from 'utilities/combineClassnames';

export default observer(
function ChartsPage(props) {
  const {
    className,
  } = props;

  if (!appStore.isReady) {
    // return <Redirect to={HOME_URL}/>
  }

  return (
    <div
      elementname='app-page-charts'
      className={combineClassnames('flex-col', className)}>
      <BarChartDisplay />
    </div>
  )
})
import React from 'react';
import {Redirect} from "react-router-dom";
import {observer} from 'mobx-react';

import {HOME_URL} from 'constants/PAGE_URLS';

import appStore from 'store/appStore';
// import chartStore from 'store/chartStore';

// import ChartContainer from 'components/ChartContainer';
// import Button from 'components/Button';

import combineClassnames from 'utilities/combineClassnames';

/**
 * @param {Object} props
 * @returns {React.Component}
 */
export default observer(
function StatsPage(props) {
  const {
    className,
  } = props;

  if (!appStore.isReady) {
    return <Redirect to={HOME_URL}/>
  }

  return (
    <div
      elementname='app-page-charts'
      className={combineClassnames('flex-row', className)}>
      Stats Page
    </div>
  )
})

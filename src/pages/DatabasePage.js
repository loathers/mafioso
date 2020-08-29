import React from 'react';
import {Redirect} from "react-router-dom";
import {observer} from 'mobx-react';

import {HOME_URL} from 'constants/PAGE_URLS';

import appStore from 'store/appStore';
// import logStore from 'store/logStore';

export default observer(
function DatabasePage(props) {
  if (!appStore.isReady) {
    return <Redirect to={HOME_URL}/>
  }

  return (
    <div
      elementname='app-page-database'
      className='fontsize-4 flex-col'>

      <div>Yup</div>
    </div>
  )
})

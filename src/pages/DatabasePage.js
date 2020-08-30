import React from 'react';
import {Redirect} from "react-router-dom";
import {observer} from 'mobx-react';

import {HOME_URL} from 'constants/PAGE_URLS';

import appStore from 'store/appStore';
import databaseStore from 'store/databaseStore';

export default observer(
function DatabasePage(props) {

  React.useEffect(() => {
    // nothing ready
    if (databaseStore.isReady || !appStore.isReady) return;

    console.log('fetchinnnn')
    databaseStore.fetch();
  })

  if (!appStore.isReady) {
    return <Redirect to={HOME_URL}/>
  }

  const testList = ['a', 'b', 'c'];

  return (
    <div
      elementname='app-page-database'
      className='fontsize-4 flex-col'>

      {testList.map((rowData, idx) => (
        <DatabaseRow
          key={`database-list-row-${idx}-key`}
          children={rowData} />
      ))}

    </div>
  )
})

function DatabaseRow(props) {
  return (
    <div className='adjacent-mar-t-2'>
      {props.children}
    </div>
  )
}

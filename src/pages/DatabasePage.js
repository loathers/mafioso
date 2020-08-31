import React from 'react';
import {observer} from 'mobx-react';

import appStore from 'store/appStore';
import databaseStore from 'store/databaseStore';

export default observer(
function DatabasePage(props) {

  React.useEffect(() => {
    // no need to fetch if we have the data already or if app is not ready
    if (databaseStore.isReady || appStore.isLoading) return;

    databaseStore.fetch();
  })

  console.log('databaseStore.databaseList', databaseStore.databaseList);

  return (
    <div
      elementname='app-page-database'
      className='fontsize-4 flex-col'>

      {databaseStore.databaseList.map((rowData, idx) => (
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

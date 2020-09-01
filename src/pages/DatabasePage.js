import React from 'react';
import {observer} from 'mobx-react';

import appStore from 'store/appStore';
import databaseStore from 'store/databaseStore';

import DatabaseListDisplay from 'sections/DatabaseListDisplay';
import DatabaseListMenu from 'sections/DatabaseListMenu';

export default observer(
function DatabasePage(props) {

  React.useEffect(() => {
    // no need to fetch if we have the data already or if app is not ready
    if (databaseStore.isReady || appStore.isLoading) return;

    databaseStore.fetchActiveLogs();
  });

  return (
    <div
      elementname='app-page-database'
      className='fontsize-4 flex-col aitems-center'>

      <DatabaseListMenu
        className='flex-auto' />

      <DatabaseListDisplay
        onClickView={(databaseEntry) => appStore.onViewSharedLog(databaseEntry)}
        list={databaseStore.databaseList}
        className='' />

    </div>
  )
})

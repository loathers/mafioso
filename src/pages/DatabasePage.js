import React from 'react';
import {observer} from 'mobx-react';

import DATABASE_ENTRY_STATUS from 'constants/DATABASE_ENTRY_STATUSES';

import appStore from 'store/appStore';
import databaseStore from 'store/databaseStore';

import DatabaseListDisplay from 'sections/DatabaseListDisplay';
import DatabaseListMenu from 'sections/DatabaseListMenu';

export default observer(
function DatabasePage(props) {

  React.useEffect(() => {
    // no need to fetch if we have the data already or if app is not ready
    if (databaseStore.isReady || appStore.isLoading) return;

    if (appStore.isDevEnv) {
      databaseStore.fetchLogList({status: DATABASE_ENTRY_STATUS.ANY});

    } else {
      databaseStore.fetchLogList({status: DATABASE_ENTRY_STATUS.ACTIVE});
    }
  });

  return (
    <div
      elementname='app-page-database'
      className='fontsize-4 flex-col aitems-center'>

      <DatabaseListMenu
        className='flex-auto' />

      <DatabaseListDisplay
        hasEditOptions={appStore.isDevEnv}
        onClickView={(databaseEntry) => appStore.onViewSharedLog(databaseEntry)}
        list={databaseStore.databaseList}
        className='' />

    </div>
  )
})

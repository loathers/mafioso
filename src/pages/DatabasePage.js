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

  const onClickStatusToggle = (databaseEntry) => {
    const isActive = databaseEntry.status === DATABASE_ENTRY_STATUS.ACTIVE;
    databaseEntry.status = isActive ? DATABASE_ENTRY_STATUS.INACTIVE : DATABASE_ENTRY_STATUS.ACTIVE;
    databaseStore.onUpdateLog(databaseEntry);
  }

  return (
    <div
      elementname='app-page-database'
      className='fontsize-4 flex-col aitems-center'>

      <DatabaseListMenu
        className='flex-auto' />

      { databaseStore.hasData &&
        <DatabaseListDisplay
          hasEditOptions={appStore.isDevEnv}
          onClickView={(databaseEntry) => appStore.onViewSharedLog(databaseEntry)}
          onClickStatusToggle={(databaseEntry) => onClickStatusToggle(databaseEntry)}
          currentList={databaseStore.currentList}
          className='' />
      }

      { !databaseStore.hasData &&
        <div className='flex-row-center fontsize-6 color-white flex-auto'>
          Database unavailable
        </div>
      }

    </div>
  )
})

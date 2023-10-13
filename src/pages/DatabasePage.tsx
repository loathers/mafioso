import React from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react";
import { Helmet } from "react-helmet-async";

import DATABASE_ENTRY_STATUS from "../constants/DATABASE_ENTRY_STATUSES";
import { LOG_VIS_URL } from "../constants/PAGE_URLS";

import appStore from "../store/appStore";
import databaseStore, { RunLog } from "../store/databaseStore";

import DatabaseListDisplay from "../sections/DatabaseListDisplay";
import DatabaseListMenu from "../sections/DatabaseListMenu";

export default observer(function DatabasePage() {
  // set state to only attempt to fetch once
  const [hasFetched, updateHasFetched] = React.useState(false);

  React.useEffect(() => {
    // no need to fetch if we have the data already or if app is not ready
    if (databaseStore.isReady || appStore.isLoading || hasFetched) return;

    updateHasFetched(true);
    if (appStore.isDevEnv) {
      databaseStore.fetchLogList({ status: DATABASE_ENTRY_STATUS.MOST });
    } else {
      databaseStore.fetchLogList({ status: DATABASE_ENTRY_STATUS.ACTIVE });
    }
  }, [hasFetched]);

  const onClickStatusToggle = (databaseEntry: RunLog) => {
    const isActive = databaseEntry.status === DATABASE_ENTRY_STATUS.ACTIVE;
    databaseEntry.status = isActive
      ? DATABASE_ENTRY_STATUS.INACTIVE
      : DATABASE_ENTRY_STATUS.ACTIVE;
    databaseStore.onUpdateLog(databaseEntry);
  };

  const onClickDelete = (databaseEntry: RunLog) => {
    databaseEntry.status = DATABASE_ENTRY_STATUS.DISABLED;
    databaseStore.onUpdateLog(databaseEntry);
  };

  if (appStore.shouldRedirectToVisualizer.get() && !appStore.isLoading) {
    return <Navigate to={LOG_VIS_URL} replace />;
  }

  return (
    <div id="app-page-database" className="fontsize-4 flex-row jcontent-center">
      <Helmet>
        <title>kolmafioso</title>
        <meta
          name="description"
          content="Mafioso database page of shared logs for Kingdom of Loathing"
        />
      </Helmet>

      <DatabaseListMenu className="flex-auto" />

      {databaseStore.hasData && (
        <DatabaseListDisplay
          hasEditOptions={appStore.isDevEnv}
          onClickView={(databaseEntry) =>
            appStore.onViewSharedLog(databaseEntry.hashcode)
          }
          onClickStatusToggle={(databaseEntry) =>
            onClickStatusToggle(databaseEntry)
          }
          onClickDelete={(databaseEntry) => onClickDelete(databaseEntry)}
          currentList={databaseStore.currentList}
          searchTerm={databaseStore.searchTermFilter.get()}
          className=""
        />
      )}

      {!databaseStore.hasData && (
        <div className="flex-row-center fontsize-6 color-white flex-auto">
          Database unavailable
        </div>
      )}
    </div>
  );
});

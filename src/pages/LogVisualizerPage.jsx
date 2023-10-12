import React, { useEffect } from "react";
import { redirect, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { Helmet } from "react-helmet-async";

import { HOME_URL, LOG_VIS_URL } from "../constants/PAGE_URLS";

import appStore from "../store/appStore";
import logStore from "../store/logStore";

import EntryHeaderDisplay from "../components/EntryHeaderDisplay";

import LogVisualizerMenu from "../sections/LogVisualizerMenu";
import PageControlMenu from "../sections/PageControlMenu";
import LogEntryViewer from "../sections/LogEntryViewer";

export default observer(function LogVisualizerPage(props) {
  // set a listener to fetch more entries as user is scrolling
  const onScroll = () => {
    const currY = window.scrollY;
    const totalY = window.document.body.clientHeight;
    if (totalY - currY < 1000) {
      if (
        appStore.isReady &&
        !logStore.isLazyLoading.get() &&
        !logStore.isOnLastPage
      ) {
        // experiment compacting everything and not showing pagination menu when using lazy load
        appStore.isUsingCompactMode.set(true);
        appStore.canToggleCompact.set(false);

        logStore.fetchEntriesAppended({
          pageNum: logStore.currentPageNum + 1,
        });
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  // scroll to the top if someone told the appStore we should
  //  might need a better implementation
  useEffect(() => {
    if (appStore.shouldScrollUp.get()) {
      appStore.shouldScrollUp.set(false);
      appStore.canToggleCompact.set(true);
      window.scrollTo({ top: 0 });
    }
  });

  // if using a direct url of a valid log hash, we can fetch it immediately
  const [isLoading, updateLoading] = React.useState(true);
  const { hashcode } = useParams();
  useEffect(() => {
    function fetchData() {
      if (
        hashcode !== undefined &&
        hashcode !== "uploaded" &&
        !logStore.hasParsedEntries
      ) {
        appStore.onViewSharedLog(hashcode).finally(() => updateLoading(false));
      } else {
        updateLoading(false);
      }
    }

    fetchData();
  }, [hashcode]);

  const {
    history,
    location: { pathname },
  } = props;

  useEffect(() => {
    appStore.shouldRedirectToVisualizer.set(false);

    // if user uploaded a log while viewing an imported log, update the url to /uploaded
    if (
      !isLoading &&
      !logStore.isImportedLog &&
      pathname !== `${LOG_VIS_URL}/uploaded`
    ) {
      history.push(`${LOG_VIS_URL}/uploaded`);
    }

    // similarly, if log is now shareable, we can redirect from /uploaded to /hash
    if (
      !isLoading &&
      logStore.isShareableLog &&
      pathname === `${LOG_VIS_URL}/uploaded`
    ) {
      history.push(`${LOG_VIS_URL}/${logStore.hashcode}`);
    }
  }, [isLoading, history, pathname]);

  // done loading but got nothing
  const isFinishedLoading = !isLoading && !appStore.isLoading;
  if (isFinishedLoading && !logStore.hasParsedEntries) {
    return redirect(HOME_URL);
  }

  return (
    <div elementname="app-page-visualizer" className="flex-row jcontent-center">
      <Helmet>
        <title>kolmafioso - visualizer</title>
        <meta property="og:title" content="kolmafioso - visualizer" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={`Mafioso Log for ${logStore.characterName} the ${logStore.className} in ${logStore.difficultyName} ${logStore.pathName}`}
        />
        <meta
          name="description"
          content={`Mafioso Log for ${logStore.characterName} the ${logStore.className} in ${logStore.difficultyName} ${logStore.pathName}`}
        />
        <meta name="theme-color" content="#14181c" />
      </Helmet>

      <LogVisualizerMenu className="flex-auto adjacent-mar-t-5" />

      <PageControlMenu />

      <div elementname="app-content" className="flex-col-center flex-auto">
        {logStore.difficultyName && logStore.pathName && (
          <EntryHeaderDisplay
            topContent={logStore.difficultyName}
            bottomContent={logStore.pathName}
            className="adjacent-mar-t-5"
          />
        )}

        {logStore.hasCurrentEntries && (
          <LogEntryViewer
            entriesList={logStore.currentEntries}
            voterMonsters={logStore.ascensionAttributes.voterMonsters}
            className="flex-auto adjacent-mar-t-5"
          />
        )}

        {!logStore.hasCurrentEntries && (
          <div className="flex-row-center fontsize-6 color-white flex-auto adjacent-mar-t-5">
            Huh, nothing here.
          </div>
        )}

        {logStore.isLazyLoading.get() && (
          <div
            className="spinner flex-none adjacent-mar-t-5"
            style={{
              width: 30,
              height: 30,
              borderColor: "white",
              borderWidth: 5,
            }}
          />
        )}
      </div>
    </div>
  );
});

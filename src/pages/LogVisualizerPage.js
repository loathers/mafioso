import React, {useEffect} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {observer} from 'mobx-react';

import {HOME_URL, LOG_VIS_URL} from 'constants/PAGE_URLS';

import appStore from 'store/appStore';
import logStore from 'store/logStore';

import EntryHeaderDisplay from 'components/EntryHeaderDisplay';

import LogVisualizerMenu from 'sections/LogVisualizerMenu';
import PageControlMenu from 'sections/PageControlMenu';
import LogEntryViewer from 'sections/LogEntryViewer';

export default observer(
function LogVisualizerPage(props) {
  // set a listener to fetch more entries as user is scrolling
  const onScroll = (evt) => {
    const currY = window.scrollY;
    const totalY = window.document.body.clientHeight;
    if ((totalY - currY) < 1000) {
      if (appStore.isReady && !logStore.isLazyLoading.get() && !logStore.isOnLastPage) {
        // experiment compacting everything and not showing pagination menu when using lazy load
        appStore.isUsingCompactMode.set(true);
        appStore.canToggleCompact.set(false);

        logStore.fetchEntriesAppended({
          pageNum: logStore.currentPageNum + 1,
        });
      }
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  // scroll to the top if someone told the appStore we should
  //  might need a better implementation
  useEffect(() => {
    if (appStore.shouldScrollUp.get()) {
      appStore.shouldScrollUp.set(false);
      appStore.canToggleCompact.set(true);
      window.scrollTo({top: 0});
    }
  });

  // if using a direct url of a valid log hash, we can fetch it immediately
  const [isLoading, updateLoading] = React.useState(true);
  const {hashcode} = useParams();
  useEffect(() => {
    function fetchData() {
      if (hashcode !== undefined && hashcode !== 'uploaded' && !logStore.hasParsedEntries) {
        appStore.onViewSharedLog(hashcode)
          .finally(() => updateLoading(false));
      } else {
        updateLoading(false);
      }
    }

    fetchData();
  }, [hashcode]);

  useEffect(() => {
    // if user uploaded a log while viewing an imported log, update the url to /uploaded
    if (!logStore.isImportedLog && props.location.pathname !== `${LOG_VIS_URL}/uploaded`) {
      props.history.push(`${LOG_VIS_URL}/uploaded`);
    }

    // similarly, if log is now shareable, we can redirect from /uploaded to /hash
    if (logStore.isShareableLog && props.location.pathname === `${LOG_VIS_URL}/uploaded`) {
      props.history.push(`${LOG_VIS_URL}/${logStore.hashcode}`);
    }
  })

  // done loading but got nothing
  const isFinishedLoading = !isLoading && !appStore.isLoading;
  if (isFinishedLoading && !logStore.hasParsedEntries) {
    return <Redirect to={HOME_URL}/>
  }

  return (
    <div
      elementname='app-page-visualizer'
      className='flex-row jcontent-center'>
      <LogVisualizerMenu
        className='flex-auto adjacent-mar-t-5' />

      <PageControlMenu />

      <div elementname='app-content' className='flex-col-center flex-auto'>
        { logStore.difficultyName && logStore.pathName &&
          <EntryHeaderDisplay
            topContent={logStore.difficultyName}
            bottomContent={logStore.pathName}
            className='adjacent-mar-t-5'
          />
        }

        { logStore.hasCurrentEntries &&
          <LogEntryViewer
            entriesList={logStore.currentEntries}
            voterMonsters={logStore.ascensionAttributes.voterMonsters}
            className='flex-auto adjacent-mar-t-5'
          />
        }

        { !logStore.hasCurrentEntries &&
          <div className='flex-row-center fontsize-6 color-white flex-auto adjacent-mar-t-5'>
            Huh, nothing here.
          </div>
        }

        { logStore.isLazyLoading.get() &&
          <div
            className='spinner flex-none adjacent-mar-t-5'
            style={{
              width: 30,
              height: 30,
              borderColor: 'white',
              borderWidth: 5,
            }}
          />
        }
      </div>
    </div>
  )
})

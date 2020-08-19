import React, {useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {observer} from 'mobx-react';

import {HOME_URL} from 'constants/PAGE_URLS';

import appStore from 'store/appStore';
import logStore from 'store/logStore';

import EntryHeaderDisplay from 'components/EntryHeaderDisplay';

import MainMenu from 'sections/MainMenu';
import PageControlMenu from 'sections/PageControlMenu';
import LogEntryViewer from 'sections/LogEntryViewer';

import combineClassnames from 'utilities/combineClassnames';

export default observer(
function LogVisualizerPage(props) {
  const {
    className,
  } = props;

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
          entriesPerPage: 50,
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

  if (!logStore.hasParsedEntries) {
    return <Redirect to={HOME_URL}/>
  }

  return (
    <div
      elementname='app-page-visualizer'
      className={combineClassnames('flex-row jcontent-center', className)}>
      <MainMenu
        className='flex-auto adjacent-mar-t-5' />

      <PageControlMenu />

      <div elementname='app-content' className='flex-col-center flex-auto'>
        { logStore.isAscensionLog &&
          <EntryHeaderDisplay
            topContent={logStore.difficultyName}
            bottomContent={logStore.pathName}
            className='adjacent-mar-t-5'
          />
        }

        { logStore.hasCurrentEntries &&
          <LogEntryViewer
            entriesList={logStore.currentEntries}
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
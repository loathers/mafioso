import React, {useEffect} from 'react';
import {observer} from 'mobx-react';

import appStore from 'store/appStore';
import logStore from 'store/logStore';

import HeaderDisplay from 'components/HeaderDisplay';

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

  return (
    <div elementname='page-visualizer' className={combineClassnames('flex-row', className)}>
      <MainMenu
        showFull={appStore.isShowingFullUpload}
        className='flex-auto adjacent-mar-t-5' />

      { logStore.hasParsedEntries &&
        <PageControlMenu />
      }

      { logStore.hasParsedEntries &&
        <div elementname='app-content' className='flex-col-center flex-auto'>
          { logStore.isAscensionLog &&
            <HeaderDisplay
              topContent={logStore.difficultyName}
              bottomContent={logStore.pathName}
              className='adjacent-mar-t-5'
            />
          }

          { logStore.hasCurrentEntries &&
            <LogEntryViewer
              entriesList={logStore.currentEntries}
              isUsingCompactMode={appStore.isUsingCompactMode.get()}
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
      }
    </div>
  )
})
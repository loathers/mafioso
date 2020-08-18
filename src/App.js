import React, {useEffect} from 'react';
import {observer} from 'mobx-react';

import appStore from 'store/appStore';
import logStore from 'store/logStore';

import HeaderDisplay from 'components/HeaderDisplay';
import LoaderComponent from 'components/LoaderComponent';

import Footer from 'sections/Footer';
import MainMenu from 'sections/MainMenu';
import PageControlMenu from 'sections/PageControlMenu';
import VisualizerSection from 'sections/VisualizerSection';

export default observer(
function App() {
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
    <div
      id='app-main'
      appmode={appStore.isShowingFullUpload ? 'splash' : 'ready'}
      className='color-white fontfamily-primary fontsize-5'>

      {/* loader */}
      { appStore.isLoading && !logStore.isLazyLoading.get() &&
        <LoaderComponent />
      }

      <MainMenu
        showFull={appStore.isShowingFullUpload}
        className='flex-auto' />

      { logStore.hasParsedEntries &&
        <PageControlMenu />
      }

      { logStore.hasParsedEntries &&
        <div componentname='app-content' className='flex-col-center flex-auto'>
          { logStore.isAscensionLog &&
            <HeaderDisplay
              topContent={logStore.difficultyName}
              bottomContent={logStore.pathName}
              className='adjacent-mar-t-5'
            />
          }

          { logStore.hasCurrentEntries &&
            <VisualizerSection
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

      <Footer
        className='position-fixed' />
    </div>
  );
})

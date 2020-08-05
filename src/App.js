import React from 'react';
import {observer} from 'mobx-react';

import appStore from 'store/appStore';
import logStore from 'store/logStore';

import HeaderDisplay from 'components/HeaderDisplay';
import LoaderComponent from 'components/LoaderComponent';

import Footer from 'sections/Footer';
import MainMenu from 'sections/MainMenu';
import NavigationMenu from 'sections/NavigationMenu';
import VisualizerSection from 'sections/VisualizerSection';

export default observer(
function App() {
  // scroll to the top when loading is complete
  //  such as when navigating pages
  React.useEffect(() => {
    if (!appStore.isLoading) {
      window.scrollTo({top: 0});
    }
  });

  return (
    <div 
      className='color-white fontfamily-primary fontsize-5 pad-7 flex-col aitems-center'
      id='app-main'>

      {/* loader */}
      { appStore.isLoading &&
        <LoaderComponent />
      }

      <MainMenu
        showFull={appStore.isShowingFullUpload}
        className='flex-auto' />

      { logStore.hasParsedEntries &&
        <NavigationMenu 
          style={{bottom: 50}} />
      }

      { logStore.hasParsedEntries &&
        <div className='width-full flex-col-center flex-auto'>
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
        </div>
      }

      <Footer 
        style={{bottom: 20}}
        className='position-fixed' />
    </div>
  );
})

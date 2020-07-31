import React from 'react';
import {observer} from 'mobx-react';

import appStore from 'store/appStore';
import logStore from 'store/logStore';

import AscensionTitleDisplay from 'components/AscensionTitleDisplay';
import LoaderComponent from 'components/LoaderComponent';

import ControlsMenu from 'sections/ControlsMenu';
import VisualizerSection from 'sections/VisualizerSection';

// todo: css or constant
const MENU_WIDTH = 200;
const MENU_LEFT = 30;

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
      className='color-white fontfamily-primary fontsize-5 pad-7 flex-row jcontent-center'
      id='slv-main'>

      {/* loader */}
      { appStore.isLoading &&
        <LoaderComponent />
      }

      <ControlsMenu
        style={{
          width: MENU_WIDTH,
          left: MENU_LEFT,
        }}
        showFull={appStore.isShowingFullUpload} />

        { logStore.isReady &&
          <div style={{marginLeft: MENU_WIDTH + MENU_LEFT, width: '100%'}} className='flex-col-center flex-auto'>
            { logStore.hasAscensionLog &&
              <AscensionTitleDisplay
                pathName={logStore.pathName}
                difficultyName={logStore.ascensionDifficulty}
                className='adjacent-mar-t-5'
              />
            }

            { logStore.hasCurrentEntries &&
              <VisualizerSection 
                entriesList={logStore.currentEntries}
                className='adjacent-mar-t-5'
              />
            }

            { !logStore.hasCurrentEntries &&
              <div className='fontsize-6 color-white'>
                Huh, nothing here.
              </div>
            }
          </div>
        }

    </div>
  );
})

import React from 'react';
import {observer} from 'mobx-react';

import appStore from 'store/appStore';
import logStore from 'store/logStore';

import HeaderDisplay from 'components/HeaderDisplay';
import LoaderComponent from 'components/LoaderComponent';

import ControlsMenu from 'sections/ControlsMenu';
import PaginationMenu from 'sections/PaginationMenu';
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
        style={{width: MENU_WIDTH, left: MENU_LEFT}}
        showFull={appStore.isShowingFullUpload} />

      { logStore.hasParsedEntries &&
        <PaginationMenu />
      }

      { logStore.hasParsedEntries &&
        <div style={{marginLeft: MENU_WIDTH + MENU_LEFT, width: '100%'}} className='flex-col-center flex-auto'>
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
              className='adjacent-mar-t-5'
            />
          }

          { !logStore.hasCurrentEntries &&
            <div className='fontsize-6 color-white adjacent-mar-t-5'>
              Huh, nothing here.
            </div>
          }
        </div>
      }
    </div>
  );
})

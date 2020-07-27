import React from 'react';
import {observer} from 'mobx-react';

import appStore from 'store/appStore';
import logStore from 'store/logStore';

import LoaderComponent from 'components/LoaderComponent';

import ControlsMenu from 'sections/ControlsMenu';
import VisualizerSection from 'sections/VisualizerSection';

// todo: css or constant
const MENU_WIDTH = 200;
const MENU_LEFT = 30;

export default observer(
function App() {

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

      { logStore.hasCurrentEntries &&
        <div style={{marginLeft: MENU_WIDTH + MENU_LEFT, width: '100%'}} className='flex-col-center flex-auto'>
          <VisualizerSection 
            entriesList={logStore.currentEntries}
          />
        </div>
      }
    </div>
  );
})

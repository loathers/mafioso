import React from 'react';
import {observer} from 'mobx-react';

import appStore from 'store/appStore';
import logStore from 'store/logStore';

import LoaderComponent from 'components/LoaderComponent';

import ControlsMenu from 'sections/ControlsMenu';
import VisualizerSection from 'sections/VisualizerSection';

export default observer(
function App() {

  return (
    <div 
      className='color-white fontfamily-primary fontsize-5 pad-7 flex-col aitems-center'
      id='slv-main'>

      {/* loader */}
      { appStore.isLoading &&
        <LoaderComponent />
      }

      <ControlsMenu />

      <div style={{marginLeft: 180, maxWidth: '100%'}} className='flex-col-center flex-auto'>
        <VisualizerSection 
          entriesList={logStore.currentEntries}
        />
      </div>
    </div>
  );
})

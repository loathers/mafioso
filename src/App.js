import React from 'react';
import {observer} from 'mobx-react';

// import 'store/appStore';
import logStore from 'store/logStore';

import UploadComponent from 'components/UploadComponent';

import VisualizerSection from 'sections/VisualizerSection';

export default observer(
function App() {
  return (
    <div 
      className='bg-third pad-4'
      id='slv-main'>

      <div className='fontsize-5 fontfamily-tertiary adjacent-mar-t-4'>
        Shiny Log Visualizer
      </div>

      <UploadComponent />

      <VisualizerSection 
        logData={logStore.logData}
      />
    </div>
  );
})

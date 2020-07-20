import React from 'react';

import 'store/appStore';

import UploadComponent from 'components/UploadComponent';

function App() {
  return (
    <div 
      className='bg-third pad-4'
      id='slv-main'>

      <div className='fontsize-5 fontfamily-tertiary adjacent-mar-t-2'>
        Shiny Log Visualizer
      </div>

      <UploadComponent />
    </div>
  );
}

export default App;

import React from 'react';

import 'store/appStore';

import UploadComponent from 'components/UploadComponent';

function App() {
  return (
    <div 
      className='bg-third pad-4'
      id='slv-main'>
      <span>Gimme that txt</span>

      <UploadComponent />
    </div>
  );
}

export default App;

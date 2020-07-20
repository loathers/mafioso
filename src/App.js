import React from 'react';

import 'store/appStore';

import UploadComponent from 'components/UploadComponent';

import './App.css';

function App() {
  return (
    <div className="App">
      <span>Gimme that txt</span>

      <UploadComponent />
    </div>
  );
}

export default App;

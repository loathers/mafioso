import React from 'react';

import logStore from 'store/logStore';

import UploadComponent from 'components/UploadComponent';

import './App.css';

logStore.parse();

function App() {
  return (
    <div className="App">
      <span>Gimme that txt</span>

      <UploadComponent />
    </div>
  );
}

export default App;

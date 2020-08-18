import React from 'react';
import {observer} from 'mobx-react';

import appStore from 'store/appStore';
import logStore from 'store/logStore';

import LoaderComponent from 'components/LoaderComponent';

import Footer from 'sections/Footer';
import Navbar from 'sections/Navbar';

import VisualizerPage from 'pages/VisualizerPage';

export default observer(
function App() {


  return (
    <div
      id='app-main'
      appmode={appStore.isShowingFullUpload ? 'splash' : 'ready'}
      className='color-white fontfamily-primary fontsize-5'>

      {/* loader */}
      { appStore.isLoading && !logStore.isLazyLoading.get() &&
        <LoaderComponent />
      }

      {/* Top */}
      <Navbar
        className='adjacent-mar-t-5' />

      {/* Body */}
      <VisualizerPage
        className='adjacent-mar-t-5' />

      {/* Bottom */}
      <Footer
        className='position-fixed' />
    </div>
  );
})

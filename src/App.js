import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
} from "react-router-dom";
import {observer} from 'mobx-react';

import {HOME_URL, LOG_VIS_URL} from 'constants/PAGE_URLS';

import appStore from 'store/appStore';
import logStore from 'store/logStore';

import LoaderComponent from 'components/LoaderComponent';

import Footer from 'sections/Footer';
import Navbar from 'sections/Navbar';

import HomePage from 'pages/HomePage';
import LogVisualizerPage from 'pages/LogVisualizerPage';

export default observer(
function App() {
  return (
    <Router>
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
        <Switch>
          <Route exact path={HOME_URL}>
            <HomePage className='adjacent-mar-t-5'/>
          </Route>

          <Route path={LOG_VIS_URL}>
            <LogVisualizerPage
              className='adjacent-mar-t-5' />
          </Route>
        </Switch>

        {/* Bottom */}
        <Footer
          className='position-fixed' />
      </div>
    </Router>
  );
})

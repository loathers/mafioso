import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {observer} from 'mobx-react';

import {LOG_VIS_URL, CHARTS_URL, DATABASE_URL} from 'constants/PAGE_URLS';

import appStore from 'store/appStore';
import logStore from 'store/logStore';

import LoaderComponent from 'components/LoaderComponent';
import Toaster from 'components/Toaster';

import Footer from 'sections/Footer';
import Navbar from 'sections/Navbar';

import HomePage from 'pages/HomePage';
import ChartsPage from 'pages/ChartsPage';
import DatabasePage from 'pages/DatabasePage';
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

        <Toaster
          children={'Toast!'} />

        {/* Top */}
        <Navbar
          className='adjacent-mar-t-5' />

        {/* Body */}
        <Switch>
          <Route path={LOG_VIS_URL}>
            <LogVisualizerPage />
          </Route>

          <Route path={CHARTS_URL}>
            <ChartsPage />
          </Route>

          <Route path={DATABASE_URL}>
            <DatabasePage />
          </Route>

          <Route>
            <HomePage />
          </Route>
        </Switch>

        {/* Bottom */}
        <Footer
          className='position-fixed' />
      </div>
    </Router>
  );
})

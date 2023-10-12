import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { observer } from "mobx-react";

import {
  LOG_VIS_URL,
  CHARTS_URL,
  DATABASE_URL,
  STATS_URL,
} from "./constants/PAGE_URLS";

import appStore from "./store/appStore";
import logStore from "./store/logStore";

import LoaderComponent from "./components/LoaderComponent";
import { ToasterComponent } from "./sections/ToastController";
import { PopupComponent } from "./sections/PopupController";

import Footer from "./sections/Footer";
import Navbar from "./sections/Navbar";

import HomePage from "./pages/HomePage";
import ChartsPage from "./pages/ChartsPage";
import DatabasePage from "./pages/DatabasePage";
import StatsPage from "./pages/StatsPage";
import LogVisualizerPage from "./pages/LogVisualizerPage";

export default observer(function App() {
  return (
    <Router>
      <div
        id="app-main"
        appmode={appStore.isShowingFullUpload ? "splash" : "ready"}
        className="color-white fontfamily-primary fontsize-5"
      >
        {/* loader */}
        {appStore.isLoading && !logStore.isLazyLoading.get() && (
          <LoaderComponent />
        )}

        <PopupComponent className="zindex-8" />

        <ToasterComponent className="zindex-6" />

        {/* Top */}
        <Navbar className="adjacent-mar-t-5" />

        {/* Body */}
        <Switch>
          <Route
            component={LogVisualizerPage}
            path={`${LOG_VIS_URL}/:hashcode`}
          />

          <Route component={ChartsPage} path={CHARTS_URL} />

          <Route component={DatabasePage} path={DATABASE_URL} />

          <Route component={StatsPage} path={STATS_URL} />

          <Route component={HomePage} />
        </Switch>

        {/* Bottom */}
        <Footer className="position-fixed" />
      </div>
    </Router>
  );
});

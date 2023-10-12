import React from "react";
import { redirect } from "react-router-dom";
import { observer } from "mobx-react";
import { Helmet } from "react-helmet-async";

import appStore from "../store/appStore";

export default observer(function HomePage() {
  if (appStore.isReady) {
    return redirect(appStore.visualizerUrl);
  }

  return (
    <div
      elementname="app-page-home"
      className="borradius-3 bor-1-white mar-7 pad-7 fontsize-6 flex-col-center"
    >
      <Helmet>
        <title>kolmafioso</title>
        <meta
          name="description"
          content="Kingdom of Loathing session log visualizer!"
        />
      </Helmet>

      <div
        style={{ maxWidth: 500 }}
        className="flex-col whitespace-pre-wrap height-full"
      >
        <div className="fontsize-9 talign-center adjacent-mar-t-9">
          Buongiorno!
        </div>

        <div className="adjacent-mar-t-9">
          This app is created as a supplement (for a tool) for the game
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.kingdomofloathing.com/"
            className="color-lightblue mar-h-2"
          >
            Kingdom of Loathing.
          </a>
          It's meant to help see what you - and others - have done in an
          Ascension in a more visual way.
        </div>

        <div className="adjacent-mar-t-9">
          Start by clicking the "Upload Log" button to upload your
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://kolmafia.sourceforge.net/"
            className="color-lightblue mar-h-2"
          >
            Kolmafia
          </a>
          session logs. You can upload multiple files and Mafioso will try to
          find a full ascension.
        </div>

        <div className="adjacent-mar-t-9">
          Better yet, check out
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/docrostov/ScotchLog"
            className="color-lightblue mar-h-2"
          >
            Captain Scotch's log parser
          </a>
          which makes it even easier to find your ascension log to upload here!
        </div>

        <div className="adjacent-mar-t-9">
          New: a shared log database! Check out the "Database" tab to see what
          others are doing - or upload your own and share it!
        </div>
      </div>
    </div>
  );
});

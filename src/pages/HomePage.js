import React from 'react';
import {Redirect} from "react-router-dom";
import {observer} from 'mobx-react';

import appStore from 'store/appStore';
// import logStore from 'store/logStore';

export default observer(
function HomePage(props) {
  if (appStore.isReady) {
    return <Redirect to={appStore.visualizerUrl}/>
  }

  return (
    <div
      elementname='app-page-home'
      className='borradius-3 bor-1-white mar-7 pad-7 fontsize-6 flex-col-center'>

      <div style={{maxWidth: 500}} className='flex-col whitespace-pre-wrap height-full'>
        <div className='fontsize-9 talign-center adjacent-mar-t-9'>Buongiorno!</div>
        <div className='talign-center adjacent-mar-t-9'>
          {'Click the "Upload Log" button to upload your Kolmafia session logs.\nYou can upload multiple files and Mafioso will try to find a full ascension.'}
        </div>

        <div className='talign-center adjacent-mar-t-9'>
          Better yet, check out
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://github.com/docrostov/ScotchLog'
            className='color-lightblue mar-h-2'>
            Captain Scotch's log parser
          </a>
          which makes it even easier to find your ascension log to upload here!
        </div>
      </div>
    </div>
  )
})

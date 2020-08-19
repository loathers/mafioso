import React from 'react';
import {Redirect} from "react-router-dom";
import {observer} from 'mobx-react';

import {LOG_VIS_URL} from 'constants/PAGE_URLS';

import appStore from 'store/appStore';
// import logStore from 'store/logStore';

import LogUploader from 'sections/LogUploader';

import combineClassnames from 'utilities/combineClassnames';

export default observer(
function HomePage(props) {
  const {
    className,
  } = props;

  if (appStore.isReady) {
    return <Redirect to={LOG_VIS_URL}/>
  }

  return (
    <div
      elementname='app-page-home'
      className={combineClassnames('fontsize-4 flex-col', className)}>

      <LogUploader
        style={{height: '70vh', width: '100%'}}
        className='height-full width-full flex-auto adjacent-mar-t-4' >
        <div className='flex-col-center height-full'>
          <div style={{lineHeight: '30px'}} className='flex-col-center fontsize-8 flex-auto'>
            {'Buongiorno!\n\nClick here or drag and drop to upload your Kolmafia session logs.\nYou can upload multiple files and Mafioso here will try to find a full ascension to display for you.'}
          </div>

          <div className='flex-none fontsize-4'>
            {'Thanks for using Mafioso beta!\n\nIf you get an error or have any requests, make a report on Github.\nPlease know that no data is collected and uploaded files are never sent anywhere.'}
          </div>
        </div>
      </LogUploader>
    </div>
  )
})
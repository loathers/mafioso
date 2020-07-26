import React from 'react';
import {observer} from 'mobx-react';

import appStore from 'store/appStore';
import logStore from 'store/logStore';

import LoaderComponent from 'components/LoaderComponent';
import UploadComponent from 'components/UploadComponent';

import VisualizerSection from 'sections/VisualizerSection';

export default observer(
function App() {
  const [currentPageNum, setCurrentPageNum] = React.useState(0);

  return (
    <div 
      className='color-white fontfamily-primary fontsize-5 pad-7 flex-col aitems-center'
      id='slv-main'>

      <div className='fontsize-9 fontfamily-tertiary adjacent-mar-t-5 flex-none'>
        Shiny Log Visualizer
      </div>

      <UploadComponent
        showExpanded={!logStore.hasFile}
        className='adjacent-mar-t-5' />

      {/* pagination */}
      <div className='fontsize-4 flex-row adjacent-mar-t-5 flex-none'>
        <button 
          onClick={() => setCurrentPageNum(currentPageNum - 1)}
          className='borradius-1 bg-second pad-4 textalign-center adjacent-mar-l-4'>
            Prev
        </button>

        <div className='bg-second pad-4 flex-row-center adjacent-mar-l-4'>{currentPageNum}</div>

        <button 
          onClick={() => setCurrentPageNum(currentPageNum + 1)}
          className='borradius-1 bg-second pad-4 textalign-center adjacent-mar-l-4'>
            Next
        </button>
      </div>

      {/* loader */}
      { appStore.isLoading &&
        <LoaderComponent className='mar-h-5 adjacent-mar-t-5 flex-none'/>
      }

      <VisualizerSection 
        entriesList={logStore.currentEntries}
      />

      {/* copy paste pagination */}
      <div className='fontsize-4 flex-row adjacent-mar-t-5 flex-none'>
        <button 
          onClick={() => setCurrentPageNum(currentPageNum - 1)}
          className='borradius-1 bg-second pad-4 textalign-center adjacent-mar-l-4'>
            Prev
        </button>

        <div className='bg-second pad-4 flex-row-center adjacent-mar-l-4'>{currentPageNum}</div>

        <button 
          onClick={() => setCurrentPageNum(currentPageNum + 1)}
          className='borradius-1 bg-second pad-4 textalign-center adjacent-mar-l-4'>
            Next
        </button>
      </div>
    </div>
  );
})

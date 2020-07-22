import React from 'react';
import {observer} from 'mobx-react';

import logStore from 'store/logStore';

import UploadComponent from 'components/UploadComponent';

import VisualizerSection from 'sections/VisualizerSection';

export default observer(
function App() {
  const [currentPageNum, setCurrentPageNum] = React.useState(0);

  return (
    <div 
      className='bg-third color-white fontfamily-primary fontsize-5 pad-7'
      id='slv-main'>

      <div className='fontsize-9 fontfamily-tertiary adjacent-mar-t-5'>
        Shiny Log Visualizer
      </div>

      <UploadComponent />

      {/* page thingy */}
      <div className='fontsize-4 flex-row adjacent-mar-t-5'>
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

      { logStore.isParsing.get() &&
        <div>parsing...</div>
      }

      <VisualizerSection 
        entriesList={logStore.getEntries({pageNum: currentPageNum})}
      />

      {/* copy paste page thingy */}
      <div className='fontsize-4 flex-row adjacent-mar-t-5'>
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

import React from 'react';
import {observer} from 'mobx-react';

import appStore from 'store/appStore';
import logStore from 'store/logStore';

import LoaderComponent from 'components/LoaderComponent';
import UploadComponent from 'components/UploadComponent';

import VisualizerSection from 'sections/VisualizerSection';

function SimplePaginator(props) {
  const {
    onChangePage,
    currentPageNum,
  } = props;

  return (
    <div className='fontsize-4 flex-row adjacent-mar-t-5 flex-none'>
      <button 
        onClick={() => onChangePage(currentPageNum - 1)}
        className='borradius-1 bg-second pad-4 textalign-center adjacent-mar-l-4'>
          Prev
      </button>

      <div className='bg-second pad-4 flex-row-center adjacent-mar-l-4'>{currentPageNum}</div>

      <button 
        onClick={() => onChangePage(currentPageNum + 1)}
        className='borradius-1 bg-second pad-4 textalign-center adjacent-mar-l-4'>
          Next
      </button>
    </div>
  )
}

export default observer(
function App() {
  const [currentPageNum, setCurrentPageNum] = React.useState(0);

  const onChangePage = (requestPageNum) => {
    if (logStore.canFetch({pageNum: requestPageNum})) {
      logStore.fetchEntries({pageNum: requestPageNum})
      setCurrentPageNum(requestPageNum);
    }
  }

  return (
    <div 
      className='color-white fontfamily-primary fontsize-5 pad-7 flex-col aitems-center'
      id='slv-main'>

      {/* loader */}
      { appStore.isLoading &&
        <LoaderComponent />
      }

      <div className='fontsize-9 fontfamily-tertiary adjacent-mar-t-5 flex-none'>
        Shiny Log Visualizer
      </div>

      <UploadComponent
        showExpanded={!logStore.hasFiles}
        className='adjacent-mar-t-5' />

      {/* pagination */}
      <SimplePaginator
        onChangePage={onChangePage}
        currentPageNum={currentPageNum} />

      <VisualizerSection 
        entriesList={logStore.currentEntries}
      />

      {/* bottom pagination */}
      <SimplePaginator
        onChangePage={onChangePage}
        currentPageNum={currentPageNum} />

    </div>
  );
})

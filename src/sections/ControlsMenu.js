import React from 'react';
import {observer} from 'mobx-react';

// import appStore from 'store/appStore';
import logStore from 'store/logStore';

import UploadComponent from 'components/UploadComponent';

/**
 * @param {Object} props
 * @returns {React.Component}
 */
function SimplePaginator(props) {
  const {
    onChangePage,
    currentPageNum,
  } = props;

  return (
    <div className='fontsize-4 flex-row adjacent-mar-t-5 flex-none'>
      <button 
        onClick={() => onChangePage(0)}
        className='borradius-1 bg-second pad-4 textalign-center adjacent-mar-l-4'>
          First
      </button>

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

      <button 
        onClick={() => onChangePage(logStore.calculatePageLast())}
        className='borradius-1 bg-second pad-4 textalign-center adjacent-mar-l-4'>
          Last
      </button>
    </div>
  )
}
/**
 * @param {Object} props
 * @returns {React.Component}
 */
export default observer(
function ControlsMenu() {

  const leftMenuStyle = logStore.hasFiles ? {
    width: 150,
    top: 30,
    left: 30,
  } : {
    width: '90%',
  }

  const uploadContent = logStore.hasFiles ? 'Upload new logs' : 'Upload or drop in your session logs!';

  return (
    <div style={{
      position: 'fixed',
      ...leftMenuStyle,
    }} className='flex-col'>
      <div className='aself-start fontsize-9 fontfamily-tertiary adjacent-mar-t-5 flex-none'>
        Shiny Log Visualizer
      </div>

      <UploadComponent
        content={uploadContent}
        showExpanded={!logStore.hasFiles}
        className='adjacent-mar-t-5' />
      
      {/* pagination */}
      { logStore.hasCurrentEntries &&
        <SimplePaginator
          onChangePage={(nextPageNum) => logStore.fetchEntries({pageNum: nextPageNum})}
          currentPageNum={logStore.currentPageNum} />
      }
    </div>
  );
})

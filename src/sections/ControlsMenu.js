import React from 'react';
import {observer} from 'mobx-react';

// import appStore from 'store/appStore';
import logStore from 'store/logStore';

import UploadComponent from 'components/UploadComponent';

import combineClassnames from 'utilities/combineClassnames';

/**
 * @param {Object} props
 * @returns {React.Component}
 */
export default observer(
function ControlsMenu(props) {
  const {
    className,
    showFull,
  } = props;

  if (showFull) {
    return <FullPageMenu />
  }

  return (
    <div 
      style={{
        width: 150,
        top: 30,
        left: 30,
      }} 
      className={combineClassnames('position-fixed flex-col', className)}>

      <div className='aself-start fontsize-9 fontfamily-tertiary adjacent-mar-t-5 flex-none'>
        Shiny Log Visualizer
      </div>

      <UploadComponent
        content={'Upload new logs'}
        className='width-full adjacent-mar-t-5' />
      
      {/* pagination */}
      { logStore.hasCurrentEntries &&
        <SimplePaginator
          onChangePage={(nextPageNum) => logStore.fetchEntries({pageNum: nextPageNum})}
          currentPageNum={logStore.currentPageNum}
          className='adjacent-mar-t-5' />
      }

      {/* filters */}
      <FilterMenu 
        className='adjacent-mar-t-5'/>
    </div>
  );
});
/**
 * @param {Object} props
 * @returns {React.Component}
 */
function FullPageMenu(props) {
  const {
    className,
  } = props;

  return (
    <div 
      style={{width: '90%'}}
      className={combineClassnames('fontsize-4 flex-col flex-none', className)}>

      <div className='aself-start fontsize-9 fontfamily-tertiary adjacent-mar-t-5 flex-none'>
        Shiny Log Visualizer
      </div>

      <UploadComponent
        content={'Upload or drop in your session logs! I\'ll attempt to find a full ascension if you upload multiple logs.'}
        style={{height: '70vh', width: '100%'}}
        className='width-full flex-auto adjacent-mar-t-5' />
    </div>
  )
}
/**
 * @param {Object} props
 * @returns {React.Component}
 */
function SimplePaginator(props) {
  const {
    className,
    onChangePage,
    currentPageNum,
  } = props;

  return (
    <div className={combineClassnames('fontsize-4 flex-row flex-none', className)}>
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
function FilterMenu(props) {
  const {
    className,
  } = props;

  return (
    <div className={combineClassnames('fontsize-4 flex-col flex-none', className)}>
      
    </div>
  )
}
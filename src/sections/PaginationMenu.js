import React from 'react';
import {observer} from 'mobx-react';

// import appStore from 'store/appStore';
import logStore from 'store/logStore';

import Button from 'components/Button';

import combineClassnames from 'utilities/combineClassnames';

/**
 * @param {Object} props
 * @returns {React.Component}
 */
export default observer(
function SimplePaginator(props) {
  const {
    className,
    style,
  } = props;

  const onApplyChangePage = (nextPageNum) => {
    logStore.fetchEntries({pageNum: nextPageNum});
  };

  return (
    <div 
      style={style}
      componentname='pagination-menu'
      className={combineClassnames('fontsize-4 flex-row-center flex-none', className)}>
      <Button 
        onClick={() => onApplyChangePage(0)}
        disabled={logStore.isOnFirstPage}
        className='borradius-1 pad-4 textalign-center adjacent-mar-l-4'>
          First
      </Button>

      <Button 
        onClick={() => onApplyChangePage(logStore.currentPageNum - 1)}
        disabled={logStore.isOnFirstPage}
        className='borradius-1 pad-4 textalign-center adjacent-mar-l-4'>
          {"<"}
      </Button>

      {/*<div className='bg-second pad-4 flex-row-center adjacent-mar-l-4'>{currentPageNum}</div>*/}

      <Button 
        onClick={() => onApplyChangePage(logStore.currentPageNum + 1)}
        disabled={logStore.isOnLastPage}
        className='borradius-1 pad-4 textalign-center adjacent-mar-l-4'>
          {">"}
      </Button>

      <Button 
        onClick={() => onApplyChangePage(logStore.calculatePageLast())}
        disabled={logStore.isOnLastPage}
        className='borradius-1 pad-4 textalign-center adjacent-mar-l-4'>
          Last
      </Button>
    </div>
  )
})
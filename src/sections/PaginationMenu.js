import React from 'react';
import {observer} from 'mobx-react';

// import appStore from 'store/appStore';
import logStore from 'store/logStore';

import DarkButton from 'components/DarkButton';

import combineClassnames from 'utilities/combineClassnames';

/** @returns {ReactComponent} */
export default observer(
function SimplePaginator(props) {
  const {
    className,
    style,
  } = props;

  const onApplyChangePage = (nextPageNum) => {
    if (nextPageNum !== logStore.currentPageNum) {
      logStore.fetchEntries({pageNum: nextPageNum});
    }
  };

  const PageNumButtons = [];
  const maxPages = logStore.calculatePageLast();
  for (let i=1; i<maxPages; i++) {
    const isOnThisPage = i === (logStore.currentPageNum + 1);
    PageNumButtons.push(
      <DarkButton
        key={`page-num-${i}-key`}
        onClick={() => onApplyChangePage(i - 1)}
        disabled={!logStore.isReady}
        children={i} 
        style={{width: 40}}
        className={combineClassnames('adjacent-mar-l-3', isOnThisPage ? 'active' : '')}/>
    )
  }

  return (
    <div 
      style={style}
      componentname='pagination-menu'
      className={combineClassnames('boxshadow-dark fontfamily-primary fontsize-6 pad-2 flex-row-center', className)}>

      { PageNumButtons }

      { PageNumButtons.length <= 0 &&
        <div className='pad-h-6 color-gray'>...</div>
      }

    </div>
  )
})

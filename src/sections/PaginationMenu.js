import React from 'react';
import {observer} from 'mobx-react';

// import appStore from 'store/appStore';
import logStore from 'store/logStore';

import DarkButton from 'components/DarkButton';

import combineClassnames from 'utilities/combineClassnames';

const MAX_PAGINATION_SIZE = 6;

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

  const currNum = logStore.currentPageNum;
  const pageNumAvailable = calculateAvailablePages({
    curr: currNum,
    last: logStore.calculateLastPageIdx(),
  });

  return (
    <div 
      style={style}
      componentname='pagination-menu'
      className={combineClassnames('boxshadow-dark fontfamily-primary fontsize-6 pad-2 flex-row-center', className)}>

      { pageNumAvailable.map((num, idx) => {
        const isDivider = num === '...';
        const displayNum = isDivider ? '...' : num + 1;
        const isOnThisNum = currNum === num;
        return (
          <DarkButton
            key={`page-num-${idx}-key`}
            onClick={() => onApplyChangePage(num)}
            disabled={isDivider || !logStore.isReady}
            children={displayNum} 
            style={{width: 40}}
            className={combineClassnames('adjacent-mar-l-3', isOnThisNum ? 'active' : '')}/>
        )
      })}

      { pageNumAvailable.length <= 0 &&
        <div className='pad-h-6 color-gray'>...</div>
      }

    </div>
  )
})

/**
 * probably a smarter way to do this /shrug
 * @param {Number} options.curr
 * @param {Number} options.last
 * @return {Array<Number>}
 */
function calculateAvailablePages({curr, last}) {
  let pageNumList = [0];

  const HALF_MAX_SIZE = Math.round(MAX_PAGINATION_SIZE / 2);

  // start
  if (curr > HALF_MAX_SIZE) {
    pageNumList.push('...');
  };

  for (let i=0; i<HALF_MAX_SIZE; i++) {
    const numToAdd = Math.max(curr - (HALF_MAX_SIZE - i), 0);
    if (!pageNumList.includes(numToAdd)) {
      pageNumList.push(numToAdd);
    }
  }
  
  // middle
  if (!pageNumList.includes(curr)) {
    pageNumList.push(curr);
  }

  // end
  for (let j=0; j<HALF_MAX_SIZE; j++) {
    const numToAdd = Math.min(curr + j, last);
    if (numToAdd < last && !pageNumList.includes(numToAdd)) {
      pageNumList.push(numToAdd);
    }
  }

  if (pageNumList[pageNumList.length - 1] < (last - 1)) {
    pageNumList.push('...');
  };

  if (last > curr && !pageNumList.includes(last)) {
    pageNumList.push(last);
  }

  // done
  console.log('! result:', pageNumList)
  return pageNumList;
}
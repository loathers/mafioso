import React from 'react';
import {observer} from 'mobx-react';

// import appStore from 'store/appStore';
import logStore from 'store/logStore';

import DarkButton from 'components/DarkButton';

import combineClassnames from 'utilities/combineClassnames';

const MAX_PAGINATION_SIZE = 7;

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
  const lastNum = logStore.calculateLastPageIdx();
  const pageNumAvailable = calculateAvailablePages({
    curr: currNum,
    last: lastNum,
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
 * there's gotta be a smarter way to have done this
 * pretty sure I have no idea wtf I wrote
 * 
 * @param {Number} options.curr
 * @param {Number} options.last
 * @return {Array<Number>}
 */
function calculateAvailablePages({curr, last}) {
  let pageNumList = [0]; // always include first
  if (curr === 0 && last === 0) {
    return pageNumList;
  }

  let unallocatedAmt = MAX_PAGINATION_SIZE;
  const HALF_SIZE = Math.round(MAX_PAGINATION_SIZE / 2);
  const willNeedStartEllipses = curr > HALF_SIZE + 1;
  const willNeedEndEllipses = curr < (last - HALF_SIZE - 1);

  // need start ellipses
  if (willNeedStartEllipses) {
    pageNumList.push('...');
    unallocatedAmt -= 1;
  };

  // end ellipsis
  if (willNeedEndEllipses) {
    unallocatedAmt -= 1;
  };

  const shouldStartHigh = curr > (last / 2);
  if (shouldStartHigh) {
    const possibleEnd = Math.round(curr + (unallocatedAmt/2));
    const endNum = Math.min(possibleEnd, last - 1);
    unallocatedAmt -= (endNum - curr);
    const startNum = Math.max(curr - unallocatedAmt, 1);

    for (let k=startNum; k<=endNum; k++) {
      pageNumList.push(k);
    }

  } else {
    const possibleStart = Math.round(curr - (unallocatedAmt/2)) - 1;
    const startNum = Math.max(possibleStart, 1);
    unallocatedAmt -= (curr - startNum);
    const endNum = Math.min(curr + unallocatedAmt, last - 1);

    for (let k=startNum; k<=endNum; k++) {
      pageNumList.push(k);
    }
  }

  if (willNeedEndEllipses) {
    pageNumList.push('...');
  }

  // always include last
  pageNumList.push(last);

  // done
  return pageNumList;
}
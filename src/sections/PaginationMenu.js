import React from 'react';
import {observer} from 'mobx-react';

// import appStore from 'store/appStore';
import logStore from 'store/logStore';

import combineClassnames from 'utilities/combineClassnames';

/** @returns {ReactComponent} */
export default observer(
function SimplePaginator(props) {
  const {
    className,
    style,
  } = props;

  const onApplyChangePage = (nextPageNum) => {
    logStore.fetchEntries({pageNum: nextPageNum});
  };

  const PageNumButtons = [];
  const maxPages = logStore.calculatePageLast();
  for (let i=1; i<maxPages; i++) {
    const isOnThisPage = i === (logStore.currentPageNum + 1);
    PageNumButtons.push(
      <PaginationButton
        key={`page-num-${i}-key`}
        onClick={() => onApplyChangePage(i - 1)}
        disabled={!logStore.isReady}
        children={i} 
        className={combineClassnames('adjacent-mar-l-3', isOnThisPage ? 'active' : '')}/>
    )
  }

  return (
    <div 
      style={style}
      componentname='pagination-menu'
      className={combineClassnames('fontfamily-primary fontsize-8 flex-row-center flex-none', className)}>

      { PageNumButtons }

    </div>
  )
})
/** @returns {ReactComponent} */
function PaginationButton(props) {
  const {
    children,
    className,
    ...otherProps
  } = props;

  return (
    <button 
      {...otherProps}
      componentname='pagination-button'
      className={combineClassnames('talign-center borradius-2 pad-3', className)}>
      {children}
    </button>
  )
}
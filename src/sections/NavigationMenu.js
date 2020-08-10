import React from 'react';
import {observer} from 'mobx-react';

import appStore from 'store/appStore';
import logStore from 'store/logStore';

import {ReactComponent as ChevronSVG} from 'images/chevron-up.svg';

import DarkButton from 'components/DarkButton';
import PaginationComponent from 'components/PaginationComponent';

import combineClassnames from 'utilities/combineClassnames';

/** @returns {ReactComponent} */
export default observer(
function NavigationMenu(props) {
  const {
    className,
  } = props;

  const onClickChangeDay = (nextDayNum) => {
    if (nextDayNum !== logStore.currentDayNum) {
      logStore.fetchEntries({dayNumFilter: nextDayNum});
      appStore.shouldScrollUp.set(true);
    }
  }

  const onClickChangePage = (nextPageNum) => {
    if (nextPageNum !== logStore.currentPageNum) {
      logStore.fetchByPage({pageNum: nextPageNum}, true);
      appStore.shouldScrollUp.set(true);
    }
  }

  return (
    <div
      componentname='navigation-menu'
      className={combineClassnames('zindex-7 position-fixed flex-row aitems-center', className)}>

      { appStore.shouldShowPagination.get() &&
        <DarkButton
          onClick={() => appStore.toggleCompactMode()}
          className={combineClassnames('boxshadow-dark pad-5 flex-row flex-none borradius-round adjacent-mar-l-5')}>
          <ChevronSVG
            style={{width: 25, height: 25, transition: 'transform 300ms'}}
            className={combineClassnames(appStore.isUsingCompactMode.get() ? 'flip-y' : '')} />
        </DarkButton>
      }

      <div className='flex-col adjacent-mar-l-5'>
        <PaginationComponent
          currNum={logStore.isUsingDayFilter ? logStore.currentDayNum : -1}
          lastNum={logStore.dayCount}
          onChangePage={onClickChangeDay}
          label='Day'
          disabled={!logStore.isReady}
          style={{height: 30}}
          className='boxshadow-black flex-none borradius-3 aself-start adjacent-mar-t-5' />

        <PaginationComponent
          currNum={logStore.currentPageNum}
          lastNum={logStore.calculateLastPageIdx()}
          onChangePage={onClickChangePage}
          label='Page'
          disabled={!logStore.isReady}
          style={{height: 30}}
          className='boxshadow-black flex-none borradius-3 aself-start adjacent-mar-t-5' />
      </div>
    </div>
  )
})
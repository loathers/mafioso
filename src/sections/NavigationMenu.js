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

      { appStore.shouldShowPagination.get() &&
        <PaginationComponent
          currNum={logStore.currentPageNum}
          lastNum={logStore.calculateLastPageIdx()}
          onChangePage={(nextPageNum) => {
            if (nextPageNum !== logStore.currentPageNum) {
              logStore.fetchEntries({pageNum: nextPageNum});
              appStore.shouldScrollUp.set(true);
            }
          }}
          disabled={!logStore.isReady}
          style={{height: 30}}
          className='boxshadow-black flex-none borradius-3 flex-auto adjacent-mar-l-5' />
      }
    </div>
  )
})
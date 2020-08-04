import React from 'react';

import appStore from 'store/appStore';

import {ReactComponent as ChevronSVG} from 'images/chevron-up.svg';

import DarkButton from 'components/DarkButton';

import PaginationMenu from 'sections/PaginationMenu';

import combineClassnames from 'utilities/combineClassnames';

/** @returns {ReactComponent} */
export default function NavigationMenu(props) {
  const {
    className,
    style,
  } = props;

  return (
    <div 
      style={style}
      className={combineClassnames('zindex-7 position-fixed flex-row aitems-center', className)}>
      
      <DarkButton
        onClick={() => appStore.toggleCompactMode()}
        className={combineClassnames('boxshadow-black pad-5 flex-row flex-none borradius-round adjacent-mar-l-5')}>
        <ChevronSVG 
          style={{width: 25, height: 25, transition: 'transform 300ms'}}
          className={combineClassnames(appStore.isUsingCompactMode.get() ? 'flip-y' : '')} />
      </DarkButton>

      <PaginationMenu
        style={{height: 30}}
        className='boxshadow-black flex-none borradius-3 flex-auto adjacent-mar-l-5' />
    </div>
  )
}
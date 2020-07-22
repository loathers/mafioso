import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as SteakSVG } from 'images/steak.svg';
import { ReactComponent as SwapBagSVG } from 'images/swap-bag.svg';

import combineClassnames from 'utilities/combineClassnames';

/** @returns {React.Component} */
function ItemBlockDisplay(props) {
  const {
    className,
    content,
    IconComponent,
  } = props;

  return (
    <div 
      className={combineClassnames('overflow-hidden bg-second-darker borradius-2 pad-v-2 pad-h-4 boxsizing-border flex-col-center position-relative', className)}
      componentname='item-block'>

      <div
        className='flex-none adjacent-mar-t-2 position-absolute'
        componentname='block-inner-icon'>
        <IconComponent style={{width: 20, height: 20}} />
      </div>

      <div className='fontsize-3 color-white zindex-1 talign-center flex-none'>
        {content}
      </div>
    </div>
  )
}
/** @returns {React.Component} */
export default function ItemChangesDisplay(props) {
  const {
    className,
    logEntry,
  } = props;

  const {data} = logEntry;

  const {
    acquiredItems,
    meatChange,
  } = data;

  return (
    <div className={combineClassnames('flex-row flexwrap-yes adjacent-mar-t-3', className)}>
      { logEntry.hasMeatChanged() &&
        <ItemBlockDisplay 
          IconComponent={SteakSVG}
          className='mar-2 pad-2'
          content={`${meatChange} meat`} />
      }

      { acquiredItems.map((itemName, idx) => (
        <ItemBlockDisplay 
          IconComponent={SwapBagSVG}
          className='mar-2 pad-2'
          content={`${itemName}`}
          key={`acquired-item-${uuidv4()}-${idx}-key`} />
      ))}
    </div>
  )
}
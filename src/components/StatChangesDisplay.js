import React from 'react';
// import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as StarsStackSVG } from 'images/stars-stack.svg';

import combineClassnames from 'utilities/combineClassnames';

/** @returns {React.Component} */
function StatBlockDisplay(props) {
  const {
    className,
    content,
  } = props;

  return (
    <div 
      className={combineClassnames('overflow-hidden bg-second-darker borradius-2 pad-v-2 pad-h-4 boxsizing-border flex-col-center position-relative', className)}
      componentname='item-block'>

      <div
        className='flex-none adjacent-mar-t-2 position-absolute'
        componentname='block-inner-icon'>
        <StarsStackSVG style={{width: 20, height: 20}} />
      </div>

      <div className='fontsize-3 color-white zindex-1 talign-center flex-none'>
        {content}
      </div>
    </div>
  )
}
/** @returns {React.Component} */
export default function StatChangesDisplay(props) {
  const {
    className,
    logEntry,
  } = props;

  return (
    <div className={combineClassnames('flex-row flexwrap-yes adjacent-mar-t-3', className)}>
      <StatBlockDisplay 
        content={logEntry.musSubstats}
        className='mar-2' />

      <StatBlockDisplay 
        content={logEntry.mystSubstats}
        className='mar-2' />
        
      <StatBlockDisplay 
        content={logEntry.moxSubstats}
        className='mar-2' />
    </div>
  )
}
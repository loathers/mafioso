import React from 'react';
// import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as StarsStackSVG } from 'images/stars-stack.svg';

import combineClassnames from 'utilities/combineClassnames';

/** @returns {React.Component} */
function StatBlockDisplay(props) {
  const {
    className,
    content,
    label,
  } = props;

  return (
    <div 
      className={combineClassnames('overflow-hidden bg-second-darker borradius-2 pad-3 boxsizing-border flex-col-center position-relative', className)}
      style={{width: 70, height: 45}}>

      <div
        className='flex-none adjacent-mar-t-2 position-absolute'
        componentname='block-inner-icon'>
        <StarsStackSVG style={{width: 20, height: 20}} />
      </div>

      <div className='flex-col-center fontsize-4 color-white zindex-1 talign-center flex-none'>
        {content}
      </div>

      <div className='fontsize-1 color-white zindex-1 talign-center flex-none'>
        {label}
      </div>
    </div>
  )
}
/** @returns {React.Component} */
export default function StatChangesDisplay(props) {
  const {
    className,
    entry,
  } = props;

  return (
    <div className={combineClassnames('flex-row flexwrap-yes adjacent-mar-t-3', className)}>
      <StatBlockDisplay 
        content={entry.musSubstats}
        label='mus exp'
        className={combineClassnames('mar-2', entry.attributes.isMusUp ? 'f-bold' : '')} />

      <StatBlockDisplay 
        content={entry.mystSubstats}
        label='myst exp'
        className={combineClassnames('mar-2', entry.attributes.isMusUp ? 'f-bold' : '')} />

      <StatBlockDisplay 
        content={entry.moxSubstats}
        label='mox exp'
        className={combineClassnames('mar-2', entry.attributes.isMusUp ? 'f-bold' : '')} />
    </div>
  )
}
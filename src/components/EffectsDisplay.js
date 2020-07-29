import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as SpellbookSVG } from 'images/spell-book.svg';

import combineClassnames from 'utilities/combineClassnames';

/** @returns {React.Component} */
export default function EffectsDisplay(props) {
  const {
    className,
    entry,
  } = props;

  const {attributes: {
    acquiredEffects,
  }} = entry;

  return (
    <div className={combineClassnames('mar-2 overflow-hidden bg-second-darker borradius-2 flex-col flexwrap-yes position-relative', className)}>
      { acquiredEffects.map((effectName, idx) => (
        <PairedDisplay 
          leftContent={effectName}
          className='adjacent-mar-t-2'
          key={`acquired-effect-${uuidv4()}-${idx}-key`} />
      ))}
    </div>
  )
}
/** @returns {React.Component} */
export function PairedDisplay(props) {
  const {
    className,
    leftContent,
    rightContent,
  } = props;

  return (
    <div className={combineClassnames('mar-2 flex-row aitems-center flexwrap-yes', className)}>
      <SpellbookSVG 
        componentname='block-inner-icon'
        style={{width: 20, height: 20, opacity: 0.7}}
        className='flex-none adjacent-mar-l-2' />

      { leftContent &&
        <div className='f-bold fontsize-3 flex-none adjacent-mar-l-2'>
          {leftContent}
        </div>
      }

      { rightContent &&
        <div className='fontsize-3 flex-none adjacent-mar-l-2'>
          {rightContent}
        </div>
      }
    </div>
  )
}
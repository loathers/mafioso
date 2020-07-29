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
    <div className={combineClassnames('mar-2 pad-2 overflow-hidden bg-second-darker borradius-2 flex-row flexwrap-yes position-relative', className)}>
      <SpellbookSVG 
        componentname='block-inner-icon'
        style={{width: 25, height: 25, opacity: 0.7}}
        className='flex-none adjacent-mar-l-2' />

      <div className='flex-col flex-auto jcontent-center adjacent-mar-l-2'>
        { acquiredEffects.map((effectName, idx) => (
          <PairedDisplay 
            leftContent={effectName}
            className='adjacent-mar-t-2'
            key={`acquired-effect-${uuidv4()}-${idx}-key`} />
        ))}
      </div>
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
    <div className={combineClassnames('mar-2 flex-row flexwrap-yes', className)}>
      { leftContent &&
        <div className='fontsize-3 flex-none adjacent-mar-l-2'>
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
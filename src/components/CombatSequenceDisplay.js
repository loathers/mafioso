import React, {Fragment} from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as CarrionSVG } from 'images/carrion.svg';
import { ReactComponent as LaurelCrownSVG } from 'images/laurel-crown.svg';

import combineClassnames from 'utilities/combineClassnames';

/** @returns {React.Component} */
function CombatActionDisplay(props) {
  const {
    className,
    roundNum,
    content,
    // IconComponent,
  } = props;

  return (
    <div 
      className={combineClassnames('overflow-hidden bor-1-white borradius-2 pad-v-2 pad-h-4 boxsizing-border flex-col-center position-relative', className)}
      componentname='combat-sequence-block'>

      <div 
        className='fontsize-8 color-white flex-none adjacent-mar-t-2 position-absolute'
        componentname='block-inner-icon'>
        {roundNum}
      </div>

      <div className='fontsize-1 mar-b-1 color-white zindex-1 talign-center flex-none'>
        {content}
      </div>
    </div>
  )
}
/** @returns {React.Component} */
export default function CombatSequenceDisplay(props) {
  const {
    className,
    logEntry,
  } = props;

  const {
    data, 
  } = logEntry;

  const {
    combatActions,
    hasInitiative,
    isVictory,
    isDeath,
  } = data;

  const hasCombatActions = combatActions.length > 0;

  return (
    <div className={combineClassnames('flex-row s flexwrap-yes aitems-center adjacent-mar-t-3', className)}>
      { hasCombatActions && hasInitiative &&
        <Fragment>
          <div className='flex-row-center fontsize-3 mar-2'>Initiative!</div>
          <div className='flex-row-center fontsize-5 fweight-bold mar-2'>
            >
          </div>
        </Fragment>
      }

      { combatActions.map((combatData, idx) => (
        <Fragment key={`combat-action-${uuidv4()}-${idx}-key`}>    
          <CombatActionDisplay 
            className='mar-2 pad-2'
            content={combatData.actionName}
            roundNum={combatData.roundNum} 
          /> 

          <div className='flex-row-center fontsize-5 fweight-bold mar-2'>
            >
          </div>
        </Fragment>
      ))}

      { hasCombatActions && isVictory &&
        <Fragment>
          <LaurelCrownSVG 
            className='flex-none mar-2'
            style={{width: 30, height: 30}} />
          <div className='flex-row-center fontsize-3 mar-2'>Victory!</div>
        </Fragment>
      }

      { hasCombatActions && isDeath &&
        <Fragment>
          <CarrionSVG 
            className='flex-none mar-2'
            style={{width: 30, height: 30}} />
          <div className='flex-row-center fontsize-3 mar-2'>Beaten up :(</div>
        </Fragment>
      }
    </div>
  )
}
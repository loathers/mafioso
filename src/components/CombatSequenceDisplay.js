import React, {Fragment} from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as BanishSVG } from 'images/island.svg';
import { ReactComponent as CarrionSVG } from 'images/carrion.svg';
import { ReactComponent as LaurelCrownSVG } from 'images/laurel-crown.svg';

import combineClassnames from 'utilities/combineClassnames';

/** @returns {React.Component} */
function CombatResultDisplay(props) {
  const {
    className,
    content,
    IconComponent,
  } = props;

  return (
    <div className={combineClassnames('flex-col-center flex-none mar-1', className)}>
      <IconComponent 
        className='adjacent-mar-t-1'
        style={{width: 30, height: 30}} />
      <div className='talign-center fontsize-3 adjacent-mar-t-1'>{content}</div>
    </div>
  )
}
/** @returns {React.Component} */
function CombatActionDisplay(props) {
  const {
    className,
    roundNum,
    content,
    // IconComponent,
  } = props;

  return (
    <div className={combineClassnames('overflow-hidden userselect-none bor-1-white borradius-2 pad-2 boxsizing-border flex-col-center position-relative', className)}>
      <div className='fontsize-4 color-white flex-none adjacent-mar-t-2 position-absolute'
        componentname='block-inner-icon'>
        {roundNum}
      </div>

      <div className='fontsize-1 color-white zindex-1 talign-center flex-none'>
        {content}
      </div>
    </div>
  )
}
/** @returns {React.Component} */
export default function CombatSequenceDisplay(props) {
  const {
    className,
    entry,
  } = props;

  const {attributes: {
    combatActions,
    hasInitiative,
    isVictory,
    isDeath,
  }} = entry;

  return (
    <div 
      style={{width: 170}}
      className={combineClassnames('pad-v-2 pad-h-5 boxsizing-border flexwrap-yes aitems-center adjacent-mar-t-3', className)}>
      { hasInitiative &&
        <Fragment>
          <div className='flex-row-center fontsize-3 mar-1'>Initiative!</div>
          <div className='arrow-down flex-row-center mar-1'/>
        </Fragment>
      }

      { combatActions.map((attributes, idx) => (
        <Fragment key={`combat-action-${uuidv4()}-${idx}-key`}>    
          <CombatActionDisplay 
            className='mar-1 width-full'
            content={attributes.actionName}
            roundNum={attributes.roundNum} 
          /> 

          <div className='arrow-down flex-row-center mar-1'/>
        </Fragment>
      ))}

      { isVictory &&
        <CombatResultDisplay 
          content='Victory!'
          IconComponent={LaurelCrownSVG} />
      }

      { isDeath &&
        <CombatResultDisplay 
          content='Beaten up :('
          IconComponent={CarrionSVG} />
      }

      { entry.isBanished &&
        <CombatResultDisplay 
          content='Banished!'
          IconComponent={BanishSVG} />
      }

      { entry.isDisintigrated &&
        <div className='fontsize-1 mar-1'>Disintigrated</div>
      }
    </div>
  )
}
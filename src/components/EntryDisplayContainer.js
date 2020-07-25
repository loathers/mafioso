import React from 'react';

import { ReactComponent as StarFormationSVG } from 'images/star-formation.svg';

import EntryIconComponent from 'components/EntryIconComponent';
import CombatSequenceDisplay from 'components/CombatSequenceDisplay';
import MakeDiabolicPizzaDisplay from 'components/MakeDiabolicPizzaDisplay';
import ItemChangesDisplay from 'components/ItemChangesDisplay';
import StatChangesDisplay from 'components/StatChangesDisplay';

import combineClassnames from 'utilities/combineClassnames';

/**
 * @returns {React.Component}
 */
function EntryAdventureColumn(props) {
  const {
    className,
    style,
    logEntry,
  } = props;

  const {data} = logEntry;
  const {
    turnNum,
    isFreeAdv,
  } = data;

  return (
    <div 
      className={combineClassnames('flex-col', className)}
      style={style}>      
      <div 
        className='talign-right color-white fontsize-5 f-bold width-full aself-start adjacent-mar-t-2'>
        {turnNum === -1 ? '-' : turnNum}
      </div>

      { isFreeAdv &&
        <div className='talign-right fontsize-2 adjacent-mar-t-2'>
          free
        </div>
      }
    </div>
  )
}
/**
 * @returns {React.Component}
 */
function EntryIconColumn(props) {
  const {
    className,
    logEntry,
  } = props;

  const {statData} = logEntry;
  const {isLevelUp} = statData;

  return (
    <div className={combineClassnames('aitems-center flex-col', className)}>
      <EntryIconComponent 
        logEntry={logEntry}
        className='flex-none adjacent-mar-t-3'
        style={{width: 25, height: 25,
          opacity: 0.7,
        }} />

      { isLevelUp &&
        <StarFormationSVG 
          className='flex-none adjacent-mar-t-3'
          style={{width: 25, height: 25,
            opacity: 0.8,
          }} />
      }
    </div>
  )
}
/**
 * @returns {React.Component}
 */
function EntryHeaderContainer(props) {
  const {
    className,
    logEntry,
  } = props;

  if (!logEntry.hasEntryHeader()) {
    return null;
  }

  const locationDisplay = logEntry.locationDisplay;
  const encounterDisplay = logEntry.encounterDisplay;

  return (
    <div className={combineClassnames('flex-col adjacent-mar-t-3', className)}>
      { locationDisplay &&
        <div className='fontsize-2 color-gray flex-none adjacent-mar-t-1'>{locationDisplay}</div>
      }

      { encounterDisplay &&
        <div className='f-bold fontsize-7 flex-none adjacent-mar-t-1'>{encounterDisplay}</div>
      }
    </div>
  )
}
/**
 * @returns {React.Component}
 */
function EntryBodyContainer(props) {
  const {
    className,
    logEntry,
  } = props;

  const {
    entryDisplay,
  } = logEntry;

  return (
    <div className={combineClassnames('flex-col userselect-none whitespace-pre-wrap', className)}>
      {/* header with location and encounter name */}
      <EntryHeaderContainer logEntry={logEntry} />

      {/* text content */}
      { entryDisplay &&
        <div className='flex-col adjacent-mar-t-3'>
          {entryDisplay}
        </div>
      }

      {/* -- custom content -- */}
      {/* diabolic pizza */}
      { logEntry.hasDiabolicPizzaIngredients() &&
        <MakeDiabolicPizzaDisplay className='adjacent-mar-t-3' logEntry={logEntry} />
      }     

      {/* stat changes */}
      { logEntry.hasStatChanges &&
        <StatChangesDisplay logEntry={logEntry} />
      }

      {/* meat and items */}
      { logEntry.hasInventoryChanges &&
        <ItemChangesDisplay logEntry={logEntry} />
      }
    </div>
  )
}
/**
 * @returns {React.Component}
 */
export default function EntryDisplayContainer(props) {
  const {
    onClick,

    isSelected,

    className,
    logEntry,
  } = props;

  const [isFocused, toggleFocus] = React.useState(false);

  const focusedClass = isFocused ? 'bg-second-lighter' : 'bg-second';
  const selectedClass = isSelected ? 'bg-green' : '';

  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => toggleFocus(true)}
      onMouseLeave={() => toggleFocus(false)}
      className={combineClassnames('flex-row adjacent-mar-t-2 pad-2 borradius-2', focusedClass, className)}>

      {/* status indicator column */}
      <div 
        className={combineClassnames('bor-1-lightblue borradius-round height-auto', selectedClass)}
        style={{width: 10, height: 10}}>
      </div>

      {/* adventure num column */}
      <EntryAdventureColumn 
        logEntry={logEntry}
        className='adjacent-mar-l-4 flex-none'
        style={{width: 35}} />

      {/* icon column */}
      <EntryIconColumn
        logEntry={logEntry}
        className='adjacent-mar-l-4 flex-none' />

      {/* entry body */}
      <EntryBodyContainer
        logEntry={logEntry}
        className='adjacent-mar-l-4 flex-auto' />

      {/* combat */}
      { logEntry.hasCombatActions() &&
        <CombatSequenceDisplay 
          logEntry={logEntry}
          className='bor-l-1-third flex-col adjacent-mar-l-4 flex-none' />
      }
      
    </div>
  )
}
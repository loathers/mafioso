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
    entry,
  } = props;

  const {attributes} = entry;
  const {
    turnNum,
    isFreeAdv,
  } = attributes;

  return (
    <div
      onClick={props.onClick} 
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
    entry,
  } = props;

  const {attributes} = entry;
  const {isLevelUp} = attributes;

  return (
    <div className={combineClassnames('aitems-center flex-col', className)}>
      <EntryIconComponent 
        entry={entry}
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
    entry,
  } = props;

  if (!entry.hasEntryHeader) {
    return null;
  }

  const locationDisplay = entry.locationDisplay;
  const encounterDisplay = entry.encounterDisplay;

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
    entry,
  } = props;

  return (
    <div className={combineClassnames('flex-col whitespace-pre-wrap', className)}>
      {/* header with location and encounter name */}
      <EntryHeaderContainer entry={entry} />

      {/* text content */}
      { entry.hasContentDisplay &&
        <div className='flex-col adjacent-mar-t-3'>
          {entry.contentDisplay}
        </div>
      }

      {/* -- custom content -- */}
      {/* diabolic pizza */}
      { entry.hasDiabolicPizzaIngredients() &&
        <MakeDiabolicPizzaDisplay className='adjacent-mar-t-3' entry={entry} />
      }     

      {/* stat changes */}
      { entry.hasStatChanges &&
        <StatChangesDisplay entry={entry} />
      }

      {/* meat and items */}
      { entry.hasInventoryChanges &&
        <ItemChangesDisplay entry={entry} />
      }
    </div>
  )
}
/**
 * @returns {React.Component}
 */
export default function EntryDisplayContainer(props) {
  const {
    className,
    entry,
  } = props;

  const [isSelected, toggleSelected] = React.useState(false);

  const [isFocused, toggleFocus] = React.useState(false);

  const focusedClass = isFocused ? 'bg-second-lighter' : 'bg-second';
  const selectedClass = isSelected ? 'bg-green' : '';

  return (
    <div 
      onMouseEnter={() => toggleFocus(true)}
      onMouseLeave={() => toggleFocus(false)}
      className={combineClassnames('overflow-hidden flex-row adjacent-mar-t-2 pad-2 borradius-2 position-relative', focusedClass, className)}>

      {/* status indicator column */}
      <div 
        className={combineClassnames('bor-1-lightblue borradius-round height-auto flex-none', selectedClass)}
        style={{width: 10, height: 10}}>
      </div>

      {/* adventure num column */}
      <EntryAdventureColumn 
        entry={entry}
        className='adjacent-mar-l-4 flex-none'
        style={{width: 35}} />

      {/* icon column */}
      <EntryIconColumn
        entry={entry}
        className='adjacent-mar-l-4 flex-none' />

      {/* entry body */}
      { !isSelected &&
        <EntryBodyContainer
          entry={entry}
          className='adjacent-mar-l-4 flex-auto' />
      }

      {/* combat */}
      { entry.hasCombatActions() && !isSelected &&
        <CombatSequenceDisplay 
          entry={entry}
          className='mar-t-8 bor-l-1-third flex-col adjacent-mar-l-4 flex-none' />
      }

      {/* debug stuff */}
      { isSelected &&
        <div style={{backgroundColor: '#392644'}} className='borradius-1 pad-3 pad-r-8 flex-row flex-auto adjacent-mar-l-4'>
          <div style={{flex: '1 1 33%'}} className={combineClassnames('flex-col whitespace-pre-wrap flex-auto adjacent-mar-l-3')}>
            {entry.rawText}
          </div>

          <div style={{flex: '1 1 67%'}} className='pad-2 whitespace-pre-wrap bor-l-1-grayest flex-col flex-auto adjacent-mar-l-3'>
            {JSON.stringify(entry.export(), null, 4)}
          </div>
        </div>
      }

      {/* raw text toggle button */}
      <div 
        onClick={() => toggleSelected(!isSelected)}
        style={{
          textDecoration: 'underline',
        }}
        className='cursor-pointer userselect-none color-grayer fontsize-1 flex-none adjacent-mar-l-4'>
        toggle raw
      </div>
      
    </div>
  )
}
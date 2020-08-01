import React from 'react';

import { ReactComponent as AdventureSVG } from 'images/sands-of-time.svg';
import { ReactComponent as HealthSVG } from 'images/glass-heart.svg';
import { ReactComponent as ManaSVG } from 'images/potion-ball.svg';
import { ReactComponent as SpellbookSVG } from 'images/spell-book.svg';
import { ReactComponent as StarFormationSVG } from 'images/star-formation.svg';
import { ReactComponent as SteakSVG } from 'images/steak.svg';
import { ReactComponent as SwapBagSVG } from 'images/swap-bag.svg';

import EntryIconComponent from 'components/EntryIconComponent';
import CombatSequenceDisplay from 'components/CombatSequenceDisplay';
import MakeDiabolicPizzaDisplay from 'components/MakeDiabolicPizzaDisplay';
import StatChangesDisplay from 'components/StatChangesDisplay';
import SingleDisplay from 'components/SingleDisplay';
import ListDisplay from 'components/ListDisplay';

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

  return (
    <div className={combineClassnames('flex-col adjacent-mar-t-3', className)}>
      { entry.locationDisplay &&
        <div className='fontsize-2 color-gray flex-none adjacent-mar-t-1'>{entry.locationDisplay}</div>
      }

      { entry.encounterDisplay &&
        <div className='flex-row flex-none adjacent-mar-t-1'>
          <div className='f-bold fontsize-7 flex-none adjacent-mar-l-5'>{entry.encounterDisplay}</div>
          { entry.hasReplacedEnemies &&
            <div
              style={{textDecoration: 'line-through'}} 
              className=' fontsize-7 flex-none adjacent-mar-l-5'>
              {entry.replacedEnemiesDisplay}
            </div>
          }
        </div>
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
        <StatChangesDisplay 
          entry={entry}
          className='' />
      }

      <div className='flex-col flex-none'>
        {/* gained effects */}
        { entry.hasAcquiredEffects &&
          <ListDisplay 
            IconComponent={SpellbookSVG}
            list={entry.attributes.acquiredEffects}
            className='flex-none' />
        }

        {/* items */}
        { entry.hasAcquiredItems &&
          <ListDisplay 
            IconComponent={SwapBagSVG}
            list={entry.attributes.acquiredItems}
            className='flex-none' />
        }

        <div className='flex-row'>
          {/* adventures */}
          { entry.hasAdventureChanges &&
            <SingleDisplay 
              IconComponent={AdventureSVG}
              className='mar-2'
              content={`${entry.adventureDisplay} adventures`} />
          }

          {/* meat */}
          { entry.hasMeatChanges &&
            <SingleDisplay 
              IconComponent={SteakSVG}
              className='mar-2'
              content={`${entry.createMeatDisplay()} meat`} />
          }

          {/* hp */}
          { entry.attributes.healthChanges.length > 0 &&
            <SingleDisplay 
              IconComponent={HealthSVG}
              className='mar-2'
              content={`${entry.healthDisplay} hp`} />
          }

          {/* mp */}
          { entry.attributes.manaChanges.length > 0 &&
            <SingleDisplay 
              IconComponent={ManaSVG}
              className='mar-2'
              content={`${entry.manaDisplay} mp`} />
          }
        </div>
      </div>
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
      { entry.hasCombatActions && !isSelected &&
        <CombatSequenceDisplay 
          entry={entry}
          className='mar-t-8 bor-l-1-third flex-col adjacent-mar-l-4 flex-none' />
      }

      {/* debug stuff */}
      { isSelected &&
        <div className='borradius-1 pad-3 pad-r-8 flex-row flex-auto bg-fourth adjacent-mar-l-4'>
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
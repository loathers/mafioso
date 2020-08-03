import React from 'react';

import { ReactComponent as AdventureSVG } from 'images/sands-of-time.svg';
import { ReactComponent as HealthSVG } from 'images/glass-heart.svg';
import { ReactComponent as ManaSVG } from 'images/potion-ball.svg';
import { ReactComponent as SpellbookSVG } from 'images/spell-book.svg';
import { ReactComponent as StarFormationSVG } from 'images/star-formation.svg';
import { ReactComponent as SteakSVG } from 'images/steak.svg';
import { ReactComponent as SwapBagSVG } from 'images/swap-bag.svg';
import {ReactComponent as UnknownSVG} from 'images/uncertainty.svg';

import Button from 'components/Button';
import CombatSequenceDisplay from 'components/CombatSequenceDisplay';
import MakeDiabolicPizzaDisplay from 'components/MakeDiabolicPizzaDisplay';
import StatChangesDisplay from 'components/StatChangesDisplay';
import SingleDisplay from 'components/SingleDisplay';
import ListDisplay from 'components/ListDisplay';

import combineClassnames from 'utilities/combineClassnames';

/**
 * @returns {React.Component}
 */
export default function EntryDisplayContainer(props) {
  const {
    className,
    entry,
    isUsingCompactMode,
  } = props;

  const [isSelected, toggleSelected] = React.useState(false); // internal selection
  const [isShowRaw, toggleShowRaw] = React.useState(false); // show raw data
  const [isShowCompact, toggleCompact] = React.useState(false); // compact mode

  React.useEffect(() => {
      toggleCompact(isUsingCompactMode);
      toggleSelected(isUsingCompactMode);
  }, [isUsingCompactMode]);

  React.useEffect(() => {
    toggleCompact(isSelected);
  }, [isSelected]);
  
  return (
    <div className={combineClassnames('flex-row position-relative', className)}>
      <Button
        onClick={() => toggleSelected(!isSelected)}
        className='borradius-l-2 pad-2 overflow-hidden flex-row flex-auto' >
        {/* adventure num column */}
        <EntryAdventureColumn 
          entry={entry}
          className='adjacent-mar-l-4 flex-none'
          style={{width: 35}} />

        {/* icon column */}
        <EntryIconColumn
          entry={entry}
          className='adjacent-mar-l-4 flex-none' />

        { !isShowRaw && 
          <div className='flex-col whitespace-pre-wrap flex-auto adjacent-mar-l-4'>
            <EntryHeaderContainer 
              entry={entry}
              className='flex-none adjacent-mar-t-2' />

            { !isShowCompact && entry.hasEntryBodyData &&
              <EntryBodyContainer 
                entry={entry}
                className='flex-auto adjacent-mar-t-2' />
            }
          </div>
        }

        {/* combat */}
        { entry.hasCombatActions && !isShowRaw && !isShowCompact &&
          <CombatSequenceDisplay 
            entry={entry}
            className='mar-t-8 bor-l-1-third flex-col adjacent-mar-l-4 flex-none' />
        }

        {/* debug stuff */}
        { isShowRaw &&
          <div className='borradius-1 pad-3 pad-r-8 flex-row flex-auto bg-fourth adjacent-mar-l-4'>
            <div style={{flex: '1 1 33%'}} className={combineClassnames('flex-col whitespace-pre-wrap flex-auto adjacent-mar-l-3')}>
              {entry.rawText}
            </div>

            <div style={{flex: '1 1 67%'}} className='pad-2 whitespace-pre-wrap bor-l-1-grayest flex-col flex-auto adjacent-mar-l-3'>
              {JSON.stringify(entry.export(), null, 4)}
            </div>
          </div>
        }
      </Button>

      {/* right column */}
      <div className='flex-col flex-none'>
        <Button 
          onClick={() => toggleShowRaw(!isShowRaw)}
          style={{width: 30}}
          className='borradius-r-2 talign-right cursor-pointer color-grayer fontsize-1 flex-auto adjacent-mar-t-2'>
        </Button>
      </div>
    </div>
  )
}
/**
 * @returns {React.Component}
 */
function EntryAdventureColumn(props) {
  const {
    className,
    style,
    entry,
  } = props;

  const {attributes: {
    isFreeAdv,
  }} = entry;

  const fontClassName = (!entry.isInBetweenTurns && entry.hasRawTurnNum) ? 'fontsize-5 f-bold' : 'fontsize-3';
  const shouldHideTurnNum = entry.attributes.dayNum <= 0;

  return (
    <div
      onClick={props.onClick} 
      className={combineClassnames('flex-col', className)}
      style={style}>
      <div className={combineClassnames('talign-right color-white width-full aself-start adjacent-mar-t-2', fontClassName)}>
        {!shouldHideTurnNum ? entry.turnNum : '-'}
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

  const EntryIconComponent = entry.entryIcon || UnknownSVG;

  return (
    <div className={combineClassnames('aitems-center flex-col', className)}>
      <EntryIconComponent 
        entry={entry}
        className='flex-none adjacent-mar-t-2'
        style={{width: 25, height: 25,
          opacity: 0.7,
        }} />

      { isLevelUp &&
        <StarFormationSVG 
          className='flex-none adjacent-mar-t-2'
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
    <div className={combineClassnames('flex-col adjacent-mar-t-2', className)}>
      { entry.locationDisplay &&
        <div className='fontsize-2 color-gray flex-none adjacent-mar-t-1'>{entry.locationDisplay}</div>
      }

      { entry.encounterDisplay &&
        <div className='fontsize-5 overflow-hidden flex-row flex-none adjacent-mar-t-1'>
          <div className='f-bold flex-none adjacent-mar-l-5'>
            {entry.encounterDisplay}
          </div>

          { entry.hasReplacedEnemies &&
            <div
              style={{textDecoration: 'line-through'}} 
              className='flex-none adjacent-mar-l-5'>
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
      {/* text content */}
      { entry.hasContentDisplay &&
        <div className='fontsize-4 flex-col adjacent-mar-t-2'>
          {entry.contentDisplay}
        </div>
      }

      {/* diabolic pizza */}
      { entry.hasDiabolicPizzaIngredients &&
        <MakeDiabolicPizzaDisplay className='adjacent-mar-t-2' entry={entry} />
      }     

      {/* stat changes */}
      { entry.hasStatChanges &&
        <StatChangesDisplay 
          entry={entry}
          className='' />
      }

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
            className='mar-1'
            content={`${entry.adventureDisplay} adventures`} />
        }

        {/* meat */}
        { entry.hasMeatChanges &&
          <SingleDisplay 
            IconComponent={SteakSVG}
            className='mar-1'
            content={`${entry.createMeatDisplay()} meat`} />
        }

        {/* hp */}
        { entry.hasHealthChanges &&
          <SingleDisplay 
            IconComponent={HealthSVG}
            className='mar-1'
            content={`${entry.healthDisplay} hp`} />
        }

        {/* mp */}
        { entry.hasManaChanges &&
          <SingleDisplay 
            IconComponent={ManaSVG}
            className='mar-1'
            content={`${entry.manaDisplay} mp`} />
        }
      </div>
    </div>
  )
}
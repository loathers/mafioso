import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as CarrionSVG } from 'images/carrion.svg';
import { ReactComponent as LaurelCrownSVG } from 'images/laurel-crown.svg';
import { ReactComponent as StarFormationSVG } from 'images/star-formation.svg';
import { ReactComponent as SteakSVG } from 'images/steak.svg';
import { ReactComponent as SwapBagSVG } from 'images/swap-bag.svg';

import EntryIconComponent from 'components/EntryIconComponent';

import combineClassnames from 'utilities/combineClassnames';

/**
 * @returns {React.Component}
 */
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
      style={{
        minWidth: 70,
        maxWidth: 120,
        height: 35,
      }}>

      <div 
        className='fontsize-8 color-white flex-none adjacent-mar-t-2 position-absolute'
        style={{
          top: 5,
          left: 5,
          width: 20,
          height: 20,
          opacity: 0.5,
        }} >
        {roundNum}
      </div>

      <div className='fontsize-1 mar-b-1 color-white zindex-1 talign-center flex-none'>
        {content}
      </div>
    </div>
  )
}
/**
 * @returns {React.Component}
 */
function ItemBlockDisplay(props) {
  const {
    className,
    content,
    IconComponent,
  } = props;

  return (
    <div 
      className={combineClassnames('overflow-hidden bg-second-darker borradius-2 pad-v-2 pad-h-4 boxsizing-border flex-col-center position-relative', className)}
      style={{
        minWidth: 70,
        maxWidth: 140,
        height: 40,
      }}>

      <IconComponent 
        className='flex-none adjacent-mar-t-2 position-absolute'
        style={{
          top: 5,
          left: 5,
          width: 20,
          height: 20,
          opacity: 0.3,
        }} />

      <div className='fontsize-3 color-white zindex-1 talign-center flex-none'>
        {content}
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

  const {data} = logEntry;
  const {
    isLevelUp,
  } = data;

  return (
    <div className={combineClassnames('aitems-center flex-col', className)}>
      <EntryIconComponent 
        logEntry={logEntry}
        className='flex-none adjacent-mar-t-3'
        style={{
          width: 25,
          height: 25,
          opacity: 0.7,
        }} />

      { isLevelUp &&
        <StarFormationSVG 
          className='flex-none adjacent-mar-t-3'
          style={{
            width: 25,
            height: 25,
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

  if (!logEntry.hasEntryHeader) {
    return null;
  }

  const {data} = logEntry;
  const {
    locationName,
    encounterName,
  } = data;

  return (
    <div className={'flex-col adjacent-mar-t-3 ' + className}>
      { locationName &&
        <div className='fontsize-2 color-gray flex-none adjacent-mar-t-1'>{locationName}</div>
      }

      { encounterName &&
        <div className='fontsize-7 flex-none adjacent-mar-t-1'>{encounterName}</div>
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
    data, 
    entryDisplay,
  } = logEntry;
  const {
    combatActions,
    acquiredItems,
    meatChange,
    hasInitiative,
    isVictory,
    isDeath,
  } = data;

  const hasCombatActions = combatActions.length > 0;

  return (
    <div className={combineClassnames('flex-col whitespace-pre-wrap', className)}>
      {/* header with location and encounter name */}
      <EntryHeaderContainer logEntry={logEntry} />

      {/* entry specific content */}
      { entryDisplay &&
        <div className='flex-col adjacent-mar-t-3'>
          {entryDisplay}
        </div>
      }

      {/* combat */}
      <div className='flex-row s flexwrap-yes aitems-center adjacent-mar-t-3'>
        { hasCombatActions && hasInitiative &&
          <React.Fragment>
            <div className='flex-row-center fontsize-3 mar-2'>Initiative!</div>
            <div className='flex-row-center fontsize-5 fweight-bold mar-2'>
              >
            </div>
          </React.Fragment>
        }

        { combatActions.map((combatData, idx) => (
          <React.Fragment key={`combat-action-${uuidv4}-${idx}-key`}>    
            <CombatActionDisplay 
              className='mar-2 pad-2'
              content={combatData.actionName}
              roundNum={combatData.roundNum} 
            /> 

            <div className='flex-row-center fontsize-5 fweight-bold mar-2'>
              >
            </div>
          </React.Fragment>
        ))}

        { hasCombatActions && isVictory &&
          <React.Fragment>
            <LaurelCrownSVG 
              className='flex-none mar-2'
              style={{
                width: 30,
                height: 30,
              }} />
            <div className='flex-row-center fontsize-3 mar-2'>Victory!</div>
          </React.Fragment>
        }

        { hasCombatActions && isDeath &&
          <React.Fragment>
            <CarrionSVG 
              className='flex-none mar-2'
              style={{
                width: 30,
                height: 30,
              }} />
            <div className='flex-row-center fontsize-3 mar-2'>Beaten up :(</div>
          </React.Fragment>
        }
      </div>

      {/* meat and items */}
      <div className='flex-row flexwrap-yes adjacent-mar-t-3'>
        { logEntry.hasMeatChanged &&
          <ItemBlockDisplay 
            IconComponent={SteakSVG}
            className='mar-2 pad-2'
            content={`${meatChange} meat`} />
        }

        { acquiredItems.map((itemName, idx) => (
          <ItemBlockDisplay 
            IconComponent={SwapBagSVG}
            className='mar-2 pad-2'
            content={`${itemName}`}
            key={`acquired-item-${uuidv4}-${idx}-key`} />
        ))}
      </div>
    </div>
  )
}
/**
 * @returns {React.Component}
 */
export default function EntryDisplayContainer(props) {
  const {
    onClick,
    onMouseEnter,
    onMouseLeave,
    
    isFocused,
    isSelected,

    className,
    logEntry,
  } = props;

  const focusedClass = isFocused ? 'bg-second-lighter' : 'bg-second';
  const selectedClass = isSelected ? 'bg-green' : '';

  return (
    <div 
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={combineClassnames('flex-row adjacent-mar-t-2 pad-4 borradius-2', focusedClass, className)}>

      {/* status indicator column */}
      <div 
        className={combineClassnames('bor-1-lightblue borradius-round height-auto', selectedClass)}
        style={{
          width: 10,
          height: 10,
        }}>
      </div>

      {/* adventure num column */}
      <EntryAdventureColumn 
        logEntry={logEntry}
        className='adjacent-mar-l-4 flex-none'
        style={{
          width: 35,
        }} />

      {/* icon column */}
      <EntryIconColumn
        logEntry={logEntry}
        className='adjacent-mar-l-4 flex-none' />

      {/* entry body */}
      <EntryBodyContainer
        logEntry={logEntry}
        className='adjacent-mar-l-4 flex-auto' />
      
    </div>
  )
}
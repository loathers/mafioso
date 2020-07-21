import React from 'react';

import { ReactComponent as DeadheadSVG } from 'images/dead-head.svg';
import { ReactComponent as StarFormationSVG } from 'images/star-formation.svg';

import EntryIconComponent from 'components/EntryIconComponent';

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
        {turnNum === -1 ? '' : turnNum}
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
    hasInitiative,
    isDeath,
    isVictory,
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

      { hasInitiative &&
        <div className='talign-center fontsize-1 color-gray flex-none adjacent-mar-t-3'>init</div>
      }

      { isDeath &&
        <DeadheadSVG 
          className='flex-none adjacent-mar-t-3'
          style={{
            width: 25,
            height: 25,
            opacity: 0.8,
          }} />
      }

      { isVictory &&
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
    acquiredItems,
  } = data;

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

      {/* items acquired */}
      { acquiredItems.length > 0 &&
        <div className='flex-col adjacent-mar-t-3'>
          {`You acquired: ${acquiredItems.join(', ')}.`}
        </div>
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
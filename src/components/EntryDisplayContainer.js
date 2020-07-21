import React from 'react';

import { ReactComponent as DeadheadSVG } from 'images/dead-head.svg';
import { ReactComponent as StarFormationSVG } from 'images/star-formation.svg';
import { ReactComponent as UncertaintySVG } from 'images/uncertainty.svg';

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
      className={combineClassnames('flex-col flex-none adjacent-mar-l-4', className)}
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
export default function EntryDisplayContainer(props) {
  const {
    onClick,
    onMouseEnter,
    onMouseLeave,
    
    isFocused,
    isSelected,

    className,
    IconComponent = UncertaintySVG,
    logEntry,
  } = props;

  const isDeath = logEntry.data.isDeath;
  const isVictory = logEntry.data.isVictory;

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
        style={{
          width: 35,
        }} />

      {/* icon column */}
      <div className='aitems-center flex-col flex-none adjacent-mar-l-4'>
        <IconComponent 
          className='flex-none adjacent-mar-t-3'
          style={{
            width: 25,
            height: 25,
            opacity: 0.7,
          }} />

        { logEntry.data.hasInitiative &&
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

      {/* entry body */}
      <div className='flex-auto flex-col adjacent-mar-l-4 whitespace-pre-wrap'>
        <EntryHeaderContainer logEntry={logEntry} />

        <div className='flex-col adjacent-mar-t-3'>
          {props.children}
        </div>
      </div>
    </div>
  )
}
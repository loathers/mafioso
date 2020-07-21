import React from 'react';

import { ReactComponent as UncertaintySVG } from 'images/uncertainty.svg';

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
    className,
    IconComponent = UncertaintySVG,
    logEntry,
  } = props;

  const {data} = logEntry;
  const {
    adventureNum,
    isFreeAdv,
  } = data;

  return (
    <div className={'flex-row aitems-start adjacent-mar-t-2 bg-second pad-4 borradius-2 ' + className}>
      {/* adventure num column */}
      <div className='flex-col flex-none adjacent-mar-l-4'>      
        <div 
          className='talign-right color-gray fontsize-3 aself-start adjacent-mar-t-2'
          style={{width: 30}}>
          {adventureNum === -1 ? '' : adventureNum}
        </div>

        { isFreeAdv &&
          <div className='talign-right color-gray fontsize-2 adjacent-mar-t-2'>
            free
          </div>
        }
      </div>

      {/* entry icon column */}
      <IconComponent 
        className='flex-none adjacent-mar-l-4'
        style={{
          width: 25,
          height: 25,
          opacity: 0.7,
        }} />

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
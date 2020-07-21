import React from 'react';

import { ReactComponent as DigDugSVG } from 'images/dig-dug.svg';

import EntryDisplayContainer from 'components/EntryDisplayContainer';

/**
 * @returns {React.Component}
 */
export default function NoncombatEntryDisplay(props) {
  const {
    logEntry
  } = props;

  const {data} = logEntry;
  const {
    locationName,
    encounterName,
  } = data;

  return (
    <EntryDisplayContainer {...props}>
      <DigDugSVG 
        className='flex-none adjacent-mar-l-2'
        style={{
          width: 25,
          height: 25,
        }} />

      <div className='flex-auto flex-col adjacent-mar-l-2'>
        { locationName &&
          <div className='flex-none adjacent-mar-t-1'>{locationName}</div>
        }

        { encounterName &&
          <div className='flex-none adjacent-mar-t-1'>{encounterName}</div>
        }

        <div className='flex-auto adjacent-mar-t-1'>{logEntry.entryString}</div>
      </div>

    </EntryDisplayContainer>
  )
}
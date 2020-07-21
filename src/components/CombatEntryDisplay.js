import React from 'react';

import { ReactComponent as CrossedSwordsSVG } from 'images/crossed-swords.svg';

import EntryDisplayContainer from 'components/EntryDisplayContainer';

/**
 * @returns {React.Component}
 */
export default function CombatEntryDisplay(props) {
  const {
    logEntry
  } = props;

  const {data} = logEntry;
  const {
    locationName,
    encounterName,
  } = data;

  return (
    <EntryDisplayContainer {...props} IconComponent={CrossedSwordsSVG}>
      { locationName &&
        <div className='flex-none adjacent-mar-t-1'>{locationName}</div>
      }

      { encounterName &&
        <div className='flex-none adjacent-mar-t-1'>{encounterName}</div>
      }

      <div className='flex-auto adjacent-mar-t-1'>{logEntry.entryString}</div>
    </EntryDisplayContainer>
  )
}
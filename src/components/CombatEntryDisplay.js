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
    entryBody,
  } = data;

  return (
    <EntryDisplayContainer {...props} IconComponent={CrossedSwordsSVG}>
      { locationName &&
        <div className='flex-none adjacent-mar-t-1'>{locationName}</div>
      }

      { encounterName &&
        <div className='flex-none adjacent-mar-t-1'>{encounterName}</div>
      }

      { entryBody &&
        <div className='flex-none adjacent-mar-t-1'>{entryBody}</div>
      }
    </EntryDisplayContainer>
  )
}
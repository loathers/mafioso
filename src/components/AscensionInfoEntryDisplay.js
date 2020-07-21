import React from 'react';

import EntryDisplayContainer from 'components/EntryDisplayContainer';

/**
 * @returns {React.Component}
 */
export default function AscensionInfoEntryDisplay(props) {
  const {
    logEntry,
  } = props;

  const {
    entryString,
  } = logEntry;

  return (
    <EntryDisplayContainer {...props}>
      <div className='flex-auto adjacent-mar-l-2'>{entryString}</div>
    </EntryDisplayContainer>
  )
}
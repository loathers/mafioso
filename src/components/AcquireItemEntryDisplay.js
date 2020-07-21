import React from 'react';

import { ReactComponent as SteakSVG } from 'images/steak.svg';

import EntryDisplayContainer from 'components/EntryDisplayContainer';

/**
 * @returns {React.Component}
 */
export default function AcquireItemEntryDisplay(props) {
  const {
    logEntry,
  } = props;

  const {
    entryString,
  } = logEntry;

  return (
    <EntryDisplayContainer {...props} IconComponent={SteakSVG}>
      <div className='flex-auto adjacent-mar-l-4'>{entryString}</div>
    </EntryDisplayContainer>
  )
}
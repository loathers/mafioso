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
    <EntryDisplayContainer {...props}>
      <SteakSVG 
        className='flex-none adjacent-mar-l-2'
        style={{
          width: 25,
          height: 25,
        }} />
      <div className='flex-auto adjacent-mar-l-2'>{entryString}</div>
    </EntryDisplayContainer>
  )
}
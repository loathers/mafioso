import React from 'react';

import { ReactComponent as InfoSVG } from 'images/info.svg';

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
    <EntryDisplayContainer {...props} IconComponent={InfoSVG}>
      <div className='flex-auto adjacent-mar-l-4'>{entryString}</div>
    </EntryDisplayContainer>
  )
}
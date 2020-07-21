import React from 'react';

import { ReactComponent as SteakSVG } from 'images/steak.svg';

import EntryDisplayContainer from 'components/EntryDisplayContainer';

/**
 * @returns {React.Component}
 */
export default function AcquireItemEntryDisplay(props) {
  const {
    logEntry,
    ...otherProps
  } = props;

  const {
    entryString,
  } = logEntry;

  return (
    <EntryDisplayContainer {...otherProps}>
      <SteakSVG />
      <div>{entryString}</div>
    </EntryDisplayContainer>
  )
}
import React from 'react';

import EntryDisplayContainer from 'components/EntryDisplayContainer';

/**
 * @returns {React.Component}
 */
export default function AscensionInfoEntryDisplay(props) {
  const {
    logEntry,
    ...otherProps
  } = props;

  const {
    entryString,
  } = logEntry;

  return (
    <EntryDisplayContainer {...otherProps}>
      <div>{entryString}</div>
    </EntryDisplayContainer>
  )
}
import React from 'react';

import EntryContainer from 'components/EntryContainer';

/**
 * @returns {React.Component}
 */
export default function AscensionInfoEntryComponent(props) {
  const {
    logEntry,
    ...otherProps
  } = props;

  const {
    entryString,
  } = logEntry;

  return (
    <EntryContainer {...otherProps}>
      <div>{entryString}</div>
    </EntryContainer>
  )
}
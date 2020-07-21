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
    entryBody,
  } = data;

  return (
    <EntryDisplayContainer {...props} IconComponent={DigDugSVG}>
      { entryBody }
    </EntryDisplayContainer>
  )
}
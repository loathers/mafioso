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
    entryBody,
  } = data;

  return (
    <EntryDisplayContainer {...props} IconComponent={CrossedSwordsSVG}>
      { entryBody }
    </EntryDisplayContainer>
  )
}
import React from 'react';

import { ReactComponent as SwapBagSVG } from 'images/swap-bag.svg';

import EntryDisplayContainer from 'components/EntryDisplayContainer';

/**
 * @returns {React.Component}
 */
export default function AcquireItemEntryDisplay(props) {
  const {
    logEntry,
  } = props;

  const {data} = logEntry;
  const {
    entryBody,
  } = data;

  return (
    <EntryDisplayContainer {...props} IconComponent={SwapBagSVG}>
      {entryBody}
    </EntryDisplayContainer>
  )
}
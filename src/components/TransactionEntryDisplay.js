import React from 'react';

import { ReactComponent as SteakSVG } from 'images/steak.svg';

import EntryDisplayContainer from 'components/EntryDisplayContainer';

/**
 * @returns {React.Component}
 */
export default function TransactionEntryDisplay(props) {
  const {
    logEntry
  } = props;

  return (
    <EntryDisplayContainer {...props} IconComponent={SteakSVG}>
      {`Bought ${logEntry.itemsDisplay} for ${logEntry.meatDisplay} meat.`}
    </EntryDisplayContainer>
  )
}
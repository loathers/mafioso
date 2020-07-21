import React from 'react';

import { ReactComponent as BagSVG } from 'images/swap-bag.svg';

import EntryDisplayContainer from 'components/EntryDisplayContainer';

/**
 * @returns {React.Component}
 */
export default function TransactionEntryDisplay(props) {
  const {
    logEntry
  } = props;

  return (
    <EntryDisplayContainer {...props} IconComponent={BagSVG}>
      <div className='flex-auto adjacent-mar-l-4'>{`bought ${logEntry.itemsDisplay} for ${logEntry.meatDisplay} meat.`}</div>
    </EntryDisplayContainer>
  )
}
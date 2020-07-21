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
    <EntryDisplayContainer {...props} IconClass={BagSVG}>
      <div className='flex-auto adjacent-mar-l-2'>{`bought ${logEntry.itemsDisplay} for ${logEntry.meatDisplay} meat.`}</div>
    </EntryDisplayContainer>
  )
}
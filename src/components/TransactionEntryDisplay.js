import React from 'react';

import { ReactComponent as BagSVG } from 'images/swap-bag.svg';

import EntryDisplayContainer from 'components/EntryDisplayContainer';

/**
 * @returns {React.Component}
 */
export default function TransactionEntryDisplay(props) {
  const {
    className,
    logEntry
  } = props;

  return (
    <EntryDisplayContainer {...props}
      className={'flex-row-center ' + className}>

      <BagSVG 
        className='flex-none adjacent-mar-l-2'
        style={{
          width: 25,
          height: 25,
        }} />

      <div className='flex-auto adjacent-mar-l-2'>{`bought ${logEntry.itemsDisplay} for ${logEntry.meatDisplay} meat.`}</div>

    </EntryDisplayContainer>
  )
}
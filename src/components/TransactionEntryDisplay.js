import React from 'react';

import { ReactComponent as BagSVG } from 'images/swap-bag.svg';

import EntryDisplayContainer from 'components/EntryDisplayContainer';

/**
 * @returns {React.Component}
 */
export default function TransactionEntryDisplay(props) {
  const {
    className,
    logEntry,
    ...otherProps
  } = props;

  // const {
  //   entryString,
  // } = logEntry;

  return (
    <EntryDisplayContainer {...otherProps}
      className={'flex-row ' + className}>

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
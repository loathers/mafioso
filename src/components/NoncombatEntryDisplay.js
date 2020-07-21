import React from 'react';

import { ReactComponent as DigDugSVG } from 'images/dig-dug.svg';

import EntryDisplayContainer from 'components/EntryDisplayContainer';

/**
 * @returns {React.Component}
 */
export default function NoncombatEntryDisplay(props) {
  const {
    className,
    logEntry
  } = props;

  return (
    <EntryDisplayContainer {...props}
      className={'flex-row-center ' + className}>

      <DigDugSVG 
        className='flex-none adjacent-mar-l-2'
        style={{
          width: 25,
          height: 25,
        }} />

      <div className='flex-auto adjacent-mar-l-2'>{`noncombat ${logEntry.entryString}`}</div>

    </EntryDisplayContainer>
  )
}
import React from 'react';
import {observer} from 'mobx-react';

import ENTRY_TYPE from 'constants/entryType';

import AscensionInfoEntryDisplay from 'components/AscensionInfoEntryDisplay';
import AcquireItemEntryDisplay from 'components/AcquireItemEntryDisplay';
import TransactionEntryDisplay from 'components/TransactionEntryDisplay';
import EntryDisplayContainer from 'components/EntryDisplayContainer';

/**
 * @returns {React.Component}
 */
function StringEntry(props) {
  const {
    logEntry,
  } = props;

  const {
    entryString,
  } = logEntry;

  return (
    <EntryDisplayContainer {...props}>
      <div className='flex-auto adjacent-mar-l-2'>{entryString}</div>
    </EntryDisplayContainer>
  )
}
/**
 * @param {EntryType} entryType
 * @returns {React.Component}
 */
function getEntryDisplay(entryType) {
  switch(entryType) {
    case ENTRY_TYPE.SNAPSHOT.ASCENSION_INFO:
      return AscensionInfoEntryDisplay;

    case ENTRY_TYPE.ACQUIRE_ITEM:
      return AcquireItemEntryDisplay;

    case ENTRY_TYPE.TRANSACTION:
      return TransactionEntryDisplay;

    case ENTRY_TYPE.UNKNOWN:
      return StringEntry;

    default:
      return null;
  }
}
/**
 * @returns {React.Component}
 */
function VisualizerLine(props) {
  const {logEntry} = props;

  const visualizerCellClassName = 'visualizer-cell adjacent-mar-t-2';

  const EntryDisplayComponentToUse = getEntryDisplay(logEntry.entryType);
  if (EntryDisplayComponentToUse === null) {
    return (
      <div 
        children={'(Unknown Entry type) ' + logEntry.entryString}
        className={'color-kolred ' + visualizerCellClassName}
      />
    )
  }

  return (
    <EntryDisplayComponentToUse 
      {...props} 
      className={visualizerCellClassName}
    />
  )
}
/**
 * @returns {React.Component}
 */
export default observer(
function VisualizerSection(props) {
  const {logData = []} = props;

  return (
    <div className='flex-col adjacent-mar-t-4'>
      <div className='fontsize-1 adjacent-mar-t-2'>Visualizer Table</div>
      
      <div className='overflow-auto flex-col adjacent-mar-t-2'>
        { logData.map((logEntry, idx) => (
          <VisualizerLine 
            logEntry={logEntry}
            key={`VisualizerLine-${idx}-key`}/>
        ))}
      </div>
    </div>
  )
})
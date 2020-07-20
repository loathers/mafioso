import React from 'react';
import {observer} from 'mobx-react';

import ENTRY_TYPE from 'constants/entryType';

import AscensionInfoEntryComponent from 'components/AscensionInfoEntryComponent';
import EntryContainer from 'components/EntryContainer';

/**
 * @returns {React.Component}
 */
function StringEntry(props) {
  const {
    logEntry,
    ...otherProps
  } = props;

  const {
    entryString,
  } = logEntry;

  return (
    <EntryContainer 
      {...otherProps}>
      {entryString}
    </EntryContainer>
  )
}
/**
 * @returns {React.Component}
 */
function VisualizerLine(props) {
  const {logEntry} = props;

  const visualizerCellClassName = 'visualizer-cell adjacent-mar-t-2';

  if (logEntry.entryType === ENTRY_TYPE.SNAPSHOT.ASCENSION_INFO) {
    return (
      <AscensionInfoEntryComponent 
        {...props} 
        className={visualizerCellClassName}
      />
    )
  }

  if (logEntry.entryType !== ENTRY_TYPE.UNKNOWN) {
    return (
      <StringEntry 
        {...props} 
        className={visualizerCellClassName}
      />
    )
  }

  // unknown EntryType
  return (
    <div 
      children={'(Unknown Entry type) ' + logEntry.entryString}
      className={'color-kolred ' + visualizerCellClassName}
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
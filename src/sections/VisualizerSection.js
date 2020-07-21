import React from 'react';
import {observer} from 'mobx-react';

import ENTRY_TYPE from 'constants/entryType';

import AscensionInfoEntryDisplay from 'components/AscensionInfoEntryDisplay';
import AcquireItemEntryDisplay from 'components/AcquireItemEntryDisplay';
import CombatEntryDisplay from 'components/CombatEntryDisplay';
import NoncombatEntryDisplay from 'components/NoncombatEntryDisplay';
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
      <div className='flex-auto adjacent-mar-l-4'>{entryString}</div>
    </EntryDisplayContainer>
  )
}
/**
 * @param {EntryType} entryType
 * @returns {React.Component}
 */
function getEntryDisplay(entryType) {
  switch(entryType) {
    case ENTRY_TYPE.ENCOUNTER.COMBAT:
      return CombatEntryDisplay;

    case ENTRY_TYPE.ENCOUNTER.NONCOMBAT:
      return NoncombatEntryDisplay;

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
        children={'(unknown entry display) ' + logEntry.entryString}
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

  // focus hook
  const [focusedEntry, setFocusedEntry] = React.useState();
  const [elementPosition, setFocusPosition] = React.useState({x: 10, y: 210});
  const [previousEntry, setPreviousEntry] = React.useState();
  const [previousPosition, setPreviousPosition] = React.useState({x: 10, y: 210});

  const onEnterItem = (evt, newEntry) => {
    const boundingClientRect = evt.currentTarget.getBoundingClientRect();
    const yOffset = (newEntry.entryString.length * -0.6);
    const yRandom = Math.random() * 10 - 5;

    const xPosition = evt.clientX - 250;
    setFocusPosition({x: xPosition, y: boundingClientRect.y + yOffset + yRandom});
    setFocusedEntry(newEntry);
  };

  const onLeaveItem = () => {
    setPreviousPosition(elementPosition);
    setPreviousEntry(focusedEntry);
    setFocusedEntry(undefined);
  };

  const hasSelectedEntry = focusedEntry !== undefined;
  const positionToUse = hasSelectedEntry ? elementPosition : previousPosition;
  const detailsStyle = {
    transform: `translate(${positionToUse.x}px, ${positionToUse.y}px)`,
  };

  return (
    <div className='flex-col adjacent-mar-t-5'>      
      { logData.map((logEntry, idx) => (
        <VisualizerLine 
          onMouseEnter={(evt) => onEnterItem(evt, logEntry)}
          onMouseLeave={onLeaveItem}

          logEntry={logEntry}
          key={`VisualizerLine-${idx}-key`}/>
      ))}

      <div
        className='pad-4 borradius-2 bg-grayest color-white whitespace-pre-wrap flex-col'
        style={{
          boxShadow: '0px 2px 1px 1px #1e3654',
          pointerEvents: 'none',
          position: 'fixed',
          top: 0,
          left: 100,
          transition: 'transform 500ms, opacity 300ms',
          width: 300,
          opacity: hasSelectedEntry ? 1 : 0,
          ...detailsStyle,
        }}>
        {focusedEntry && focusedEntry.entryString}
      </div>
    </div>
  )
})
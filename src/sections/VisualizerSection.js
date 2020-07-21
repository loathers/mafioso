import React from 'react';
import {observer} from 'mobx-react';

import ENTRY_TYPE from 'constants/entryType';

import AscensionInfoEntryDisplay from 'components/AscensionInfoEntryDisplay';
import AcquireItemEntryDisplay from 'components/AcquireItemEntryDisplay';
import CombatEntryDisplay from 'components/CombatEntryDisplay';
import NoncombatEntryDisplay from 'components/NoncombatEntryDisplay';
import TransactionEntryDisplay from 'components/TransactionEntryDisplay';
import EntryDisplayContainer from 'components/EntryDisplayContainer';

import {countNumLines} from 'utilities/stringUtils';

/**
 * @returns {React.Component}
 */
function VisualizerTooltip(props) {
  const {
    selectedEntry,
    previousEntry,
    style,
  } = props;

  const hasSelectedEntry = selectedEntry !== undefined;
  const contentDisplay = (selectedEntry && selectedEntry.entryString) || (previousEntry && previousEntry.entryString);

  return (
    <div
      className='pad-4 borradius-2 bg-grayest fontsize-3 color-white whitespace-pre-wrap flex-col'
      style={{
        position: 'fixed',
        top: 0,
        right: 30,
        transition: 'transform 500ms, opacity 300ms',
        opacity: hasSelectedEntry ? 1 : 0,
        ...style,
      }}>

      {contentDisplay}
    </div>
  )
}
/**
 * @returns {React.Component}
 */
function StringEntry(props) {
  const {
    logEntry,
  } = props;

  const contentDisplay = logEntry.data.entryBody || logEntry.entryString;

  return (
    <EntryDisplayContainer {...props}>
      {contentDisplay}
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

  // list state
  const [selectedEntry, setSelectedEntry] = React.useState();
  const [previousEntry, setPreviousEntry] = React.useState();
  const [focusedEntry, setFocusedEntry] = React.useState();

  // tooltip state 
  const [elementPosition, setFocusPosition] = React.useState({x: 10, y: 10});
  const [previousPosition, setPreviousPosition] = React.useState({x: 10, y: 10});

  const oSelectItem = (evt, newEntry) => {
    if (previousEntry && selectedEntry !== undefined && previousEntry.id === newEntry.id) {
      setSelectedEntry(undefined);
      return;
    }

    const boundingClientRect = evt.currentTarget.getBoundingClientRect();
    const xPosition = boundingClientRect.x;
    const yOffset = countNumLines(newEntry.entryString) * -15;
    const yPosition = boundingClientRect.y + yOffset;
    setFocusPosition({x: xPosition, y: yPosition});

    setPreviousPosition(elementPosition);
    setPreviousEntry(focusedEntry);
    setSelectedEntry(newEntry);
  };

  const onMouseEnterItem = (evt, newEntry) => {
    setFocusedEntry(newEntry);
  };

  const onMouseLeaveItem = () => {
    setFocusedEntry(undefined);
  };

  const hasFocusedEntry = focusedEntry !== undefined;
  const hasSelectedEntry = selectedEntry !== undefined;

  const positionToUse = hasSelectedEntry ? elementPosition : previousPosition;
  const detailsStyle = {
    transform: `translate(${positionToUse.x}px, ${positionToUse.y}px)`,
  };

  return (
    <div className='flex-col adjacent-mar-t-5'>      
      { logData.map((logEntry, idx) => (
        <VisualizerLine 
          onClick={(evt) => oSelectItem(evt, logEntry)}
          onMouseEnter={(evt) => onMouseEnterItem(evt, logEntry)}
          onMouseLeave={onMouseLeaveItem}

          isSelected={hasSelectedEntry && logEntry.id === selectedEntry.id}
          isFocused={hasFocusedEntry && logEntry.id === focusedEntry.id}

          logEntry={logEntry}
          key={`VisualizerLine-${idx}-key`}/>
      ))}

      <VisualizerTooltip
        selectedEntry={selectedEntry}
        previousEntry={previousEntry}
        className='pad-4 borradius-2 bg-grayest color-white whitespace-pre-wrap flex-col'
        style={detailsStyle} />
    </div>
  )
})
import React, {Fragment} from 'react';
import {observer} from 'mobx-react';

import EntryDisplayContainer from 'components/EntryDisplayContainer';
import HeaderDisplay from 'components/HeaderDisplay';

import combineClassnames from 'utilities/combineClassnames';
import {countNumLines} from 'utilities/regexUtils';

/**
 * @returns {React.Component}
 */
function VisualizerTooltip(props) {
  const {
    className,
    selectedEntry,
    previousEntry,
    isActive,
    style,
  } = props;

  const pointerEventsClass = isActive ? '' : 'pevents-none';
  const contentDisplay = (selectedEntry && selectedEntry.entryString) || (previousEntry && previousEntry.entryString);

  return (
    <div
      className={combineClassnames('pad-4 borradius-2 bg-grayest fontsize-3 color-white whitespace-pre-wrap flex-col', pointerEventsClass, className)}
      componentname='visualizer-tooltip'
      style={{
        opacity: isActive ? 1 : 0,
        ...style,
      }}>

      {contentDisplay}
    </div>
  )
}
/**
 * @returns {React.Component}
 */
export default observer(
function VisualizerSection(props) {
  const {entriesList = []} = props;

  return (
    <div style={{maxWidth: 1000}} className='width-full flex-col adjacent-mar-t-5'> 
      { entriesList.map((entry, idx) => {
        const currentDay = entry.attributes.dayNum;
        const previousEntry = idx >= 1 && entriesList[idx-1];
        const previousDay = previousEntry && previousEntry.attributes.dayNum;
        const shouldShowDayDisplay = previousDay !== undefined ? previousDay < currentDay : false;

        return (
          <Fragment key={`entry-display-${entry.id}-${idx}-key`}>
            { shouldShowDayDisplay &&
              <HeaderDisplay 
                topContent={`Day ${currentDay}`} 
                className='adjacent-mar-t-2 pad-3' />
            }

            <EntryDisplayContainer 
              entry={entry}
              className='visualizer-cell adjacent-mar-t-2' />
          </Fragment>
        )
      })}
    </div>
  )
})

export function VisualizerSection_Legacy(props) {
  const {entriesList = []} = props;

  // list state
  const [selectedEntry, setSelectedEntry] = React.useState();
  const [previousEntry, setPreviousEntry] = React.useState();

  // tooltip state 
  const [tooltipPosition, setFocusPosition] = React.useState({x: 0, y: 0});
  const [previousPosition, setPreviousPosition] = React.useState({x: 0, y: 0});

  const onSelectItem = (evt, newEntry) => {
    if (selectedEntry !== undefined && selectedEntry.id === newEntry.id) {
      setPreviousPosition(tooltipPosition);
      setFocusPosition(tooltipPosition);
      setPreviousEntry(selectedEntry);
      setSelectedEntry(undefined);
      return;
    }
    
    const boundingClientRect = evt.currentTarget.getBoundingClientRect();
    // const xPosition = boundingClientRect.x;
    const yOffset = countNumLines(newEntry.entryString) * -15;
    const yPosition = boundingClientRect.y + yOffset;
    const newPosition = {x: 0, y: Math.min(Math.max(yPosition, 0), window.innerHeight)};
    
    setPreviousPosition(tooltipPosition);
    setFocusPosition(newPosition);

    setPreviousEntry(selectedEntry);
    setSelectedEntry(newEntry);
  };

  const hasSelectedEntry = selectedEntry !== undefined;
  const positionToUse = hasSelectedEntry ? tooltipPosition : previousPosition;
  const detailsStyle = {
    transform: `translate(${positionToUse.x}px, ${positionToUse.y}px)`,
  };

  return (
    <div className='flex-col adjacent-mar-t-5'>      
      { entriesList.map((entry, idx) => (
        <EntryDisplayContainer 
          onClick={(evt) => onSelectItem(evt, entry)}
          isSelected={hasSelectedEntry && entry.id === selectedEntry.id}

          entry={entry}
          className='visualizer-cell adjacent-mar-t-2'
          key={`entry-display-${entry.id}-key`} />
      ))}

      <VisualizerTooltip
        isActive={hasSelectedEntry}
        selectedEntry={selectedEntry}
        previousEntry={previousEntry}
        style={detailsStyle}
        className='zindex-3' />
    </div>
  )
}
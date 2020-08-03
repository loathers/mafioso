import React, {Fragment} from 'react';
import {observer} from 'mobx-react';

import EntryDisplayContainer from 'components/EntryDisplayContainer';
import HeaderDisplay from 'components/HeaderDisplay';

import combineClassnames from 'utilities/combineClassnames';

/**
 * @returns {React.Component}
 */
export default observer(
function VisualizerSection(props) {
  const {
    className,
    entriesList = [],
    isUsingCompactMode,
  } = props;

  return (
    <div 
      style={{maxWidth: 1000}} 
      className={combineClassnames('width-full flex-col adjacent-mar-t-5', className)}> 
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
              isUsingCompactMode={isUsingCompactMode}
              className='visualizer-cell adjacent-mar-t-2' />
          </Fragment>
        )
      })}
    </div>
  )
})
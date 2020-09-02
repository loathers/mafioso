import React from 'react';
import {observer} from 'mobx-react';

import {DIFFICULTY_FILTERS, PATH_FILTERS} from 'constants/DATABASE_FILTERS';

// import appStore from 'store/appStore';
import databaseStore from 'store/databaseStore';

import Button from 'components/Button';
import SelectOptionsComponent from 'components/SelectOptionsComponent';

import combineClassnames from 'utilities/combineClassnames';

/**
 * @param {Object} props
 * @returns {React.Component}
 */
export default observer(
function LogVisualizerMenu(props) {
  const {
    className,
    style,
  } = props;

  const [selectedDifficulty, updateSelectedDifficulty] = React.useState();

  return (
    <div
      elementname='app-side-menu'
      style={style}
      className={combineClassnames('flex-col', className)}>

      {/* filter by attribute */}
      <div className='flex-col flex-none adjacent-mar-t-5'>
        <SelectOptionsComponent
          label='Filters'
          onChange={(evt) => updateSelectedDifficulty(evt.target.value)}
          selected={selectedDifficulty}
          list={PATH_FILTERS}
          size={10}
          disabled={!databaseStore.isReady}
          id='difficulty-filter-selector'
          className='flex-none adjacent-mar-t-2' />

        <Button
          disabled={!databaseStore.isReady}
          onClick={() => updateSelectedDifficulty('none')}
          className='borradius-1 fontsize-3 pad-3 adjacent-mar-t-2'>
          Clear
        </Button>
      </div>
    </div>
  );
});

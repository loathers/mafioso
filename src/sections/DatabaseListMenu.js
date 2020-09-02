import React, {useState} from 'react';
import {observer} from 'mobx-react';

import {DIFFICULTY_FILTERS, PATH_FILTERS} from 'constants/DATABASE_FILTERS';

// import appStore from 'store/appStore';
import databaseStore from 'store/databaseStore';

import Button from 'components/Button';
import FiltersMenu from 'sections/FiltersMenu';
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

  const [menuOptions, updateMenuOptions] = useState({
    difficulty: 'None',
    path: 'None',
  });

  const updateSelectedDifficulty = (newDifficulty) => {
    updateMenuOptions({...menuOptions, difficulty: newDifficulty});
    databaseStore.applyFilter(menuOptions);
  };

  const updateSelectedPath = (newPath) => {
    updateMenuOptions({...menuOptions, path: newPath});
    databaseStore.applyFilter(menuOptions);
  };

  return (
    <div
      elementname='app-side-menu'
      style={style}
      className={combineClassnames('flex-col', className)}>

      {/* filter by Difficulty */}
      <FiltersMenu
        label='Difficulty'
        disabled={!databaseStore.isReady}
        defaultList={DIFFICULTY_FILTERS}
        onChange={updateSelectedDifficulty}
        inputType='radio'
        className='adjacent-mar-t-5'/>

      {/* filter by Path */}
      <div className='flex-col flex-none adjacent-mar-t-5'>
        <SelectOptionsComponent
          label='Path'
          onChange={(evt) => updateSelectedPath(evt.target.value)}
          selected={menuOptions.path}
          list={PATH_FILTERS}
          size={10}
          disabled={!databaseStore.isReady}
          id='difficulty-filter-selector'
          className='flex-none adjacent-mar-t-2' />

        <Button
          disabled={!databaseStore.isReady}
          onClick={() => updateSelectedPath('None')}
          className='borradius-1 fontsize-3 pad-3 adjacent-mar-t-2'>
          Clear
        </Button>
      </div>
    </div>
  );
});

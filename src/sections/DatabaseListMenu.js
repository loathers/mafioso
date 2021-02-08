import React, {useState} from 'react';
import {observer} from 'mobx-react';

import {DIFFICULTY_FILTERS, PATH_FILTERS} from 'constants/DATABASE_FILTERS';

import databaseStore from 'store/databaseStore';
import sessionStore from 'store/sessionStore';

import Button from 'components/Button';
import FiltersMenu, {FilterInput} from 'sections/FiltersMenu';
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
    difficultyName: databaseStore.filterOptions.difficultyName,
    pathName: databaseStore.filterOptions.pathName,
  });

  // update checked state now that difficulty is cached in localStorage
  const formattedDifficultyList = DIFFICULTY_FILTERS.map((item) => {
    item.checked = item.label === menuOptions.difficultyName;
    return item;
  });

  const onChangeIsShowStandardOnly = (newValue) => {
    sessionStore.set('isShowStandardOnly', newValue);
    databaseStore.filterOptions.isShowStandardOnly.set(newValue);
  }

  const onChangeDifficultyList = (newList) => {
    const selectedOption = newList.find((option) => option.checked);
    const newDifficulty = (selectedOption && selectedOption.label) || 'Any';
    const newOptions = {...menuOptions, difficultyName: newDifficulty};
    sessionStore.set('difficultyNameFilter', newDifficulty);
    updateMenuOptions(newOptions);
    databaseStore.filterList(newOptions);
  }

  const updateSelectedPath = (newPath) => {
    const newOptions = {...menuOptions, pathName: newPath};
    sessionStore.set('pathNameFilter', newPath);
    updateMenuOptions(newOptions);
    databaseStore.filterList(newOptions);
  };

  return (
    <div
      elementname='app-side-menu'
      style={style}
      className={combineClassnames('flex-col', className)}>

      <div className={combineClassnames('flex-col flex-none adjacent-mar-t-5')}>
        <div className='flex-none fontsize-3 adjacent-mar-t-3'>Filters</div>

        <FilterInput
          appDisabled={!databaseStore.isReady}
          onChange={(evt) => onChangeIsShowStandardOnly(evt.target.checked)}
          optionData={{
            label: 'Standard Only',
            checked: databaseStore.filterOptions.isShowStandardOnly.get(),
          }}
          type='checkbox'
          className='adjacent-mar-t-3'/>
      </div>

      {/* filter by Difficulty */}
      <FiltersMenu
        label='Difficulty'
        disabled={!databaseStore.isReady}
        defaultList={formattedDifficultyList}
        onChange={onChangeDifficultyList}
        inputType='radio'
        className='adjacent-mar-t-5'/>

      {/* filter by Path */}
      <div className='flex-col flex-none adjacent-mar-t-5'>
        <SelectOptionsComponent
          label='Path'
          onChange={(evt) => updateSelectedPath(evt.target.value)}
          selected={menuOptions.pathName}
          list={PATH_FILTERS}
          size={10}
          disabled={!databaseStore.isReady}
          id='difficulty-filter-selector'
          className='flex-none adjacent-mar-t-2' />

        <Button
          disabled={!databaseStore.isReady}
          onClick={() => updateSelectedPath('Any')}
          className='borradius-1 fontsize-3 pad-3 adjacent-mar-t-2'>
          Clear
        </Button>
      </div>
    </div>
  );
});

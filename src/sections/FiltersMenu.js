import React from 'react';

import ENTRY_TYPE from 'constants/entryType';

import logStore from 'store/logStore';

import combineClassnames from 'utilities/combineClassnames';

const AVAILABLE_FILTERS = [
  {
    label: 'Combat',
    entryType: ENTRY_TYPE.ENCOUNTER.COMBAT,
  },
  {
    label: 'NonCombat',
    entryType: ENTRY_TYPE.ENCOUNTER.NONCOMBAT,
  },
  {
    label: 'Eat',
    entryType: ENTRY_TYPE.CONSUMPTION.EAT,
  },
  {
    label: 'Drink',
    entryType: ENTRY_TYPE.CONSUMPTION.DRINK,
  },
  {
    label: 'Chew',
    entryType: ENTRY_TYPE.CONSUMPTION.CHEW,
  },
  {
    label: 'Pulls',
    entryType: ENTRY_TYPE.HAGNK_PULL,
  },
  {
    label: 'Equip',
    entryType: ENTRY_TYPE.EQUIP,
  },
  {
    label: 'Unequip',
    entryType: ENTRY_TYPE.UNEQUIP,
  },
];
/**
 * @param {Object} props
 * @returns {React.Component}
 */
export default function FiltersMenu(props) {
  const {
    className,
  } = props;

  const initialFilterList = AVAILABLE_FILTERS.map((filterData) => ({
    ...filterData,
    checked: !logStore.filteredTypes.includes(filterData.entryType)
  }));

  const [filterList, updateList] = React.useState(initialFilterList);

  const toggledChecked = (changedIdx) => {
    const newList = filterList.slice();
    newList[changedIdx].checked = !filterList[changedIdx].checked;
    updateList(newList);
  }

  const onClickApply = () => {
    const filterEntries = filterList.filter((item) => !item.checked).map((item) => item.entryType);
    logStore.applyFilters(filterEntries);
  }

  return (
    <div className={combineClassnames('flex-col flex-none', className)}>
      <div className='flex-none fontsize-1 adjacent-mar-t-3'>Filters</div>  

      <div className='flex-col adjacent-mar-t-3'>
        { filterList.map((filterData, idx) => (
          <FilterCheckbox 
            onChange={() => toggledChecked(idx)}
            checked={filterData.checked}
            filterData={filterData}
            className='adjacent-mar-t-2'
            key={`filter-checkbox-${idx}-key`}
          />
        ))}
      </div>

      <button
        onClick={onClickApply}
        disabled={!logStore.isReady} 
        className='fontsize-3 borradius-1 bg-second pad-3 adjacent-mar-t-3'>
        Apply
      </button>
    </div>
  )
}
function FilterCheckbox(props) {
  const {
    className,
    filterData,
    onChange,
    checked = false,
  } = props;

  return (
    <div className={combineClassnames('fontsize-4 flex-none', className)}>
      <label className='flex-row'>
        <input
          checked={checked}
          onChange={onChange}
          className='adjacent-mar-l-2' 
          type='checkbox' />

        <div 
          className='adjacent-mar-l-2'>
          {filterData.label}
        </div>
      </label>
    </div>
  )
}
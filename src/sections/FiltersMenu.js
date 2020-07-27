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

  const [filtersList, updateList] = React.useState([]);

  const removeFilter = (filterData) => {
    const filterIdx = filtersList.findIndex((filter) => filter.entryType === filterData.entryType);
    if (filterIdx > -1) {
      filtersList.splice(filtersList[filterIdx], 1);
      updateList(filtersList);
    }
  }

  const addFilter = (filterData) => {
    filtersList.push(filterData);
    updateList(filtersList);
  }

  return (
    <div className={combineClassnames('flex-col flex-none', className)}>
      <div className='flex-none fontsize-1 adjacent-mar-t-3'>Filters</div>  

      <div className='flex-col adjacent-mar-t-3'>
        { AVAILABLE_FILTERS.map((filterData, idx) => (
          <FilterCheckbox 
            onChange={(evt) => {
              if (evt.target.checked) {
                addFilter(filterData);
              } else {
                removeFilter(filterData);
              }
            }}
            className='adjacent-mar-t-2'
            label={filterData.label}
            key={`filter-checkbox-${idx}-key`}
          />
        ))}
      </div>

      <button
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
    label,
    onChange,
  } = props;

  return (
    <div className={combineClassnames('fontsize-4 flex-none', className)}>
      <label className='flex-row'>
        <input
          onChange={onChange}
          className='adjacent-mar-l-2' 
          type='checkbox' />

        <div 
          className='adjacent-mar-l-2'>
          {label}
        </div>
      </label>
    </div>
  )
}
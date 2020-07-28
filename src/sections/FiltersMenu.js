import React from 'react';

import logStore from 'store/logStore';

import combineClassnames from 'utilities/combineClassnames';

/**
 * @param {Object} props
 * @returns {React.Component}
 */
export default function FiltersMenu(props) {
  const {
    label,
    defaultList,
    onApply,
    className,
  } = props;

  const [filterList, updateList] = React.useState(defaultList);

  const toggledChecked = (changedIdx) => {
    const newList = filterList.slice();
    newList[changedIdx].checked = !filterList[changedIdx].checked;
    updateList(newList);
  }

  const onClickApply = () => {
    onApply(filterList);
  }

  const onClickSelectAll = () => {
    const newList = filterList.map((item) => ({...item, checked: true}));
    updateList(newList);
  }

  const onClickSelectNone = () => {
    const newList = filterList.map((item) => ({...item, checked: false}));
    updateList(newList);
  }

  return (
    <div className={combineClassnames('flex-col flex-none', className)}>
      <div className='flex-none fontsize-3 adjacent-mar-t-3'>{label}</div>  

      <div className='flex-col adjacent-mar-t-3'>
        { filterList.map((filterOption, idx) => (
          <FilterCheckbox 
            onChange={() => toggledChecked(idx)}
            optionData={filterOption}
            className='adjacent-mar-t-2'
            key={`filter-checkbox-${idx}-key`}
          />
        ))}
      </div>

      <div className='flex-row fontsize-1 flex-none adjacent-mar-t-3'>
        <button 
          onClick={onClickSelectAll} 
          className='pad-h-1 cursor-pointer flex-none adjacent-mar-l-2'>
          All
        </button>  
        <div className='flex-none adjacent-mar-l-2'>/</div>  
        <button 
          onClick={onClickSelectNone} 
          className='pad-h-1 cursor-pointer flex-none adjacent-mar-l-2'>
          None
        </button>  
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
    optionData,
    onChange,
  } = props;

  const {
    label,
    checked,
    isHidden,
  } = optionData;

  const hiddenClassName = isHidden ? 'display-none' : '';

  return (
    <div className={combineClassnames('fontsize-4 flex-none', hiddenClassName, className)}>
      <label className='flex-row'>
        <input
          checked={checked}
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
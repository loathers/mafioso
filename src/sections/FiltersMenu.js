import React from 'react';

// import Button from 'components/Button';

import combineClassnames from 'utilities/combineClassnames';

/**
 * @param {Object} props
 * @returns {React.Component}
 */
export default function FiltersMenu(props) {
  const {
    label,
    inputType = 'checkbox',
    defaultList,
    className,
    onChange = () => {},
  } = props;

  const [filterList, updateList] = React.useState(defaultList);

  const toggledChecked = (changedIdx) => {
    const newList = filterList.slice().map((item, idx) => {
      if (inputType === 'radio') {
        item.checked = false;  
      }

      if (idx === changedIdx) {
        item.checked = !item.checked;
      }

      return item;
    });

    updateList(newList);
    onChange(newList);
  }

  const onClickSelectAll = () => {
    const newList = filterList.map((item) => ({...item, checked: !item.isHidden ? true : item.checked}));
    updateList(newList);
    onChange(newList);
  }

  const onClickSelectNone = () => {
    const newList = filterList.map((item) => ({...item, checked: !item.isHidden ? false : item.checked}));
    updateList(newList);
    onChange(newList);
  }

  return (
    <div className={combineClassnames('flex-col flex-none', className)}>
      <div className='flex-none fontsize-3 adjacent-mar-t-3'>{label}</div>  

      <div className='flex-col adjacent-mar-t-3'>
        { filterList.map((filterOption, idx) => (
          <FilterInput 
            onChange={() => toggledChecked(idx)}
            optionData={filterOption}
            type={inputType}
            className='adjacent-mar-t-2'
            key={`filter-checkbox-${idx}-key`}
          />
        ))}
      </div>

      <div className='flex-row fontsize-1 flex-none adjacent-mar-t-3'>
        { inputType !== 'radio' &&
          <React.Fragment>
          <button 
            onClick={onClickSelectAll} 
            className='cursor-pointer pad-h-1 flex-none adjacent-mar-l-2'>
            All
          </button>  
          <div className='flex-none adjacent-mar-l-2'>/</div>  
          </React.Fragment>
        }
        <button 
          onClick={onClickSelectNone} 
          className='cursor-pointer pad-h-1 flex-none adjacent-mar-l-2'>
          None
        </button>  
      </div>
    </div>
  )
}
function FilterInput(props) {
  const {
    className,
    optionData,
    onChange,
    type,
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
          type={type} />

        <div 
          className='adjacent-mar-l-2'>
          {label}
        </div>
      </label>
    </div>
  )
}
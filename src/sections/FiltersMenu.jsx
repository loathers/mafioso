import React from 'react';
import {observer} from 'mobx-react';

import appStore from '../store/appStore';

import combineClassnames from '../utilities/combineClassnames';

/**
 * @param {Object} props
 * @returns {React.Component}
 */
export default observer(
function FiltersMenu(props) {
  const {
    label,
    inputType = 'checkbox',
    defaultList,
    disabled,
    onChange = () => {},
    className,
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

  const forceEnabled = appStore.isDevMode.get();

  const onClickSelectAll = () => {
    const newList = filterList.map((item) => ({...item, checked: (!item.isHidden && !item.isDisabled) ? true : item.checked}));
    updateList(newList);
    onChange(newList);
  }

  const onClickSelectNone = () => {
    const newList = filterList.map((item) => ({...item, checked: (!item.isHidden && !item.isDisabled) ? false : item.checked}));
    updateList(newList);
    onChange(newList);
  }

  return (
    <div className={combineClassnames('flex-col flex-none', className)}>
      <div className='flex-none fontsize-3 adjacent-mar-t-3'>{label}</div>

      <div className='flex-col adjacent-mar-t-3'>
        { filterList.map((filterOption, idx) => (
          <FilterInput
            appDisabled={disabled}
            forceEnabled={forceEnabled}
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

            <button
              onClick={onClickSelectNone}
              className='cursor-pointer pad-h-1 flex-none adjacent-mar-l-2'>
              None
            </button>
          </React.Fragment>
        }

      </div>
    </div>
  )
})

export function FilterInput(props) {
  const {
    className,
    optionData,
    onChange,
    type,
    appDisabled,
    forceEnabled,
  } = props;

  const {
    label,
    checked,
    isDisabled,
    isHidden,
    title,
  } = optionData;

  const hiddenClassName = (!forceEnabled && isHidden)  ? 'display-none' : '';

  return (
    <div className={combineClassnames('fontsize-4 flex-none', hiddenClassName, className)}>
      <label className='flex-row'>
        <input
          checked={checked}
          disabled={!forceEnabled && (appDisabled || isDisabled)}
          onChange={onChange}
          title={title}
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

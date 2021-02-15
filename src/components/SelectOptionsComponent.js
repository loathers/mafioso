import React from 'react';

import combineClassnames from 'utilities/combineClassnames';

/** @returns {React.Component} */
export default function SelectOptionsComponent(props) {
  const {
    className,
    id,
    label,
    selected,
    onChange,
    disabled,
    list,
    size = 10,
  } = props;

  return (
    <label
      htmlFor={id}
      className={combineClassnames('', className)}>
      <div className='fontsize-3 adjacent-mar-t-2'>{label}</div>
      <select
        disabled={disabled}
        onChange={onChange}
        size={size}
        value={selected}
        className='color-white bg-second borradius-1 fontsize-3 width-full adjacent-mar-t-2'
        id={id}>
        { list.map((filterData, idx) => {
          if (filterData.optionGroup) {
            return (
              <optgroup
                className='pad-v-1 pad-h-3 mar-v-1'
                key={`optiongroup-${idx}-key`}
                label={filterData.label}>
                { filterData.optionGroup.map((suboption, subidx) => (
                  <option
                    className='fontsize-2 pad-v-1 adjacent-mar-t-1'
                    key={`option-${idx}-${subidx}-key`}
                    hidden={suboption.isHidden}
                    title={suboption.title}
                    value={suboption.attributeName}>
                    {suboption.label}
                  </option>
                ))}
              </optgroup>
            )
          }

          return (
            <option
              className='fontsize-2 pad-v-1 pad-h-3 adjacent-mar-t-1'
              key={`option-${idx}-key`}
              title={filterData.title}
              hidden={filterData.isHidden}
              value={filterData.attributeName}>
              {filterData.label}
            </option>
          )
        })}
      </select>
    </label>
  )
}

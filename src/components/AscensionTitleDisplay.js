import React from 'react';

import combineClassnames from 'utilities/combineClassnames';

/**  @returns {React.Component} */
export default function AscensionTitleDisplay(props) {
  const {
    className,
    difficultyName,
    pathName,
  } = props;

  return (
    <div className={combineClassnames('flex-col-center', className)}>
      <div className='flex-none'>{difficultyName}</div>
      <div className='flex-none'>{pathName}</div>
    </div>
  )
}
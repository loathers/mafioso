import React from 'react';

import combineClassnames from 'utilities/combineClassnames';

/**  @returns {React.Component} */
export default function HeaderDisplay(props) {
  const {
    className,
    difficultyName,
    pathName,
  } = props;

  return (
    <div className={combineClassnames('fontfamily-secondary flex-col-center', className)}>
      <div style={{fontSize: 17}} className='f-italic flex-none'>{difficultyName}</div>
      <div style={{fontSize: 25}} className='f-bold f-italic flex-none'>{pathName}</div>
    </div>
  )
}
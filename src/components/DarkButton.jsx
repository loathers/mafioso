import React from 'react';

import combineClassnames from '../utilities/combineClassnames';

/** @returns {ReactComponent} */
export default function DarkButton(props) {
  const {
    children,
    className,
    ...otherProps
  } = props;

  return (
    <button
      {...otherProps}
      elementname='dark-button'
      className={combineClassnames('talign-center borradius-2 pad-3', className)}>
      {children}
    </button>
  )
}
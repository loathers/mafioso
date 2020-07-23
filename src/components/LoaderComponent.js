import React from 'react';

import combineClassnames from 'utilities/combineClassnames';

import 'styles/spinner.css';

/**
 * https://github.com/icarus-sullivan/react-spinner-material/blob/master/src/index.tsx
 *
 * @param {Object} props
 * @returns {React.Component}
 */
export default function LoaderComponent(props) {
  const {
    className,
    spinnerColor = 'white',
    spinnerWidth = 6,
    size = 50,
    ...otherProps
  } = props;

  return (
    <div
      {...otherProps}
      className={combineClassnames('spinner', className)}
      style={{
        width: size,
        height: size,
        borderColor: spinnerColor,
        borderWidth: spinnerWidth
      }}
    />
  )
}
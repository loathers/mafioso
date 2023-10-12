import React from 'react';

import combineClassnames from '../utilities/combineClassnames';

import '../styles/spinner.css';

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
    size = 50
  } = props;

  return (
    <div 
      className={combineClassnames('zindex-8', className)}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      }}>
      <div
        className='zindex-9 spinner'
        style={{
          position: 'fixed',
          top: '30%',
          left: '50%',
          marginLeft: (size/2)*-1,
          width: size,
          height: size,
          borderColor: spinnerColor,
          borderWidth: spinnerWidth,
        }}
      />
    </div>
  )
}
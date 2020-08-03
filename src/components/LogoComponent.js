import React from 'react';

import combineClassnames from 'utilities/combineClassnames';

/**  @returns {React.Component} */
export default function LogoComponent(props) {
  const {
    className,
  } = props;

  const textStyle = {
    letterSpacing: 1,
  };

  return (
    <h1
      style={{fontSize: 30}} 
      className={combineClassnames('color-white fontfamily-tertiary flex-col flex-none', className)}>
      <div style={textStyle} className='flex-none'>kol</div>
      <div style={textStyle} className='flex-none'>mafioso</div>
    </h1>
  )
}
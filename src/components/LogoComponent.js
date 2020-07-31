import React from 'react';

import combineClassnames from 'utilities/combineClassnames';

/**  @returns {React.Component} */
export default function LogoComponent(props) {
  const {
    className,
  } = props;

  const textStyle = {
    letterSpacing: 5,
  };

  return (
    <h1
      style={{fontSize: 30}} 
      className={combineClassnames('color-white fontfamily-logo flex-col flex-none', className)}>
      <div style={textStyle} className='flex-none'>KOL</div>
      <div style={textStyle} className='flex-none'>LOG</div>
      <div style={textStyle} className='flex-none'>VIS</div>
    </h1>
  )
}
import React from 'react';

import combineClassnames from 'utilities/combineClassnames';

/** @returns {React.Component} */
export default function Toaster(props) {
  const {
    active,
    children,
    className,
    title = 'Title',
    ...otherProps
  } = props;

  const [visible, toggleVisible] = React.useState(active);
  React.useEffect(() => {
    if (active && !visible) {
      toggleVisible(true);
      setTimeout(() => {
        toggleVisible(false);
      }, 300);
    }
  }, [visible, active]);

  return (
    <div
      {...otherProps}
      elementname='app-toaster'
      className={combineClassnames('bg-fifth pad-4 flex-col', visible && 'active' ,className)}
    >
      { title &&
        <div className='flex-none fsize-5 f-bold adjacent-mar-t-2'>{title}</div>
      }

      { children &&
        <div className='flex-auto adjacent-mar-t-2'>{children}</div>
      }
    </div>
  )
}

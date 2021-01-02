import React from 'react';

import Button from 'components/DarkButton';

import appStore from 'store/appStore';

// import combineClassnames from 'utilities/combineClassnames';

/** @returns {React.Component} */
export default function ShareConfirmationPopup(props) {
  const {
    onClickDone = () => {},
  } = props;

  function onClickStandardYes() {
    appStore.onShareLog();
    onClickDone();
  }

  return (
    <div className='flex-col'>
      <div className='adjacent-mar-t-3'>Is this a Standard run?</div>

      <div className='flex-row-center adjacent-mar-t-3'>
        <Button
          onClick={onClickStandardYes}
          className='pad-2 adjacent-mar-l-2'>
          Yes
        </Button>

        <Button
          onClick={onClickDone}
          className='pad-2 adjacent-mar-l-2'>
          No
        </Button>
      </div>
    </div>
  )
}

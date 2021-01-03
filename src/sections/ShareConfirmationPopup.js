import React from 'react';

import { YearPicker, MonthPicker } from 'react-dropdown-date';

import Button from 'components/Button';

import appStore from 'store/appStore';
import logStore from 'store/logStore';

// import combineClassnames from 'utilities/combineClassnames';

/** @returns {React.Component} */
export default function ShareConfirmationPopup(props) {
  const {
    onClickDone = () => {},
  } = props;

  const [selectedDate, updateSelectedDate] = React.useState({
    month: logStore.seasonMonth || new Date().getMonth(),
    year: logStore.seasonYear || new Date().getFullYear(),
  });

  function modifySelectedDate(changes) {
    updateSelectedDate({
      ...selectedDate,
      ...changes,
    })
  }

  function onClickStandardConfirm() {
    logStore.updateStandardSeason(`${selectedDate.month}-${selectedDate.year}`);
    appStore.onShareLog();
    onClickDone();
  }

  function onClickUnrestricted() {
    logStore.updateStandardSeason('Unrestricted');
    appStore.onShareLog();
    onClickDone();
  }

  return (
    <div className='flex-col'>
      <div className='adjacent-mar-t-3'>If this is a Standard run, please select the starting date.</div>

      <div className='color-white flex-row adjacent-mar-t-3'>
        <MonthPicker
          value={selectedDate.month}
          onChange={(newMonth) => modifySelectedDate({month: newMonth})}
          classes='bor-1-second-lighter fontsize-7 pad-h-2 pad-v-1 adjacent-mar-l-3' />

        <YearPicker
          value={selectedDate.year}
          onChange={(newYear) => modifySelectedDate({year: newYear})}
          start={2011}
          classes='bor-1-second-lighter fontsize-7 pad-h-2 pad-v-1 adjacent-mar-l-3' />
      </div>

      <div className='flex-row-center mar-t-9'>
        <Button
          onClick={onClickStandardConfirm}
          className='pad-4 adjacent-mar-l-2'>
          Confirm
        </Button>

        <Button
          onClick={onClickUnrestricted}
          className='pad-4 adjacent-mar-l-2'>
          Unrestricted
        </Button>

        <Button
          onClick={onClickDone}
          className='pad-4 adjacent-mar-l-2'>
          Cancel
        </Button>
      </div>
    </div>
  )
}

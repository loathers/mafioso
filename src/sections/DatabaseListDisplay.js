import React from 'react';
import {observer} from 'mobx-react';

import combineClassnames from 'utilities/combineClassnames';

export default observer(
function DatabaseListDisplay(props) {
  const {
    className,
    list,
    onClickView,
  } = props;

  return (
    <div
      elementname='app-section-database-list'
      className={combineClassnames('fontsize-4 flex-col', className)}>

      { list.map((rowData, idx) => (
        <DatabaseRow
          onClickView={onClickView}
          key={`database-list-row-${idx}-key`}
          data={rowData} />
      ))}

      { list.length <= 0 &&
        <div className='flex-row-center fontsize-6 color-white flex-auto adjacent-mar-t-5'>
          Database unavailable
        </div>
      }

    </div>
  )
})
/** @returns {ReactComponent} */
function DatabaseRow(props) {
  const {
    data,
    onClickView,
  } = props;

  return (
    <div className='bor-1-second-darker borradius-2 bg-second pad-1 flex-row adjacent-mar-t-1'>
      <button
        onClick={() => onClickView(data)}
        className='pad-2 pad-h-4 borradius-2 bg-second hover:bg-second-lighter adjacent-mar-l-4'>
        View
      </button>
      <RowDisplay
        data={data}
        className='adjacent-mar-l-4'/>
    </div>
  )
}
/** @returns {ReactComponent} */
function RowDisplay(props) {
  const {
    className,
    data: {
      charName,
      pathName,
      difficultyName,
      dayCount,
      turnCount,
    },
  } = props;

  return (
    <div className={combineClassnames('bor-1-second-darker borradius-2 bg-second hover:bg-second-lighter pad-2 flex-row adjacent-mar-t-1', className)}>
      <span className='f-bold adjacent-mar-l-2'>{charName}</span>
      <span className='adjacent-mar-l-2'>in</span>
      <span className='f-bold adjacent-mar-l-2'>{`${difficultyName} ${pathName}`}</span>
      <div className='flex-none adjacent-mar-l-2'>{`(${dayCount} days / ${turnCount} turns)`}</div>
    </div>
  )
}

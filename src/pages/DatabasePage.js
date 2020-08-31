import React from 'react';
import {observer} from 'mobx-react';

import appStore from 'store/appStore';
import databaseStore from 'store/databaseStore';

import combineClassnames from 'utilities/combineClassnames';

export default observer(
function DatabasePage(props) {

  React.useEffect(() => {
    // no need to fetch if we have the data already or if app is not ready
    if (databaseStore.isReady || appStore.isLoading) return;

    databaseStore.fetch();
  })

  const databaseList = databaseStore.databaseList;

  return (
    <div
      elementname='app-page-database'
      className='fontsize-4 flex-col'>

      {databaseList.map((rowData, idx) => (
        <DatabaseRow
          key={`database-list-row-${idx}-key`}
          data={rowData} />
      ))}

      {databaseList.length <= 0 &&
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
  } = props;

  return (
    <div className='bor-1-second-darker borradius-2 bg-second pad-1 flex-row adjacent-mar-t-1'>
      <button className='pad-2 pad-h-4 borradius-2 bg-second hover:bg-second-lighter adjacent-mar-l-4'>View</button>
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

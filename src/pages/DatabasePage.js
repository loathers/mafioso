import React from 'react';
import {observer} from 'mobx-react';

import appStore from 'store/appStore';
import databaseStore from 'store/databaseStore';

export default observer(
function DatabasePage(props) {

  React.useEffect(() => {
    // no need to fetch if we have the data already or if app is not ready
    if (databaseStore.isReady || appStore.isLoading) return;

    databaseStore.fetch();
  })

  console.log('databaseStore.databaseList', databaseStore.databaseList);

  return (
    <div
      elementname='app-page-database'
      className='fontsize-4 flex-col'>

      {databaseStore.databaseList.map((rowData, idx) => (
        <DatabaseRow
          key={`database-list-row-${idx}-key`}
          data={rowData} />
      ))}

    </div>
  )
})

function DatabaseRow(props) {
  const {
    data: {
      charName,
      pathName,
      difficultyName,
      dayCount,
      turnCount,
    },
  } = props;

  return (
    <div className='bor-1-second-darker borradius-2 bg-second hover:bg-second-lighter pad-2 flex-row adjacent-mar-t-1'>
      <span className='f-bold adjacent-mar-l-2'>{charName}</span>
      <span className='adjacent-mar-l-2'>in</span>
      <span className='f-bold adjacent-mar-l-2'>{`${difficultyName} ${pathName}`}</span>
      <div className='flex-none adjacent-mar-l-2'>{`(${dayCount} days / ${turnCount} turns)`}</div>
    </div>
  )
}

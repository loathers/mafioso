import React from 'react';
import {Redirect} from "react-router-dom";
import {observer} from 'mobx-react';

import {HOME_URL} from 'constants/PAGE_URLS';

import appStore from 'store/appStore';
// import logStore from 'store/logStore';
import * as logStoreHelper from 'helpers/logStoreHelper';

// import ChartContainer from 'components/ChartContainer';
// import Button from 'components/Button';
import EntryHeaderDisplay from 'components/EntryHeaderDisplay';

import combineClassnames from 'utilities/combineClassnames';

/**
 * @param {Object} props
 * @returns {React.Component}
 */
export default observer(
function StatsPage(props) {
  const {
    className,
  } = props;

  if (!appStore.isReady) {
    return <Redirect to={HOME_URL}/>
  }

  const statsData = logStoreHelper.createStats();
  return (
    <div
      elementname='app-page-charts'
      className={combineClassnames('flex-col', className)}>
      Stats Page

      { statsData.map((data) => (
        <StatDayBlock
          data={data}
          key={`stat-day-block-${data.dayNum}-key`}
          className='adjacent-mar-t-2' />
      ))
      }
    </div>
  )
})
/** @returns {React.Component} */
function StatDayBlock(props) {
  const {
    className,
    data,
  } = props;

  const {
    dayNum,
  } = data;

  // console.log('StatDayBlock', data);

  return (
    <div
      className={combineClassnames('flex-col', className)}>
      <EntryHeaderDisplay
        topContent={`Day ${dayNum}`}
        className='pad-3 adjacent-mar-t-1' />

      <StatRow label='Voter Monster' content={data.voterMonster} />
      <StatRow label='Painting Monster' content={data.paintingMonster} />
      <StatRow label='Cargo Pocket' content={data.cargoPocket} />
      <StatRow label='Lathe Item' content={data.latheChoice} />
      <StatRow label='Map the Monsters' content={data.mapTheMonsterList} />
    </div>
  )
}
/** @returns {React.Component} */
function StatRow(props) {
  const {
    className,
    label,
    content,
  } = props;

  if (content === undefined || content === null) {
    return null;
  }

  return (
    <div className={combineClassnames('flex-row', className)}>
      <span className='adjacent-mar-l-3'>{`${label}:`}</span>
      <span className='f-bold adjacent-mar-l-3'>{content}</span>
    </div>
  );
}

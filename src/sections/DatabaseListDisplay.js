import React from 'react';
import {observer} from 'mobx-react';

import {ReactComponent as OpenSVG} from 'images/scroll-unfurled.svg';

import Button from 'components/Button';

import combineClassnames from 'utilities/combineClassnames';

export default observer(
function DatabaseListDisplay(props) {
  const {
    list,
    hasEditOptions,
    onClickView,
    className,
  } = props;

  return (
    <div
      elementname='app-section-database-list'
      className={combineClassnames('fontsize-4 flex-col', className)}>

      { list.map((rowData, idx) => (
        <DatabaseRow
          hasEditOptions={hasEditOptions}
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
    hasEditOptions,
  } = props;

  return (
    <div className='bor-1-second-darker borradius-2 bg-second pad-1 pad-h-4 flex-row aitems-center jcontent-start adjacent-mar-t-1'>
      <OpenSVG
        className='flex-none adjacent-mar-l-4'
        style={{width: 15, height: 15, opacity: 0.7}} />

      <RowButton
        onClick={() => onClickView(data)}
        className='color-gray fontsize-3 pad-v-3 pad-h-4 flex-row-center adjacent-mar-l-4'>
        <span className='adjacent-mar-l-2'>View</span>
      </RowButton>

      <RowDisplay
        data={data}
        className='adjacent-mar-l-4'/>

      { hasEditOptions &&
        <div className='flex-row'>
        </div>
      }
    </div>
  )
}
/** @returns {ReactComponent} */
function RowButton(props) {
  const {
    className,
    ...otherProps
  } = props;

  return (
    <Button
      {...otherProps}
      className={combineClassnames('pad-2 pad-h-4', className)} />
  )
}
/** @returns {ReactComponent} */
function RowDisplay(props) {
  const {
    className,
    data: {
      characterName,
      pathName,
      difficultyName,
      dayCount,
      turnCount,
    },
  } = props;

  return (
    <div className={combineClassnames('borradius-2 bg-second hover:bg-second-lighter pad-2 flex-row flex-auto adjacent-mar-t-1', className)}>
      <span className='f-bold adjacent-mar-l-2'>{characterName}</span>
      <span className='adjacent-mar-l-2'>in</span>
      <span className='f-bold adjacent-mar-l-2'>{`${difficultyName} ${pathName}`}</span>

      <span className='color-gray flex-auto talign-right adjacent-mar-l-2'>{`(${dayCount} days / ${turnCount} turns)`}</span>
    </div>
  )
}

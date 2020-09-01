import React from 'react';
import {observer} from 'mobx-react';

import DATABASE_ENTRY_STATUS from 'constants/DATABASE_ENTRY_STATUSES';

import {ReactComponent as OpenSVG} from 'images/archive.svg';
import {ReactComponent as ActiveSVG} from 'images/eye.svg';
import {ReactComponent as InactiveSVG} from 'images/eye-off.svg';

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

  const isActive = data.status === DATABASE_ENTRY_STATUS.ACTIVE;

  return (
    <div className='borradius-2 flex-row aitems-center jcontent-start adjacent-mar-t-1'>
      <RowDisplay
        onClick={() => onClickView(data)}
        data={data}
        className='bg-second pad-3 adjacent-mar-l-4'/>

      { hasEditOptions &&
        <div className='flex-row adjacent-mar-l-4'>
          <RowButton
            onClick={() => {}}
            className='color-gray fontsize-3 pad-v-3 pad-h-4 flex-row-center adjacent-mar-l-4'>
            { isActive &&
              <ActiveSVG
                className='flex-none adjacent-mar-l-4'
                style={{width: 14, height: 14}} />
            }

            { !isActive &&
              <InactiveSVG
                className='flex-none adjacent-mar-l-4'
                style={{width: 14, height: 14}} />
            }
          </RowButton>
        </div>
      }
    </div>
  )
}
/** @returns {ReactComponent} */
function RowButton(props) {
  const {
    className,
    disabled,
    ...otherProps
  } = props;

  const borderClassName = disabled ? 'bor-2-second-darkest' : 'bor-2-second-darker';
  const colorClassName = disabled ? 'color-grayer' : 'color-white';
  const pointerClassName = disabled ? '' : 'cursor-pointer';

  return (
    <button
      {...otherProps}
      disabled={disabled}
      className={combineClassnames('borradius-2 bg-second hover:bg-second-lighter', borderClassName, colorClassName, pointerClassName, className)} />
  )
}
/** @returns {ReactComponent} */
function RowDisplay(props) {
  const {
    onClick,
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
    <RowButton
      onClick={onClick}
      className={combineClassnames('borradius-2 bg-second hover:bg-second-lighter pad-2 flex-row flex-auto adjacent-mar-t-1', className)}>
      <OpenSVG
        className='flex-none mar-r-3 adjacent-mar-l-2'
        style={{width: 14, height: 14, opacity: 0.7}} />

      <span className='f-bold adjacent-mar-l-2'>{characterName}</span>
      <span className='adjacent-mar-l-2'>in</span>
      <span className='f-bold adjacent-mar-l-2'>{`${difficultyName} ${pathName}`}</span>

      <span className='color-gray flex-auto talign-right adjacent-mar-l-2'>{`(${dayCount} days / ${turnCount} turns)`}</span>
    </RowButton>
  )
}

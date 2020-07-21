import React from 'react';

import { ReactComponent as UncertaintySVG } from 'images/uncertainty.svg';

/**
 * @returns {React.Component}
 */
export default function EntryDisplayContainer(props) {
  const {
    className,
    IconComponent = UncertaintySVG,
    logEntry,
  } = props;

  const {data} = logEntry;
  const {
    adventureNum,
    isFreeAdv,
  } = data;

  return (
    <div className={'flex-row aitems-start adjacent-mar-t-2 bg-second pad-2 borradius-2 ' + className}>
      <div
        className='flex-col flex-none adjacent-mar-l-2'>      
        {/* entry adventure num */}
        <div 
          className='talign-right color-gray fontsize-1 aself-start adjacent-mar-t-3'
          style={{width: 30}}>
          {adventureNum === -1 ? '' : adventureNum}
        </div>

        { isFreeAdv &&
          <div className='talign-right color-gray fontsize-1 adjacent-mar-t-3'>
            free
          </div>
        }
      </div>

      {/* entry icon */}
      <IconComponent 
        className='flex-none adjacent-mar-l-2'
        style={{
          width: 25,
          height: 25,
        }} />

      <div className='flex-auto adjacent-mar-l-2 whitespace-pre-wrap'>{props.children}</div>
    </div>
  )
}
import React from 'react';

/**
 * @returns {React.Component}
 */
export default function EntryDisplayContainer(props) {
  const {
    className,
    logEntry
  } = props;

  const adventureNum = logEntry.data.adventureNum;

  return (
    <div className={'flex-row aitems-start adjacent-mar-t-2 bg-second pad-2 borradius-2 ' + className}>
      <div 
        className='color-gray fontsize-1 aself-start flex-none adjacent-mar-l-2'
        style={{width: 30}}>
        {adventureNum === -1 ? '' : adventureNum}
      </div>

      {props.children}
    </div>
  )
}
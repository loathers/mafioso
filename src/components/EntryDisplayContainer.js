import React from 'react';

/**
 * @returns {React.Component}
 */
export default function EntryDisplayContainer(props) {
  const {
    className,
    IconComponent,
    logEntry
  } = props;

  const adventureNum = logEntry.data.adventureNum;

  return (
    <div className={'flex-row aitems-start adjacent-mar-t-2 bg-second pad-2 borradius-2 ' + className}>
      {/* entry adventure num */}
      <div 
        className='color-gray fontsize-1 aself-start flex-none adjacent-mar-l-2'
        style={{width: 30}}>
        {adventureNum === -1 ? '' : adventureNum}
      </div>

      {/* entry icon */}
      { IconComponent &&
        <IconComponent 
          className='flex-none adjacent-mar-l-2'
          style={{
            width: 25,
            height: 25,
          }} />
      }

      <div className='flex-auto adjacent-mar-l-2'>{props.children}</div>
    </div>
  )
}
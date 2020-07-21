import React from 'react';

/**
 * @returns {React.Component}
 */
export default function EntryDisplayContainer(props) {
  const {
    className,
    logEntry
  } = props;

  const {
    entryIdx,
  } = logEntry;

  return (
    <div className={'flex-row adjacent-mar-t-2 bg-second pad-2 borradius-2 ' + className}>
      <div 
        className='color-gray fontsize-1 aself-start flex-none adjacent-mar-l-2'
        style={{width: 30}}>
        {entryIdx}
      </div>

      {props.children}
    </div>
  )
}
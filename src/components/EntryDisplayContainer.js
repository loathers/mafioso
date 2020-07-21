import React from 'react';

/**
 * @returns {React.Component}
 */
export default function EntryDisplayContainer(props) {
  const {className} = props;

  return (
    <div className={'adjacent-mar-t-2 bg-second pad-2 borradius-2 ' + className}>
      {props.children}
    </div>
  )
}
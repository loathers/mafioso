import React from 'react';

/**
 * @returns {React.Component}
 */
export default function EntryDisplayContainer(props) {
  const {className} = props;

  return (
    <div className={className}>
      {props.children}
    </div>
  )
}
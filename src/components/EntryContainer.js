import React from 'react';

/**
 * @returns {React.Component}
 */
export default function EntryContainer(props) {
  const {className} = props;

  return (
    <div className={className}>
      {props.children}
    </div>
  )
}
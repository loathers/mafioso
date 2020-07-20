import React from 'react';

/**
 * @returns {React.Component}
 */
function VisRow() {
  return (
    <div className='fontsize-2 flex-row adjacent-mar-t-2'>
      <div>vis row</div>
    </div>
  )
}
/**
 * @returns {React.Component}
 */
export default function VisualizerSection(props) {
  const {logData = []} = props;

  return (
    <div className='flex-col adjacent-mar-t-4'>
      <div className='fontsize-1 adjacent-mar-t-2'>Visualizer Table</div>
      
      <div className='flex-col adjacent-mar-t-2'>
        { logData.map((logLine, idx) => (
          <VisRow 
            rowData={logLine}
            key={`visrow-${idx}`}/>
        ))}
      </div>
    </div>
  )
}
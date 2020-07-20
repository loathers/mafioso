import React from 'react';

/**
 * @returns {React.Component}
 */
function NumberVisCell(props) {
  return (
    <div 
      style={{width: 40}}
      className='visualizer-cell'>
      {props.children}
    </div>
  )
}
/**
 * @returns {React.Component}
 */
function StringVisCell(props) {
  return (
    <div 
      style={{width: 120}}
      className='visualizer-cell strinv-vis-cell'>
      {props.children}
    </div>
  )
}
/**
 * @returns {React.Component}
 */
function VisualizerLine({lineData = {}}) {
  if (lineData.data === undefined) {
    return <div className='color-kolred'>Missing Line Data</div>;
  }

  const {
    actionId,
    day,
    turn,
    location,
    encounter,
    familiar,
    special,
    items,
    effects,
    mus,
    myst,
    mox,
    meat,
  } = lineData.data;

  return (
    <div className='fontsize-2 flex-row adjacent-mar-t-2'>
      {/* actionId */}
      <NumberVisCell>{actionId}</NumberVisCell>
      {/* day */}
      <NumberVisCell>{day}</NumberVisCell>
      {/* turn */}
      <NumberVisCell>{turn}</NumberVisCell>
      {/* location */}
      <StringVisCell>{location}</StringVisCell>
      {/* encounter */}
      <StringVisCell>{encounter}</StringVisCell>
      {/* familiar */}
      <StringVisCell>{familiar}</StringVisCell>
      {/* special */}
      <StringVisCell>{special}</StringVisCell>
      {/* items */}
      <StringVisCell>{items}</StringVisCell>
      {/* effects */}
      <StringVisCell>{effects}</StringVisCell>
      {/* mus */}
      <NumberVisCell>{mus}</NumberVisCell>
      {/* myst */}
      <NumberVisCell>{myst}</NumberVisCell>
      {/* mox */}
      <NumberVisCell>{mox}</NumberVisCell>
      {/* meat */}
      <NumberVisCell>{meat}</NumberVisCell>
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
      
      <div className='overflow-auto flex-col adjacent-mar-t-2'>
        { logData.map((logLine, idx) => (
          <VisualizerLine 
            lineData={logLine}
            key={`VisualizerLine-${idx}-key`}/>
        ))}
      </div>
    </div>
  )
}
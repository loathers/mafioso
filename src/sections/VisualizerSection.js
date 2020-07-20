import React from 'react';
import {observer} from 'mobx-react';

import AscensionInfoEntryComponent from 'components/AscensionInfoEntryComponent';

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
function VisualizerLine(props) {
  // if (lineData.data === undefined) {
  //   return <div className='color-kolred'>Missing Line Data</div>;
  // }

  console.log('VisualizerLine', props);
  return (
    <AscensionInfoEntryComponent {...props} />
  )
}
/**
 * @returns {React.Component}
 */
export default observer(
function VisualizerSection(props) {
  const {logData = []} = props;

  return (
    <div className='flex-col adjacent-mar-t-4'>
      <div className='fontsize-1 adjacent-mar-t-2'>Visualizer Table</div>
      
      <div className='overflow-auto flex-col adjacent-mar-t-2'>
        { logData.map((logEntry, idx) => (
          <VisualizerLine 
            logEntry={logEntry}
            key={`VisualizerLine-${idx}-key`}/>
        ))}
      </div>
    </div>
  )
})
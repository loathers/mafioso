import React from 'react';
import logStore from 'store/logStore';

import combineClassnames from 'utilities/combineClassnames';

/**
 * @param {SyntheticEvent} evt
 */
function onUpload(evt) {
  ignoreEvent(evt);
  const uploadedFiles = (evt.dataTransfer && evt.dataTransfer.files) || (evt.currentTarget && evt.currentTarget.files);
  if (uploadedFiles.length <= 0) {
    console.warn('No file uploaded.');
    return;
  }

  logStore.handleUpload(uploadedFiles[0]);
}
/**
 * @param {SyntheticEvent} evt
 */
function ignoreEvent(evt) {
  evt.preventDefault();
  evt.stopPropagation();
}
/**
 * @returns {React.Component}
 */
export default function UploadComponent(props) {
  const {
    className,
    showExpanded,
  } = props;

  const [isOver, setIsOver] = React.useState(false);

  const hoverClassName = isOver ? 'bor-3-green' : 'bor-3-white';
  const expandedClassName = showExpanded ? 'width-full flex-auto' : 'width-full';
  const expandedStyle = showExpanded ? {height: '70vh'} : {};

  return (
    <form 
      onDrop={(evt) => { onUpload(evt); }}
      onDragOver={e => { ignoreEvent(e); }}
      onDragEnter={e => { ignoreEvent(e); setIsOver(true); }}
      onDragLeave={e => { ignoreEvent(e); setIsOver(false); }} 
      style={expandedStyle}
      className={combineClassnames('flex-col boxsizing-border', expandedClassName, className)}>
      <label 
        className={combineClassnames('pad-4 flex-auto cursor-pointer', hoverClassName)}
        htmlFor='log-uploader'>
        Upload or drop in your session logs!
      </label>

      <input
        style={{
          width: 0.1,
          height: 0.1,
          opacity: 0,
          overflow: 'hidden',
          position: 'absolute',
          zindex: -1,
        }}

        onChange={onUpload}
        accept='.txt'
        type='file'
        id='log-uploader' />
    </form>
  )
}
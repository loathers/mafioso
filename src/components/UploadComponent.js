import React from 'react';
import logStore from 'store/logStore';

import combineClassnames from 'utilities/combineClassnames';

/**
 * @param {SyntheticEvent} evt
 */
function onUpload(evt) {
  const uploadedFiles = evt.currentTarget.files;
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
  const expandedClassName = showExpanded ? 'flex-auto' : '';

  return (
    <div className={combineClassnames('flex-col boxsizing-border', expandedClassName, className)}>
      <input 
        className={combineClassnames('pad-4 flex-auto', hoverClassName)}
        onChange={onUpload}
        onDrop={onUpload}
        onDragEnter={e => { ignoreEvent(e); setIsOver(true); }}
        onDragLeave={e => { ignoreEvent(e); setIsOver(false); }} 
        style={{
        }}
        accept='.txt'
        type='file' />
    </div>
  )
}
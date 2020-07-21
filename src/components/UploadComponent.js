import React from 'react';
import logStore from 'store/logStore';

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
export default function UploadComponent() {
  const [isOver, setIsOver] = React.useState(false);

  return (
    <div className='flex-col adjacent-mar-t-5'>

      <input 
        onChange={onUpload}
        onDrop={onUpload}
        onDragEnter={e => { ignoreEvent(e); setIsOver(true); }}
        onDragLeave={e => { ignoreEvent(e); setIsOver(false); }} 
        style={{
          border: `3px ${isOver ? 'lightgreen' : 'white'} solid`,
          padding: 5
        }}
        accept='.txt'
        type='file' />
    </div>
  )
}
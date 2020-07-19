import React from 'react';
import logStore from 'store/logStore';

function onUpload(evt) {
  const uploadedFile = evt.currentTarget.files;
  if (uploadedFile.length <= 0) {
    return new Error('No file uploaded.');
  }

  // console.log('*onUpload', uploadedFile[0]);
  logStore.handleUpload(uploadedFile[0]);
}

export default function UploadComponent() {
  const [isOver, setIsOver] = React.useState(false);

  function ignoreEvent(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>

      <input 
        onChange={onUpload}
        onDrop={onUpload}
        // onDragOver={setIsOver(true)}
        onDragEnter={e => { ignoreEvent(e); setIsOver(true); }}
        onDragLeave={e => { ignoreEvent(e); setIsOver(false); }} 
        style={{
          border: `2px ${isOver ? 'lightgreen' : 'white'} solid`,
          padding: 5
        }}
        type='file' />
    </div>
  )
}
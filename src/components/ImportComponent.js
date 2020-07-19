import React from 'react';
import logStore from 'store/logStore';

function onImport(evt) {
  const uploadedFile = evt.currentTarget.files;
  if (uploadedFile.length <= 0) {
    return new Error('No file uploaded.');
  }
  console.log('*onImport', uploadedFile[0]);
  logStore.import(uploadedFile[0]);
}

export default function ImportComponent() {
  const [isOver, setIsOver] = React.useState(false);

  function ignoreEvent(evt) {
    console.log('rolllll');
    evt.preventDefault();
    evt.stopPropagation();
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <span>Gimme that txt</span>
      { isOver &&
        <span>Oooh</span>
      }

      <input 
        onChange={onImport}
        onDrop={onImport}
        // onDragOver={setIsOver(true)}
        onDragEnter={e => ignoreEvent(e) && setIsOver(true)}
        onDragLeave={e => ignoreEvent(e) && setIsOver(false)} 
        style={{
          border: '2px white solid',
          padding: 5
        }}
        type='file' />
    </div>
  )
}
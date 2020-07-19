import React from 'react';
import logStore from 'store/logStore';

function onImport(evt) {
  const uploadedFile = evt.currentTarget.files;
  if (uploadedFile === undefined) {
    return new Error('No file uploaded.');
  }
  console.log('*onImport', uploadedFile);
  logStore.import(uploadedFile);
}

export default function ImportComponent() {
  return (
    <div>
      Gimme that txt
      <input 
        onChange={onImport}
        type='file' />
    </div>
  )
}
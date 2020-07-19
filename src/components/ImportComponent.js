import React from 'react';

function onImport(evt) {
  console.log('*onImport', evt.currentTarget.files);
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
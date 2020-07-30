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

  logStore.handleUpload(uploadedFiles);
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
    disabled,
    style,
    content,
  } = props;

  const [isOver, setIsOver] = React.useState(false);

  const borderClassName = disabled ? 'bor-1-grayer' : (isOver ? 'bor-2-green' : 'bor-1-white');
  const colorClassName = disabled ? 'color-grayer' : 'color-white';

  return (
    <form 
      onDrop={(evt) => { onUpload(evt); }}
      onDragOver={e => { ignoreEvent(e); }}
      onDragEnter={e => { ignoreEvent(e); setIsOver(true); }}
      onDragLeave={e => { ignoreEvent(e); setIsOver(false); }} 
      style={style}
      className={combineClassnames('flex-col boxsizing-border', className)}>
      <label 
        className={combineClassnames('pad-4 flex-auto cursor-pointer', borderClassName, colorClassName)}
        htmlFor='log-uploader'>
        {content}
      </label>

      <input
        disabled={disabled}
        style={{
          width: 0.1,
          height: 0.1,
          opacity: 0,
          overflow: 'hidden',
          position: 'absolute',
          zindex: -1,
        }}
        multiple
        onChange={onUpload}
        accept='.txt'
        type='file'
        id='log-uploader' />
    </form>
  )
}
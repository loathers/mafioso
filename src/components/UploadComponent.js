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
    children,
  } = props;

  const [isOver, setIsOver] = React.useState(false);
  const overClassName = isOver ? 'bor-1-green' : '';

  return (
    <form
      onDrop={(evt) => { onUpload(evt); }}
      onDragOver={e => { ignoreEvent(e); }}
      onDragEnter={e => { ignoreEvent(e); setIsOver(true); }}
      onDragLeave={e => { ignoreEvent(e); setIsOver(false); }}
      elementname='upload-component'
      componentstate={disabled ? 'disabled' : 'enabled'}
      style={style}
      className={combineClassnames('flex-col boxsizing-border', className)}>
      <label
        className={combineClassnames('borradius-2 talign-center whitespace-pre-wrap pad-4 flex-auto', overClassName)}
        htmlFor='log-uploader'>
        {children}
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
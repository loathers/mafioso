import logStore from 'store/logStore';

import download, {createBlob} from 'utilities/download';

/**
 * downloads the current ascension log to user
 */
export function downloadFullLog() {
  if (!logStore.isReady) return;

  // if not an ascension log, download with generic name
  if (!logStore.isAscensionLog) {
    download(logStore.export(), 'mafioso_log', 'text/plain');
    return;
  }

  const fileName = `${logStore.characterName}#${logStore.ascensionNum}-${logStore.pathLabel}`;
  download(logStore.export(), fileName, 'text/plain');
}
/**
 * @returns {Blob}
 */
export function createLogFile() {
  return createBlob(logStore.export(), 'text/plain');
}

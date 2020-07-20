import ENTRY_TYPE from 'constants/entryType';

import {hasString} from 'utilities/stringUtils';

/**
 * core parsing function to do it all
 * 
 * @param {String} logRaw
 * @return {Array<LogEntry>}
 */
export function parseLog(logRaw) {
  const logRawCleaned = logRaw.replace(LOG_CRUFT_REGEX, '');

  // an entry is separated by two new lines
  //  going to first do a broad grouping
  // todo: windows/unix/osx has different regex for new lines :/
  const logRawSplit = logRawCleaned.split(LOG_SPLIT_REGEX);

  // do we have enough data
  // todo: meaningful check
  if (logRawSplit.length <= 1) {
    console.warn('Not enough data on log.');
    return;
  }

  //
  return logRawSplit
    .slice(0, Math.min(550, logRawSplit.length)) // dev: limit lines
    .map((entryString, idx) => new LogEntry({
      entryIdx: idx,
      entryType: checkEntryType(entryString),
      entryString: entryString,
    })) // format data into LogEntry class
    .filter((logEntry) => DESIRED_ENTRIES.includes(logEntry.entryType)); // dev: only list desired types
}
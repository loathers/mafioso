import ENTRY_TYPE from 'constants/entryTypes';

/**
 * (there are many different types of string matching methods
 *  I might want to do a lot of swapping around to test efficiency)
 * 
 * @param {String} searchStr
 * @param {String} matchStr
 * @return {Boolean}
 */
function hasString(searchStr, matchStr) {
  // return searchStr.indexOf(matchStr) !== -1;
  return searchStr.match(new RegExp(matchStr));
}
/**
 * core parsing function to do it all
 * 
 * @param {String} logRaw
 * @return {Array<LogEntry>}
 */
export function parseLog(logRaw) {
  const logRawCleaned = logRaw.replace(/\n> .+?(?=\n)/, '');

  // an entry is separated by two new lines
  //  going to first do a broad grouping
  // todo: windows/unix/osx has different regex for new lines :/
  const logRawSplit = logRawCleaned.split(/\r\n\r\n/);

  // do we have enough data
  // todo: meaningful check
  if (logRawSplit.length <= 1) {
    console.warn('Not enough data on log.');
    return;
  }

  //
  return logRawSplit
    .slice(0, Math.min(550, logRawSplit.length))
    .map((logEntry) => ({
      entryType: checkEntryType(logEntry),
      logEntry: logEntry,
    }))
    .filter((logData) => {
      return logData.entryType !== ENTRY_TYPE.UNKNOWN && logData.entryType !== ENTRY_TYPE.MAFIA_LOG;
    });
}
// -- utility functions to determine the type
/**
 * handles determining what EntryType a log string is
 * 
 * @param {String} logEntry
 * @return {EntryType}
 */
export function checkEntryType(logEntry) {
  if (isEntryMafiaLog(logEntry)) {
    return ENTRY_TYPE.MAFIA_LOG;
  }

  if (isEntryEncounter(logEntry)) {
    return ENTRY_TYPE.ENCOUNTER;
  }

  return ENTRY_TYPE.UNKNOWN;
}
/**
 * @param {String} logEntry
 * @return {Boolean}
 */
export function isEntryMafiaLog(logEntry) {
  const BORDER_STRING = '=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=';
  if (hasString(logEntry, BORDER_STRING)) {
    return true;
  }

  return false;
}
/**
 * @param {String} logEntry
 * @return {Boolean}
 */
export function isEntryEncounter(logEntry) {
  const ENCOUNTER_REGEX = /(\[(?!\]).*\])/;
  if (hasString(logEntry, ENCOUNTER_REGEX)) {
    return true;
  }

  return false;
}
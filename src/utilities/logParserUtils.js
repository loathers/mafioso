import LogEntry from 'classes/LogEntry';

import ENTRY_TYPE from 'constants/entryType';

const DESIRED_ENTRIES = [
  ENTRY_TYPE.SNAPSHOT.ASCENSION_INFO,
  ENTRY_TYPE.ENCOUNTER.NONCOMBAT,
  ENTRY_TYPE.USE_SKILL.NONCOMBAT,
  ENTRY_TYPE.ACQUIRE_ITEM,
  ENTRY_TYPE.EQUIP,
];

const LOG_CRUFT_REGEX = /\n> .+?(?=\n)/;
const LOG_SPLIT_REGEX = /\r\n\r\n/;

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
// -- utility functions to determine the type
/**
 * handles determining what EntryType a log string is
 * 
 * @param {String} entryString
 * @return {EntryType}
 */
export function checkEntryType(entryString) {
  if (isEntryAscensionInfo(entryString)) {
    return ENTRY_TYPE.SNAPSHOT.ASCENSION_INFO;
  }
  
  if (isEntryMafiaMisc(entryString)) {
    return ENTRY_TYPE.MAFIA.MISC_LOG;
  }

  if (isEntryEncounter(entryString)) {
    return ENTRY_TYPE.ENCOUNTER_UNKNOWN;
  }

  return ENTRY_TYPE.UNKNOWN;
}
/**
 * check if `ENTRY_TYPE.MAFIA.MISC_LOG`
 * 
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryMafiaMisc(entryString) {
  const BORDER_STRING = '=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=';
  if (hasString(entryString, BORDER_STRING)) {
    return true;
  }

  return false;
}
/**
 * check if `ENTRY_TYPE.SNAPSHOT.ASCENSION_INFO`
 * 
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryAscensionInfo(entryString) {
  const ASCENSION_INFO_REGEX = /^(Ascension)/m;
  if (hasString(entryString, ASCENSION_INFO_REGEX)) {
    return true;
  }

  return false;
}
/**
 * check if `ENTRY_TYPE.ENCOUNTER_UNKNOWN`
 * 
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryEncounter(entryString) {
  // look for `[1]` but ignore url hashes with `[]blah[]`
  const ENCOUNTER_REGEX = /(\[(?!\]).*\])/;
  if (hasString(entryString, ENCOUNTER_REGEX)) {
    return true;
  }

  return false;
}
import { v4 as uuidv4 } from 'uuid';

import LogEntry from 'classes/LogEntry';

import ENTRY_TYPE from 'constants/entryType';

import {hasString} from 'utilities/stringUtils';

const DESIRED_ENTRIES = [
  ENTRY_TYPE.SNAPSHOT.ASCENSION_INFO,
  ENTRY_TYPE.ENCOUNTER.COMBAT,
  // ENTRY_TYPE.USE_SKILL.NONCOMBAT,
  ENTRY_TYPE.ACQUIRE_ITEM,
  ENTRY_TYPE.TRANSACTION,
  // ENTRY_TYPE.EQUIP,
  // ENTRY_TYPE.LOCATION_VISIT,
];

const LOG_CRUFT_REGEX = /\n> .+?(?=\n)/;
const LOG_SPLIT_REGEX = /\r\n\r\n/;

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
  const logId = uuidv4();
  return logRawSplit
    .slice(0, Math.min(550, logRawSplit.length)) // dev: limit lines
    .map((entryString, idx) => new LogEntry({
      entryId: `${idx}_${logId}`,
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

  if (isEntryAcquireItem(entryString)) {
    return ENTRY_TYPE.ACQUIRE_ITEM;
  }

  if (isEntryTransaction(entryString)) {
    return ENTRY_TYPE.TRANSACTION;
  }

  if (isEntryLocationVisit(entryString)) {
    return ENTRY_TYPE.LOCATION_VISIT;
  }

  if (isEntryCombatEncounter(entryString)) {
    return ENTRY_TYPE.ENCOUNTER.COMBAT;
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
 * check if `ENTRY_TYPE.ACQUIRE_ITEM`
 * 
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryAcquireItem(entryString) {
  const ACQUIRE_REGEX = /^(You acquire)/;
  return hasString(entryString, ACQUIRE_REGEX);
}
/**
 * check if `ENTRY_TYPE.TRANSACTION`
 * 
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryTransaction(entryString) {
  const TRANSACTION_REGEX = /^(buy)/
  return hasString(entryString, TRANSACTION_REGEX);
}
/**
 * check if `ENTRY_TYPE.LOCATION_VISIT`
 * 
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryLocationVisit(entryString) {
  const LOCATION_REGEX = /^(Visiting)/;
  return hasString(entryString, LOCATION_REGEX);
}
// -- actions
/**
 * actions will be determined by checking for [num]
 * 
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryAction(entryString) {
  // look for `[1]` but ignore url hashes with `[]blah[]`
  const ACTION_REGEX = /(\[(?!\]).*\])/;
  return hasString(entryString, ACTION_REGEX);
}
/**
 * check if `ENTRY_TYPE.ENCOUNTER.COMBAT`
 * 
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryCombatEncounter(entryString) {
  const COMBAT_ENCOUNTER_REGEX = /Round 0:/;
  return hasString(entryString, COMBAT_ENCOUNTER_REGEX);
}
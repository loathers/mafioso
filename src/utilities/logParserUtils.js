import { v4 as uuidv4 } from 'uuid';

import LogEntry from 'classes/LogEntry';

import ENTRY_TYPE from 'constants/entryType';
import REGEX from 'constants/regexes';

import {hasString, fixSpecialEntities} from 'utilities/stringUtils';

const DESIRED_ENTRIES = [
  ENTRY_TYPE.SNAPSHOT.ASCENSION_INFO,
  ENTRY_TYPE.ENCOUNTER.COMBAT,
  ENTRY_TYPE.ENCOUNTER.NONCOMBAT,
  ENTRY_TYPE.ACQUIRE_ITEM,
  ENTRY_TYPE.TRANSACTION,
  // ENTRY_TYPE.EQUIP,
  // ENTRY_TYPE.LOCATION_VISIT,
];
/**
 * core parsing function to do it all
 * 
 * @param {String} logRaw
 * @return {Array<LogEntry>}
 */
export function parseLog(logRaw) {
  const logRawCleaned = logRaw.replace(REGEX.MISC.LOG_CRUFT, '');

  // an entry is separated by two new lines
  //  going to first do a broad grouping
  // todo: windows/unix/osx has different regex for new lines :/
  const logRawSplit = logRawCleaned.split(REGEX.MISC.LOG_SPLIT);

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
      entryIdx: idx,
      entryId: `${idx}_${logId}`,
      entryType: checkEntryType(entryString),
      entryString: fixSpecialEntities(entryString),
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

  if (isEntryCombatEncounter(entryString)) {
    return ENTRY_TYPE.ENCOUNTER.COMBAT;
  }

  if (isEntryNonCombatEncounter(entryString)) {
    return ENTRY_TYPE.ENCOUNTER.NONCOMBAT;
  }

  if (isEntryTransaction(entryString)) {
    return ENTRY_TYPE.TRANSACTION;
  }

  if (isEntryLocationVisit(entryString)) {
    return ENTRY_TYPE.LOCATION_VISIT;
  }

  return ENTRY_TYPE.UNKNOWN;
}
/**
 * check if this is some random mafia string
 * 
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryMafiaMisc(entryString) {
  if (hasString(entryString, REGEX.MISC.LOG_BORDER)) {
    return true;
  }

  return false;
}
/**
 * check if entry is telling us about this ascension
 * 
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryAscensionInfo(entryString) {
  return hasString(entryString, REGEX.VALUE.ASCENSION_NUMBER);
}
/**
 * check if this entry is about buying something
 * 
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryTransaction(entryString) {
  return hasString(entryString, REGEX.VALUE.BUY_ITEM_AMOUNT);
}
/**
 * todo
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
 * actions (aka turn) [num]
 * 
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryAction(entryString) {
  return hasString(entryString, REGEX.VALUE.TURN_NUM);
}
/**
 * check is entry is a combat encounter,
 *  which will have the initiative line
 * 
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryCombatEncounter(entryString) {
  return hasString(entryString, REGEX.LINE.COMBAT_INIT);
}
/**
 * check if entry is a noncombat
 * 
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryNonCombatEncounter(entryString) {
  return hasString(entryString, REGEX.VALUE.NONCOMBAT_NAME) && !isEntryMafiaMisc(entryString);
}
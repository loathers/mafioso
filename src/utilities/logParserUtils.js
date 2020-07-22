import { v4 as uuidv4 } from 'uuid';

import LogEntry from 'classes/LogEntry';

import ENTRY_TYPE from 'constants/entryType';
import REGEX from 'constants/regexes';

import {hasString, fixSpecialEntities} from 'utilities/regexUtils';

const logId = uuidv4();
const PARSE_BATCH_SIZE = 100;
const PARSE_DELAY = 50;

/**
 * core parsing function to do it all
 * 
 * @param {String} logRaw
 * @return {Array<LogEntry>}
 */
export async function parseLogTxt(logRaw) {
  const logRawCleaned = logRaw.replace(REGEX.MISC.LOG_CRUFT, '');

  // an entry is separated by two new lines
  //  going to first do a broad grouping
  const logRawSplit = logRawCleaned.split(REGEX.MISC.LOG_SPLIT);

  // do we have enough data
  // todo: meaningful check
  if (logRawSplit.length <= 1) {
    console.warn('Not enough data on log.');
    return;
  }

  let logData = [];
  console.log('parsing', logRawSplit.length, 'entries using id:', logId);
  
  // do it in batches
  const batchCount = Math.ceil(logRawSplit.length / PARSE_BATCH_SIZE);
  for (let i=0; i<batchCount; i++) {
    const sliceStart = i*PARSE_BATCH_SIZE;
    const sliceEnd = sliceStart + PARSE_BATCH_SIZE;
    const logGroup = logRawSplit.slice(sliceStart, sliceEnd);
    const parsedGroup = await parseLogArray(logGroup);

    logData = logData.concat(parsedGroup);
    console.log('... batch', i, 'done with', parsedGroup.length, 'entries');
  }

  console.log('finished parsing', logData.length, 'entries!');
  return logData;
}
/** 
 * creates an LogEntry class based on txt array
 * @async
 * @returns {Array<LogEntry>}
 */
export function parseLogArray(logArray) {
  return new Promise((resolve) => {
    const parsedLogArray = logArray.map((entryString, idx) => new LogEntry({
      entryIdx: idx,
      entryId: `${idx}_${logId}`,
      entryType: checkEntryType(entryString),
      entryString: fixSpecialEntities(entryString),
    }));

    setTimeout(() => resolve(parsedLogArray), PARSE_DELAY);
  })
}
// -- utility functions to determine the type
/**
 * handles determining what EntryType a log string is
 * 
 * @param {String} entryString
 * @return {EntryType}
 */
export function checkEntryType(entryString) {
  // -- basic entries
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

  if (isEntryEat(entryString)) {
    return ENTRY_TYPE.CONSUMPTION.EAT;
  }

  if (isEntryDrink(entryString)) {
    return ENTRY_TYPE.CONSUMPTION.DRINK;
  }

  if (isEntryChew(entryString)) {
    return ENTRY_TYPE.CONSUMPTION.CHEW;
  }

  if (isEntryTransaction(entryString)) {
    return ENTRY_TYPE.TRANSACTION;
  }

  if (isEntryLocationVisit(entryString)) {
    return ENTRY_TYPE.LOCATION_VISIT;
  }

  // -- iotm: diabolic pizza
  if (isEntryDiabolicPizzaMake(entryString)) {
    return ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.MAKE;
  }

  if (isEntryDiabolicPizzaEat(entryString)) {
    return ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.EAT;
  }

  if (isEntryBeachComb(entryString)) {
    return ENTRY_TYPE.IOTM.BEACH_COMB;
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
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryEat(entryString) {
  return hasString(entryString, REGEX.VALUE.EAT_TARGET);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryDrink(entryString) {
  return hasString(entryString, REGEX.VALUE.DRINK_TARGET);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryChew(entryString) {
  return hasString(entryString, REGEX.VALUE.CHEW_TARGET);
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
// -- iotm
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryDiabolicPizzaMake(entryString) {
  return hasString(entryString, REGEX.DIABOLIC_PIZZA.INGREDIENTS_LINE);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryDiabolicPizzaEat(entryString) {
  return hasString(entryString, REGEX.DIABOLIC_PIZZA.EAT_LINE);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryBeachComb(entryString) {
  return hasString(entryString, REGEX.BEACH_COMB.COMBING_LINE);
}
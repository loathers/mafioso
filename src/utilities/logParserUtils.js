import { v4 as uuidv4 } from 'uuid';

import LogEntry from 'classes/LogEntry';

import ENTRY_TYPE from 'constants/entryType';
import REGEX from 'constants/regexes';

import {hasString, fixSpecialEntities} from 'utilities/regexUtils';

const logId = uuidv4();
const PARSE_DELAY = 10; // ms

/**
 * update batch size based on number of characters in the log
 *  this calculation is not very scientific
 *  
 * @param {Number} rawSize
 */
function calculateBatchSize(rawSize) {
  const rawVal = Math.sqrt(rawSize);
  const newBatchSize = Math.round(1200 - rawVal);
  return Math.max(100, newBatchSize);
}
/**
 * core parsing handler - start here
 * 
 * @param {String} rawText
 * @return {Array<LogEntry>}
 */
export async function parseLogTxt(rawText) {
  const rawCleaned = rawText.replace(REGEX.MISC.LOG_CRUFT, '');
  const rawSize = rawCleaned.length;
  if (rawSize > 10000000) {
    console.warn(`This log of ${rawSize} characters is too huge!`);
    return;
  }

  // start separating entries, which will be separated by two new lines
  //  there are exceptions that will be handled separately
  const rawArray = rawCleaned.split(REGEX.MISC.LOG_SPLIT);
  if (rawArray.length <= 1) {
    console.warn('Not enough data on log.');
    return;
  }

  console.log('✨ %cParsing your Ascension Log!', 'color: Blue');

  // calculate size of batches for performance
  const BATCH_SIZE = calculateBatchSize(rawSize);
  console.log(`(log has ${rawSize} characters)`);

  const logEntries = await parseRawArray(rawArray, {batchSize: BATCH_SIZE});
  console.log(`✨ %cFinishing! Created ${logEntries.length} entries.`, 'color: Blue');
  return logEntries;
}
/** 
 * parses an array of raw strings
 * 
 * @async
 * @param {Array<String>} rawArray
 * @param {Object} [options]
 * @returns {Array<LogEntry>}
 */
export async function parseRawArray(rawArray, options = {}) {
  const {
    batchSize = 100,
  } = options;

  let logEntries = [];

  const batchCount = Math.ceil(rawArray.length / batchSize);
  for (let i = 0; i < batchCount; i++) {
    const startIdx = i * batchSize;
    const endIdx = startIdx + batchSize;
    const logGroup = rawArray.slice(startIdx, endIdx);
    const parsedGroup = await parseLogArray(logGroup, startIdx);

    logEntries = logEntries.concat(parsedGroup);
    console.log(`... Batch #${i+1} parsed (${parsedGroup.length} entries)`);
  }

  return logEntries;
}
/** 
 * creates a list of LogEntry class, 
 *  which will have parsed an entry's data 
 * 
 * @async
 * @param {Array<String>} logArray
 * @param {Number} startIdx
 * @returns {Array<LogEntry>}
 */
export function parseLogArray(logArray, startIdx) {
  return new Promise((resolve) => {
    const parsedLogArray = logArray.map((entryString, idx) => new LogEntry({
      entryIdx: startIdx + idx,
      entryId: `${startIdx + idx}_${logId}`,
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
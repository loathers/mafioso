import ENTRY_TYPE from 'constants/entryType';
import REGEX from 'constants/regexes';

import {hasString} from 'utilities/regexUtils';

/**
 * handles determining what EntryType a log string is
 * @param {String} entryString
 * @return {EntryType}
 */
export function getEntryType(entryString) {
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
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryMafiaMisc(entryString) {
  return hasString(entryString, REGEX.MISC.LOG_BORDER);
}
/**
 * check if entry is telling us about this ascension
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryAscensionInfo(entryString) {
  return hasString(entryString, REGEX.VALUE.ASCENSION_NUMBER);
}
/**
 * check if this entry is about buying something
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
// -- actions
/**
 * actions (aka turn) [num]
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryAction(entryString) {
  return hasString(entryString, REGEX.VALUE.TURN_NUM);
}
/**
 * check is entry is a combat encounter
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryCombatEncounter(entryString) {
  // can be confident if it has the initiative line 
  return hasString(entryString, REGEX.LINE.COMBAT_INIT);
}
/**
 * check if entry is a noncombat
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
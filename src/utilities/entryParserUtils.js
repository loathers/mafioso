// import ENTRY_TYPE from 'constants/entryType';

import {
  hasString,
  getRegexMatch,
} from 'utilities/stringUtils';
import * as logParserUtils from 'utilities/logParserUtils';

/**
 * core parsing function to do it all
 * 
 * @param {String} entryString
 * @return {Array<LogEntry>}
 */
export function parseEntry(entryString) {
  const entryBody = createEntryBody(entryString);
  const turnNum = parseTurnNum(entryString);
  const isFreeAdv = parseFreeAdventure(entryString);
  const locationName = parseLocationName(entryString);
  const encounterName = parseEncounterName(entryString);
  const acquiredItems = parseAcquiredItems(entryString);
  const meatChange = parseMeatChange(entryString);

  return {
    entryBody: entryBody.length <= 0 ? null : entryBody,
    turnNum,
    isFreeAdv,
    locationName,
    encounterName,
    isCombatEncounter: parseIsCombatEncounter(entryString),
    isNoncombatEncounter: parseIsNonCombatEncounter(entryString),
    acquiredItems,
    meatChange,
    hasInitiative: parseCombatIniative(entryString),
    isVictory: parseCombatVictory(entryString),
    isDeath: parseCombatLoss(entryString),
  }
}
/**
 * scrub the main text of data that will be
 *  cached in the LogEntry data so there are
 *  only basic text
 * 
 * @param {String} entryString
 * @return {String}
 */
export function createEntryBody(entryString) {
  const ADVENTURE_LINE_REGEX = /\[\d*\].*\s*/;
  const ENCOUNTER_LINE_REGEX = /Encounter:.*\s*/;
  
  const ACQUIRE_ITEM_REGEX = /\w*.*acquire an item.*\s*/g;
  const COMBAT_NOT_COST_ADV_REGEX = /.*did not cost.*\s*/;
  const COMBAT_INIT_LINE_REGEX = /Round.*(loses initiative|wins initiative).*\s*/;
  const COMBAT_VICTORY_LINE_REGEX = /(?<=\s).*wins the fight.*\s*/;

  const MAFIA_MAXIMIZER_CLI_REGEX = /.*Maximizer.*\s*/g;
  const MAFIA_ACTION_URL_REGEX = /.*.php.*\s*/g;

  return entryString
    .replace(ADVENTURE_LINE_REGEX, '')
    .replace(ENCOUNTER_LINE_REGEX, '')
    .replace(ACQUIRE_ITEM_REGEX, '')
    .replace(COMBAT_NOT_COST_ADV_REGEX, '')
    .replace(COMBAT_INIT_LINE_REGEX, '')
    .replace(COMBAT_VICTORY_LINE_REGEX, '')
    .replace(MAFIA_MAXIMIZER_CLI_REGEX, '')
    .replace(MAFIA_ACTION_URL_REGEX, '');
}
// -- commonly found parsers
/**
 * parses the adventure number
 *
 * todo: use previous adventure num if log does not have it
 * 
 * @param {String} entryString
 * @return {Number}
 */
export function parseTurnNum(entryString) {
  const ACTION_NUM_REGEX = /(?!\[)\d*(?=\])/;
  const turnNumMatches = getRegexMatch(entryString, ACTION_NUM_REGEX);
  if (turnNumMatches === null) {
    return -1;
  }
  return Number(turnNumMatches[0]);
}
/**
 * determine if this is a free adventure
 * 
 * @param {String} entryString
 * @return {String}
 */
export function parseFreeAdventure(entryString) {
  const COMBAT_NOT_COST_ADV_REGEX = /.*did not cost.*\s+/;
  const freeAdventureMatches = getRegexMatch(entryString, COMBAT_NOT_COST_ADV_REGEX);
  if (freeAdventureMatches === null) {
    return null;
  }

  return freeAdventureMatches[0];
}
/**
 * parses name of the location,
 *  typically first line after "[num] "
 * 
 * @param {String} entryString
 * @return {String | null}
 */
export function parseLocationName(entryString) {
  const LOCATION_NAME_REGEX = /(?<=\]\s).*(?=\r?\n)*/;
  const locationNameMatches = getRegexMatch(entryString, LOCATION_NAME_REGEX);
  if (locationNameMatches !== null) {
    return locationNameMatches[0];
  }

  const SHOP_LOCATION_NAME_REGEX = /(?<=each from\s).*\r?\n/
  const shopLocationMatches = getRegexMatch(entryString, SHOP_LOCATION_NAME_REGEX);
  if (shopLocationMatches !== null) {
    return shopLocationMatches[0];
  }

  return null;
}
/**
 * parses name of the encounter,
 *  typically right after "Encounter: "
 * 
 * @param {String} entryString
 * @return {String | null}
 */
export function parseEncounterName(entryString) {
  const ENCOUNTER_NAME_REGEX = /(?<=Encounter:\s).*/;
  const encounterNameMatches = getRegexMatch(entryString, ENCOUNTER_NAME_REGEX);
  if (encounterNameMatches === null) {
    return null;
  }
  return encounterNameMatches[0];
}
/**
 * builds an array of all the items that were gained
 * 
 * @param {String} entryString
 * @return {Array<String>}
 */
export function parseAcquiredItems(entryString) {
  const ACQUIRED_SINGLE_ITEM_REGEX = /(?<=(You acquire an item:\s+)).*/g;
  const singleAcquireMatches = getRegexMatch(entryString, ACQUIRED_SINGLE_ITEM_REGEX) || [];

  // const ACQUIRED_MULTIPLE_ITEM_REGEX = /(?<=(You acquire\s+))(.*)(?=\s\({1}\d*\){1})/g; // item excluding amount
  // const ACQUIRED_MULTI_ITEM_AMOUNT_REGEX = /(?!\()\d*(?=\))/; // just the amount
  const ACQUIRED_MULTIPLE_ITEM_REGEX = /(?<=(You acquire\s+))(.*\(\d*\))/g; // item including amount
  const multiAcquireMatches = getRegexMatch(entryString, ACQUIRED_MULTIPLE_ITEM_REGEX) || [];

  return singleAcquireMatches.concat(multiAcquireMatches);
}
/**
 * parses the amount of meat that was gained/lost
 * 
 * @param {String} entryString
 * @return {Number}
 */
export function parseMeatChange(entryString) {
  const meatSpentAmount = parseMeatSpent(entryString);
  return meatSpentAmount;
}
/**
 * @param {String} entryString
 * @return {Number}
 */
export function parseMeatSpent(entryString) {
  const BUY_AMOUNT_REGEX = /(?<=buy\s)\d+/;
  const buyAmountMatches = getRegexMatch(entryString, BUY_AMOUNT_REGEX);
  if (buyAmountMatches === null) {
    return 0;
  }

  const BUY_COST_REGEX = /(?<=for\s)\d+(?!each)/;
  const buyCostMatches = getRegexMatch(entryString, BUY_COST_REGEX);
  if (buyCostMatches === null) {
    return 0;
  }

  const buyAmount = Number(buyAmountMatches[0]);
  const buyCost = Number(buyCostMatches[0]);
  return buyAmount * buyCost;
}
// -- boolean parsers
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function parseIsCombatEncounter(entryString) {
  return logParserUtils.isEntryCombatEncounter(entryString);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function parseIsNonCombatEncounter(entryString) {
  return logParserUtils.isEntryNonCombatEncounter(entryString);
}
/**
 * was this a won combat?
 * 
 * @param {String} entryString
 * @return {Boolean}
 */
export function parseCombatVictory(entryString) {
  const CHECK_VICTORY_REGEX = /wins the fight/;
  return hasString(entryString, CHECK_VICTORY_REGEX);
}
/**
 * was this a lost combat?
 * 
 * @param {String} entryString
 * @return {Boolean}
 */
export function parseCombatLoss(entryString) {
  // only want to check if combat
  if (!parseIsCombatEncounter(entryString)) {
    return false;
  }

  return !parseCombatVictory(entryString);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function parseCombatIniative(entryString) {
  // only want to check if combat
  if (!parseIsCombatEncounter(entryString)) {
    return false;
  }

  const WIN_INITATIVE_REGEX = /wins initiative/;
  if (hasString(entryString, WIN_INITATIVE_REGEX)) {
    return true;
  }

  const LOSE_INITATIVE_REGEX = /loses initiative/;
  if (hasString(entryString, LOSE_INITATIVE_REGEX)) {
    return false;
  }
}
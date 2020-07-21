// import ENTRY_TYPE from 'constants/entryType';

import {getRegexMatch} from 'utilities/stringUtils';

/**
 * core parsing function to do it all
 * 
 * @param {String} entryString
 * @return {Array<LogEntry>}
 */
export function parseEntry(entryString) {
  const adventureNum = parseAdventureNum(entryString);
  const isFreeAdv = parseFreeAdventure(entryString);
  const locationName = parseLocationName(entryString);
  const encounterName = parseEncounterName(entryString);
  const entryBody = parseEntryBody(entryString);
  const acquiredItems = parseAcquiredItems(entryString);
  const meatChange = parseMeatChange(entryString);

  return {
    adventureNum,
    isFreeAdv,
    locationName,
    encounterName,
    entryBody,
    acquiredItems,
    meatChange,
  }
}
/**
 * parses the adventure number
 *
 * todo: use previous adventure num if log does not have it
 * 
 * @param {String} entryString
 * @return {Number}
 */
export function parseAdventureNum(entryString) {
  const ACTION_NUM_REGEX = /(?!\[)\d*(?=\])/;
  const adventureNumMatches = getRegexMatch(entryString, ACTION_NUM_REGEX);
  if (adventureNumMatches === null) {
    return -1;
  }
  return Number(adventureNumMatches[0]);
}
/**
 * determine if this is a free adventure
 * 
 * @param {String} entryString
 * @return {String}
 */
export function parseFreeAdventure(entryString) {
  const FREE_ADVENTURE_REGEX = /\w*.*did not cost.*\w+/;
  const freeAdventureMatches = getRegexMatch(entryString, FREE_ADVENTURE_REGEX);
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
  const LOCATION_NAME_REGEX = /(?<=\]\s).*(?=\r\n)*/;
  const locationNameMatches = getRegexMatch(entryString, LOCATION_NAME_REGEX);
  if (locationNameMatches === null) {
    return null;
  }
  return locationNameMatches[0];
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
 * scrub the main text of data we will be formatting
 * 
 * @param {String} entryString
 * @return {String}
 */
export function parseEntryBody(entryString) {
  const ADVENTURE_LINE_REGEX = /\[\d*\].*\s*/;
  const ENCOUNTER_LINE_REGEX = /Encounter:.*\s*/;
  const MAFIA_ACTION_URL_REGEX = /\w*.php.*\w+/;
  
  return entryString
    .replace(ADVENTURE_LINE_REGEX, '')
    .replace(ENCOUNTER_LINE_REGEX, '')
    .replace(MAFIA_ACTION_URL_REGEX, '');
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
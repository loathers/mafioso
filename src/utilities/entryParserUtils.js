// import ENTRY_TYPE from 'constants/entryType';

import {getRegexMatch} from 'utilities/stringUtils';

/**
 * core parsing function to do it all
 * 
 * @param {String} entryString
 * @return {Array<LogEntry>}
 */
export function parseEntry(entryString) {
  const actionNum = parseActionNum(entryString);
  const acquiredItems = parseAcquiredItems(entryString);
  const locationName = parseLocationName(entryString);
  const meatChange = parseMeatChange(entryString);

  return {
    actionNum,
    locationName,
    acquiredItems,
    meatChange,
  }
}
/**
 * parses the adventure number
 * 
 * @param {String} entryString
 * @return {Number}
 */
export function parseActionNum(entryString) {
  const ACTION_NUM_REGEX = /(?!\[)\d*(?=\])/;
  const actionNumMatches = getRegexMatch(entryString, ACTION_NUM_REGEX);
  if (actionNumMatches === null) {
    return -1;
  }
  return Number(actionNumMatches[0]);
}
/**
 * parses the amount of meat that was gained/lost
 * 
 * @param {String} entryString
 * @return {String | null}
 */
export function parseLocationName(entryString) {
  const LOCATION_NAME_REGEX = /(?<=\]\s).*(?=\r\n)/;
  const locationNameMatches = getRegexMatch(entryString, LOCATION_NAME_REGEX);
  if (locationNameMatches === null) {
    return null;
  }
  return locationNameMatches[0];
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
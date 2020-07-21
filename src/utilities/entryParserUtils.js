import ENTRY_TYPE from 'constants/entryType';

import {getRegexMatch} from 'utilities/stringUtils';

/**
 * core parsing function to do it all
 * 
 * @param {String} entryString
 * @return {Array<LogEntry>}
 */
export function parseEntry(entryString) {
  const acquiredItems = parseAcquiredItems(entryString);
  console.log('acquiredItems', acquiredItems.toString())
}
/**
 * 
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
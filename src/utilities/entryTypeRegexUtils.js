import ENTRY_TYPE from 'constants/ENTRY_TYPE';
import {ENTRY_DATA_MAP, ENTRY_MAP_KEYS} from 'constants/ENTRY_DATA_MAP';
import REGEX from 'constants/REGEXES';

import {hasString} from 'utilities/regexUtils';

/**
 * handles determining what EntryType a log string is
 * @param {String} entryString
 * @return {EntryType}
 */
export function getEntryType(entryString) {
  const foundEntryType = ENTRY_MAP_KEYS.find((entryTypeKey) => {
    const entryTypeData = ENTRY_DATA_MAP[entryTypeKey];
    const {matcher} = entryTypeData;
    if (matcher instanceof RegExp) {
      return hasString(entryString, matcher);
    } else if (Array.isArray(matcher)) {
      return matcher.some((matchRegex) => hasString(entryString, matchRegex))
    } else {
      return undefined;
    }
  })

  if (foundEntryType) {
    return foundEntryType;
  }

  return getEntryType_legacy(entryString);
}
/**
 * handles determining what EntryType a log string is
 * @param {String} entryString
 * @return {EntryType}
 */
export function getEntryType_legacy(entryString) {
  // -- common
  if (isEntryNonCombatEncounter(entryString)) {
    return ENTRY_TYPE.ENCOUNTER.NONCOMBAT;
  }

  return ENTRY_TYPE.UNKNOWN;
}
// -- actions
/**
 * check if entry is a noncombat
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryNonCombatEncounter(entryString) {
  return hasString(entryString, REGEX.VALUE.NONCOMBAT_NAME) 
    && !hasString(entryString, REGEX.COMBAT.INITIATIVE_LINE);
}
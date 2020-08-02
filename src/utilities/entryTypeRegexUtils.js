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
  if (isEntryFamiliar(entryString)) {
    return ENTRY_TYPE.FAMILIAR;
  }

  if (isEntryEquip(entryString)) {
    return ENTRY_TYPE.ITEMS.EQUIP;
  }

  if (isEntryUnequip(entryString)) {
    return ENTRY_TYPE.ITEMS.UNEQUIP;
  }

  if (isEntrySpellCast(entryString)) {
    return ENTRY_TYPE.EFFECTS.SPELL_CAST;
  }

  if (isEntryNonCombatEncounter(entryString)) {
    return ENTRY_TYPE.ENCOUNTER.NONCOMBAT;
  }

  return ENTRY_TYPE.UNKNOWN;
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryFamiliar(entryString) {
  if (hasString(entryString, REGEX.LINE.FAMILIAR_WEIGHT_GAIN)) {
    if (!hasString(entryString, REGEX.COMBAT.INITIATIVE_LINE)) {
      return true;
    }
  }

  return hasString(entryString, REGEX.LINE.FAMILIAR);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryEquip(entryString) {
  return hasString(entryString, REGEX.ITEMS.EQUIP_TARGETS);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryUnequip(entryString) {
  return hasString(entryString, REGEX.ITEMS.UNEQUIP_TARGETS);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntrySpellCast(entryString) {
  return hasString(entryString, REGEX.VALUE.SPELL_CAST_NAMES);
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
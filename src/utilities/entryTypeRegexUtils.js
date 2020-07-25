import ENTRY_TYPE from 'constants/entryType';
import REGEX from 'constants/regexes';

import {hasString} from 'utilities/regexUtils';

/**
 * handles determining what EntryType a log string is
 * @param {String} entryString
 * @return {EntryType}
 */
export function getEntryType(entryString) {
  // -- iotm
  if (isEntryDiabolicPizzaMake(entryString)) {
    return ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.MAKE;
  }

  if (isEntryDiabolicPizzaEat(entryString)) {
    return ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.EAT;
  }

  if (isEntryBeachComb(entryString)) {
    return ENTRY_TYPE.IOTM.BEACH_COMB;
  }

  if (isEntryBastilleBatallion(entryString)) {
    return ENTRY_TYPE.IOTM.BASTILLE_BATALLION;
  }

  if (isEntryJanuarysGarbageTote(entryString)) {
    return ENTRY_TYPE.IOTM.GARBAGE_TOTE;
  }

  if (isEntryClanVIP(entryString)) {
    return ENTRY_TYPE.IOTM.CLAN_VIP;
  }

  // -- kolmafia
  if (isEntryAscensionInfo(entryString)) {
    return ENTRY_TYPE.SNAPSHOT.ASCENSION_INFO;
  }
  
  if (isEntryDayInfo(entryString)) {
    return ENTRY_TYPE.SNAPSHOT.DAY_INFO;
  }
  
  if (isEntrySkillBreakdown(entryString)) {
    return ENTRY_TYPE.SNAPSHOT.SKILL_BREAKDOWN;
  }
  
  if (isEntryMafiaMisc(entryString)) {
    return ENTRY_TYPE.MAFIA.MISC_LOG;
  }

  // -- common
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

  if (isEntryEquip(entryString)) {
    return ENTRY_TYPE.EQUIP;
  }

  if (isEntrySpellCast(entryString)) {
    return ENTRY_TYPE.SPELL_CAST;
  }

  if (isEntryTransaction(entryString)) {
    return ENTRY_TYPE.TRANSACTION;
  }

  if (isEntryTalking(entryString)) {
    return ENTRY_TYPE.TALKING;
  }

  if (isEntryVisiting(entryString)) {
    return ENTRY_TYPE.VISITING;
  }

  return ENTRY_TYPE.UNKNOWN;
}
/**
 * check if this is some random mafia string
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryMafiaMisc(entryString) {
  return hasString(entryString, REGEX.MISC.MAFIA_MAXIMIZER);
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
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryDayInfo(entryString) {
  return hasString(entryString, REGEX.SNAPSHOT_CHECK.CONTAIN_MOON) 
    || hasString(entryString, REGEX.SNAPSHOT_CHECK.CONTAIN_STATUS)
    || hasString(entryString, REGEX.SNAPSHOT_CHECK.CONTAIN_EQUIPMENT)
    || hasString(entryString, REGEX.SNAPSHOT_CHECK.CONTAIN_EFFECTS)
    || hasString(entryString, REGEX.SNAPSHOT_CHECK.CONTAIN_MODIFIERS);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntrySkillBreakdown(entryString) {
  return hasString(entryString, REGEX.SNAPSHOT_CHECK.CONTAIN_SKILLS);
}
/**
 * check if this entry is about buying something
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryTransaction(entryString) {
  return hasString(entryString, REGEX.VALUE.BUY_ITEM_AMOUNT) 
    || isEntryAutosell(entryString);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryTalking(entryString) {
  return hasString(entryString, REGEX.LINE.TALKING);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryVisiting(entryString) {
  return hasString(entryString, REGEX.LINE.VISITING);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryAutosell(entryString) {
  return hasString(entryString, REGEX.LINE.AUTOSELL);
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
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryEquip(entryString) {
  return hasString(entryString, REGEX.VALUE.EQUIP_TARGETS);
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
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryBastilleBatallion(entryString) {
  return hasString(entryString, 'Bastille Battalion');
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryJanuarysGarbageTote(entryString) {
  return hasString(entryString, REGEX.JANUARYS_GARBAGE_TOTE.USE_FOLDABLE)
    || hasString(entryString, REGEX.JANUARYS_GARBAGE_TOTE.USE_RESULT);
}
/**
 * will be counting rumpus room also
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryClanVIP(entryString) {
  return hasString(entryString, REGEX.LINE.CLAN_VISIT);
}
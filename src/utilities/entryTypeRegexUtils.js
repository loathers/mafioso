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
  // -- iotm
  if (isEntryCatBurglarHeist(entryString)) {
    return ENTRY_TYPE.IOTM.CAT_BURGLAR;
  }

  if (isEntryJanuarysGarbageTote(entryString)) {
    return ENTRY_TYPE.IOTM.GARBAGE_TOTE;
  }

  if (isEntryClanVIP(entryString)) {
    return ENTRY_TYPE.CLAN_VISIT;
  }

  if (isEntryPillKeeper(entryString)) {
    return ENTRY_TYPE.IOTM.PILLKEEPER;
  }

  if (isEntryPirateRealm(entryString)) {
    return ENTRY_TYPE.IOTM.PIRATEREALM;
  }

  if (isEntryBoombox(entryString)) {
    return ENTRY_TYPE.IOTM.SONGBOOM_BOOMBOX;
  }

  if (isEntryVotingBooth(entryString)) {
    return ENTRY_TYPE.IOTM.VOTING_BOOTH;
  }

  if (isEntryGodLobsterCombat(entryString)) {
    return ENTRY_TYPE.IOTM.GOD_LOBSTER.COMBAT;
  }

  if (isEntryGodLobsterBoon(entryString)) {
    return ENTRY_TYPE.IOTM.GOD_LOBSTER.BOON;
  }

  // -- common
  if (isEntryEat(entryString)) {
    return ENTRY_TYPE.CONSUMPTION.EAT;
  }

  if (isEntryDrink(entryString)) {
    return ENTRY_TYPE.CONSUMPTION.DRINK;
  }

  if (isEntryChew(entryString)) {
    return ENTRY_TYPE.CONSUMPTION.CHEW;
  }

  if (isEntryFamiliar(entryString)) {
    return ENTRY_TYPE.FAMILIAR;
  }

  if (isEntryHagnkPull(entryString)) {
    return ENTRY_TYPE.ITEMS.HAGNK_PULL;
  }

  if (isEntryEquip(entryString)) {
    return ENTRY_TYPE.ITEMS.EQUIP;
  }

  if (isEntryUnequip(entryString)) {
    return ENTRY_TYPE.ITEMS.UNEQUIP;
  }

  if (isEntryCombine(entryString)) {
    return ENTRY_TYPE.ITEMS.COMBINE;
  }

  if (isEntryCook(entryString)) {
    return ENTRY_TYPE.ITEMS.COOK;
  }

  if (isEntryCraft(entryString)) {
    return ENTRY_TYPE.ITEMS.CRAFT;
  }

  if (isEntryCreate(entryString)) {
    return ENTRY_TYPE.ITEMS.CREATE;
  }

  if (isEntryMix(entryString)) {
    return ENTRY_TYPE.ITEMS.MIX;
  }

  if (isEntryClosetPut(entryString)) {
    return ENTRY_TYPE.ITEMS.CLOSET_PUT;
  }

  if (isEntryClosetTake(entryString)) {
    return ENTRY_TYPE.ITEMS.CLOSET_TAKE;
  }

  if (isEntrySpellCast(entryString)) {
    return ENTRY_TYPE.EFFECTS.SPELL_CAST;
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
  
  if (isEntryPVP(entryString)) {
    return ENTRY_TYPE.PVP;
  }

  if (isEntryCombatEncounter(entryString)) {
    return ENTRY_TYPE.ENCOUNTER.COMBAT;
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
export function isEntryAutosell(entryString) {
  return hasString(entryString, REGEX.TRANSACTIONS.AUTOSELL);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryEat(entryString) {
  return hasString(entryString, REGEX.ITEMS.EAT_TARGET);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryDrink(entryString) {
  return hasString(entryString, REGEX.ITEMS.DRINK_TARGET);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryChew(entryString) {
  return hasString(entryString, REGEX.ITEMS.CHEW_TARGET);
}
/**
 * check if this entry is about buying something
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryTransaction(entryString) {
  return hasString(entryString, REGEX.TRANSACTIONS.SHOPPING) 
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
export function isEntryPVP(entryString) {
  return hasString(entryString, REGEX.GROUP.PVP_ATTACK);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryFamiliar(entryString) {
  if (hasString(entryString, REGEX.LINE.FAMILIAR_WEIGHT_GAIN)) {
    if (!isEntryCombatEncounter(entryString)) {
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
export function isEntryCombine(entryString) {
  return hasString(entryString, REGEX.ITEMS.COMBINE_LINE);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryCook(entryString) {
  return hasString(entryString, REGEX.ITEMS.COOK_LINE);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryCraft(entryString) {
  return hasString(entryString, REGEX.ITEMS.CRAFT_LINE);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryCreate(entryString) {
  return hasString(entryString, REGEX.ITEMS.CREATE_LINE);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryMix(entryString) {
  return hasString(entryString, REGEX.ITEMS.MIX_LINE);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryHagnkPull(entryString) {
  return hasString(entryString, REGEX.ITEMS.HAGNK_PULL_LINE);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryClosetPut(entryString) {
  return hasString(entryString, REGEX.ITEMS.CLOSET_PUT_TARGETS);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryClosetTake(entryString) {
  return hasString(entryString, REGEX.ITEMS.CLOSET_TAKE_TARGETS);
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
  return hasString(entryString, REGEX.COMBAT.INITIATIVE_LINE);
}
/**
 * check if entry is a noncombat
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryNonCombatEncounter(entryString) {
  return hasString(entryString, REGEX.VALUE.NONCOMBAT_NAME) 
    && !isEntryCombatEncounter(entryString) 
    && !isEntryMafiaMisc(entryString);
}
// -- iotm
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryCatBurglarHeist(entryString) {
  return hasString(entryString, REGEX.CAT_BURGLAR.HEISTED);
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
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryBoombox(entryString) {
  return hasString(entryString, REGEX.SONGBOOM_BOOMBOX.RESULT);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryPillKeeper(entryString) {
  return hasString(entryString, REGEX.PILL_KEEPER.CHOICE_LINE);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryPirateRealm(entryString) {
  return hasString(entryString, REGEX.PIRATEREALM.LOCATION);
}
/**
 * will be counting rumpus room also
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryVotingBooth(entryString) {
  return hasString(entryString, REGEX.VOTING_BOOTH.DAILY_VOTE_TEXT);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryGodLobsterCombat(entryString) {
  return hasString(entryString, REGEX.GOD_LOBSTER.COMBAT);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryGodLobsterBoon(entryString) {
  return hasString(entryString, REGEX.GOD_LOBSTER.BOON);
}
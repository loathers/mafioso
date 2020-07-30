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
  if (isEntryBoxingDaycare(entryString)) {
    return ENTRY_TYPE.IOTM.BOXING_DAYCARE;
  }

  if (isEntryDeckOfEveryCard(entryString)) {
    return ENTRY_TYPE.IOTM.DECK_OF_EVERY_CARD;
  }

  if (isEntryDiabolicPizzaMake(entryString)) {
    return ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.MAKE;
  }

  if (isEntryDiabolicPizzaEat(entryString)) {
    return ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.EAT;
  }

  if (isEntryDistantWoodsGetaway(entryString)) {
    return ENTRY_TYPE.IOTM.DISTANT_WOODS_GETAWAY;
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
    return ENTRY_TYPE.CLAN_VISIT;
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
  return hasString(entryString, REGEX.TRANSACTIONS.BUY_ITEM_AMOUNT) 
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
  return hasString(entryString, REGEX.LINE.COMBAT_INIT);
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
export function isEntryBoxingDaycare(entryString) {
  return hasString(entryString, REGEX.BOXING_DAYCARE.NONCOMBAT);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryDeckOfEveryCard(entryString) {
  return hasString(entryString, REGEX.DECK_OF_EVERY_CARD.TEXT);
}
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
export function isEntryDistantWoodsGetaway(entryString) {
  return hasString(entryString, REGEX.DISTANCE_WOODS_GETAWAY.GAZING_LINE);
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
  return hasString(entryString, REGEX.BASTILLE_BATALLION.TEXT);
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
  return hasString(entryString, REGEX.SONGBOOM_BOOMBOX.GROUPING);
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
  return hasString(entryString, REGEX.VOTING_BOOTH.GROUPING);
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
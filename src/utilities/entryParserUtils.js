import REGEX from 'constants/regexes';

import {
  hasString,
  getRegexMatch,
} from 'utilities/regexUtils';
import * as logParserUtils from 'utilities/logParserUtils';

/**
 * core parsing function to do it all
 * 
 * @param {String} entryString
 * @return {Array<LogEntry>}
 */
export function parseEntry(entryString) {
  const turnNum = parseTurnNum(entryString);
  const locationName = parseLocationName(entryString);
  const encounterName = parseEncounterName(entryString);
  const combatActions = parseCombatActions(entryString);
  const acquiredItems = parseAcquiredItems(entryString);
  const acquiredEffects = parseAcquiredEffects(entryString);
  const meatChange = parseMeatChange(entryString);

  return {
    turnNum,
    isFreeAdv: parseIsFreeAdv(entryString),
    locationName,
    encounterName,
    isCombatEncounter: parseIsCombatEncounter(entryString),
    isNoncombatEncounter: parseIsNonCombatEncounter(entryString),
    combatActions,
    acquiredItems,
    acquiredEffects,
    meatChange,
    hasInitiative: hasInitiative(entryString),
    isVictory: parseCombatVictory(entryString),
    isDeath: parseCombatLoss(entryString),
    isLevelUp: parseIsLevelUp(entryString),
  }
}
/**
 * core parsing function to do it all
 * 
 * @param {String} entryString
 * @return {Array<LogEntry>}
 */
export function parseEntrySpecial(entryString) {
  return {
    isEndedByUseTheForce: isUseTheForce(entryString),
    diabolicPizzaIngredients: parseMakeDiabolicPizza(entryString),
  }
}
/**
 * scrub the main text of data that will be
 *  displayed for things I haven't implemented
 * 
 * @param {String} entryString
 * @return {String}
 */
export function createEntryBody(entryString) {
  const replacementList = [
    REGEX.LINE.LOCATION,
    REGEX.LINE.ENCOUNTER,
    REGEX.LINE.LEVEL_GAIN,
    REGEX.LINE.COMBAT_FREE_TURN,
    REGEX.LINE.COMBAT_INIT,
    REGEX.LINE.COMBAT_ACTION_ROUND,
    REGEX.LINE.COMBAT_VICTORY,
    REGEX.LINE.FAMILIAR_WEIGHT_GAIN,
    REGEX.LINE.ACQUIRED_SOMETHING,
    REGEX.LINE.MAFIA_MAXIMIZER_CLI,
    REGEX.LINE.MAFIA_ACTION_URL,
    REGEX.MISC.COMBAT_MACRO,
    REGEX.DIABOLIC_PIZZA.INGREDIENTS_LINE,
    REGEX.DIABOLIC_PIZZA.EAT_LINE,
  ];

  return replacementList.reduce((currentString, replacementRegex) => {
    return currentString.replace(replacementRegex, '');
  }, entryString);
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
  const turnNumMatches = getRegexMatch(entryString, REGEX.VALUE.TURN_NUM);
  if (turnNumMatches === null) {
    return -1;
  }
  return Number(turnNumMatches[0]);
}
/**
 * parses name of the location,
 *  typically first line after "[num] "
 * 
 * @param {String} entryString
 * @return {String | null}
 */
export function parseLocationName(entryString) {
  if (isEntryBeachComb(entryString)) {
    return 'Beach Comb';
  }

  const locationNameMatches = getRegexMatch(entryString, REGEX.VALUE.LOCATION_NAME);
  if (locationNameMatches !== null) {
    return locationNameMatches[0];
  }

  const shopLocationMatches = getRegexMatch(entryString, REGEX.VALUE.SHOP_LOCATION_NAME);
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
  if (isEntryBeachComb(entryString)) {
    return getRegexMatch(entryString, REGEX.BEACH_COMB.COMBING_ACTION);
  }

  const encounterNameMatches = getRegexMatch(entryString, REGEX.VALUE.ENCOUNTER_NAME);
  if (encounterNameMatches === null) {
    return null;
  }
  return encounterNameMatches[0];
}
/**
 * builds an array of attacks/skills/etc used in combat
 *  includes: initiative, combat victory
 * 
 * @param {String} entryString
 * @return {Array<String>}
 */
export function parseCombatActions(entryString) {
  if (!parseIsCombatEncounter(entryString)) {
    return [];
  }

  const combatRoundsString = getRegexMatch(entryString, REGEX.LINE.COMBAT_ACTION_ROUND);
  if (combatRoundsString === null) {
    return [];
  }

  const combatActionsList = combatRoundsString.map((attackRoundString) => {
    const roundNum = getRegexMatch(attackRoundString, REGEX.VALUE.COMBAT_ROUND);
    const attackActionName = parseAttackName(attackRoundString);
    return {
      actionName: attackActionName,
      roundNum,
    };
  });

  return combatActionsList;
}
/**
 * builds an array of all the items that were gained
 * 
 * @param {String} entryString
 * @return {Array<String>}
 */
export function parseAttackName(entryString) {
  const combatSkillNames = getRegexMatch(entryString, REGEX.VALUE.COMBAT_SKILL_NAMES);
  if (combatSkillNames) {
    return combatSkillNames[0];
  }

  const combatAttacks = getRegexMatch(entryString, REGEX.VALUE.COMBAT_ATTACKS);
  if (combatAttacks) {
    return 'ATTACK';
  }

  return 'unknown attack';
}
/**
 * builds an array of all the items that were gained
 * 
 * @param {String} entryString
 * @return {Array<String>}
 */
export function parseAcquiredItems(entryString) {
  const singleAcquireMatches = getRegexMatch(entryString, REGEX.VALUE.FOUND_AN_ITEM) || [];

  // const ACQUIRED_MULTIPLE_ITEM_REGEX = /(?<=(You acquire\s+))(.*)(?=\s\({1}\d*\){1})/g; // item excluding amount
  // const ACQUIRED_MULTI_ITEM_AMOUNT_REGEX = /(?!\()\d*(?=\))/; // just the amount
  // const ACQUIRED_MULTIPLE_ITEM_REGEX = /(?<=(You acquire\s+))(.*\(\d*\))/g; // item including amount
  const multiAcquireMatches = getRegexMatch(entryString, REGEX.VALUE.FOUND_MULTIPLE_ITEMS) || [];

  return singleAcquireMatches.concat(multiAcquireMatches);
}
/**
 * builds an array of all the effects that were gained
 * 
 * @param {String} entryString
 * @return {Array<String>}
 */
export function parseAcquiredEffects(entryString) {
  return getRegexMatch(entryString, REGEX.VALUE.ACQUIRED_EFFECTS) || [];
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
  const buyAmountMatches = getRegexMatch(entryString, REGEX.VALUE.BUY_ITEM_AMOUNT);
  if (buyAmountMatches === null) {
    return 0;
  }

  const buyCostMatches = getRegexMatch(entryString, REGEX.VALUE.BUY_ITEM_COST);
  if (buyCostMatches === null) {
    return 0;
  }

  const buyAmount = Number(buyAmountMatches[0]);
  const buyCost = Number(buyCostMatches[0]);
  return buyAmount * -buyCost;
}
// -- boolean parsers
/**
 * determine if this is a free adventure
 * 
 * @param {String} entryString
 * @return {String}
 */
export function parseIsFreeAdv(entryString) {
  if (isUseTheForce(entryString)) {
    return true;
  }

  return hasString(entryString, REGEX.LINE.COMBAT_FREE_TURN);
}
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
  return hasString(entryString, REGEX.LINE.COMBAT_VICTORY);
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

  // combat is counted as a loss if not a victory
  //  except in the case that there was a free runaway/banish used
  return !parseIsFreeAdv(entryString) && !parseCombatVictory(entryString);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function hasInitiative(entryString) {
  // only want to check if combat
  if (!parseIsCombatEncounter(entryString)) {
    return false;
  }

  if (hasString(entryString, REGEX.LINE.COMBAT_WIN_INIT)) {
    return true;
  }

  if (hasString(entryString, REGEX.LINE.COMBAT_LOSE_INIT)) {
    return false;
  }
}
/**
 * did we gain a level somewhere
 * @param {String} entryString
 * @return {Boolean}
 */
export function parseIsLevelUp(entryString) {
  return hasString(entryString, REGEX.LINE.LEVEL_GAIN);
}
// -- special data parsers
/**
 * @param {String} entryString
 * @return {String}
 */
export function isUseTheForce(entryString) {
  return hasString(entryString, REGEX.LINE.COMBAT_SKILL_USE_THE_FORCE);
}
/**
 * @param {String} entryString
 * @return {Array<String>}
 */
export function parseMakeDiabolicPizza(entryString) {
  const ingredientsLine = getRegexMatch(entryString, REGEX.DIABOLIC_PIZZA.INGREDIENTS_ONLY);
  if (ingredientsLine === null) {
    return [];
  }

  const ingredientsArray = ingredientsLine[0].split(', ');
  return ingredientsArray;
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryBeachComb(entryString) {
  return hasString(entryString, REGEX.BEACH_COMB.COMBING_LINE);
}
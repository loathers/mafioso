import {DISPLAY_SCRUB_LIST} from 'constants/DEFAULTS';
import REGEX, {EMPTY_LINES_REGEX} from 'constants/regexes';
import {
  hasString,
  getRegexMatch,
} from 'utilities/regexUtils';
import * as entryTypeRegexUtils from 'utilities/entryTypeRegexUtils';

/**
 * core parsing data for common entry data
 * 
 * @param {String} entryString
 * @return {Array<LogEntry>}
 */
export function parseCommonData(entryString) {
  const turnNum = parseTurnNum(entryString);
  const locationName = parseLocationName(entryString);
  const encounterName = parseEncounterName(entryString);
  const acquiredItems = parseAcquiredItems(entryString);
  const acquiredEffects = parseAcquiredEffects(entryString);
  const meatChange = parseMeatChange(entryString);

  return {
    turnNum,
    isFreeAdv: isFreeAdv(entryString),
    locationName,
    encounterName,
    isCombatEncounter: isCombatEncounter(entryString),
    isNoncombatEncounter: isNoncombatEncounter(entryString),
    acquiredItems,
    acquiredEffects,
    meatChange,
  }
}
/**
 * parsing for stat related data
 * 
 * @param {String} entryString
 * @return {Array<LogEntry>}
 */
export function parseStatData(entryString) {
  return {
    isLevelUp: isLevelUp(entryString),
    isMusUp: isMusUp(entryString),
    isMystUp: isMystUp(entryString),
    isMoxUp: isMoxUp(entryString),
    musExpChanges: parseMusSubstats(entryString),
    mystExpChanges: parseMystSubstats(entryString),
    moxExpChanges: parseMoxSubstats(entryString),
  }
}
/**
 * parsing for combat related data
 * 
 * @param {String} entryString
 * @return {Array<LogEntry>}
 */
export function parseCombatData(entryString) {
  return {
    combatActions: parseCombatActions(entryString),
    hasInitiative: hasInitiative(entryString),
    isVictory: parseCombatVictory(entryString),
    isDeath: parseCombatLoss(entryString),
  }
}
/**
 * parsing special data
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
  return DISPLAY_SCRUB_LIST.reduce((currentString, replacementRegex) => {
    return currentString.replace(replacementRegex, '');
  }, entryString).replace(EMPTY_LINES_REGEX, '\n');
}
// -- common parsers
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
 * determine if this is a free adventure
 * 
 * @param {String} entryString
 * @return {String}
 */
export function isFreeAdv(entryString) {
  if (isUseTheForce(entryString)) {
    return true;
  }

  return hasString(entryString, REGEX.LINE.COMBAT_FREE_TURN);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isCombatEncounter(entryString) {
  return entryTypeRegexUtils.isEntryCombatEncounter(entryString);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isNoncombatEncounter(entryString) {
  return entryTypeRegexUtils.isEntryNonCombatEncounter(entryString);
}
/**
 * parses name of the location,
 *  typically first line after "[num] "
 * 
 * @param {String} entryString
 * @return {String | null}
 */
export function parseLocationName(entryString) {
  const locationNameMatches = getRegexMatch(entryString, REGEX.VALUE.LOCATION_NAME);
  if (locationNameMatches !== null) {
    return locationNameMatches[0];
  }

  const shopLocationMatches = getRegexMatch(entryString, REGEX.VALUE.SHOP_LOCATION_NAME);
  if (shopLocationMatches !== null) {
    return shopLocationMatches[0];
  }

  const visitLocationMatches = getRegexMatch(entryString, REGEX.VALUE.VISIT_LOCATION_NAME);
  if (visitLocationMatches !== null) {
    return visitLocationMatches[0];
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
  if (encounterNameMatches !== null) {
    return encounterNameMatches[0];
  }

  return null;
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

  const meatGainsArray = parseMeatGains(entryString);
  const meatGainedAmount = meatGainsArray.reduce((gainTotal, gainAmount) => (gainTotal + gainAmount), 0);

  const meatLossArray = parseMeatLoss(entryString);
  const meatLossAmount = meatLossArray.reduce((lossTotal, lossAmount) => (lossTotal + lossAmount), 0);

  return meatSpentAmount + meatGainedAmount + meatLossAmount;
}
/**
 * @param {String} entryString
 * @return {Array<Number>}
 */
export function parseMeatGains(entryString) {
  const meatGainMatches = getRegexMatch(entryString, REGEX.VALUE.MEAT_GAIN_AMOUNT) || [];
  return meatGainMatches.map((amountString) => Number(amountString.replace(',', '')));
}
/**
 * @param {String} entryString
 * @return {Array<Number>}
 */
export function parseMeatLoss(entryString) {
  const meatLossMatches = getRegexMatch(entryString, REGEX.VALUE.MEAT_LOSS_AMOUNT) || [];
  return meatLossMatches.map((amountString) => Number(amountString.replace(',', '') * -1));
}
/**
 * @param {String} entryString
 * @return {Number}
 */
export function parseMeatSpent(entryString) {
  const buyAmountMatches = getRegexMatch(entryString, REGEX.VALUE.BUY_ITEM_AMOUNT) || [];
  const buyCostMatches = getRegexMatch(entryString, REGEX.VALUE.BUY_ITEM_COST) || [];
  if (buyAmountMatches.length !== buyCostMatches.length) {
    console.warn('There may be some data missing from parsing how much meat was spent.');
  }

  const spentTotal = buyAmountMatches.reduce((meatTotal, buyAmountString, idx) => {
    const buyCostString = buyCostMatches[idx] || 0;
    return meatTotal + Number(buyAmountString) * -Number(buyCostString);
  }, 0)

  return spentTotal;
}
// -- stat parsers
/**
 * did we gain a level somewhere
 * @param {String} entryString
 * @return {Boolean}
 */
export function isLevelUp(entryString) {
  return hasString(entryString, REGEX.LINE.LEVEL_GAIN);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isMusUp(entryString) {
  return hasString(entryString, REGEX.LINE.MUS_GAINS);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isMystUp(entryString) {
  return hasString(entryString, REGEX.LINE.MYST_GAINS);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isMoxUp(entryString) {
  return hasString(entryString, REGEX.LINE.MOX_GAINS);
}
/**
 * @param {String} entryString
 * @return {Array<Number>}
 */
export function parseMusSubstats(entryString) {
  const expGains = getRegexMatch(entryString, REGEX.VALUE.MUS_EXP_GAINS) || [];
  const expLosses = getRegexMatch(entryString, REGEX.VALUE.MUS_EXP_LOSSES) || [];
  return expGains.concat(expLosses).map((changeString) => Number(changeString));
}
/**
 * @param {String} entryString
 * @return {Array<Number>}
 */
export function parseMystSubstats(entryString) {
  const expGains = getRegexMatch(entryString, REGEX.VALUE.MYST_EXP_GAINS) || [];
  const expLosses = getRegexMatch(entryString, REGEX.VALUE.MYST_EXP_LOSSES) || [];
  return expGains.concat(expLosses).map((changeString) => Number(changeString));
}
/**
 * @param {String} entryString
 * @return {Array<Number>}
 */
export function parseMoxSubstats(entryString) {
  const expGains = getRegexMatch(entryString, REGEX.VALUE.MOX_EXP_GAINS) || [];
  const expLosses = getRegexMatch(entryString, REGEX.VALUE.MOX_EXP_LOSSES) || [];
  return expGains.concat(expLosses).map((changeString) => Number(changeString));
}
// -- combat parsers
/**
 * builds an array of attacks/skills/etc used in combat
 *  includes: initiative, combat victory
 * 
 * @param {String} entryString
 * @return {Array<String>}
 */
export function parseCombatActions(entryString) {
  if (!isCombatEncounter(entryString)) {
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
 * @param {String} entryString
 * @return {Boolean}
 */
export function hasInitiative(entryString) {
  // only want to check if combat
  if (!isCombatEncounter(entryString)) {
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
 * builds an array of all the items that were gained
 * 
 * @param {String} entryString
 * @return {Array<String>}
 */
export function parseAttackName(entryString) {
  const songboomSingAlong = getRegexMatch(entryString, REGEX.SONGBOOM_BOOMBOX.SING_ALONG);
  if (songboomSingAlong) {
    return `♫ ${songboomSingAlong[0]} ♫`;
  }

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
  if (!isCombatEncounter(entryString)) {
    return false;
  }

  // combat is counted as a loss if not a victory
  //  except in the case that there was a free runaway/banish used
  return !isFreeAdv(entryString) && !parseCombatVictory(entryString);
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
 * @return {Boolean}
 */
export function isEntryBeachComb(entryString) {
  return hasString(entryString, REGEX.BEACH_COMB.COMBING_LINE);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isEntryDiabolicPizza(entryString) {
  // console.log(hasString(entryString, REGEX.DIABOLIC_PIZZA.INGREDIENTS_LINE));
  return hasString(entryString, REGEX.DIABOLIC_PIZZA.INGREDIENTS_LINE) || hasString(entryString, REGEX.DIABOLIC_PIZZA.EAT_LINE);
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
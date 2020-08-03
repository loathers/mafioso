import ListItem from 'classes/ListItem';

import {DISPLAY_SCRUB_LIST} from 'constants/DEFAULTS';
import {ENTRY_DATA_MAP, ENTRY_MAP_KEYS, UNKNOWN_ENTRY_DATA} from 'constants/ENTRY_DATA_MAP';
// import ENTRY_TYPE from 'constants/ENTRY_TYPE';
import REGEX from 'constants/REGEXES';
import * as TRACKERS from 'constants/TRACKERS';

import {
  hasString,
  getRegexMatch,
} from 'utilities/regexUtils';

/**
 * @param {String} entryString
 * @return {EntryData}
 */
export function getEntryData(entryString) {
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
  });

  if (foundEntryType) {
    return {
      type: foundEntryType,
      ...ENTRY_DATA_MAP[foundEntryType],
    };
  }

  // did not find EntryData via this method
  return UNKNOWN_ENTRY_DATA;
}
/**
 * core parsing for attributes of an entry
 * 
 * @param {String} entryString
 * @return {Array<Entry>}
 */
export function parseAttributes(entryString) {
  return {
    ...parseCommonAttributes(entryString),
    ...parseStatAttributes(entryString),
    ...parseCombatAttributes(entryString),
    ...parseSpecialAttributes(entryString),
  }
}
/**
 * parse some of the common entry attributes
 * 
 * @param {String} entryString
 * @return {Array<Entry>}
 */
export function parseCommonAttributes(entryString) {
  const turnNum = parseTurnNum(entryString);
  const locationName = parseLocationName(entryString);
  const encounterName = parseEncounterName(entryString);

  const acquiredItems = parseAcquiredItems(entryString);
  const pulledItems = parsePulledItems(entryString);
  const astralItems = parseAstralShopping(entryString);

  const acquiredEffects = parseAcquiredEffects(entryString);
  const meatChange = parseMeatChange(entryString);

  return {
    turnNum,
    isFreeAdv: isFreeAdv(entryString),
    adventureChanges: parseAdventureChanges(entryString),
    locationName,
    encounterName,
    isCombatEncounter: isCombatEncounter(entryString),
    isNonCombatEncounter: isNonCombatEncounter(entryString),
    acquiredItems: astralItems.concat(pulledItems.concat(acquiredItems)),
    acquiredEffects,
    meatChange,
  }
}
/**
 * parsing for stat related data
 * 
 * @param {String} entryString
 * @return {Array<Entry>}
 */
export function parseStatAttributes(entryString) {
  return {
    isLevelUp: isLevelUp(entryString),
    isMusUp: isMusUp(entryString),
    isMystUp: isMystUp(entryString),
    isMoxUp: isMoxUp(entryString),
    musExpChanges: parseMusSubstats(entryString),
    mystExpChanges: parseMystSubstats(entryString),
    moxExpChanges: parseMoxSubstats(entryString),
    healthChanges: parseHealthChanges(entryString),
    manaChanges: parseManaChanges(entryString),
  }
}
/**
 * parsing for combat related data
 * 
 * @param {String} entryString
 * @return {Array<Entry>}
 */
export function parseCombatAttributes(entryString) {
  return {
    combatActions: parseCombatActions(entryString),
    hasInitiative: hasInitiative(entryString),
    isVictory: parseCombatVictory(entryString),
    isDeath: parseCombatLoss(entryString),
    attractors: parseAttractors(entryString),
    banisher: parseBanishers(entryString),
    copiers: parseCopiers(entryString),
    disintigrater: parseDisintigraters(entryString),
    replacers: parseReplacers(entryString),
    replacedEnemies: parseReplacedResults(entryString),
  }
}
/**
 * parsing special data
 * 
 * @param {String} entryString
 * @return {Array<Entry>}
 */
export function parseSpecialAttributes(entryString) {
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
  const scrubbedBody = DISPLAY_SCRUB_LIST.reduce((currentString, replacementRegex) => {
    return currentString.replace(replacementRegex, '');
  }, entryString);
  return scrubbedBody.replace(/(\r\n|\n)+/g, '\n');
}
/**
 * @param {String} entryString
 * @return {AscensionDifficulty | undefined}
 */
export function parseAscensionDifficulty(ascensionString) {
  const difficultyMatch = getRegexMatch(ascensionString, REGEX.ASCENSION.DIFFICULTY_NAME) || [];
  return difficultyMatch[0];
}
/**
 * @param {String} entryString
 * @return {AscensionDifficulty | undefined}
 */
export function parseAscensionPath(ascensionString) {
  const pathMatch = getRegexMatch(ascensionString, REGEX.ASCENSION.PATH_NAME) || [];
  return pathMatch[0];
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

  return hasString(entryString, REGEX.COMBAT.FREE_COMBAT);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isCombatEncounter(entryString) {
  return hasString(entryString, REGEX.COMBAT.INITIATIVE_LINE);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isNonCombatEncounter(entryString) {
  return hasString(entryString, REGEX.VALUE.NONCOMBAT_NAME) && !isCombatEncounter(entryString);
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
  // if monster was replaced, use the enemy that this eventually becomes
  const replacedResults = parseReplacedResults(entryString);
  if (replacedResults) {
    return replacedResults.pop();
  }

  const encounterNameMatches = getRegexMatch(entryString, REGEX.VALUE.ENCOUNTER_NAME);
  if (encounterNameMatches !== null) {
    return encounterNameMatches[0];
  }

  return null;
}
/**
 * @param {String} entryString
 * @return {Array<String>}
 */
export function parseAcquiredItems(entryString) {
  const acquiredItemLines = getRegexMatch(entryString, REGEX.ITEMS.ACQUIRED_ITEM_LINE) || [];
  return acquiredItemLines.map((acquiredItemString) => {
    const itemName = getRegexMatch(acquiredItemString, REGEX.ITEMS.ACQUIRED_ITEM_NAME) || [];
    const itemAmount = getRegexMatch(acquiredItemString, REGEX.ITEMS.ACQUIRED_ITEM_N) || [];
    if (!itemName[0]) {
      console.warn(`Unable to parse item name in: ${acquiredItemString}`);
    }

    return new ListItem({
      name: itemName[0].replace(/an item: /im, ''),
      amount: itemAmount[0] || 1,
    });
  });
}
/**
 * @param {String} entryString
 * @return {Array<String>}
 */
export function parseAstralShopping(entryString) {
  const acquiredItemLines = getRegexMatch(entryString, REGEX.ASCENSION.ASTRAL_SHOPPING_NAME) || [];
  return acquiredItemLines.map((astralItemName) => {
    return new ListItem({
      name: astralItemName,
      amount: 1,
    });
  })
}
/**
 * @param {String} entryString
 * @return {Array<String>}
 */
export function parsePulledItems(entryString) {
  const pulledItemLines = getRegexMatch(entryString, REGEX.ITEMS.HAGNK_PULL_LINE) || [];
  return pulledItemLines.map((acquiredItemString) => {
    const itemName = getRegexMatch(acquiredItemString, REGEX.ITEMS.HAGNK_PULL_NAME);
    const itemAmount = getRegexMatch(acquiredItemString, REGEX.ITEMS.HAGNK_PULL_AMOUNTS);
    if (!itemName[0]) {
      console.warn(`Unable to parse item name in: ${acquiredItemString}`);
    }

    return new ListItem({
      name: itemName[0],
      amount: itemAmount[0] || 1,
    });
  })
}
/**
 * builds an array of all the effects that were gained
 * 
 * @param {String} entryString
 * @return {Array<String>}
 */
export function parseAcquiredEffects(entryString) {
  const acquiredEffectLines = getRegexMatch(entryString, REGEX.EFFECTS.ACQUIRED_EFFECT_LINE) || [];
  return acquiredEffectLines.map((acquiredEffectString) => {
    const name = getRegexMatch(acquiredEffectString, REGEX.EFFECTS.EFFECT_NAME) || [];
    const duration = getRegexMatch(acquiredEffectString, REGEX.EFFECTS.EFFECT_DURATION) || [];
    if (!name[0]) {
      console.warn(`Unable to parse effect name in: ${acquiredEffectString}`);
    }

    return new ListItem({
      name: name[0],
      amount: duration[0] || 1,
    });
  })
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
  const meatGainMatches = getRegexMatch(entryString, REGEX.TRANSACTIONS.MEAT_GAIN_AMOUNT) || [];
  return meatGainMatches.map((amountString) => Number(amountString.replace(',', '')));
}
/**
 * @param {String} entryString
 * @return {Array<Number>}
 */
export function parseMeatLoss(entryString) {
  const meatLossMatches = getRegexMatch(entryString, REGEX.TRANSACTIONS.MEAT_LOSS_AMOUNT) || [];
  return meatLossMatches.map((amountString) => Number(amountString.replace(',', '') * -1));
}
/**
 * @param {String} entryString
 * @return {Number}
 */
export function parseMeatSpent(entryString) {
  const buyAmountMatches = getRegexMatch(entryString, REGEX.TRANSACTIONS.BUY_ITEM_AMOUNT) || [];
  const buyCostMatches = getRegexMatch(entryString, REGEX.TRANSACTIONS.BUY_ITEM_COST) || [];
  if (buyAmountMatches.length !== buyCostMatches.length) {
    console.warn('There may be some data missing from parsing how much meat was spent.', entryString);
  }

  const spentTotal = buyAmountMatches.reduce((meatTotal, buyAmountString, idx) => {
    const buyCostString = buyCostMatches[idx] || 0;
    return meatTotal + Number(buyAmountString) * -Number(buyCostString);
  }, 0)

  return spentTotal;
}
// -- stat parsers
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function parseAdventureChanges(entryString) {
  const advGains = getRegexMatch(entryString, REGEX.CHARACTER.ADV_GAINS) || [];
  const advLosses = getRegexMatch(entryString, REGEX.CHARACTER.ADV_LOSSES) || [];
  const negativeLosses = advLosses.map((advLoss) => (Number(advLoss) * -1));
  return advGains.concat(negativeLosses).map((changeString) => Number(changeString));
}
/**
 * did we gain a level somewhere
 * @param {String} entryString
 * @return {Boolean}
 */
export function isLevelUp(entryString) {
  return hasString(entryString, REGEX.CHARACTER.LEVEL_GAIN);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isMusUp(entryString) {
  return hasString(entryString, REGEX.CHARACTER.MUS_GAINS);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isMystUp(entryString) {
  return hasString(entryString, REGEX.CHARACTER.MYST_GAINS);
}
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function isMoxUp(entryString) {
  return hasString(entryString, REGEX.CHARACTER.MOX_GAINS);
}
/**
 * @param {String} entryString
 * @return {Array<Number>}
 */
export function parseMusSubstats(entryString) {
  const expGains = getRegexMatch(entryString, REGEX.CHARACTER.MUS_EXP_GAINS) || [];
  const expLosses = getRegexMatch(entryString, REGEX.CHARACTER.MUS_EXP_LOSSES) || [];
  return expGains.concat(expLosses).map((changeString) => Number(changeString));
}
/**
 * @param {String} entryString
 * @return {Array<Number>}
 */
export function parseMystSubstats(entryString) {
  const expGains = getRegexMatch(entryString, REGEX.CHARACTER.MYST_EXP_GAINS) || [];
  const expLosses = getRegexMatch(entryString, REGEX.CHARACTER.MYST_EXP_LOSSES) || [];
  return expGains.concat(expLosses).map((changeString) => Number(changeString));
}
/**
 * @param {String} entryString
 * @return {Array<Number>}
 */
export function parseMoxSubstats(entryString) {
  const expGains = getRegexMatch(entryString, REGEX.CHARACTER.MOX_EXP_GAINS) || [];
  const expLosses = getRegexMatch(entryString, REGEX.CHARACTER.MOX_EXP_LOSSES) || [];
  return expGains.concat(expLosses).map((changeString) => Number(changeString));
}
/**
 * @param {String} entryString
 * @return {Array<Number>}
 */
export function parseHealthChanges(entryString) {
  const hpGains = getRegexMatch(entryString, REGEX.CHARACTER.HP_GAINS) || [];
  const hpLosses = getRegexMatch(entryString, REGEX.CHARACTER.HP_LOSSES) || [];
  const negativeLosses = hpLosses.map((hpLoss) => (Number(hpLoss) * -1));
  return hpGains.concat(negativeLosses).map((changeString) => Number(changeString));
}
/**
 * @param {String} entryString
 * @return {Array<Number>}
 */
export function parseManaChanges(entryString) {
  const mpGains = getRegexMatch(entryString, REGEX.CHARACTER.MP_GAINS) || [];
  const mpLosses = getRegexMatch(entryString, REGEX.CHARACTER.MP_LOSSES) || [];
  const negativeLosses = mpLosses.map((mpLoss) => (Number(mpLoss) * -1));
  return mpGains.concat(negativeLosses).map((changeString) => Number(changeString));
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

  const combatRoundsString = getRegexMatch(entryString, REGEX.COMBAT.ACTION_ROUND) || [];
  const combatActionsList = combatRoundsString.map((roundString) => {
    const roundNum = getRegexMatch(roundString, REGEX.COMBAT.COMBAT_ROUND_NUM);
    const attackActionName = parseAttackName(roundString);
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

  if (hasString(entryString, REGEX.COMBAT.WIN_INIT)) {
    return true;
  }

  if (hasString(entryString, REGEX.COMBAT.LOSE_INIT)) {
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

  const combatSkillNames = getRegexMatch(entryString, REGEX.COMBAT.SKILL_NAME);
  if (combatSkillNames) {
    return combatSkillNames[0];
  }

  const combatAttacks = getRegexMatch(entryString, REGEX.COMBAT.ATTACK);
  if (combatAttacks) {
    return 'ATTACK';
  }

  const useItemName = getRegexMatch(entryString, REGEX.COMBAT.USE_COMBAT_ITEM_NAME);
  if (useItemName) {
    return useItemName[0].toUpperCase();
  }

  const tryToStealText = getRegexMatch(entryString, REGEX.COMBAT.TRY_TO_STEAL);
  if (tryToStealText) {
    return tryToStealText[0].toUpperCase();
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
  return hasString(entryString, REGEX.COMBAT.VICTORY_LINE) 
    || Boolean(parseDisintigraters(entryString));
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
/**
 * @param {String} entryString
 * @return {Array<Entity> | undefined | null}
 */
export function parseAttractors(entryString) {
  if (!isCombatEncounter(entryString)) {
    return null;
  }

  return TRACKERS.ATTRACTORS.filter((entity) => {  
    const match = getRegexMatch(entryString, entity.text, 'i');
    return Boolean(match);
  });
}
/**
 * @param {String} entryString
 * @return {Entity | undefined | null}
 */
export function parseBanishers(entryString) {
  if (!isCombatEncounter(entryString)) {
    return null;
  }

  return TRACKERS.BANISHERS.find((entity) => {
    const match = getRegexMatch(entryString, entity.text, 'i');
    return match && match[0];
  });
}
/**
 * @param {String} entryString
 * @return {Array<Entity> | undefined | null}
 */
export function parseCopiers(entryString) {
  if (!isCombatEncounter(entryString)) {
    return null;
  }

  return TRACKERS.COPIERS.filter((entity) => {  
    const match = getRegexMatch(entryString, entity.text, 'i');
    return Boolean(match);
  });
}
/**
 * @param {String} entryString
 * @return {Entity | undefined | null}
 */
export function parseDisintigraters(entryString) {
  if (!isCombatEncounter(entryString)) {
    return null;
  }

  return TRACKERS.DISINTIGRATERS.find((entity) => {
    const match = getRegexMatch(entryString, entity.text, 'i');
    return match && match[0];
  });
}
/**
 * @param {String} entryString
 * @return {Array<Entity> | undefined | null}
 */
export function parseReplacers(entryString) {
  if (!isCombatEncounter(entryString)) {
    return null;
  }

  return TRACKERS.REPLACERS.filter((entity) => {  
    const match = getRegexMatch(entryString, entity.text, 'i');
    return Boolean(match);
  });
}
/**
 * @param {String} entryString
 * @return {Array<String> | undefined | null}
 */
export function parseReplacedResults(entryString) {
  if (!isCombatEncounter(entryString)) {
    return null;
  }

  const originalEncounter = getRegexMatch(entryString, REGEX.VALUE.ENCOUNTER_NAME) || [];
  const replacedMatches = getRegexMatch(entryString, REGEX.COMBAT.REPLACED_NAME) || [];
  if (replacedMatches.length > 0) {
    // hard to regex "becomes a" and "becomes the" when I need to include The in the name,
    //  so this is the workaround
    const removeA = replacedMatches.map((match) => match.replace('a ', '')); 
    return originalEncounter.concat(removeA);
  }

  return null;
}
// -- special data parsers
/**
 * @param {String} entryString
 * @return {String}
 */
export function isUseTheForce(entryString) {
  return hasString(entryString, REGEX.FOURTH_OF_MAY_COSPLAY_SABER.USE_THE_FORCE_TEXT);
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
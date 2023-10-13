import ListItem from "../classes/ListItem";

import { ATTRACTORS } from "../constants/ATTRACTORS";
import { BANISHERS } from "../constants/BANISHERS";
import { COPIERS } from "../constants/COPIERS";
import { DISINTEGRATERS } from "../constants/DISINTEGRATERS";
import { REPLACERS } from "../constants/REPLACERS";
import { DISPLAY_SCRUB_LIST } from "../constants/DEFAULTS";
import {
  ENTRY_DATA,
  EntryData,
  UNKNOWN_ENTRY_DATA,
} from "../constants/ENTRY_DATA";
import ENTRY_TYPE from "../constants/ENTRY_TYPE";
import REGEX from "../constants/REGEXES";

import * as dataParser from "../helpers/dataParser";
import * as regexUtils from "./regexUtils";

export function getEntryData(entryString: string): EntryData {
  // json implementation
  const createdData = dataParser.matchEntryData(entryString);
  if (createdData.type !== ENTRY_TYPE.UNKNOWN) {
    return createdData;
  }

  // original implementation
  const foundEntryData = Object.entries(ENTRY_DATA).find(
    ([, entryTypeData]) => {
      const { matcher } = entryTypeData;
      if (matcher instanceof RegExp) {
        return regexUtils.hasString(entryString, matcher);
      } else if (Array.isArray(matcher)) {
        return matcher.some((matchRegex) =>
          regexUtils.hasString(entryString, matchRegex),
        );
      } else {
        return undefined;
      }
    },
  );

  if (foundEntryData) {
    return {
      showAdditionalDisplay: true,
      type: foundEntryData[0],
      ...foundEntryData[1],
    };
  }

  // did not find EntryData via this method
  return UNKNOWN_ENTRY_DATA;
}

export type Attributes = ReturnType<typeof parseAttributes> & {
  dayNum: number;
  estimatedTurnNum?: number;
  isInBetweenTurns: boolean;
  isForcedAdventure: boolean;
  familiarUsed: string | null;
  additionalDisplay: string | null;
  you_robot?: ReturnType<typeof parseYouRobotAttributes>;
};

/**
 * core parsing for attributes of an entry
 */
export function parseAttributes(entryString: string) {
  return {
    annotations: parseMafiosoAnnotations(entryString),
    ...parseCommonAttributes(entryString),
    ...parseStatAttributes(entryString),
    ...parseCombatAttributes(entryString),
    ...parseSpecialAttributes(entryString),
  };
}

/**
 * parse some of the common entry attributes
 */
export function parseCommonAttributes(entryString: string) {
  const rawTurnNum = parseRawTurnNum(entryString);
  const locationName = parseLocationName(entryString);
  const encounterName = parseEncounterName(entryString);

  const acquiredItems = parseAcquiredItems(entryString);
  const pulledItems = parsePulledItems(entryString);
  const astralItems = parseAstralShopping(entryString);

  const acquiredEffects = parseAcquiredEffects(entryString);
  const meatChange = parseMeatChange(entryString);

  return {
    rawTurnNum: rawTurnNum,
    adventureChanges: parseAdventureChanges(entryString),
    locationName,
    encounterName,
    choiceProgression: parseChoiceProgression(entryString),
    isCombatEncounter: isCombatEncounter(entryString),
    acquiredItems: astralItems.concat(pulledItems.concat(acquiredItems)),
    acquiredEffects,
    meatChange,
  };
}

/**
 * parsing for stat related data
 */
export function parseStatAttributes(entryString: string) {
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
  };
}

/**
 * parsing for combat related data
 */
export function parseCombatAttributes(entryString: string) {
  return {
    combatActions: parseCombatActions(entryString),
    hasInitiative: hasInitiative(entryString),
    attractors: parseAttractors(entryString),
    banisher: parseBanishers(entryString),
    copiers: parseCopiers(entryString),
    disintigrater: parseDisintigraters(entryString),
    replacers: parseReplacers(entryString),
    replacedEnemies: parseReplacedResults(entryString),
  };
}

/**
 * parsing special data
 */
export function parseSpecialAttributes(entryString: string) {
  return {
    isEndedByUseTheForce: isUseTheForce(entryString),
    diabolicPizzaIngredients: parseMakeDiabolicPizza(entryString),
  };
}

/**
 * parsing You, Robot path attributes
 */
export function parseYouRobotAttributes(entryString: string) {
  const scrapGain = (
    entryString.match(REGEX.YOU_ROBOT.SCRAP_GAIN) || []
  ).reduce((total, gain) => total + Number(gain), 0);
  const scrapLose = (
    entryString.match(REGEX.YOU_ROBOT.SCRAP_LOSE) || []
  ).reduce((total, loss) => total + Number(loss), 0);

  const energyGain = (
    entryString.match(REGEX.YOU_ROBOT.ENERGY_GAIN) || []
  ).reduce((total, gain) => total + Number(gain), 0);
  const energyLose = (
    entryString.match(REGEX.YOU_ROBOT.ENERGY_LOSE) || []
  ).reduce((total, loss) => total + Number(loss), 0);

  return {
    scrapChange: scrapGain - scrapLose,
    energyChange: energyGain - energyLose,
  };
}

/**
 * scrub the main text of data that will be
 *  displayed for things I haven't implemented
 */
export function createEntryBody(entryString: string) {
  const scrubbedBody = DISPLAY_SCRUB_LIST.reduce(
    (currentString, replacementRegex) => {
      if (!replacementRegex) return currentString;
      return currentString.replace(replacementRegex, "");
    },
    entryString,
  );
  return scrubbedBody.replace(/(\r\n|\n)+/g, "\n");
}

export function parseMafiosoAnnotations(entryString: string) {
  const annotationMatches = entryString.match(REGEX.MAFIOSO.LOG_COMMENTS);
  if (annotationMatches === null) {
    return null;
  }

  const annotations = annotationMatches.join("\n");
  return annotations.replace(/\/\//g, "");
}
// -- common parsers
/**
 * parses the adventure number
 *
 * @todo use previous adventure num if log does not have it
 */
export function parseRawTurnNum(entryString: string) {
  const turnNumMatches = regexUtils.getRegexMatch(
    entryString,
    REGEX.VALUE.TURN_NUM,
  );
  if (turnNumMatches === null) {
    return undefined;
  }

  return Number(turnNumMatches[0]);
}

export function isCombatEncounter(entryString: string) {
  return regexUtils.hasString(entryString, REGEX.COMBAT.INITIATIVE_LINE);
}

/**
 * parses name of the location,
 *  typically first line after "[num] "
 */
export function parseLocationName(entryString: string) {
  // for the typical tavern, I want to ignore all the individual squares
  if (
    regexUtils.getRegexMatch(
      entryString,
      REGEX.QUEST.TAVERN_CELLAR_LOCATION,
    ) !== null
  ) {
    return "The Typical Tavern Cellar";
  }

  // combine Daily Dungeon adventures as well
  if (
    regexUtils.getRegexMatch(
      entryString,
      REGEX.QUEST.DAILY_DUNGEON_LOCATION,
    ) !== null
  ) {
    return "The Daily Dungeon";
  }

  const locationNameMatches = regexUtils.getRegexMatch(
    entryString,
    REGEX.VALUE.LOCATION_NAME,
  );
  if (locationNameMatches !== null) {
    return locationNameMatches[0];
  }

  const shopLocationMatches = regexUtils.getRegexMatch(
    entryString,
    REGEX.VALUE.SHOP_LOCATION_NAME,
  );
  if (shopLocationMatches !== null) {
    return shopLocationMatches[0];
  }

  const visitLocationMatches = regexUtils.getRegexMatch(
    entryString,
    REGEX.VALUE.VISIT_LOCATION_NAME,
  );
  if (visitLocationMatches !== null) {
    return visitLocationMatches[0];
  }

  return null;
}

/**
 * parses name of the encounter,
 *  typically right after "Encounter: "
 */
export function parseEncounterName(entryString: string) {
  // if monster was replaced, use the enemy that this eventually becomes
  const replacedResults = parseReplacedResults(entryString);
  if (replacedResults) {
    return replacedResults.pop();
  }

  const encounterNameMatches = regexUtils.getRegexMatch(
    entryString,
    REGEX.VALUE.ENCOUNTER_NAME,
  );
  if (encounterNameMatches !== null) {
    return encounterNameMatches[0];
  }

  return null;
}

export function parseChoiceProgression(entryString: string) {
  const choiceMatches = regexUtils.getRegexMatch(
    entryString,
    REGEX.LINE.GENERIC_TOOK_CHOICE,
  );
  if (choiceMatches === null) {
    return [];
  }

  return choiceMatches
    .map((choiceText) => choiceText.match(REGEX.VALUE.TOOK_CHOICE_RESULT))
    .filter(Boolean);
}

export function parseAcquiredItems(entryString: string) {
  const acquiredItemLines =
    regexUtils.getRegexMatch(entryString, REGEX.ITEMS.ACQUIRED_ITEM_LINE) || [];
  return acquiredItemLines.map((acquiredItemString) => {
    const itemName =
      regexUtils.getRegexMatch(
        acquiredItemString,
        REGEX.ITEMS.ACQUIRED_ITEM_NAME,
      ) || [];
    const itemAmount =
      regexUtils.getRegexMatch(
        acquiredItemString,
        REGEX.ITEMS.ACQUIRED_ITEM_N,
      ) || [];
    if (!itemName[0]) {
      console.warn(`Unable to parse item name in: ${acquiredItemString}`);
    }

    return new ListItem(itemName[0]?.replace(/an item: /im, ""), itemAmount[0]);
  });
}
/**
 * @param {String} entryString
 * @return {Array<String>}
 */
export function parseAstralShopping(entryString: string) {
  const acquiredItemLines =
    regexUtils.getRegexMatch(
      entryString,
      REGEX.ASCENSION.ASTRAL_SHOPPING_NAME,
    ) || [];
  return acquiredItemLines.map((astralItemName) => {
    return new ListItem(astralItemName, 1);
  });
}

export function parsePulledItems(entryString: string) {
  const pulledItemLines =
    regexUtils.getRegexMatch(entryString, REGEX.ITEMS.HAGNK_PULL_LINE) || [];
  return pulledItemLines.map((acquiredItemString) => {
    const itemName = regexUtils.getRegexMatch(
      acquiredItemString,
      REGEX.ITEMS.HAGNK_PULL_NAME,
    );
    const itemAmount = regexUtils.getRegexMatch(
      acquiredItemString,
      REGEX.ITEMS.HAGNK_PULL_AMOUNTS,
    );
    if (!itemName || !itemAmount) {
      console.warn(`Unable to parse item name in: ${acquiredItemString}`);
    }

    return new ListItem(itemName?.[0], itemAmount?.[0]);
  });
}

/**
 * builds an array of all the effects that were gained
 */
export function parseAcquiredEffects(entryString: string) {
  const acquiredEffectLines =
    regexUtils.getRegexMatch(entryString, REGEX.EFFECTS.ACQUIRED_EFFECT_LINE) ||
    [];
  return acquiredEffectLines.map((acquiredEffectString) => {
    const name =
      regexUtils.getRegexMatch(
        acquiredEffectString,
        REGEX.EFFECTS.EFFECT_NAME,
      ) || [];
    const duration =
      regexUtils.getRegexMatch(
        acquiredEffectString,
        REGEX.EFFECTS.EFFECT_DURATION,
      ) || [];
    if (!name[0]) {
      console.warn(`Unable to parse effect name in: ${acquiredEffectString}`);
    }

    return new ListItem(name[0], duration[0]);
  });
}

/**
 * parses the amount of meat that was gained/lost
 */
export function parseMeatChange(entryString: string) {
  const meatSpentAmount = parseMeatSpent(entryString);

  const meatGainsArray = parseMeatGains(entryString);
  const meatGainedAmount = meatGainsArray.reduce(
    (gainTotal, gainAmount) => gainTotal + gainAmount,
    0,
  );

  const meatLossArray = parseMeatLoss(entryString);
  const meatLossAmount = meatLossArray.reduce(
    (lossTotal, lossAmount) => lossTotal + lossAmount,
    0,
  );

  return meatSpentAmount + meatGainedAmount + meatLossAmount;
}

export function parseMeatGains(entryString: string) {
  const meatGainMatches =
    regexUtils.getRegexMatch(
      entryString,
      REGEX.TRANSACTIONS.MEAT_GAIN_AMOUNT,
    ) || [];
  return meatGainMatches.map((amountString) =>
    Number(amountString.replace(",", "")),
  );
}
/**
 * @param {String} entryString
 * @return {Array<Number>}
 */
export function parseMeatLoss(entryString: string) {
  const meatLossMatches =
    regexUtils.getRegexMatch(
      entryString,
      REGEX.TRANSACTIONS.MEAT_LOSS_AMOUNT,
    ) || [];
  return meatLossMatches.map(
    (amountString) => Number(amountString.replace(",", "")) * -1,
  );
}
/**
 * @param {String} entryString
 * @return {Number}
 */
export function parseMeatSpent(entryString: string) {
  const buyAmountMatches =
    regexUtils.getRegexMatch(entryString, REGEX.TRANSACTIONS.BUY_ITEM_AMOUNT) ||
    [];
  const buyCostMatches =
    regexUtils.getRegexMatch(entryString, REGEX.TRANSACTIONS.BUY_ITEM_COST) ||
    [];
  if (buyAmountMatches.length !== buyCostMatches.length) {
    console.warn(
      "There may be some data missing from parsing how much meat was spent.",
      entryString,
    );
  }

  const spentTotal = buyAmountMatches.reduce(
    (meatTotal, buyAmountString, idx) => {
      const buyCostString = buyCostMatches[idx] || 0;
      return meatTotal + Number(buyAmountString) * -Number(buyCostString);
    },
    0,
  );

  return spentTotal;
}
// -- stat parsers
/**
 * @param {String} entryString
 * @return {Boolean}
 */
export function parseAdventureChanges(entryString: string) {
  const advGains =
    regexUtils.getRegexMatch(entryString, REGEX.CHARACTER.ADV_GAINS) ||
    ([] as string[]);
  const advLosses =
    regexUtils.getRegexMatch(entryString, REGEX.CHARACTER.ADV_LOSSES) || [];
  const negativeLosses = advLosses
    .map((advLoss) => Number(advLoss) * -1)
    .map((n) => n.toString());
  return advGains
    .concat(negativeLosses)
    .map((changeString) => Number(changeString));
}

/**
 * did we gain a level somewhere
 */
export function isLevelUp(entryString: string) {
  return regexUtils.hasString(entryString, REGEX.CHARACTER.LEVEL_GAIN);
}

export function isMusUp(entryString: string) {
  return regexUtils.hasString(entryString, REGEX.CHARACTER.MUS_GAINS);
}

export function isMystUp(entryString: string) {
  return regexUtils.hasString(entryString, REGEX.CHARACTER.MYST_GAINS);
}

export function isMoxUp(entryString: string) {
  return regexUtils.hasString(entryString, REGEX.CHARACTER.MOX_GAINS);
}

export function parseMusSubstats(entryString: string) {
  const expGains: string[] =
    regexUtils.getRegexMatch(entryString, REGEX.CHARACTER.MUS_EXP_GAINS) || [];
  const expLosses: string[] =
    regexUtils.getRegexMatch(entryString, REGEX.CHARACTER.MUS_EXP_LOSSES) || [];
  return expGains.concat(expLosses).map((changeString) => Number(changeString));
}

export function parseMystSubstats(entryString: string) {
  const expGains: string[] =
    regexUtils.getRegexMatch(entryString, REGEX.CHARACTER.MYST_EXP_GAINS) || [];
  const expLosses: string[] =
    regexUtils.getRegexMatch(entryString, REGEX.CHARACTER.MYST_EXP_LOSSES) ||
    [];
  return expGains.concat(expLosses).map((changeString) => Number(changeString));
}

export function parseMoxSubstats(entryString: string) {
  const expGains: string[] =
    regexUtils.getRegexMatch(entryString, REGEX.CHARACTER.MOX_EXP_GAINS) || [];
  const expLosses: string[] =
    regexUtils.getRegexMatch(entryString, REGEX.CHARACTER.MOX_EXP_LOSSES) || [];
  return expGains.concat(expLosses).map((changeString) => Number(changeString));
}

export function parseHealthChanges(entryString: string) {
  const hpGains: string[] =
    regexUtils.getRegexMatch(entryString, REGEX.CHARACTER.HP_GAINS) || [];
  const hpLosses: string[] =
    regexUtils.getRegexMatch(entryString, REGEX.CHARACTER.HP_LOSSES) || [];
  const negativeLosses = hpLosses
    .map((hpLoss) => Number(hpLoss) * -1)
    .map((n) => n.toString());
  return hpGains
    .concat(negativeLosses)
    .map((changeString) => Number(changeString));
}

export function parseManaChanges(entryString: string) {
  const mpGains: string[] =
    regexUtils.getRegexMatch(entryString, REGEX.CHARACTER.MP_GAINS) || [];
  const mpLosses: string[] =
    regexUtils.getRegexMatch(entryString, REGEX.CHARACTER.MP_LOSSES) || [];
  const negativeLosses = mpLosses
    .map((mpLoss) => Number(mpLoss) * -1)
    .map((n) => n.toString());
  return mpGains
    .concat(negativeLosses)
    .map((changeString) => Number(changeString));
}
// -- combat parsers
/**
 * builds an array of attacks/skills/etc used in combat
 *  includes: initiative, combat victory
 *
 * @param {String} entryString
 * @return {Array<String>}
 */
export function parseCombatActions(entryString: string) {
  if (!isCombatEncounter(entryString)) {
    return [];
  }

  const combatRoundsString =
    regexUtils.getRegexMatch(entryString, REGEX.COMBAT.ACTION_ROUND) || [];
  const combatActionsList = combatRoundsString.map((roundString) => {
    const roundNum = regexUtils.getRegexMatch(
      roundString,
      REGEX.COMBAT.COMBAT_ROUND_NUM,
    );
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
export function hasInitiative(entryString: string) {
  // only want to check if combat
  if (!isCombatEncounter(entryString)) {
    return false;
  }

  if (regexUtils.hasString(entryString, REGEX.COMBAT.WIN_INIT)) {
    return true;
  }

  if (regexUtils.hasString(entryString, REGEX.COMBAT.LOSE_INIT)) {
    return false;
  }
}
/**
 * builds an array of all the items that were gained
 *
 * @param {String} entryString
 * @return {Array<String>}
 */
export function parseAttackName(entryString: string) {
  const songboomSingAlong = regexUtils.getRegexMatch(
    entryString,
    REGEX.SONGBOOM_BOOMBOX.SING_ALONG,
  );
  if (songboomSingAlong) {
    return `♫ ${songboomSingAlong[0]} ♫`;
  }

  const combatSkillNames = regexUtils.getRegexMatch(
    entryString,
    REGEX.COMBAT.SKILL_NAME,
  );
  if (combatSkillNames) {
    return combatSkillNames[0];
  }

  const combatAttacks = regexUtils.getRegexMatch(
    entryString,
    REGEX.COMBAT.ATTACK,
  );
  if (combatAttacks) {
    return "ATTACK";
  }

  const useItemName = regexUtils.getRegexMatch(
    entryString,
    REGEX.COMBAT.USE_COMBAT_ITEM_NAME,
  );
  if (useItemName) {
    return useItemName[0].toUpperCase();
  }

  const tryToStealText = regexUtils.getRegexMatch(
    entryString,
    REGEX.COMBAT.TRY_TO_STEAL,
  );
  if (tryToStealText) {
    return tryToStealText[0].toUpperCase();
  }

  return "unknown attack";
}

type Entry = {
  matcher: RegExp;
  entityType: string;
};

function findInMap(entry: string, map: Record<string, Entry>) {
  return (
    Object.entries(map).find(([_k, v]) => {
      return regexUtils.findMatcher(entry, v.matcher);
    })?.[0] ?? null
  );
}

export function parseAttractors(entryString: string) {
  if (!isCombatEncounter(entryString)) {
    return null;
  }

  return findInMap(entryString, ATTRACTORS);
}

export function parseBanishers(entryString: string) {
  if (!isCombatEncounter(entryString)) {
    return null;
  }

  return findInMap(entryString, BANISHERS);
}
/**
 * @param {String} entryString
 * @return {Array<Entity> | undefined | null}
 */
export function parseCopiers(entryString: string) {
  if (!isCombatEncounter(entryString)) {
    return null;
  }

  return findInMap(entryString, COPIERS);
}

export function parseDisintigraters(entryString: string) {
  if (!isCombatEncounter(entryString)) {
    return null;
  }

  return findInMap(entryString, DISINTEGRATERS);
}

export function parseReplacers(entryString: string) {
  if (!isCombatEncounter(entryString)) {
    return null;
  }

  return findInMap(entryString, REPLACERS);
}

export function parseReplacedResults(entryString: string) {
  if (!isCombatEncounter(entryString)) {
    return null;
  }

  const originalEncounter: string[] =
    regexUtils.getRegexMatch(entryString, REGEX.VALUE.ENCOUNTER_NAME) || [];
  const replacedMatches: string[] =
    regexUtils.getRegexMatch(entryString, REGEX.COMBAT.REPLACED_NAME) || [];
  if (replacedMatches.length > 0) {
    // hard to regex "becomes a" and "becomes the" when I need to include The in the name,
    //  so this is the workaround
    const removeA = replacedMatches.map((match) => match.replace("a ", ""));
    return originalEncounter.concat(removeA);
  }

  return null;
}

export function isUseTheForce(entryString: string) {
  return regexUtils.hasString(
    entryString,
    REGEX.FOURTH_OF_MAY_COSPLAY_SABER.USE_THE_FORCE_TEXT,
  );
}

export function parseMakeDiabolicPizza(entryString: string) {
  const ingredientsLine = regexUtils.getRegexMatch(
    entryString,
    REGEX.DIABOLIC_PIZZA.INGREDIENTS_ONLY,
  );
  if (ingredientsLine === null) {
    return [];
  }

  const ingredientsArray = ingredientsLine[0].split(", ");
  return ingredientsArray;
}

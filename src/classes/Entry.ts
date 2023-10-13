import { CATEGORY_ID } from "../constants/CATEGORIES";
import { COMMUNITY_SERVICES } from "../constants/COMMUNITY_SERVICES";
import { COMBINABLE_ENTRIES_LIST } from "../constants/DEFAULTS";
import {
  CLOVER_ENCOUNTERS,
  SEMIRARE_ENCOUNTERS,
} from "../constants/ENCOUNTERS";
import { INSTAKILLS } from "../constants/INSTAKILLS";
import { RUNAWAYS } from "../constants/RUNAWAYS";
import { LATTE_EFFECTS } from "../constants/LATTE_EFFECTS";
import ENTRY_TYPE from "../constants/ENTRY_TYPE";
import REGEX, { NEW_LINE_REGEX } from "../constants/REGEXES";

import {
  Attributes,
  createEntryBody,
  getEntryData,
  parseAttributes,
  parseYouRobotAttributes,
} from "../utilities/entryParserUtils";
import { EntryData } from "../constants/ENTRY_DATA";
import * as regexUtils from "../utilities/regexUtils";
import { Matcher } from "../utilities/regexUtils";

type EntryConstructor = {
  entryId: string;
  entryIdx: number;
  rawText: string;
  config?: Record<string, any>;
};

export type EntryAttributes =
  | keyof Attributes
  | "entryType"
  | "isBanished"
  | "isReplaced"
  | "isAdventure"
  | "isSemirare"
  | "isNonCombatEncounter"
  | "hasPortscanEncounter"
  | "locationDisplay"
  | "isPillKeeper";

/**
 * @typedef {String} RawText - text extracted from the log
 * @typedef {String} EntryString - text after it has some formatting and clean up
 */
export default class Entry {
  id: string;
  entryIdx: number;
  entryData: EntryData;
  rawText: string;
  entryString: string;
  config: Record<string, any> & {
    isYouRobot: boolean;
  };
  attributes: Attributes;
  willRemoveAnnotation: boolean;

  constructor({ entryId, entryIdx, rawText, config = {} }: EntryConstructor) {
    this.id = entryId;
    this.entryIdx = entryIdx;
    this.entryData = getEntryData(rawText);

    this.rawText = rawText;
    this.entryString = regexUtils.fixSpecialEntities(rawText);

    this.config = {
      isYouRobot: false,
      ...config,
    };

    this.attributes = {
      annotations: null,
      dayNum: -1,
      rawTurnNum: undefined,
      estimatedTurnNum: undefined,
      isInBetweenTurns: false,
      adventureChanges: [],
      locationName: null,
      encounterName: null,
      choiceProgression: [],
      isCombatEncounter: false,
      isForcedAdventure: false,
      familiarUsed: null,
      acquiredItems: [],
      acquiredEffects: [],
      meatChange: 0,
      healthChanges: [],
      manaChanges: [],
      isLevelUp: false,
      isMusUp: false,
      isMystUp: false,
      isMoxUp: false,
      musExpChanges: [],
      mystExpChanges: [],
      moxExpChanges: [],
      hasInitiative: false,
      combatActions: [],
      replacedEnemies: [],
      additionalDisplay: null,
      attractors: null,
      banisher: null,
      copiers: null,
      disintigrater: null,
      replacers: null,
      isEndedByUseTheForce: false,
      diabolicPizzaIngredients: [],
      you_robot: {
        energyChange: 0,
        scrapChange: 0,
      },
    };

    this.willRemoveAnnotation = false;

    // start parsing we have the raw text
    if (rawText !== "" && Boolean(rawText)) {
      this.initialize();
    }
  }
  /**
   * once `entryString` is given we can set all the properties
   */
  initialize() {
    const parsedAttributes = parseAttributes(this.entryString);
    this.attributes = {
      ...this.attributes,
      ...parsedAttributes,
      locationName:
        this.entryData.locationName || parsedAttributes.locationName,
      encounterName:
        this.entryData.encounterName || parsedAttributes.encounterName,
    };

    // parse for you robot data if necessary
    if (this.config.isYouRobot) {
      this.attributes.you_robot = parseYouRobotAttributes(this.entryString);
    }
  }
  /** @type {EntryType} */
  get entryType() {
    return this.entryData.type;
  }
  /** @type {EntryType} */
  get categories() {
    return this.entryData.categories;
  }
  /** @type {Boolean} */
  get hasEntryData() {
    return this.entryData.type !== ENTRY_TYPE.UNKNOWN;
  }
  /** @type {Boolean} */
  get hasEntryHeader() {
    return this.locationDisplay !== null || this.encounterDisplay !== null;
  }
  /** @type {Boolean} */
  get hasContentDisplay() {
    return this.contentDisplay !== null && this.contentDisplay !== undefined;
  }
  /** @type {Boolean} */
  get hasEntryBodyData() {
    return (
      this.hasContentDisplay ||
      this.hasDiabolicPizzaIngredients ||
      this.hasStatChanges ||
      this.hasAcquiredEffects ||
      this.hasAcquiredItems ||
      this.hasAdventureChanges ||
      this.hasMeatChanges ||
      this.hasHealthChanges ||
      this.hasManaChanges
    );
  }
  /** @type {Boolean} */
  get hasChoiceProgression() {
    if (this.entryType === ENTRY_TYPE.IOTM.JANUARYS_GARBAGE_TOTE) {
      return false;
    }
    if (this.entryType === ENTRY_TYPE.IOTM.SONGBOOM_BOOMBOX) {
      return false;
    }

    return this.attributes.choiceProgression.length > 0;
  }
  /** @type {Boolean} */
  get hasFamiliarUsed() {
    return this.attributes.familiarUsed !== null;
  }
  /** @type {Boolean} */
  get hasAdditionalDisplay() {
    return Boolean(this.additionalDisplay);
  }
  /** @type {Boolean} */
  get showAdditionalDisplay() {
    return this.entryData.showAdditionalDisplay;
  }
  /** @type {ReactComponent} */
  get entryIcon() {
    return this.entryData.icon;
  }
  /** @type {Number} */
  get rawTurnNum() {
    return this.attributes.rawTurnNum;
  }
  /** @type {Boolean} */
  get hasRawTurnNum() {
    return this.attributes.rawTurnNum !== undefined;
  }
  /** @type {Number} */
  get estimatedTurnNum() {
    return this.attributes.estimatedTurnNum;
  }
  /** @type {Boolean} */
  get hasEstimatedTurnNum() {
    return this.attributes.estimatedTurnNum !== undefined;
  }
  /** @param {Number} */
  set dayNum(num) {
    this.attributes.dayNum = num;
  }
  /** @type {Number} */
  get dayNum() {
    return this.attributes.dayNum;
  }
  /** @param {Number} */
  set turnNum(num) {
    this.attributes.estimatedTurnNum = num;
  }
  /** @type {Number} */
  get turnNum() {
    // prefer estimated turn num if it exists
    if (this.hasEstimatedTurnNum) {
      return this.estimatedTurnNum;
    }

    if (this.hasRawTurnNum) {
      return this.rawTurnNum;
    }

    return undefined;
  }
  /** @type {Boolean} */
  get isDiet() {
    return [
      ENTRY_TYPE.CONSUMPTION.EAT,
      ENTRY_TYPE.CONSUMPTION.DRINK,
      ENTRY_TYPE.CONSUMPTION.CHEW,
    ].includes(this.entryType!);
  }
  /** @type {Boolean} */
  get isCombatEncounter() {
    return this.attributes.isCombatEncounter;
  }
  /** @type {Boolean} */
  get isNonCombatEncounter() {
    // going to make an exception where this was a choiceadv that led to a combat
    if (this.hasText(REGEX.LINE.GENERIC_TOOK_CHOICE)) {
      return this.hasText(REGEX.VALUE.NONCOMBAT_NAME) && !this.isInBetweenTurns;
    }

    // crafting is not an encounter, even if it might take an adventure
    if (this.hasText(REGEX.ITEMS.MAKE_SOMETHING_LINE)) {
      return false;
    }

    // treat as a spell cast and not a noncombat Calculating the Universe for a non-monster
    if (
      this.entryType === ENTRY_TYPE.UNIQUE.NUMBEROLOGY &&
      !this.isCombatEncounter
    ) {
      return false;
    }

    return (
      !this.isCombatEncounter &&
      this.hasText(REGEX.VALUE.NONCOMBAT_NAME) &&
      !this.isInBetweenTurns
    );
  }
  /** @type {Boolean} */
  get isFreeCombat() {
    if (this.hasText(REGEX.COMBAT.FREE_COMBAT)) {
      return true;
    }

    if (this.attributes.isInBetweenTurns && this.isCombatEncounter) {
      return true;
    }

    return false;
  }
  /** @param {Boolean} */
  set isForcedAdventure(newValue) {
    this.attributes.isForcedAdventure = newValue;
  }
  /** @type {Boolean} */
  get isForcedAdventure() {
    return this.attributes.isForcedAdventure || this.isSummoned;
  }
  /** @param {Boolean} */
  set isInBetweenTurns(newValue) {
    this.attributes.isInBetweenTurns = newValue;
  }
  /** @type {Boolean} */
  get isInBetweenTurns() {
    return this.attributes.isInBetweenTurns;
  }
  /** @type {Boolean} */
  get isAdventure() {
    return (
      this.isCombatEncounter || this.isNonCombatEncounter || this.isFreeCombat
    );
  }
  // -- stats
  /** @type {Boolean} */
  get hasAdventureChanges() {
    return this.attributes.adventureChanges.length > 0;
  }
  /** @type {Boolean} */
  get hasStatChanges() {
    return (
      this.attributes.isMusUp ||
      this.attributes.isMystUp ||
      this.attributes.isMoxUp ||
      this.musSubstats !== 0 ||
      this.mystSubstats !== 0 ||
      this.moxSubstats !== 0
    );
  }
  /** @type {Boolean} */
  get hasMeatChanges() {
    return this.attributes.meatChange !== 0;
  }
  /** @type {Boolean} */
  get hasAcquiredItems() {
    return this.attributes.acquiredItems.length !== 0;
  }
  /** @type {Boolean} */
  get hasAcquiredEffects() {
    return this.attributes.acquiredEffects.length > 0;
  }
  /** @type {Boolean} */
  get hasInventoryChanges() {
    return this.hasMeatChanges || this.hasAcquiredItems;
  }
  /** @type {Boolean} */
  get hasHealthChanges() {
    return this.attributes.healthChanges.length > 0;
  }
  /** @type {Boolean} */
  get hasManaChanges() {
    return this.attributes.manaChanges.length > 0;
  }
  /** @type {Number} */
  get adventureChangeValue() {
    return this.attributes.adventureChanges.reduce(
      (total, amt) => total + amt,
      0,
    );
  }
  /** @type {Number} */
  get adventureDisplay() {
    const advChanged = this.attributes.adventureChanges.reduce(
      (total, amt) => total + amt,
      0,
    );
    if (advChanged > 0) {
      return `+${advChanged}`;
    }

    return advChanged;
  }
  /** @type {Number} */
  get hasAdventureGains() {
    return (
      this.attributes.adventureChanges.reduce((total, amt) => total + amt, 0) >
      0
    );
  }
  /** @type {Number} */
  get hasAdventureGainsNotFromDiet() {
    if (this.isDiet) {
      return false;
    }

    return (
      this.hasAdventureGains ||
      this.hasText(REGEX.LINE.MAFIA_THUMB_RING_ACTIVATION) ||
      this.hasText(REGEX.REAGNIMATED_GNOME.ADV_TRIGGERED_TEXT) ||
      this.hasText(REGEX.RIFTLET.ADV_TRIGGERED_TEXT) ||
      this.hasText(REGEX.SQUAMOUS_GIBBERED.ADV_TRIGGERED_TEXT) ||
      this.hasText(REGEX.WILD_HARE.ADV_TRIGGERED_TEXT)
    );
  }
  /** @type {Number} */
  get musSubstats() {
    return this.attributes.musExpChanges.reduce(
      (expTotal, expNum) => expTotal + expNum,
      0,
    );
  }
  /** @type {Number} */
  get mystSubstats() {
    return this.attributes.mystExpChanges.reduce(
      (expTotal, expNum) => expTotal + expNum,
      0,
    );
  }
  /** @type {Number} */
  get moxSubstats() {
    return this.attributes.moxExpChanges.reduce(
      (expTotal, expNum) => expTotal + expNum,
      0,
    );
  }
  /** @type {Number} */
  get healthDisplay() {
    const hpChanged = this.attributes.healthChanges.reduce(
      (total, amt) => total + amt,
      0,
    );
    if (hpChanged > 0) {
      return `+${hpChanged}`;
    }

    return hpChanged;
  }
  /** @type {Number} */
  get manaDisplay() {
    const mpChanged = this.attributes.manaChanges.reduce(
      (total, amt) => total + amt,
      0,
    );
    if (mpChanged > 0) {
      return `+${mpChanged}`;
    }

    return mpChanged;
  }
  /** @type {String} */
  get contentDisplay() {
    const entryBody = createEntryBody(this.entryString);
    const entryBodyDisplay = entryBody.length <= 0 ? null : entryBody;
    return this.parseDisplayMatcher(
      this.entryData.content_alt,
      entryBodyDisplay,
    );
  }
  /** @type {String} */
  get locationDisplay() {
    return this.parseDisplayMatcher(
      this.entryData.locationName_alt,
      this.attributes.locationName,
    );
  }
  /** @type {String} */
  get encounterDisplay() {
    // show the actual service name for CS
    if (this.entryType === ENTRY_TYPE.PATH.COMMUNITY_SERVICE.SERVICE) {
      const serviceTask = COMMUNITY_SERVICES.find((taskData) =>
        this.hasText(taskData.matcher),
      );
      if (serviceTask) {
        return serviceTask.label;
      }
    }

    return this.parseDisplayMatcher(
      this.entryData.encounterName_alt,
      this.attributes.encounterName,
    );
  }
  /** @param {String} */
  set additionalDisplay(newValue) {
    this.attributes.additionalDisplay = newValue;
  }
  /** @type {String} */
  get additionalDisplay() {
    // special text for Latte refill
    if (this.entryType === ENTRY_TYPE.IOTM.LATTE_LOVERS_MEMBERS_MUG.REFILL) {
      const latteEffects = Object.entries(LATTE_EFFECTS)
        .filter(([, effect]) => !!this.findMatcher(effect))
        .map(([name]) => name);

      if (latteEffects.length > 0) {
        return `(${latteEffects.join(", ")})`;
      }
    }

    // some entryTypes have precedence over the regular choice progression display
    if (
      this.entryType === ENTRY_TYPE.IOTM.PILL_KEEPER ||
      this.entryType === ENTRY_TYPE.IOTM.GOD_LOBSTER.BOON
    ) {
      return this.parseDisplayMatcher(
        this.entryData.additionalDisplay,
        this.attributes.additionalDisplay,
      );
    }

    // show the first letters of the diabolic pizza
    if (
      this.entryType === ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.MAKE &&
      this.hasDiabolicPizzaIngredients
    ) {
      const firstLetters = this.attributes.diabolicPizzaIngredients.reduce(
        (acc, ingredient) => {
          return acc + ingredient.charAt(0).toUpperCase();
        },
        "",
      );

      return `(${firstLetters})`;
    }

    // show special display for choices
    if (
      this.hasChoiceProgression &&
      this.showAdditionalDisplay &&
      !this.attributes.isEndedByUseTheForce
    ) {
      return "⇾ " + this.attributes.choiceProgression.join(" ⇾ ");
    }

    // note `entryData` vs `attributes`
    return this.parseDisplayMatcher(
      this.entryData.additionalDisplay,
      this.attributes.additionalDisplay,
    );
  }

  set familiarUsed(newValue) {
    this.attributes.familiarUsed = newValue;
  }

  get familiarUsed() {
    return this.attributes.familiarUsed;
  }

  get replacedEnemiesDisplay() {
    if (!this.hasReplacedEnemies) {
      return null;
    }

    const replacedEnemies = this.attributes.replacedEnemies || [];
    return replacedEnemies.slice(0, replacedEnemies.length - 1).join("/");
  }

  get hasCombatActions() {
    return this.attributes.combatActions.length > 0;
  }

  get isVictory() {
    return (
      this.isDisintegrated ||
      this.hasInstakill ||
      this.isFreeCombat ||
      this.hasText(REGEX.COMBAT.VICTORY_LINE)
    );
  }

  get isDeath() {
    return this.attributes.isCombatEncounter && !this.isVictory;
  }

  get isAttracted() {
    return (this.attributes.attractors?.length ?? 0) > 0;
  }

  get isBanished() {
    return Boolean(this.attributes.banisher);
  }

  get isCopied() {
    return (this.attributes.copiers?.length ?? 0) > 0;
  }

  get isDisintegrated() {
    return Boolean(this.attributes.disintigrater);
  }

  get hasInstakill() {
    return Object.values(INSTAKILLS).some((instakill) =>
      this.hasText(instakill.matcher),
    );
  }

  get isReplaced() {
    return (this.attributes.replacers?.length ?? 0) > 0;
  }

  get isSummoned() {
    return (
      this.entryType === ENTRY_TYPE.IOTM.FAX_MACHINE ||
      this.entryType === ENTRY_TYPE.IOTM.GENIE_BOTTLE.FIGHT ||
      this.entryType === ENTRY_TYPE.IOTM.CHATEAU_MANTEGNA.PAINTING
    );
  }

  get hasReplacedEnemies() {
    return (this.attributes.replacedEnemies?.length ?? 0) > 0;
  }

  get hasRunaway() {
    return Object.values(RUNAWAYS).some((runaway) =>
      this.hasText(runaway.matcher),
    );
  }

  get hasSuccessfulSteal() {
    return (
      this.hasText(REGEX.COMBAT.SUCCESSFUL_STEAL_ITEM) ||
      this.hasText(REGEX.XO_SKELETON.SUCCESSFUL_XO_STEAL_ITEM)
    );
  }

  get isPathSpecific() {
    return (
      this.categories.includes(CATEGORY_ID.PATH) || this.isPathDisguisesDelimit
    );
  }

  get isPathDisguisesDelimit() {
    return this.hasText(REGEX.DISGUISES_DELIMIT.SWAP_MASK);
  }

  get isClover() {
    return (
      this.attributes.encounterName &&
      CLOVER_ENCOUNTERS.includes(this.attributes.encounterName)
    );
  }

  get isSemirare() {
    return (
      this.attributes.encounterName &&
      SEMIRARE_ENCOUNTERS.includes(this.attributes.encounterName)
    );
  }

  get isIOTM() {
    return (
      this.categories.includes(CATEGORY_ID.IOTM) ||
      this.attributes.isEndedByUseTheForce
    );
  }

  get isHeist() {
    return this.entryType === ENTRY_TYPE.IOTM.CAT_BURGLAR;
  }

  get hasIunionCrown() {
    return this.hasText(REGEX.IUNION_CROWN.GAINED_EFFECT);
  }

  get hasLatteLoversMug() {
    return (
      this.hasText(REGEX.LATTE_LOVERS_MEMBERS_MUG.FILLED_MUG_LINE) ||
      this.hasText(REGEX.LATTE_LOVERS_MEMBERS_MUG.UNLOCKED_INGREDIENT_NAME) ||
      this.hasText(REGEX.LATTE_LOVERS_MEMBERS_MUG.THROW_LATTE_LINE) ||
      this.hasText(REGEX.LATTE_LOVERS_MEMBERS_MUG.OFFER_LATTE_LINE) ||
      this.hasText(REGEX.LATTE_LOVERS_MEMBERS_MUG.GULP_LATTE_LINE)
    );
  }

  get hasLatteIngredientUnlock() {
    return this.hasText(
      REGEX.LATTE_LOVERS_MEMBERS_MUG.UNLOCKED_INGREDIENT_NAME,
    );
  }

  get hasMelodramedary() {
    return this.hasText(REGEX.MELODRAMEDARY.SPIT_ON_SOMETHING_LINE);
  }

  get hasMeteorLore() {
    return (
      this.hasText(REGEX.METEOR_LORE.CAST_MICROMETEORITE) ||
      this.hasText(REGEX.METEOR_LORE.CAST_MACROMETEORITE) ||
      this.hasText(REGEX.METEOR_LORE.CAST_METEORSHOWER) ||
      this.hasText(REGEX.METEOR_LORE.ACQUIRE_METEOR_ITEM)
    );
  }

  get isPillKeeper() {
    return this.entryType === ENTRY_TYPE.IOTM.PILL_KEEPER;
  }
  /** @type {Boolean} */
  get hasPocketProfessor() {
    return this.hasText(REGEX.POCKET_PROFESSOR.LECTURE_USE_LINE);
  }

  get isCartography() {
    return (
      this.entryType ===
        ENTRY_TYPE.IOTM.COMPREHENSIVE_CARTOGRAPHY.MAP_THE_MONSTER ||
      this.entryType ===
        ENTRY_TYPE.IOTM.COMPREHENSIVE_CARTOGRAPHY.SPECIAL_NONCOMBAT
    );
  }

  get isDiabolicPizza() {
    return (
      this.entryType === ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.MAKE ||
      this.entryType === ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.EAT
    );
  }

  get isEmotionChip() {
    return (
      this.hasText(REGEX.EMOTION_CHIP.NONCOMBAT_SKILL) ||
      this.hasText(REGEX.EMOTION_CHIP.COMBAT_SKILL)
    );
  }

  get hasDiabolicPizzaIngredients() {
    return this.attributes.diabolicPizzaIngredients.length > 0;
  }

  get isGenieWish() {
    return (
      this.entryType === ENTRY_TYPE.IOTM.GENIE_BOTTLE.EFFECT ||
      this.entryType === ENTRY_TYPE.IOTM.GENIE_BOTTLE.FIGHT
    );
  }

  get hasVampyricCloake() {
    return this.hasText(REGEX.VAMPYRIC_CLOAK.SKILL_RESULT);
  }

  get hasBoxOfGhosts() {
    return (
      this.hasText(REGEX.BOX_OF_GHOSTS.CAROLS_EFFECT_TEXT) ||
      this.hasText(REGEX.BOX_OF_GHOSTS.COMMERCE_BUY_TEXT)
    );
  }

  get hasDoctorsBag() {
    return this.hasText(REGEX.LIL_DOCTORS_BAG.USED_SKILL_LINE);
  }

  get hasRetrospecs() {
    return this.hasText(REGEX.RETROSPECS.FOUND_ITEM);
  }

  get isPottedPowerPlant() {
    return (
      this.entryType === ENTRY_TYPE.IOTM.POTTED_POWER_PLANT.GET_BATTERY ||
      this.entryType === ENTRY_TYPE.IOTM.POTTED_POWER_PLANT.USE_BATTERY ||
      this.entryType === ENTRY_TYPE.IOTM.POTTED_POWER_PLANT.COMBINE_BATTERIES ||
      this.entryType === ENTRY_TYPE.IOTM.POTTED_POWER_PLANT.UNTINKER
    );
  }

  get isVoting() {
    return (
      this.hasText(REGEX.VOTING_BOOTH.VOTE_MONSTER_COMBAT) ||
      this.entryType === ENTRY_TYPE.IOTM.VOTING_BOOTH
    );
  }

  get hasPortscanEncounter() {
    return (
      this.hasText(REGEX.SOURCE_TERMINAL.GOVERNMENT_AGENT_ENCOUNTER) ||
      this.entryType === ENTRY_TYPE.PATH.THE_SOURCE.SOURCE_AGENT_ENCOUNTER
    );
  }

  get isCommunityService() {
    return (
      this.entryType === ENTRY_TYPE.PATH.COMMUNITY_SERVICE.SERVICE ||
      this.entryType === ENTRY_TYPE.PATH.COMMUNITY_SERVICE.FINAL_SERVICE
    );
  }

  /**
   * since there's getters and entry.attributes, this helps get it
   */
  findAttribute(attributeName: EntryAttributes) {
    if (attributeName in this.attributes) {
      return this.attributes[attributeName as keyof Attributes];
    }

    if (attributeName in this) {
      return this[attributeName as keyof typeof this];
    }

    return undefined;
  }

  createRawDataDisplay() {
    return {
      entryId: this.id,
      entryType: this.entryData.type,
      categories: this.entryData.categories,
      isAdventure: this.isAdventure,
      isNonCombatEncounter: this.isNonCombatEncounter,
      ...this.attributes,
    };
  }

  export() {
    if (!this.hasAnnotations) {
      return this.rawText;
    }

    // clear out existing comments
    const clearedText = this.rawText.replace(
      REGEX.MAFIOSO.LOG_COMMENTS_NEWLINE,
      "",
    );
    // if annotations are to be removed, return just the text
    if (this.willRemoveAnnotation) {
      return clearedText;
    }

    // format comments to have two slashes
    const formattedAnnotations = `//${this.attributes.annotations?.replace(
      NEW_LINE_REGEX,
      "\n//",
    )}`;
    // append to front of text
    return `${formattedAnnotations}\n${clearedText}`;
  }

  hasText(txt: string | RegExp) {
    return regexUtils.hasString(this.entryString, txt);
  }

  findMatcher(matcher: Matcher) {
    return regexUtils.findMatcher(this.entryString, matcher);
  }
  /**
   * finds multiple matches for findMatcher()
   * @param {Matcher} matcher
   * @return {Array<String>}
   */
  findMatchers(matcher: string | RegExp): string[] {
    return regexUtils.getRegexMatch(this.entryString, matcher) || [];
  }

  parseDisplayMatcher<T>(matcher: Matcher | undefined | null, fallback: T) {
    // null means intentionally blank
    if (matcher === null) {
      return null;
    }

    // undefined means to just use the fallback
    if (matcher === undefined) {
      return fallback;
    }

    if (matcher === "ENTRY.ACQUIRED_ITEM_NAME") {
      return this.attributes.acquiredItems[0].displayName;
    }

    // just use the string
    if (typeof matcher === "string") {
      return matcher;
    }

    // search for result of regex
    return this.findMatcher(matcher) || fallback;
  }
  /** @returns {String} */
  createItemsDisplay() {
    return this.attributes.acquiredItems.join(", ");
  }
  /** @returns {String} */
  createMeatDisplay() {
    const meatChange = this.attributes.meatChange;
    const meatDisplay = meatChange
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (meatChange > 0) {
      return `+${meatDisplay}`;
    }

    return meatDisplay;
  }

  get hasAnnotations() {
    return !!this.attributes.annotations;
  }

  get isAnnotationOnly() {
    return this.entryType === ENTRY_TYPE.ANNOTATION_ONLY;
  }

  updateAnnotation(newText: string) {
    this.attributes.annotations = newText;
  }

  doesShareEntryType(comparedEntry: Entry) {
    if (this.entryType === null || comparedEntry.entryType === null) {
      return false;
    }

    return this.entryType === comparedEntry.entryType;
  }

  doesShareLocation(comparedEntry: Entry) {
    if (
      this.attributes.locationName === null ||
      comparedEntry.attributes.locationName === null
    ) {
      return false;
    }

    return (
      this.attributes.locationName === comparedEntry.attributes.locationName
    );
  }

  doesShareEncounter(comparedEntry: Entry) {
    if (
      this.attributes.encounterName === null ||
      comparedEntry.attributes.encounterName === null
    ) {
      return false;
    }

    return (
      this.attributes.encounterName === comparedEntry.attributes.encounterName
    );
  }

  canCombineWith(comparedEntry: Entry | undefined) {
    if (!comparedEntry) {
      return false;
    }

    // combine kolmafia commonly purchasing and using
    if (
      this.hasText("chewing gum on a string") &&
      comparedEntry.hasText("chewing gum on a string")
    ) {
      return true;
    }

    // Garbage Tote
    if (
      this.entryType === ENTRY_TYPE.IOTM.JANUARYS_GARBAGE_TOTE &&
      this.hasText(REGEX.JANUARYS_GARBAGE_TOTE.USE_FOLDABLE) &&
      comparedEntry.hasText(REGEX.JANUARYS_GARBAGE_TOTE.EQUIP_RESULT)
    ) {
      return true;
    }

    // Eatin' sausages
    if (
      this.hasText(REGEX.KRAMCO_SAUSAGEOMATIC.EAT_MAGICAL_SAUSAGE) &&
      comparedEntry.hasText(REGEX.KRAMCO_SAUSAGEOMATIC.EAT_MAGICAL_SAUSAGE)
    ) {
      return true;
    }

    // (deluxe) mr klaw - incomplete
    if (this.hasText(/mr. klaw/i) && comparedEntry.hasText(/mr. klaw/i)) {
      return true;
    }

    // autoscend loves to buy and use these individually
    if (
      this.hasText(REGEX.LINE.DOC_GALATIK_SHOP_OR_USE) &&
      comparedEntry.hasText(REGEX.LINE.DOC_GALATIK_SHOP_OR_USE)
    ) {
      return true;
    }

    if (
      COMBINABLE_ENTRIES_LIST.includes(this.entryType!) &&
      this.doesShareEntryType(comparedEntry)
    ) {
      return true;
    }

    return false;
  }

  canRelateTo(comparedEntry: Entry) {
    if (this.canCombineWith(comparedEntry)) {
      return true;
    }

    return this.doesShareLocation(comparedEntry);
  }
}

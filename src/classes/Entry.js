import {CATEGORY_ID} from 'constants/CATEGORIES';
import {COMBINABLE_ENTRIES_LIST} from 'constants/DEFAULTS';
import {CLOVER_ENCOUNTERS, SEMIRARE_ENCOUNTERS} from 'constants/ENCOUNTERS';
import {INSTAKILLS, INSTAKILLS_MAP} from 'constants/INSTAKILLS'
import {RUNAWAYS, RUNAWAYS_MAP} from 'constants/RUNAWAYS'
import {LATTE_EFFECTS_MAP, LATTE_EFFECTS_LIST} from 'constants/LATTE_EFFECTS_MAP';
import ENTRY_TYPE from 'constants/ENTRY_TYPE';
import REGEX, {NEW_LINE_REGEX} from 'constants/REGEXES';

import * as entryParserUtils from 'utilities/entryParserUtils';
import * as regexUtils from 'utilities/regexUtils';

/**
 * @typedef {String} RawText - text extracted from the log
 * @typedef {String} EntryString - text after it has some formatting and clean up
 */
export default class Entry {
  /** @default */
  constructor({entryId, entryIdx, rawText}) {
    /** @type {Number} */
    this.id = entryId;
    /** @type {Number} */
    this.entryIdx = entryIdx;
    /** @type {EntryData} */
    this.entryData = entryParserUtils.getEntryData(rawText);

    /** @type {RawText} */
    this.rawText = rawText;
    /** @type {EntryString} */
    this.entryString = regexUtils.fixSpecialEntities(rawText);

    /** @type {Object} */
    this.attributes = {
      /** @type {String} */
      annotations: null,

      /** @type {Number} */
      dayNum: -1,
      /** @type {Number} */
      rawTurnNum: undefined,
      /** @type {Number} */
      estimatedTurnNum: undefined,
      /** @type {Boolean} */
      isInBetweenTurns: false,
      /** @type {Array<Number>} */
      adventureChanges: [],
      /** @type {String | null} */
      locationName: null,
      /** @type {String | null} */
      encounterName: null,
      /** @type {Array<String>} */
      choiceProgression: [],
      /** @type {Boolean} */
      isCombatEncounter: false,
      /** @type {Boolean} */
      isForcedAdventure: false,

      /** @type {String} */
      familiarUsed: null,
      /** @type {Array<String>} */
      acquiredItems: [],
      /** @type {Array<String>} */
      acquiredEffects: [],
      /** @type {Number} */
      meatChange: 0,
      /** @type {Array<Number>} */
      healthChanges: [],
      /** @type {Array<Number>} */
      manaChanges: [],

      //-- stat
      /** @type {Boolean} */
      isLevelUp: false,
      /** @type {Boolean} */
      isMusUp: false,
      /** @type {Boolean} */
      isMystUp: false,
      /** @type {Boolean} */
      isMoxUp: false,
      /** @type {Array} */
      musExpChanges: [],
      /** @type {Array} */
      mystExpChanges: [],
      /** @type {Array} */
      moxExpChanges: [],

      // -- combat
      /** @type {Boolean} */
      hasInitiative: false,
      /** @type {Array<String>} */
      combatActions: [],
      /** @type {Array<String>} */
      replacedEnemies: [],

      // -- special, includes iotm
      /** @type {String} */
      additionalDisplay: null,
      /** @type {Array<Entity> | undefined | null} */
      attractors: null,
      /** @type {Entity | undefined | null} */
      banisher: null,
      /** @type {Array<Entity> | undefined | null} */
      copiers: null,
      /** @type {Entity | undefined | null} */
      disintigrater: null,
      /** @type {Array<Entity> | undefined | null} */
      replacers: null,
      /** @type {Boolean} */
      isEndedByUseTheForce: false,
      /** @type {Array<String>} */
      diabolicPizzaIngredients: [],
    }

    /** @type {Boolean} */
    this.willRemoveAnnotation = false;

    // start parsing we have the raw text
    if (rawText !== '' && Boolean(rawText)) {
      this.initialize();
    }
  }
  /**
   * once `entryString` is given we can set all the properties
   */
  initialize() {
    const parsedAttributes = entryParserUtils.parseAttributes(this.entryString);
    this.attributes = {
      ...this.attributes,
      ...parsedAttributes,
    };
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
    return this.hasContentDisplay
      || this.hasDiabolicPizzaIngredients
      || this.hasStatChanges
      || this.hasAcquiredEffects
      || this.hasAcquiredItems
      || this.hasAdventureChanges
      || this.hasMeatChanges
      || this.hasHealthChanges
      || this.hasManaChanges;
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
    ].includes(this.entryType);
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

    return !this.isCombatEncounter && this.hasText(REGEX.VALUE.NONCOMBAT_NAME) && !this.isInBetweenTurns;
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
    return this.attributes.isForcedAdventure = newValue;
  }
  /** @type {Boolean} */
  get isForcedAdventure() {
    return this.attributes.isForcedAdventure;
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
    return (this.isCombatEncounter || this.isNonCombatEncounter || this.isFreeCombat);
  }
  // -- stats
  /** @type {Boolean} */
  get hasAdventureChanges() {
    return this.attributes.adventureChanges.length > 0;
  }
  /** @type {Boolean} */
  get hasStatChanges() {
    return this.attributes.isMusUp
      || this.attributes.isMystUp
      || this.attributes.isMoxUp
      || this.musSubstats !== 0
      || this.mystSubstats !== 0
      || this.moxSubstats !== 0;
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
  get adventureDisplay() {
    const advChanged = this.attributes.adventureChanges.reduce((total, amt) => total + amt, 0);
    if (advChanged > 0) {
      return `+${advChanged}`;
    }

    return advChanged;
  }
  /** @type {Number} */
  get hasAdventureGains() {
    return this.attributes.adventureChanges.reduce((total, amt) => total + amt, 0) > 0;
  }
  /** @type {Number} */
  get hasAdventureGainsNotFromDiet() {
    if (this.isDiet) {
      return false;
    }

    return this.hasAdventureGains
      || this.hasText(REGEX.LINE.MAFIA_THUMB_RING_ACTIVATION)
      || this.hasText(REGEX.REAGNIMATED_GNOME.ADV_TRIGGERED_TEXT)
      || this.hasText(REGEX.RIFTLET.ADV_TRIGGERED_TEXT)
      || this.hasText(REGEX.SQUAMOUS_GIBBERED.ADV_TRIGGERED_TEXT)
      || this.hasText(REGEX.WILD_HARE.ADV_TRIGGERED_TEXT);
  }
  /** @type {Number} */
  get musSubstats() {
    return this.attributes.musExpChanges.reduce((expTotal, expNum) => expTotal + expNum, 0);
  }
  /** @type {Number} */
  get mystSubstats() {
    return this.attributes.mystExpChanges.reduce((expTotal, expNum) => expTotal + expNum, 0);
  }
  /** @type {Number} */
  get moxSubstats() {
    return this.attributes.moxExpChanges.reduce((expTotal, expNum) => expTotal + expNum, 0);
  }
  /** @type {Number} */
  get healthDisplay() {
    const hpChanged = this.attributes.healthChanges.reduce((total, amt) => total + amt, 0);
    if (hpChanged > 0) {
      return `+${hpChanged}`;
    }

    return hpChanged;
  }
  /** @type {Number} */
  get manaDisplay() {
    const mpChanged =  this.attributes.manaChanges.reduce((total, amt) => total + amt, 0);
    if (mpChanged > 0) {
      return `+${mpChanged}`;
    }

    return mpChanged;
  }
  /** @type {String} */
  get contentDisplay() {
    const entryBody = entryParserUtils.createEntryBody(this.entryString);
    const entryBodyDisplay = entryBody.length <= 0 ? null : entryBody;
    return this.parseDisplayMatcher(this.entryData.content_alt, entryBodyDisplay);
  }
  /** @type {String} */
  get locationDisplay() {
    return this.parseDisplayMatcher(this.entryData.locationName_alt, this.attributes.locationName);
  }
  /** @type {String} */
  get encounterDisplay() {
    return this.parseDisplayMatcher(this.entryData.encounterName_alt, this.attributes.encounterName);
  }
  /** @param {String} */
  set additionalDisplay(newValue) {
    this.attributes.additionalDisplay = newValue;
  }
  /** @type {String} */
  get additionalDisplay() {
    // special text for Latte refill
    if (this.entryType === ENTRY_TYPE.IOTM.LATTE_LOVERS_MEMBERS_MUG.REFILL) {
      const latteEffectsResult = LATTE_EFFECTS_LIST.filter((effectKey) => {
        const effectMatcher = LATTE_EFFECTS_MAP[effectKey];
        const ingredientMatch = this.findMatcher(effectMatcher);
        return Boolean(ingredientMatch);
      });

      if (latteEffectsResult.length > 0) {
        return `(${latteEffectsResult.join(', ')})`
      }
    }

    // show what choice was made for God Lobster Boon
    if (this.entryType === ENTRY_TYPE.IOTM.GOD_LOBSTER.BOON) {
      return this.findMatcher(REGEX.GOD_LOBSTER.BOON_CHOICE_RESULT);
    }

    // let custom additionaDisplay have precedence
    if (this.entryType === ENTRY_TYPE.IOTM.PILL_KEEPER) {
      return this.attributes.additionalDisplay;
    }

    if (this.hasChoiceProgression && this.showAdditionalDisplay && !this.attributes.isEndedByUseTheForce) {
      return '⇾ ' + this.attributes.choiceProgression.join(' ⇾ ');
    }

    return this.attributes.additionalDisplay;
  }
  /** @param {String} */
  set familiarUsed(newValue) {
    this.attributes.familiarUsed = newValue;
  }
  /** @type {Boolean} */
  get familiarUsed() {
    return this.attributes.familiarUsed;
  }
  /** @type {String} */
  get replacedEnemiesDisplay() {
    if (!this.hasReplacedEnemies) {
      return null;
    }

    const replacedEnemies = this.attributes.replacedEnemies;
    return replacedEnemies.slice(0, replacedEnemies.length - 1).join('/');
  }
  // -- combat
  /** @type {Boolean} */
  get hasCombatActions() {
    return this.attributes.combatActions.length > 0;
  }
  /** @type {Boolean} */
  get isVictory() {
    return this.isDisintegrated
      || this.hasInstakill
      || this.isFreeCombat
      || this.hasText(REGEX.COMBAT.VICTORY_LINE);
  }
  /** @type {Boolean} */
  get isDeath() {
    return this.attributes.isCombatEncounter && !this.isVictory;
  }
  /** @type {Boolean} */
  get isAttracted() {
    return Boolean(this.attributes.attractors) && this.attributes.attractors.length > 0;
  }
  /** @type {Boolean} */
  get isBanished() {
    return Boolean(this.attributes.banisher);
  }
  /** @type {Boolean} */
  get isCopied() {
    return Boolean(this.attributes.copiers) && this.attributes.copiers.length > 0;
  }
  /** @type {Boolean} */
  get isDisintegrated() {
    return Boolean(this.attributes.disintigrater);
  }
  /** @type {Boolean} */
  get hasInstakill() {
    return INSTAKILLS.some((entityKey) => {
      const entity = INSTAKILLS_MAP[entityKey];
      return this.hasText(entity.matcher);
    });
  }
  /** @type {Boolean} */
  get isReplaced() {
    return Boolean(this.attributes.replacers) && this.attributes.replacers.length > 0;
  }
  /** @type {Boolean} */
  get hasReplacedEnemies() {
    return Boolean(this.attributes.replacedEnemies) && this.attributes.replacedEnemies.length > 0;
  }
  /** @type {Boolean} */
  get hasRunaway() {
    return RUNAWAYS.some((entityKey) => {
      const entity = RUNAWAYS_MAP[entityKey];
      return this.hasText(entity.matcher);
    });
  }
  /** @type {Boolean} */
  get hasSuccessfulSteal() {
    return this.hasText(REGEX.COMBAT.SUCCESSFUL_STEAL_ITEM)
      || this.hasText(REGEX.XO_SKELETON.SUCCESSFUL_XO_STEAL_ITEM);
  }
  // -- attribute getters
  /** @type {Boolean} */
  get isPathSpecific() {
    return this.categories.includes(CATEGORY_ID.PATH)
      || this.isPathDisguisesDelimit;
  }
  /** @type {Boolean} */
  get isPathDisguisesDelimit() {
    return this.hasText(REGEX.DISGUISES_DELIMIT.SWAP_MASK);
  }
  /** @type {Boolean} */
  get isClover() {
    return CLOVER_ENCOUNTERS.includes(this.attributes.encounterName);
  }
  /** @type {Boolean} */
  get isSemirare() {
    return SEMIRARE_ENCOUNTERS.includes(this.attributes.encounterName);
  }
  /** @type {Boolean} */
  get isIOTM() {
    return this.categories.includes(CATEGORY_ID.IOTM)
      || this.attributes.isEndedByUseTheForce;
  }
  /** @type {Boolean} */
  get isHeist() {
    return this.entryType === ENTRY_TYPE.IOTM.CAT_BURGLAR;
  }
  /** @type {Boolean} */
  get hasIunionCrown() {
    return this.hasText(REGEX.IUNION_CROWN.GAINED_EFFECT);
  }
  /** @type {Boolean} */
  get hasLatteLoversMug() {
    return this.hasText(REGEX.LATTE_LOVERS_MEMBERS_MUG.FILLED_MUG_LINE)
      || this.hasText(REGEX.LATTE_LOVERS_MEMBERS_MUG.UNLOCKED_INGREDIENT_NAME)
      || this.hasText(REGEX.LATTE_LOVERS_MEMBERS_MUG.THROW_LATTE_LINE)
      || this.hasText(REGEX.LATTE_LOVERS_MEMBERS_MUG.OFFER_LATTE_LINE)
      || this.hasText(REGEX.LATTE_LOVERS_MEMBERS_MUG.GULP_LATTE_LINE);
  }
  /** @type {Boolean} */
  get hasLatteIngredientUnlock() {
    return this.hasText(REGEX.LATTE_LOVERS_MEMBERS_MUG.UNLOCKED_INGREDIENT_NAME);
  }
  /** @type {Boolean} */
  get hasMelodramedary() {
    return this.hasText(REGEX.MELODRAMEDARY.SPIT_ON_SOMETHING_LINE);
  }
  /** @type {Boolean} */
  get isPillKeeper() {
    return this.entryType === ENTRY_TYPE.IOTM.PILL_KEEPER;
  }
  /** @type {Boolean} */
  get hasPocketProfessor() {
    return this.hasText(REGEX.POCKET_PROFESSOR.LECTURE_USE_LINE);
  }
  /** @type {Boolean} */
  get isDiabolicPizza() {
    return this.entryType === ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.MAKE
      || this.entryType === ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.EAT;
  }
  /** @type {Boolean} */
  get hasDiabolicPizzaIngredients() {
    return this.attributes.diabolicPizzaIngredients.length > 0;
  }
  /** @type {Boolean} */
  get hasVampyricCloake() {
    return this.hasText(REGEX.VAMPYRIC_CLOAK.SKILL_RESULT);
  }
  /** @type {Boolean} */
  get hasDoctorsBag() {
    return this.hasText(REGEX.LIL_DOCTORS_BAG.USED_SKILL_LINE);
  }
  /** @type {Boolean} */
  get hasRetrospecs() {
    return this.hasText(REGEX.RETROSPECS.FOUND_ITEM);
  }
  /** @type {Boolean} */
  get isVoting() {
    return this.hasText(REGEX.VOTING_BOOTH.VOTE_MONSTER_COMBAT)
      || this.entryType === ENTRY_TYPE.IOTM.VOTING_BOOTH;
  }
  // -- utility
  /**
   * since there's getters and entry.attributes, this helps get it
   * @param {String} attributeName
   * @return {*}
   */
  findAttribute(attributeName) {
    if (this.attributes[attributeName] !== undefined) {
      return this.attributes[attributeName];
    }

    if (this[attributeName] !== undefined) {
      return this[attributeName];
    }

    return undefined;
  }
  /**
   * @return {Object}
   */
  createRawDataDisplay() {
    return {
      entryId: this.id,
      entryType: this.entryData.type,
      categories: this.entryData.categories,
      isAdventure: this.isAdventure,
      isCombatEncounter: this.isCombatEncounter,
      isNonCombatEncounter: this.isNonCombatEncounter,
      familiarUsed: this.familiarUsed,
      ...this.attributes,
    }
  }
  /**
   * @return {Object}
   */
  export() {
    if (!this.hasAnnotations) {
      return this.rawText;
    }

    // clear out existing comments
    const clearedText = this.rawText.replace(REGEX.MAFIOSO.LOG_COMMENTS_NEWLINE, '');
    // if annotations are to be removed, return just the text
    if (this.willRemoveAnnotation) {
      return clearedText;
    }

    // format comments to have two slashes
    const formattedAnnotations = `//${this.attributes.annotations.replace(NEW_LINE_REGEX, '\n//')}`;
    // append to front of text
    return `${formattedAnnotations}\n${clearedText}`;
  }
  /**
   * checks if the `entryString` contains given string
   * @param {String | Regex} txt
   * @return {Boolean}
   */
  hasText(txt) {
    return regexUtils.hasString(this.entryString, txt);
  }
  /**
   * @param {Matcher} matcher
   * @return {String|undefined}
   */
  findMatcher(matcher) {
    return regexUtils.findMatcher(this.entryString, matcher);
  }
  /**
   * finds multiple matches for findMatcher()
   * @param {Matcher} matcher
   * @return {Array<String>}
   */
  findMatchers(matcher) {
    return regexUtils.getRegexMatch(this.entryString, matcher) || [];
  }
  /**
   * @param {Matcher} matcher
   * @param {String} [fallback]
   * @return {String|null}
   */
  parseDisplayMatcher(matcher, fallback) {
    // null means intentionally blank
    if (matcher === null) {
      return null;
    }

    // undefined means to just use the fallback
    if (matcher === undefined) {
      return fallback;
    }

    // just use the string
    if (typeof matcher === 'string') {
      return matcher;
    }

    // search for result of regex
    return this.findMatcher(matcher) || fallback;
  }
  /** @returns {String} */
  createItemsDisplay() {
    return this.attributes.acquiredItems.join(', ');
  }
  /** @returns {String} */
  createMeatDisplay() {
    const meatChange = this.attributes.meatChange;
    const meatDisplay = meatChange.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (meatChange > 0) {
      return `+${meatDisplay}`;
    }

    return meatDisplay;
  }
  // -- annotation
  /** @type {Boolean} */
  get hasAnnotations() {
    return Boolean(this.attributes.annotations);
  }
  /** @type {Boolean} */
  get isAnnotationOnly() {
    return this.entryType === ENTRY_TYPE.ANNOTATION_ONLY;
  }
  /**
   * @param {String} newText
   */
  updateAnnotation(newText) {
    this.attributes.annotations = newText;
  }
  // -- comparators
  /**
   * @param {Entry} comparedEntry
   * @return {Boolean}
   */
  doesShareEntryType(comparedEntry) {
    if (this.entryType === null || comparedEntry.entryType === null) {
      return false;
    }

    return this.entryType === comparedEntry.entryType;
  }
  /**
   * @param {Entry} comparedEntry
   * @return {Boolean}
   */
  doesShareLocation(comparedEntry) {
    if (this.attributes.locationName === null || comparedEntry.attributes.locationName === null) {
      return false;
    }

    return this.attributes.locationName === comparedEntry.attributes.locationName;
  }
  /**
   * @param {Entry} comparedEntry
   * @return {Boolean}
   */
  doesShareEncounter(comparedEntry) {
    if (this.attributes.encounterName === null || comparedEntry.attributes.encounterName === null) {
      return false;
    }

    return this.attributes.encounterName === comparedEntry.attributes.encounterName;
  }
  /**
   * @param {Entry} comparedEntry
   * @return {Boolean}
   */
  canCombineWith(comparedEntry) {
    // combine kolmafia commonly purchasing and using
    if (this.hasText('chewing gum on a string') && comparedEntry.hasText('chewing gum on a string')) {
      return true;
    }

    // Garbage Tote
    if (this.entryType === ENTRY_TYPE.IOTM.JANUARYS_GARBAGE_TOTE
      && this.hasText(REGEX.JANUARYS_GARBAGE_TOTE.USE_FOLDABLE)
      && comparedEntry.hasText(REGEX.JANUARYS_GARBAGE_TOTE.EQUIP_RESULT)) {
      return true;
    }

    // Eatin' sausages
    if (this.hasText(REGEX.KRAMCO_SAUSAGEOMATIC.EAT_MAGICAL_SAUSAGE) && comparedEntry.hasText(REGEX.KRAMCO_SAUSAGEOMATIC.EAT_MAGICAL_SAUSAGE)) {
      return true;
    }

    // (deluxe) mr klaw - incomplete
    if (this.hasText(/mr. klaw/i) && comparedEntry.hasText(/mr. klaw/i)) {
      return true;
    }

    // autoscend loves to buy and use these individually
    if (this.hasText(REGEX.LINE.DOC_GALATIK_SHOP_OR_USE) && comparedEntry.hasText(REGEX.LINE.DOC_GALATIK_SHOP_OR_USE)) {
      return true;
    }

    if (COMBINABLE_ENTRIES_LIST.includes(this.entryType) && this.doesShareEntryType(comparedEntry)) {
      return true;
    }

    return false;
  }
  /**
   * @param {Entry} comparedEntry
   * @return {Boolean}
   */
  canRelateTo(comparedEntry) {
    if (this.canCombineWith(comparedEntry)) {
      return true;
    }

    return this.doesShareLocation(comparedEntry);
  }
}

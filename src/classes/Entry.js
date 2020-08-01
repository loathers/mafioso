import {BLANK_BODY_CONTENT_LIST, COMBINABLE_ENTRIES_LIST} from 'constants/DEFAULTS';
import {CLOVER_ENCOUNTERS, SEMIRARE_ENCOUNTERS} from 'constants/ENCOUNTERS';
import ENTRY_TYPE, {IOTM_ENTRIES} from 'constants/entryType';
import REGEX from 'constants/regexes';

import * as entryParserUtils from 'utilities/entryParserUtils';
import {getEntryType} from 'utilities/entryTypeRegexUtils';
import {
  fixSpecialEntities, 
  getRegexMatch,
  hasString,
} from 'utilities/regexUtils';

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
    /** @type {EntryType} */
    this.entryType = getEntryType(rawText);
    /** @type {EntryData} */
    this.entryData = undefined;

    /** @type {RawText} */
    this.rawText = rawText;
    /** @type {EntryString} */
    this.entryString = fixSpecialEntities(rawText);

    /** @type {Object} */
    this.attributes = {
      /** @type {Number} */
      dayNum: -1,
      /** @type {Number} */
      turnNum: -1,
      /** @type {Boolean} */
      isFreeAdv: false,
      /** @type {Array<Number>} */
      adventureChanges: [],
      /** @type {String | null} */
      locationName: null,
      /** @type {String | null} */
      encounterName: null,
      /** @type {Boolean} */
      isCombatEncounter: false, // todo: is a duplication of entryType
      /** @type {Boolean} */
      isNonCombatEncounter: false, // todo: is a duplication of entryType
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
      /** @type {Boolean} */
      isVictory: false,
      /** @type {Boolean} */
      isDeath: false,
      /** @type {Array<String>} */
      replacedEnemies: [],

      // -- special, includes iotm
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
  /** @type {Boolean} */
  get hasEntry() {
    return this.entryString !== undefined;
  }
  /** @type {Boolean} */
  get hasEntryHeader() {
    return this.locationDisplay !== null || this.encounterDisplay !== null;
  }
  /** @type {Boolean} */
  get hasContentDisplay() {
    if (BLANK_BODY_CONTENT_LIST.includes(this.entryType)) {
      return false;
    }

    return this.contentDisplay !== null;
  }
  /** @type {Number} */
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
  // -- 
  /** @type {Boolean} */
  get isClover() {
    return CLOVER_ENCOUNTERS.includes(this.attributes.encounterName);
  }
  /** @type {Boolean} */
  get isSemirare() {
    return SEMIRARE_ENCOUNTERS.includes(this.attributes.encounterName);
  }
  // -- stats
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
    return this.createContentDisplay();
  }
  /** @type {String} */
  get locationDisplay() {
    if (this.entryType === ENTRY_TYPE.IOTM.BASTILLE_BATALLION) {
      return 'Bastille Battalion';
    }

    if (this.entryType === ENTRY_TYPE.IOTM.BEACH_COMB) {
      return 'Beach Comb';
    }

    if (this.entryType === ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.MAKE || this.entryType === ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.EAT) {
      return 'Diabolic Pizza';
    }

    if (this.entryType === ENTRY_TYPE.IOTM.DISTANT_WOODS_GETAWAY) {
      return 'Your Campsite Away From Your Campsite';
    }

    if (this.entryType === ENTRY_TYPE.IOTM.GARBAGE_TOTE) {
      return 'January\'s Garbage Tote';
    }

    if (this.entryType === ENTRY_TYPE.IOTM.SONGBOOM_BOOMBOX) {
      return 'SongBoom™ BoomBox';
    }

    if (this.entryType === ENTRY_TYPE.ITEMS.HAGNK_PULL) {
      return 'Hagnk\'s Ancestral Mini-Storage';
    }

    return this.attributes.locationName;
  }
  /** @type {String} */
  get encounterDisplay() {
    if (this.entryType === ENTRY_TYPE.IOTM.SONGBOOM_BOOMBOX) {
      return `♫ ${this.findText(REGEX.SONGBOOM_BOOMBOX.RESULT)} ♫`;
    }

    if (this.entryType === ENTRY_TYPE.IOTM.DISTANT_WOODS_GETAWAY) {
      if (this.hasText(REGEX.DISTANCE_WOODS_GETAWAY.GAZING_LINE)) {
        return 'Gaze at the Stars'
      }
    }

    if (this.entryType === ENTRY_TYPE.ITEMS.HAGNK_PULL) {
      return 'Pull from Hagnk\'s';
    }

    return this.attributes.encounterName;
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
  get isDisintigrated() {
    return Boolean(this.attributes.disintigrater);
  }
  /** @type {Boolean} */
  get isReplaced() {
    return Boolean(this.attributes.replacers) && this.attributes.replacers.length > 0;
  }
  /** @type {Boolean} */
  get hasReplacedEnemies() {
    return Boolean(this.attributes.replacedEnemies) && this.attributes.replacedEnemies.length > 0;
  }
  // -- iotm getters
  /** @type {Boolean} */
  get isIOTM() {
    return IOTM_ENTRIES.includes(this.entryType) 
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
    return this.entryType === ENTRY_TYPE.IOTM.PILLKEEPER;
  }
  /** @type {Boolean} */
  get hasPocketProfessor() {
    return this.hasText(REGEX.POCKET_PROFESSOR.SKILL_USE_LINE);
  }
  /** @returns {Boolean} */
  isEntryDiabolicPizza() {
    return this.entryType === ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.MAKE 
      || this.entryType === ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.EAT;
  }
  /** @returns {Boolean} */
  hasDiabolicPizzaIngredients() {
    if (!this.isEntryDiabolicPizza()) {
      return false;
    }

    return this.attributes.diabolicPizzaIngredients.length > 0;
  }
  // -- utility
  /**
   * @return {Object}
   */
  export() {
    return {
      entryId: this.id,
      // entryIdx: this.entryIdx,
      entryType: this.entryType,
      ...this.attributes,
    }
  }
  /** 
   * checks if the `entryString` contains given string
   * @param {String | Regex} txt
   * @return {Boolean}
   */
  hasText(txt) {
    return hasString(this.entryString, txt);
  }
  /** 
   * gets the (first) matched text from `entryString`
   * @param {String | Regex} txt
   * @return {String}
   */
  findText(txt) {
    const matchedText = getRegexMatch(this.entryString, txt) || [];
    return matchedText[0] || '';
  } 
  /**
   * the text that we display in the entry 
   * 
   * @return {String | null}
   */
  createContentDisplay() {
    const entryBody = entryParserUtils.createEntryBody(this.entryString);
    return entryBody.length <= 0 ? null : entryBody;
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
    if (this.entryType === ENTRY_TYPE.IOTM.GARBAGE_TOTE 
      && this.hasText(REGEX.JANUARYS_GARBAGE_TOTE.USE_FOLDABLE)
      && comparedEntry.hasText(REGEX.JANUARYS_GARBAGE_TOTE.EQUIP_RESULT)) {
      return true;
    }

    // (deluxe) mr klaw - incomplete
    if (this.hasText(/mr. klaw/i) && comparedEntry.hasText(/mr. klaw/i)) {
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
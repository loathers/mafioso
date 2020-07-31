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
    if (this.entryType === ENTRY_TYPE.IOTM.BASTILLE_BATALLION) {
      return false;
    }

    if (this.entryType === ENTRY_TYPE.IOTM.SONGBOOM_BOOMBOX) {
      return false;
    }

    if (this.entryType === ENTRY_TYPE.SNAPSHOT.VALHALLA) {
      return false;
    }

    return this.contentDisplay !== null;
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
  // -- stats
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
  // -- combat
  /** @type {Boolean} */
  get hasCombatActions() {
    return this.attributes.combatActions.length > 0;
  }
  /** @type {Boolean} */
  get isAttracted() {
    return Boolean(this.attributes.attractors) && this.attributes.copiers.attractors > 0;
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
    return Boolean(this.attributes.replacers) && this.attributes.copiers.replacers > 0;
  }
  // -- iotm getters
  /** @type {Boolean} */
  get isIOTM() {
    return IOTM_ENTRIES.includes(this.entryType) 
      || this.attributes.isEndedByUseTheForce;
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
   * checks if the `rawText` contains given string
   * @param {String | Regex} txt
   * @return {Boolean}
   */
  hasText(txt) {
    return hasString(this.rawText, txt);
  }
  /** 
   * gets the (first) matched text from `rawText`
   * @param {String | Regex} txt
   * @return {String}
   */
  findText(txt) {
    const matchedText = getRegexMatch(this.rawText, txt) || [];
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
    // shopping at the same place can be condensed
    if (this.entryType === ENTRY_TYPE.TRANSACTION && this.doesShareLocation(comparedEntry)) {
      return true;
    }

    // combine kolmafia commonly purchasing and using 
    if (this.hasText('chewing gum on a string') && comparedEntry.hasText('chewing gum on a string')) {
      return true;
    }

    // Bastille Batallion
    if (this.entryType === ENTRY_TYPE.IOTM.BASTILLE_BATALLION && this.doesShareEntryType(comparedEntry)) {
      return true;
    }

    // Garbage Tote
    if (this.entryType === ENTRY_TYPE.IOTM.GARBAGE_TOTE 
      && this.hasText(REGEX.JANUARYS_GARBAGE_TOTE.USE_FOLDABLE)
      && comparedEntry.hasText(REGEX.JANUARYS_GARBAGE_TOTE.EQUIP_RESULT)) {
      return true;
    }

    // all equip texts can be combined into one
    if (this.entryType === ENTRY_TYPE.ITEMS.EQUIP && this.doesShareEntryType(comparedEntry)) {
      return true;
    }

    if (this.entryType === ENTRY_TYPE.TALKING && this.doesShareEntryType(comparedEntry)) {
      return true;
    }

    if (this.entryType === ENTRY_TYPE.ITEMS.HAGNK_PULL && this.doesShareEntryType(comparedEntry)) {
      return true;
    }

    if (this.entryType === ENTRY_TYPE.IOTM.DISTANT_WOODS_GETAWAY && this.doesShareEntryType(comparedEntry)) {
      return true;
    }

    // (deluxe) mr klaw - incomplete
    if (this.hasText(/mr. klaw/i) && comparedEntry.hasText(/mr. klaw/i)) {
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
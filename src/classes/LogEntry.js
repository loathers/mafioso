import ENTRY_TYPE from 'constants/entryType';
import REGEX from 'constants/regexes';

import * as entryParserUtils from 'utilities/entryParserUtils';
import {getEntryType} from 'utilities/entryTypeRegexUtils';
import {fixSpecialEntities, hasString} from 'utilities/regexUtils';

/**
 * 
 */
export default class LogEntry {
  /** @default */
  constructor({entryId, entryIdx, rawText}) {
    /** @type {Number} */
    this.id = entryId;
    /** @type {Number} */
    this.entryIdx = entryIdx;
    /** @type {String} */
    this.rawText = rawText;

    /** @type {EntryType} */
    this.entryType = getEntryType(rawText);
    /** @type {String} */
    this.entryString = fixSpecialEntities(rawText);
    /** @type {String | null} */
    this.entryDisplay = null;

    /** @type {Object} */
    this.data = {
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
      isNoncombatEncounter: false, // todo: is a duplication of entryType
      /** @type {Array<String>} */
      acquiredItems: [],
      /** @type {Array<String>} */
      acquiredEffects: [],
      /** @type {Number} */
      meatChange: 0,
    };
    /** @type {Object} */
    this.statData = {
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
    }
    /** @type {Object} */
    this.combatData = {
      /** @type {Boolean} */
      hasInitiative: false,
      /** @type {Array<String>} */
      combatActions: [],
      /** @type {Boolean} */
      isVictory: false,
      /** @type {Boolean} */
      isDeath: false,
    }
    /** @type {Object} */
    this.specialData = {
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
    // common data
    const parsedCommonData = entryParserUtils.parseCommonData(this.entryString);
    this.data = {
      ...this.data,
      ...parsedCommonData,
    };

    // stat data
    const parsedStatData = entryParserUtils.parseStatData(this.entryString);
    this.statData = {
      ...this.statData,
      ...parsedStatData,
    };

    // combat data
    const parsedCombatData = entryParserUtils.parseCombatData(this.entryString);
    this.combatData = {
      ...this.combatData,
      ...parsedCombatData,
    };

    // special data
    const parsedSpecialData = entryParserUtils.parseEntrySpecial(this.entryString);
    this.specialData = {
      ...this.specialData,
      ...parsedSpecialData,
    };

    this.entryDisplay = this.getEntryDisplay();
  }
  /** 
   * checks if the `rawText` contains given string
   * @param {String | Regex} txt
   * @return {Boolean}
   */
  hasText(txt) {
    return hasString(this.rawText, txt);
  }
  /** @returns {Boolean} */
  hasEntry() {
    return this.entryString !== undefined;
  }
  /** @returns {Boolean} */
  hasData() {
    return this.data !== undefined;
  }
  /** @returns {Boolean} */
  hasEntryHeader() {
    return this.locationDisplay !== null || this.encounterDisplay !== null;
  }
  /** @type {Boolean} */
  get hasStatChanges() {
    return this.statData.isMusUp 
      || this.statData.isMystUp 
      || this.statData.isMoxUp 
      || this.musSubstats !== 0 
      || this.mystSubstats !== 0 
      || this.moxSubstats !== 0;
  }
  /** @type {Boolean} */
  get hasMeatChanges() {
    return this.data.meatChange !== 0;
  }
  /** @type {Boolean} */
  get hasAcquiredItems() {
    return this.data.acquiredItems !== 0;
  }
  /** @type {Boolean} */
  get hasInventoryChanges() {
    return this.hasMeatChanges || this.hasAcquiredItems;
  }
  // -- stats
  /** @type {Number} */
  get musSubstats() {
    return this.statData.musExpChanges.reduce((expTotal, expNum) => expTotal + expNum, 0);
  }
  /** @type {Number} */
  get mystSubstats() {
    return this.statData.mystExpChanges.reduce((expTotal, expNum) => expTotal + expNum, 0);
  }
  /** @type {Number} */
  get moxSubstats() {
    return this.statData.moxExpChanges.reduce((expTotal, expNum) => expTotal + expNum, 0);
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

    if (this.entryType === ENTRY_TYPE.IOTM.GARBAGE_TOTE) {
      return 'January\'s Garbage Tote';
    }

    return this.data.locationName;
  }
  /** @type {String} */
  get encounterDisplay() {
    return this.data.encounterName;
  }
  // -- combat
  /** @returns {Boolean} */
  hasCombatActions() {
    return this.combatData.combatActions.length > 0;
  }
  // -- special getters
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

    return this.specialData.diabolicPizzaIngredients.length > 0;
  }
  /**
   * @return {Object}
   */
  export() {
    return {
      entryId: this.entryId,
      entryIdx: this.entryIdx,
      entryType: this.entryType,
      entryString: this.entryString,
      ...this.data,
    }
  }
  // -- utility
  /**
   * the text that we display in the entry 
   * 
   * @return {String | null}
   */
  getEntryDisplay() {
    if (this.entryType === ENTRY_TYPE.IOTM.BASTILLE_BATALLION) {
      return null;
    }

    const entryBody = entryParserUtils.createEntryBody(this.entryString);
    return entryBody.length <= 0 ? null : entryBody;
  }
  /** @returns {String} */
  getItemsDisplay() {
    return this.data.acquiredItems.join(', ');
  }
  /** @returns {String} */
  getMeatDisplay() {
    const meatChange = this.data.meatChange;
    const meatDisplay = meatChange.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    if (meatChange > 0) {
      return `+${meatDisplay}`;
    }

    return meatDisplay;
  }
  /**
   * @param {LogEntry} comparedEntry
   * @return {Boolean}
   */
  doesShareEntryType(comparedEntry) {
    if (this.entryType === null || comparedEntry.entryType === null) {
      return false;
    }

    return this.entryType === comparedEntry.entryType;
  }
  /**
   * @param {LogEntry} comparedEntry
   * @return {Boolean}
   */
  doesShareLocation(comparedEntry) {
    if (this.data.locationName === null || comparedEntry.data.locationName === null) {
      return false;
    }

    return this.data.locationName === comparedEntry.data.locationName;
  }
  /**
   * @param {LogEntry} comparedEntry
   * @return {Boolean}
   */
  doesShareEncounter(comparedEntry) {
    if (this.data.encounterName === null || comparedEntry.data.encounterName === null) {
      return false;
    }

    return this.data.encounterName === comparedEntry.data.encounterName;
  }
  /**
   * @param {LogEntry} comparedEntry
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
    if (this.entryType === ENTRY_TYPE.EQUIP && this.doesShareEntryType(comparedEntry)) {
      return true;
    }

    if (this.entryType === ENTRY_TYPE.TALKING && this.doesShareEntryType(comparedEntry)) {
      return true;
    }

    // (deluxe) mr klaw - incomplete
    if (this.hasText(/mr. klaw/i) && comparedEntry.hasText(/mr. klaw/i)) {
      return true;
    }

    return false;
  }
  /**
   * @param {LogEntry} comparedEntry
   * @return {Boolean}
   */
  canRelateTo(comparedEntry) {
    if (this.canCombineWith(comparedEntry)) {
      return true;
    }

    return this.doesShareLocation(comparedEntry);
  }
}
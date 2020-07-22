import ENTRY_TYPE from 'constants/entryType';

import * as entryParserUtils from 'utilities/entryParserUtils';
import {getEntryType} from 'utilities/entryTypeRegexUtils';
import {fixSpecialEntities} from 'utilities/regexUtils';

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
  // -- display getters
  /** @returns {String} */
  getLocationDisplay() {
    if (this.isEntryDiabolicPizza()) {
      return 'Diabolic Pizza Cube';
    }

    return this.data.locationName;
  }
  /** @returns {String} */
  getEncounterDisplay() {
    return this.data.encounterName;
  }
  /** @returns {String} */
  getItemsDisplay() {
    return this.data.acquiredItems.join(', ');
  }
  /** @returns {String} */
  getMeatDisplay() {
    if (this.data.meatChange > 0) {
      return `+${this.data.meatChange}`;
    }

    return this.data.meatChange;
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
    return this.getLocationDisplay() !== null || this.getEncounterDisplay() !== null;
  }
  /** @returns {Boolean} */
  hasMeatChanged() {
    return this.data.meatChange !== 0;
  }
  /** @returns {Boolean} */
  hasAcquiredItems() {
    return this.data.meatChange !== 0;
  }
  /** @returns {Boolean} */
  hasInventoryChanges() {
    return this.hasMeatChanged() || this.hasAcquiredItems();
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
   * the text that we display in the entry 
   * 
   * @return {String | null}
   */
  getEntryDisplay() {
    // transactions will just be spending meat and gaining items
    if (this.entryType === ENTRY_TYPE.TRANSACTION) {
      return null;
    }

    const entryBody = entryParserUtils.createEntryBody(this.entryString);
    return entryBody.length <= 0 ? null : entryBody;
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
}
import ENTRY_TYPE from 'constants/entryType';

import * as entryParserUtils from 'utilities/entryParserUtils';

/**
 * 
 */
export default class LogEntry {
  /** @default */
  constructor({entryId, entryIdx, entryType, entryString}) {
    /** @type {Number} */
    this.id = entryId;
    /** @type {Number} */
    this.entryIdx = entryIdx;
    /** @type {EntryType} */
    this.entryType = entryType;
    /** @type {String} */
    this.entryString = entryString;
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
      combatActions: [],
      /** @type {Array<String>} */
      acquiredItems: [],
      /** @type {Array<String>} */
      acquiredEffects: [],
      /** @type {Number} */
      meatChange: 0,
      /** @type {Number} */
      musChange: 0,
      /** @type {Number} */
      mystChange: 0,
      /** @type {Number} */
      moxChange: 0,
      /** @type {Boolean} */
      hasInitiative: false,
      /** @type {Boolean} */
      isVictory: false,
      /** @type {Boolean} */
      isDeath: false,
      /** @type {Boolean} */
      isLevelUp: false,
    };
    /** @type {Object} */
    this.specialData = {
      /** @type {Boolean} */
      isEndedByUseTheForce: false,
      /** @type {Array<String>} */
      diabolicPizzaIngredients: [],
    }

    /** @type {String | null} */
    this.entryDisplay = entryString;

    // can automatically parse if given a string
    if (entryString !== '' && Boolean(entryString)) {
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
    return this.data.meatChange;
  }
  // -- boolean getters
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
  hasCombatActions() {
    return this.data.combatActions.length > 0;
  }
  /** @returns {Boolean} */
  hasInventoryChanges() {
    return this.hasMeatChanged() || this.hasAcquiredItems();
  }
  // -- special getters
  /** @returns {String} */
  transactionDisplay() {
    return `Bought ${this.getItemsDisplay()} for ${this.getMeatDisplay()} meat.`;
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

    return this.specialData.diabolicPizzaIngredients.length > 0;
  }
  /**
   * once `entryString` is given we can set all the properties
   */
  initialize() {
    // common adventure data
    const parsedData = entryParserUtils.parseEntry(this.entryString);
    this.data = {
      ...this.data,
      ...parsedData,
    };

    // common special data
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
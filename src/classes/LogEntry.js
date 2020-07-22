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
  /** @type {Boolean} */
  get hasEntry() {
    return this.entryString !== undefined;
  }
  /** @type {Boolean} */
  get hasData() {
    return this.data !== undefined;
  }
  // -- data getters
  /** @type {Boolean} */
  get hasEntryHeader() {
    return this.data.locationName || this.data.encounterName;
  }
  /** @type {Boolean} */
  get hasMeatChanged() {
    return this.data.meatChange !== 0;
  }
  /** @type {String} */
  get itemsDisplay() {
    return this.data.acquiredItems.join(', ');
  }
  /** @type {String} */
  get meatDisplay() {
    return this.data.meatChange;
  }
  /** @type {Boolean} */
  get hasDiabolicPizzaIngredients() {
    return this.specialData.diabolicPizzaIngredients.length > 0;
    // return this.entryType === ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.MAKE;
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
  // -- unique displays
  /** @type {String} */
  get transactionDisplay() {
    return `Bought ${this.itemsDisplay} for ${this.meatDisplay} meat.`;
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
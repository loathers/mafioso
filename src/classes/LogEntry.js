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
      /** @type {String | null} */
      entryBody: null,
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
    };
    /** @type {Object} */
    this.specialData = {
      /** @type {Boolean} */
      isEndedByUseTheForce: false,
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
  /** @type {String} */
  get locationDisplay() {
    return this.data.locationName || '';
  }
  /** @type {String} */
  get itemsDisplay() {
    return this.data.acquiredItems.join(', ');
  }
  /** @type {String} */
  get meatDisplay() {
    return this.data.meatChange;
  }
  /**
   * 
   */
  initialize() {
    const parsedData = entryParserUtils.parseEntry(this.entryString);
    this.data = {
      ...this.data,
      ...parsedData,
    };

    const parsedSpecialData = entryParserUtils.parseEntry(this.entryString);
    this.specialData = {
      ...this.specialData,
      ...parsedSpecialData,
    };

    const entryBody = entryParserUtils.createEntryBody(this.entryString);
    this.entryDisplay = entryBody.length <= 0 ? null : entryBody;
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
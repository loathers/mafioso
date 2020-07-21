import * as entryParserUtils from 'utilities/entryParserUtils';

/**
 * 
 */
export default class LogEntry {
  /** @default */
  constructor({entryIdx, entryType, entryString}) {
    /** @type {Number} */
    this.entryIdx = entryIdx;
    /** @type {EntryType} */
    this.entryType = entryType;
    /** @type {String} */
    this.entryString = entryString;
    /** @type {Object} */
    this.data = {
      /** @type {Number} */
      actionNum: -1,
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
    };

    // can automatically parse if given a string
    if (entryString) {
      const parsedData = entryParserUtils.parseEntry(entryString);
      this.data = {
        ...this.data,
        ...parsedData,
      };
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
  /** @type {String} */
  get itemsDisplay() {
    return this.data.acquiredItems.join(', ');
  }
  /** @type {String} */
  get meatDisplay() {
    return this.data.meatChange;
  }
  /**
   * @return {Object}
   */
  export() {
    return {
      entryIdx: this.entryIdx,
      entryType: this.entryType,
      entryString: this.entryString,
      ...this.data,
    }
  }
}
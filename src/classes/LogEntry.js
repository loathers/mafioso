
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
    this.data = undefined;

    // can automatically parse if given a string
    if (entryString) {
      // this.parse();
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
}
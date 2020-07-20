
/**
 * 
 */
export default class LogEntry {
  /** @default */
  constructor(lineStr) {
    /** @type {String} */
    this.srcString = lineStr;
    /** @type {Object} */
    this.data = undefined;

    // can automatically parse if given a string
    if (lineStr) {
      this.parse();
    }
  }
  /** @type {Boolean} */
  get hasSrc() {
    return this.srcString !== undefined;
  }
  /** @type {Boolean} */
  get hasData() {
    return this.data !== undefined;
  }
}
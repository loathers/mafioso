/**
 * single line in the log
 */
export default class LogTableEntry {
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
  /**
   * @type {Boolean}
   */
  get hasSrc() {
    return this.srcString !== undefined;
  }
  /**
   * parse the linedata 
   */
  parse() {
    if (!this.hasSrc) {
      return;
    }

    const stringSplit = this.srcString.split('\t');
    const newData = {
      actionId: stringSplit[0],
      day: stringSplit[1],
      turn: stringSplit[2],
      location: stringSplit[3],
      encounter: stringSplit[4],
      familiar: stringSplit[5],
      special: stringSplit[6],
      items: stringSplit[7],
      effects: stringSplit[8],
      mus: stringSplit[9],
      myst: stringSplit[10],
      mox: stringSplit[11],
      meat: stringSplit[12],
    };

    this.data = newData;
    // console.log('... line data', newData)
  }
}
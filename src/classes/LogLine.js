/**
 * single line in the log
 */
export default class LogLine {
  /** @default */
  constructor(lineStr) {
    /** @type {String} */
    this.srcLine = lineStr;
    /** @type {Object} */
    this.parsedData = undefined;

    // can automatically parse if given a string
    if (lineStr) {
      this.parse();
    }
  }
  /**
   * @type {Boolean}
   */
  get hasSrc() {
    return this.srcLine !== undefined;
  }
  /**
   * parse the linedata 
   */
  parse() {
    if (!this.hasSrc) {
      return;
    }

    const lineSplit = this.srcLine.split('\t');
    const newData = {
      actionId: lineSplit[0],
      day: lineSplit[1],
      turn: lineSplit[2],
      location: lineSplit[3],
      encounter: lineSplit[4],
      familiar: lineSplit[5],
      special: lineSplit[6],
      items: lineSplit[7],
      effects: lineSplit[8],
      mus: lineSplit[9],
      myst: lineSplit[10],
      mox: lineSplit[11],
      meat: lineSplit[12],
    };

    this.parsedData = newData;
    // console.log('... line data', newData)
  }
}
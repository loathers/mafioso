/** instantiate a single instance of FileReader */
const fileReader = new FileReader();

/**
 * single line in the log
 */
class LogLine {
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
/**
 * store of the log
 */
class LogStore {
  /** @default */
  constructor() {
    /** @type {File} */
    this.srcFile = undefined;
    /** @type {String} */
    this.srcLog = undefined;
    /** @type {Array<LogLine>} */
    this.logData = undefined;

    // file reader callback
    fileReader.onload = this.onReadComplete.bind(this);
  }
  /**
   * @type {Boolean}
   */
  get hasSrc() {
    return this.srcFile !== undefined;
  }
  /**
   * @type {Boolean}
   */
  get hasLog() {
    return this.srcLog !== undefined;
  }
  /**
   * @param {File} file
   */
  handleUpload(file) {
    console.log('!handleUpload()')
    this.srcFile = file;

    fileReader.readAsText(file);
  }
  /**
   * @param {FileReader.Event} readerEvt
   */
  onReadComplete(readerEvt) {
    const txtString = readerEvt.target.result;
    this.srcLog = txtString;
    this.parse();
  }
  /**
   * handle cleaning up and setting all the data
   */
  parse() {
    if (!this.hasLog) {
      return;
    }

    // do we have enough data
    const completeLogSplit = this.srcLog.split('\n');
    if (completeLogSplit.length <= 2) {
      return new Error('Not enough data on this log.');
    }

    // remove the ascension # and header data
    const relevantLogSplit = completeLogSplit.slice(2, completeLogSplit.length);

    // parse and build array data
    const logDataArray = relevantLogSplit.map((lineStr) => new LogLine(lineStr));
    this.logData = logDataArray;
  }
}

/** export singleton */
export default new LogStore();
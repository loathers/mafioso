const sampleLine1 = '0000\tDay\tTurn\tLocation\tEncounter\tFamiliar\tSpecial\tItems\tEffects\tMus\tMyst\tMox\tMeat';
const sampleLine2 = '0003\t1\t1\tBoxing Daycare\tEnter the Boxing Daycare\tLeft-Hand Man\t\tBrutal brogues|sharkfin gumbo|\t\t0\t0\t0\t0'
const sampleLog = `${sampleLine1}\n${sampleLine2}`;


/** instantiate a single instance of FileReader */
const fileReader = new FileReader();

class LogLine {
  /** @default */
  constructor(lineStr) {
    /** @type {String} */
    this.srcLine = lineStr;
    /** @type {Object} */
    this.parsedData = undefined;

    if (this.hasSrc) {
      this.parse();
    }
  }
  /**
   * @type {Boolean}
   */
  get hasSrc() {
    return this.srcLine !== undefined;
  }

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

class LogStore {
  /** @default */
  constructor() {
    /** @type {File} */
    this.srcFile = undefined;
    /** @type {String} */
    this.srcLog = sampleLog;
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

  handleUpload(file) {
    console.log('!handleUpload()')
    this.srcFile = file;

    fileReader.readAsText(file);
  }

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

export default new LogStore();
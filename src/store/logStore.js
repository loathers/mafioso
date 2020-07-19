const sampleLine1 = '0000\tDay\tTurn\tLocation\tEncounter\tFamiliar\tSpecial\tItems\tEffects\tMus\tMyst\tMox\tMeat';
const sampleLine2 = '0003\t1\t1\tBoxing Daycare\tEnter the Boxing Daycare\tLeft-Hand Man\t\tBrutal brogues|sharkfin gumbo|\t\t0\t0\t0\t0'
const sampleLog = `${sampleLine1}\n${sampleLine2}`;

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
    console.log('#newData', newData)
  }
}

class LogStore {
  /** @default */
  constructor() {
    /** @type {String} */
    this.srcLog = sampleLog;
    /** @type {Array<LogLine>} */
    this.parsedData = undefined;
  }
  /**
   * @type {Boolean}
   */
  get hasSrc() {
    return this.srcLog !== undefined;
  }

  handleUpload(file) {
    this.srcLog = file;
  }

  parse() {
    if (!this.hasSrc) {
      return;
    }

    const logSplit = this.srcLog.split('\n');
    const logDataArray = logSplit.map((lineStr) => new LogLine(lineStr));
    this.parsedData = logDataArray;
  }
}

export default new LogStore();
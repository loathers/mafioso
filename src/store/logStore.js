import LogLine from 'classes/LogLine';

const sampleHeaderLines = 'Ascension #0175\n0000\tDay\tTurn\tLocation\tEncounter\tFamiliar\tSpecial\tItems\tEffects\tMus\tMyst\tMox\tMeat';
const sampleLine1 = '0001\t1\t1\tCombing (experience) Beach Head\t\tLeft-Hand Man\t\t\t0\t0\t0\t0';
const sampleLine2 = '0002\t1\t1\tBoxing Daycare\tEnter the Boxing Daycare\tLeft-Hand Man\t\tBrutal brogues|sharkfin gumbo|\t\t0\t0\t0\t0';
const sampleLogString = `${sampleHeaderLines}\n${sampleLine1}\n${sampleLine2}`;

/** instantiate a single instance of FileReader */
const fileReader = new FileReader();

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
  /** @type {Boolean} */
  get hasSrc() {
    return this.srcFile !== undefined;
  }
  /** @type {Boolean} */
  get hasLog() {
    return this.srcLog !== undefined;
  }
  /** @type {Boolean} */
  get hasData() {
    return this.logData !== undefined;
  }
  /**
   * @param {File} file
   */
  handleUpload(file) {
    console.log('! handleUpload()')
    this.srcFile = file;

    fileReader.readAsText(file);
  }
  /**
   * @param {FileReader.Event} readerEvt
   */
  onReadComplete(readerEvt) {
    const txtString = readerEvt.target.result;
    this.cacheLog(txtString);
  }
  /**
   * @param {String} srcLog
   */
  cacheLog(srcLog) {
    console.log('! cacheLog()')
    this.srcLog = srcLog;
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
    console.log('. finished parsing', logDataArray.length, 'lines');
  }
}

/** export singleton */
const logStore = new LogStore();
logStore.cacheLog(sampleLogString); // dev testing
export default logStore;
import LogLine from 'classes/LogLine';

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
export default new LogStore();
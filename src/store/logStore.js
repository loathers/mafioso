import LogTableEntry from 'classes/LogTableEntry';

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
    /** @type {Array<LogTableEntry>} */
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

    // an entry is separated by two new lines
    //  going to first do a broad grouping
    // todo: windows/unix/osx split
    const completeLogSplit = this.srcLog.split(/\r\n\r\n/);

    // do we have enough data
    if (completeLogSplit.length <= 2) {
      console.warn('Not enough data on this log.');
      return;
    }

    console.log('completeLogSplit', completeLogSplit.slice(0, Math.min(1000, completeLogSplit.length)));
  }
}

/** export singleton */
const logStore = new LogStore();
export default logStore;
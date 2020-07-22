import {
  observable,
} from 'mobx';

import ENTRY_TYPE from 'constants/entryType';

import * as logParserUtils from 'utilities/logParserUtils';

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
    /** @type {ObservableArray<LogEntry>} */
    this.logData = observable([]);
    /** @type {Object} */
    this.filterOptions = observable({
      /** @type {Number} */
      pageNum: 0,
      /** @type {Number} */
      displayPerPage: 100,
      /** @type {Array<EntryType>} */
      visibleEntryTypes: [
        ENTRY_TYPE.SNAPSHOT.ASCENSION_INFO,
        ENTRY_TYPE.ENCOUNTER.COMBAT,
        ENTRY_TYPE.ENCOUNTER.NONCOMBAT,
        ENTRY_TYPE.CONSUMPTION.EAT,
        ENTRY_TYPE.CONSUMPTION.DRINK,
        ENTRY_TYPE.CONSUMPTION.CHEW,
        ENTRY_TYPE.TRANSACTION,
        ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.MAKE,
        ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.EAT,
      ],
    });

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
    return this.logData && this.logData.length > 0;
  }
  /** @type {Boolean} */
  get visibleEntries() {
    const {
      displayPerPage,
      visibleEntryTypes,
    } = this.filterOptions;

    return this.logData
      .filter((logEntry) => visibleEntryTypes.includes(logEntry.entryType))
      .slice(0, Math.min(displayPerPage, this.logData.length));
  }
  /**
   * @param {File} file
   */
  handleUpload(file) {
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

    const newData = logParserUtils.parseLog(this.srcLog);
    this.logData.replace(newData);
  }
}

/** export singleton */
const logStore = new LogStore();
export default logStore;
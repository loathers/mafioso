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
      pageNum: 1,
      /** @type {Number} */
      entriesPerPage: 300,
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
      /* @type {Object} */
      dataFilters: {},
    });

    /** @type {Boolean} */
    this.isParsing = observable.box(false);

    // file reader callback
    fileReader.onload = this.onReadComplete.bind(this);
  }
  /** @returns {Boolean} */
  hasLog() {
    return this.srcLog !== undefined;
  }
  /** @returns {Boolean} */
  hasData() {
    return this.logData && this.logData.length > 0;
  }
  /** @return {Array<LogEntry>} */
  getCurrentEntries() {
    return this.getEntries(this.filterOptions);
  }
  /**
   * @param {File} file
   */
  handleUpload(file) {
    this.isParsing.set(true);
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
  async parse() {
    if (!this.hasLog()) {
      return;
    }

    const newData = await logParserUtils.parseLogTxt(this.srcLog);
    this.logData.replace(newData);

    this.isParsing.set(false);
  }
  /** 
   * @param {Object} options
   * @return {Array<LogEntry>} 
   */
  getEntries(options = {}) {
    const {
      pageNum = this.filterOptions.pageNum,
      entriesPerPage = this.filterOptions.entriesPerPage,
      visibleEntryTypes = this.filterOptions.visibleEntryTypes,
      // dataFilters = this.filterOptions.dataFilters,
    } = options;

    const startIdx = entriesPerPage === 'all' ? 0 : entriesPerPage * pageNum;
    const endIdx = entriesPerPage === 'all' ? this.logData.length : startIdx + entriesPerPage;

    return this.logData
      .slice(startIdx, endIdx)
      .filter((logEntry) => visibleEntryTypes.includes(logEntry.entryType));
  }
}

/** export singleton */
const logStore = new LogStore();
export default logStore;
import {
  observable,
} from 'mobx';

import ENTRY_TYPE from 'constants/entryType';

import * as logParserUtils from 'utilities/logParserUtils';

/** instantiate a single instance of FileReader */
const fileReader = new FileReader();

/**
 * state and handler of the log data
 */
class LogStore {
  /** @default */
  constructor() {
    /** @type {File} */
    this.srcFile = undefined;
    /** @type {String} */
    this.rawText = undefined;
    /** @type {ObservableArray<LogEntry>} */
    this.logEntries = observable([]);
    /** @type {Object} */
    this.filterOptions = observable({
      /** @type {Number} */
      pageNum: 1,
      /** @type {Number} */
      entriesPerPage: 500,
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
  /** @type {Boolean} */
  get hasRawText() {
    return this.rawText !== undefined;
  }
  /** @type {Boolean} */
  get hasParsedEntries() {
    return this.logEntries.length > 0;
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
    this.rawText = txtString;
    this.parse();
  }
  /**
   * handle cleaning up and setting all the data
   */
  async parse() {
    if (!this.hasRawText) {
      return;
    }

    const newData = await logParserUtils.parseLogTxt(this.rawText);
    this.logEntries.replace(newData);

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
    const endIdx = entriesPerPage === 'all' ? this.logEntries.length : startIdx + entriesPerPage;

    return this.logEntries
      .slice(startIdx, endIdx)
      .filter((logEntry) => visibleEntryTypes.includes(logEntry.entryType));
  }
}

/** export singleton */
const logStore = new LogStore();
export default logStore;
import {
  observable,
} from 'mobx';

import LogEntry from 'classes/LogEntry';

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
    try {
      if (!this.hasRawText) {
        throw new Error('No log to parse???');
      }

      console.log('✨ %cParsing your Ascension Log!', 'color: Blue');
      const newData = await logParserUtils.parseLogTxt(this.rawText);
      this.logEntries.replace(newData);

      this.isParsing.set(false);
      console.log(`✨ %cFinished! Created ${this.logEntries.length} entries.`, 'color: Blue');

    } catch (e) {
      console.error(e);
    }
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

    const filteredEntries = this.logEntries
      .slice(startIdx, endIdx)
      .filter((logEntry) => visibleEntryTypes.includes(logEntry.entryType));

    return this.condenseEntries(filteredEntries);
  }
  /**
   * the way the system is currently designed, there is no need to make a shallow copy
   *  but it might be something to consider
   *
   * @param {Array<LogEntry>} entriesList 
   * @returns {Array<LogEntry>}
   */
  condenseEntries(entriesList) {
    // const originalLength = entriesList.length;
    let condensedData = [];

    while (entriesList.length > 0) {
      const currEntry = entriesList.shift();
      if (entriesList.length <= 0) {
        condensedData.push(currEntry);
        continue;
      }

      const nextEntry = entriesList.shift();
      if (currEntry.canCombineWith(nextEntry)) {
        const combinedEntry = new LogEntry({
          entryId: currEntry.id,
          entryIdx: currEntry.entryIdx,
          rawText: currEntry.rawText.concat('\n\n').concat(nextEntry.rawText),
        });

        entriesList.unshift(combinedEntry);
        continue;
      }

      entriesList.unshift(nextEntry);
      condensedData.push(currEntry);
    }

    // console.log(`Condensed entries from ${originalLength} entries to ${condensedData.length}`);
    return condensedData;
  }
}

/** export singleton */
const logStore = new LogStore();
export default logStore;
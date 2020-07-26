import {
  observable,
} from 'mobx';

import Batcher from 'classes/Batcher';
import LogEntry from 'classes/LogEntry';

import {DEFAULT_HIDDEN_ENTRIES} from 'constants/DEFAULTS';

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
    this.allEntries = observable([]);
    /** @type {Object} */
    this.filterOptions = observable({
      /** @type {Number} */
      pageNum: 0,
      /** @type {Number} */
      entriesPerPage: 300,
      /** @type {Array<EntryType>} */
      hiddenEntryTypes: DEFAULT_HIDDEN_ENTRIES,
      /* @type {Object} */
      dataFilters: {},
    });

    /** @type {Batcher} */
    this.logBatcher = undefined;

    /** @type {Boolean} */
    this.isParsing = observable.box(false);
    /** @type {Boolean} */
    this.isFetching = observable.box(false);

    // file reader callback
    fileReader.onload = this.onReadComplete.bind(this);
  }
  /** @type {Boolean} */
  get isReady() {
    return !this.isParsing.get() && !this.isFetching.get() && this.hasParsedEntries;
  }
  /** @type {Boolean} */
  get hasRawText() {
    return this.rawText !== undefined;
  }
  /** @type {Boolean} */
  get hasParsedEntries() {
    return this.allEntries.length > 0 && this.logBatcher !== undefined;
  }
  /** @type {Number} */
  get entriesCount() {
    return this.allEntries.length;
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
      throw new Error('No log to parse???');
    }

    console.log('✨ %cParsing your Ascension Log!', 'color: Blue');
    this.isParsing.set(true);

    const newData = await logParserUtils.parseLogTxt(this.rawText);
    this.allEntries.replace(newData);

    const estimatedBatchSize = Math.round(Math.sqrt(newData.length));
    this.logBatcher = new Batcher(newData, {batchSize: Math.max(100, estimatedBatchSize)});

    console.log(`✨ %cFinished! Created ${this.allEntries.length} entries.`, 'color: Blue');
    this.isParsing.set(false);
  }
  /** 
   * @param {Object} options
   * @return {Array<LogEntry>} 
   */
  async getEntries(options = {}) {
    const {
      pageNum = this.filterOptions.pageNum,
      entriesPerPage = this.filterOptions.entriesPerPage,
      hiddenEntryTypes = this.filterOptions.hiddenEntryTypes,
      // dataFilters = this.filterOptions.dataFilters,
    } = options;

    this.isFetching.set(true);

    const startIdx = entriesPerPage === 'all' ? 0 : Math.min(entriesPerPage * pageNum, this.entriesCount-1);
    const endIdx = entriesPerPage === 'all' ? this.entriesCount-1 : Math.min(startIdx + entriesPerPage, this.entriesCount-1);
    // console.log('I want entries from', startIdx, 'to', endIdx);

    // batch find entries that are in range and not hidden
    const filteredEntries = await this.logBatcher.run((entriesGroup) => {
      return entriesGroup.filter((logEntry) => {
        const withinSearchRange = logEntry.entryIdx >= startIdx && logEntry.entryIdx < endIdx;
        return withinSearchRange && !hiddenEntryTypes.includes(logEntry.entryType);
      });
    });
    
    const condensedEntries = this.condenseEntries(filteredEntries);
    this.isFetching.set(false);
    return condensedEntries;
  }
  /**
   * currently the parameter passed isn't a shallow copy
   *  but it might be something to consider
   *
   * @param {Array<LogEntry>} entriesList 
   * @returns {Array<LogEntry>}
   */
  condenseEntries(entriesList) {
    const originalLength = entriesList.length;
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

    console.log(`%cCondensed entries from ${originalLength} to ${condensedData.length}`, 'color: #6464ff');
    return condensedData;
  }
}

/** export singleton */
const logStore = new LogStore();
export default logStore;
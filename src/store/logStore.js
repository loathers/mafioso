import {
  observable,
} from 'mobx';

import Batcher from 'classes/Batcher';
import LogEntry from 'classes/LogEntry';

import {DEFAULT_HIDDEN_ENTRIES} from 'constants/DEFAULTS';
import REGEX from 'constants/regexes';

import * as logParserUtils from 'utilities/logParserUtils';

/**
 * state and handler of the log data
 */
class LogStore {
  /** @default */
  constructor() {
    /** @type {Array<File>} */
    this.srcFiles = [];
    /** @type {Array<String>} */
    this.srcRawTexts = [];
    /** @type {String} */
    this.rawText = undefined;
    /** @type {ObservableArray<LogEntry>} */
    this.allEntries = observable([]);
    /** @type {Number} */
    this.currentPageNum = 0;
    /** @type {ObservableArray<LogEntry>} */
    this.currentEntries = observable([]);
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
  }
  /** @type {Boolean} */
  get isReady() {
    return !this.isParsing.get() && !this.isFetching.get() && this.hasParsedEntries;
  }
  /** @type {Boolean} */
  get hasFiles() {
    return this.srcFiles.length > 0;
  }
  /** @type {Boolean} */
  get hasRawText() {
    return this.rawText !== undefined;
  }
  /** @type {Boolean} */
  get hasParsedEntries() {
    return this.allEntries.length > 0 && this.logBatcher !== undefined;
  }
  /** @type {Boolean} */
  get hasCurrentEntries() {
    return this.currentEntries.length > 0;
  }
  /** @type {Number} */
  get entriesCount() {
    return this.allEntries.length;
  }
  /**
   * @param {File} file
   */
  handleUpload_legacy(file) {
    if (file.type !== 'text/plain') {
      console.error('That is not a text file mate.');
      return;
    }

    this.isParsing.set(true);

    this.allEntries.clear();
    // this.currentEntries.clear();

    this.srcFiles = file;
  }
  /**
   * @param {FileReader.Event} readerEvt
   */
  onReadComplete_legacy(readerEvt) {
    const txtString = readerEvt.target.result;
    this.rawText = txtString;
    this.parse();
  }
  /**
   * @param {FileList} files
   */
  async handleUpload(files) {
    this.isParsing.set(true);
    console.log(`%c☌ Checking ${files.length} files...`, 'color: #6464ff');

    this.srcFiles = files;
    this.srcRawTexts = [];
    this.allEntries.clear();

    // sort files by kolmafia's date format
    const sortedFiles = Array.from(files).sort((fileA, fileB) => {
      const sessionDateA = Number(fileA.name.match(/(?<=_)\d*/)[0]);
      const sessionDateB = Number(fileB.name.match(/(?<=_)\d*/)[0]);
      return sessionDateA < sessionDateB ? -1 : 1;
    });

    // get the text from all the files
    this.srcRawTexts = await Promise.all(sortedFiles.map(this.readFile));

    // if there is only one file, we can parse immediately
    if (this.srcRawTexts.length === 1) {
      this.rawText = this.srcRawTexts[0];
      this.parse();
      return;
    }

    // if there are multiple files uploaded, try to find the ascension log
    if (this.srcRawTexts.length > 1) {
      this.rawText = this.createAscensionLog();
      this.parse();
      return;
    }

    console.error('It looks like none of those files were valid, mate.');
    this.isParsing.set(false);
  }
  /**
   * @async
   * @param {File} file
   * @returns {String}
   */
  readFile(file) {
    return new Promise((resolve) => {
      if (file.type !== 'text/plain') {
        console.error('Uploaded a non-text file.');
        resolve();
        return;
      }

      const fileReader = new FileReader();
      fileReader.onload = (readerEvt) => {
        const readResult = readerEvt.target.result;
        console.log(`%c☌ ...file "${file.name}" read.`, 'color: #6464ff');
        resolve(readResult);
      }
      
      fileReader.readAsText(file);
    });
  }
  /**
   * finds an ascension session from all the files available
   * 
   * @returns {String}
   */
  createAscensionLog() {
    const allText = this.srcRawTexts.join('\n\n');
    const ascensionMatch = allText.match(/welcome to valhalla.*?freeing king ralph/is);
    
    if (ascensionMatch !== null) {
      const ascensionNum = ascensionMatch[0].match(REGEX.VALUE.ASCENSION_NUMBER);
      console.log(`✨ %cWe found Ascension #${ascensionNum}!`, 'color: blue; font-size: 14px')
      // this.rawText = ascensionMatch[0];
      return ascensionMatch[0];
    
    } else {
      console.error('Sorry, no Ascension specific log was found. Parsing only the first file.');
      // this.rawText = this.srcRawTexts[0];
      return this.srcRawTexts[0];
    }
  }
  /**
   * handle cleaning up and setting all the data
   */
  async parse() {
    if (!this.hasRawText) {
      throw new Error('No log to parse???');
    }

    console.log('✨ %cParsing your Session Log:', 'color: blue; font-size: 14px');
    this.isParsing.set(true);

    const newData = await logParserUtils.parseLogTxt(this.rawText);
    // const newData = await logParserUtils.parseLogTxt(this.srcRawTexts.join('\n\n'));
    this.allEntries.replace(newData);

    const estimatedBatchSize = Math.round(Math.sqrt(newData.length));
    this.logBatcher = new Batcher(newData, {batchSize: estimatedBatchSize});

    console.log(`✔️ %cFinished! Created ${this.allEntries.length} entries.`, 'color: blue');
    this.currentPageNum = 0;
    this.isParsing.set(false);

    // we just parsed so we gotta refresh `currentEntries`
    this.fetchEntries();
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
  // -- update current logs and fetch functions
  /** 
   * @param {Object} options
   * @return {Array<LogEntry>} 
   */
  async fetchEntries(options = {}) {
    if (!this.canFetch(options)) {
      return [];
    }

    const {
      pageNum = this.filterOptions.pageNum,
      entriesPerPage = this.filterOptions.entriesPerPage,
      hiddenEntryTypes = this.filterOptions.hiddenEntryTypes,
      // dataFilters = this.filterOptions.dataFilters,
    } = options;

    console.log('⏳ %cFetching entries...', 'color: blue')
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
    }, {batchDelay: 10});

    // if fetch result would result in nothing, keep current
    if (filteredEntries.length <= 0) {
      console.warn(`No entries on page ${pageNum}`);
      this.isFetching.set(false);
      return this.currentEntries;
    }
    
    const condensedEntries = this.condenseEntries(filteredEntries);
    this.currentEntries.replace(condensedEntries);

    console.log('⌛ %c...done.', 'color: blue')
    this.currentPageNum = pageNum;
    this.isFetching.set(false);

    return condensedEntries;
  }
  /**
   * @param {Object} options
   * @returns {Boolean}
   */
  canFetch(options = {}) {
    if (!this.isReady) {
      return false;
    }

    const {
      pageNum = this.filterOptions.pageNum,
      entriesPerPage = this.filterOptions.entriesPerPage,
    } = options;

    if (pageNum < 0 || pageNum > this.calculatePageLast(entriesPerPage)) {
      return false;
    }

    return true;
  }
  /**
   * @param {Number} entriesPerPage
   * @returns {Number}
   */
  calculatePageLast(entriesPerPage = this.filterOptions.entriesPerPage) {
    return Math.ceil(this.allEntries.length / entriesPerPage) - 1;
  }
}

/** export singleton */
const logStore = new LogStore();
export default logStore;
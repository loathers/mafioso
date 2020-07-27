import {
  observable,
} from 'mobx';

import Batcher from 'classes/Batcher';
import Entry from 'classes/Entry';

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
    /** @type {ObservableArray<Entry>} */
    this.allEntries = observable([]);

    /** @type {String} */
    this.characterName = undefined;
    /** @type {Number} */
    this.ascensionNum = undefined;

    /** @type {Number} */
    this.currentPageNum = 0;
    /** @type {ObservableArray<Entry>} */
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
  get hasFiles() {
    return this.srcFiles.length > 0;
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
  /** @type {Boolean} */
  get hasCurrentEntries() {
    return this.currentEntries.length > 0;
  }
  /** @type {Number} */
  get entriesCount() {
    return this.allEntries.length;
  }
  /** @type {Boolean} */
  get hasAscensionNum() {
    return this.ascensionNum !== undefined;
  }
  /** @type {Boolean} */
  get hasCharacterName() {
    return this.characterName !== undefined;
  }
  /** @type {Number} */
  get isOnFirstPage() {
    return this.currentPageNum === 0;
  }
  /** @type {Number} */
  get isOnLastPage() {
    return this.currentPageNum === this.calculatePageLast();
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
      const sessionDateA = Number(fileA.name.match(REGEX.FILE.MAFIA_SESSION_DATE)[0]);
      const sessionDateB = Number(fileB.name.match(REGEX.FILE.MAFIA_SESSION_DATE)[0]);
      return sessionDateA < sessionDateB ? -1 : 1;
    });

    // get the text from all the files
    this.srcRawTexts = await Promise.all(sortedFiles.map(this.readFile));

    // no legal texts found 
    if (this.srcRawTexts.length <= 0) {
      console.error('It looks like none of those files were valid, mate.');
      this.isParsing.set(false);
      return;
    }

    // try to find out if there is a full ascension log,
    //  otherwise just use the first text we have
    const allText = this.srcRawTexts.join('\n\n');
    const fullAscensionText = logParserUtils.findAscensionLog(allText);
    if (fullAscensionText !== null) {
      this.ascensionNum = fullAscensionText.match(REGEX.VALUE.ASCENSION_NUMBER);
      console.log(`✨ %cWe found Ascension #${this.ascensionNum}!`, 'color: blue; font-size: 14px');
      this.rawText = fullAscensionText;
    
    } else {
      console.warn('No Ascension specific log was found.');
      this.rawText = allText;
    }

    this.parse();
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
   * @param {Array<Entry>} entriesList 
   * @returns {Array<Entry>}
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
        const combinedEntry = new Entry({
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
   * @return {Array<Entry>} 
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

    const startIdx = entriesPerPage === 'all' ? 0 : Math.min(entriesPerPage * pageNum, this.entriesCount);
    const endIdx = entriesPerPage === 'all' ? this.entriesCount : Math.min(startIdx + entriesPerPage, this.entriesCount);
    // console.log('I want entries from', startIdx, 'to', endIdx);

    // batch find entries that are in range and not hidden
    const filteredEntries = await this.logBatcher.run((entriesGroup) => {
      return entriesGroup.filter((entry) => {
        const withinSearchRange = entry.entryIdx >= startIdx && entry.entryIdx < endIdx;
        return withinSearchRange && !hiddenEntryTypes.includes(entry.entryType);
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
    const lastPage = Math.ceil(this.allEntries.length / entriesPerPage) - 1;
    return Math.max(lastPage, 0);
  }
}

/** export singleton */
const logStore = new LogStore();
export default logStore;
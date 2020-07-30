import {
  observable,
} from 'mobx';

import Batcher from 'classes/Batcher';
import Entry from 'classes/Entry';

import {
  ALWAYS_HIDDEN_ENTRIES,
  FILTER_DELAY,
} from 'constants/DEFAULTS';
import {DEFAULT_ENTRIES_VISIBLE, DEFAULT_ATTRIBUTE_FILTERS} from 'constants/filterList';
import REGEX from 'constants/regexes';

import * as logParserUtils from 'utilities/logParserUtils';
import download from 'utilities/download';

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

    /** @type {String} */
    this.characterName = undefined;
    /** @type {Number} */
    this.ascensionNum = undefined;

    /** 
     * literally all the entries
     * @type {ObservableArray<Entry>}
     */
    this.allEntries = observable([]);
    /** 
     * entries that pass the current filters
     * @type {ObservableArray<Entry>}
     */
    this.visibleEntries = observable([]);
    /** 
     * entries that are currently visible by page
     * @type {ObservableArray<Entry>}
     */
    this.currentEntries = observable([]);
    /** @type {Object} */
    this.displayOptions = observable({
      /** @type {Number} */
      pageNum: 0,
      /** @type {Number} */
      entriesPerPage: 100,
      /** @type {Array<EntryType>} */
      entryTypesVisible: DEFAULT_ENTRIES_VISIBLE.slice(),
      /** @type {Array<EntryAttribute>} */
      filteredAttributes: DEFAULT_ATTRIBUTE_FILTERS.slice(),
      /** @type {Array<EntryType>} */
      alwaysHiddenTypes: ALWAYS_HIDDEN_ENTRIES.slice(),
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
  get allEntriesCount() {
    return this.allEntries.length;
  }
  /** @type {Number} */
  get visibleCount() {
    return this.visibleEntries.length;
  }
  /** @type {Number} */
  get currentCount() {
    return this.currentEntries.length;
  }
  /** @type {Boolean} */
  get hasAscensionLog() {
    return this.hasAscensionNum;
  }
  /** @type {Boolean} */
  get hasAscensionNum() {
    return this.ascensionNum !== undefined;
  }
  /** @type {Boolean} */
  get hasCharacterName() {
    return this.characterName !== undefined;
  }
  // -- display options
  /** @type {Number} */
  get currentPageNum() {
    return this.displayOptions.pageNum;
  }
  /** @type {Array<EntryType>} */
  get entryTypesVisible() {
    return this.displayOptions.entryTypesVisible;
  }
  /** @type {Array<EntryAttribute>} */
  get filteredAttributes() {
    return this.displayOptions.filteredAttributes;
  }
  /** @type {Number} */
  get isOnFirstPage() {
    return this.currentPageNum === 0;
  }
  /** @type {Number} */
  get isOnLastPage() {
    return this.currentPageNum === this.calculatePageLast();
  }
  // -- uploading
  /**
   * clear stored data
   */
  reset() {
    this.srcFiles = [];
    this.srcRawTexts = [];
    this.allEntries.clear();
    this.visibleEntries.clear();
    this.characterName = undefined;
    this.ascensionNum = undefined;
    this.displayOptions = observable({
      pageNum: 0,
      entriesPerPage: 100,
      entryTypesVisible: DEFAULT_ENTRIES_VISIBLE.slice(),
      filteredAttributes: DEFAULT_ATTRIBUTE_FILTERS.slice(),
      alwaysHiddenTypes: ALWAYS_HIDDEN_ENTRIES.slice(),
    });
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
    try {
      if (files.length > 10) {
        throw new Error('Uploading way too many files.');
      }

      console.log(`%c☌ Checking ${files.length} files...`, 'color: #6464ff');
      this.isParsing.set(true);

      this.reset();
      this.srcFiles = files;

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
        this.ascensionNum = fullAscensionText.match(REGEX.VALUE.ASCENSION_NUMBER) || '?';
        console.log(`✨ %cWe found Ascension #${this.ascensionNum}!`, 'color: blue; font-size: 14px');
        this.rawText = fullAscensionText;
      
      } else {
        console.warn('No Ascension specific log was found.');
        this.rawText = allText;
      }

      // find the character name
      this.characterName = this.rawText.match(REGEX.SNAPSHOT_CHECK.CHARACTER_NAME) || undefined;

      this.parse();
      
    } catch (e) {
      console.error(e);
      this.isParsing.set(false);
    }
  }
  /**
   * @async
   * @param {File} file
   * @returns {String}
   */
  readFile(file) {
    return new Promise((resolve, reject) => {
      if (file.type !== 'text/plain') {
        reject('Uploaded a non-text file.');
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
    try {
      if (!this.hasRawText) {
        throw new Error('No log to parse???');
      }

      console.log('✨ %cParsing your Session Log:', 'color: blue; font-size: 14px');
      this.isParsing.set(true);

      const parsedData = await logParserUtils.parseLogTxt(this.rawText);
      const newData = this.condenseEntries(parsedData);
      this.allEntries.replace(newData);
      this.visibleEntries.replace([]);

      const estimatedBatchSize = Math.round(Math.sqrt(newData.length));
      this.logBatcher = new Batcher(newData, {batchSize: estimatedBatchSize});

      console.log(`✔️ %cFinished! Created ${this.allEntries.length} entries.`, 'color: blue');
      this.displayOptions.pageNum = 0;
      this.isParsing.set(false);

      // we just parsed so we gotta refresh `currentEntries`
      this.fetchEntries({
        pageNum: 0,
        entryTypesVisible: DEFAULT_ENTRIES_VISIBLE,
        filteredAttributes: DEFAULT_ATTRIBUTE_FILTERS,
      });

    } catch (e) {
      console.error(e);
      throw e;
    }
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
  /**
   * 
   */
  downloadFullLog() {
    if (!this.isReady) {
      return;
    }

    if (!this.hasAscensionLog) {
      return;
    }

    const allText = this.srcRawTexts.join('\n\n');
    const fileName = `${this.characterName}_ascension_${this.ascensionNum}`;
    download(allText, fileName, 'text/plain');
  }
  // -- update current logs and fetch functions
   /** 
   * @param {Object} options
   * @return {Array<Entry>} 
   */
  async fetchEntries(options = {}) {
    if (!this.canFetch(options)) {
      return;
    }

    this.isFetching.set(true);

    const fullOptions = {
      ...this.displayOptions,
      ...options,
    };

    const {
      pageNum,
      entriesPerPage,
    } = fullOptions;

    const visibleEntries = await this.fetchByFilter(fullOptions);
    this.visibleEntries.replace(visibleEntries);

    const isFilteredBeyondRange = pageNum < 0 || pageNum > this.calculatePageLast(entriesPerPage);
    if (isFilteredBeyondRange) {
      fullOptions.pageNum = 0;
    }

    // can only continue to fetch by page if filter created entries
    if (this.visibleEntries.length > 0) {
      const pagedEntries = await this.fetchByPage(fullOptions);
      this.currentEntries.replace(pagedEntries);
    } else {
      this.currentEntries.replace(visibleEntries);
    }

    // now update options with the ones used to fetch
    this.displayOptions = fullOptions;

    // done
    this.isFetching.set(false);
    return this.currentEntries;
  }
  /** 
   * @param {Object} options
   * @return {Array<Entry>} 
   */
  async fetchEntries_legacy(options = {}) {
    if (!this.canFetch(options)) {
      return [];
    }

    const {
      pageNum = this.displayOptions.pageNum,
      entriesPerPage = this.displayOptions.entriesPerPage,
      entryTypesVisible = this.displayOptions.entryTypesVisible,
      filteredAttributes = this.displayOptions.filteredAttributes,
    } = options;

    const entryTypesToFilter = this.displayOptions.alwaysHiddenTypes.concat(entryTypesVisible);

    console.log('⏳ %cFetching entries...', 'color: blue')
    this.isFetching.set(true);

    // batch find entries that are in range and not hidden
    const visibleEntries = await this.logBatcher.run((entriesGroup) => {
      return entriesGroup.filter((entry) => {
        const isVisibleEntry = !entryTypesToFilter.includes(entry.entryType);
        if (!isVisibleEntry) {
          return false;
        }

        const hasAllFilteredAttributes = !filteredAttributes.some(({attributeName, attributeValue}) => {
          const entryAttributeValue = entry.attributes[attributeName];
          return entryAttributeValue !== attributeValue;
        });

        if (!hasAllFilteredAttributes) {
          return false;
        }

        return true;
      });
    }, {batchDelay: FILTER_DELAY});

    // filtering resulted in nothing
    if (visibleEntries.length <= 0) {
      console.warn(`No results for filter on page ${pageNum}`);
      this.isFetching.set(false);
      this.currentEntries.replace(visibleEntries);
      return [];
    }
    
    const condensedEntries = this.condenseEntries(visibleEntries);
    this.currentEntries.replace(condensedEntries);

    // now update options with the ones used to fetch
    this.displayOptions = {
      ...this.displayOptions,
      pageNum: pageNum,
      entriesPerPage: entriesPerPage,
      entryTypesVisible: entryTypesVisible,
      filteredAttributes: filteredAttributes,
    };

    this.isFetching.set(false);

    return condensedEntries;
  }
  /** 
   * @param {Object} options
   * @return {Array<Entry>} 
   */
  async fetchByFilter(options = {}) {
    if (!this.canFetch(options)) {
      return;
    }

    const {
      entryTypesVisible = this.displayOptions.entryTypesVisible,
      filteredAttributes = this.displayOptions.filteredAttributes,
    } = options;

    console.log('⏳ %cFetching by filter...', 'color: blue');

    // batch find entries that are in range and not hidden
    const visibleEntries = await this.logBatcher.run((entriesGroup) => {
      return entriesGroup.filter((entry) => {
        const isHiddenEntry = this.displayOptions.alwaysHiddenTypes.includes(entry.entryType);
        if (isHiddenEntry) {
          return false;
        }

        const isVisibleEntry = entryTypesVisible.includes(entry.entryType);
        if (!isVisibleEntry) {
          return false;
        }

        const hasAllFilteredAttributes = !filteredAttributes.some(({attributeName, attributeValue}) => {
          const entryAttributeValue = entry.attributes[attributeName];
          return entryAttributeValue !== attributeValue;
        });

        if (!hasAllFilteredAttributes) {
          return false;
        }

        return true;
      });
    }, {batchDelay: FILTER_DELAY});

    // filtering resulted in nothing
    if (visibleEntries.length <= 0) {
      console.log(`⌛ %cNo results for filter.`, 'color: blue');
      return [];
    }
  
    return visibleEntries;
  }
  /**
   * @param {Object} options
   * @return {Array<Entry>} 
   */
  async fetchByPage(options = {}) {
    if (!this.canFetch(options)) {
      return;
    }

    const {
      pageNum = this.displayOptions.pageNum,
      entriesPerPage = this.displayOptions.entriesPerPage,
    } = options;

    const startIdx = entriesPerPage === 'all' ? 0 : Math.min(entriesPerPage * pageNum, this.allEntriesCount);
    const endIdx = entriesPerPage === 'all' ? this.allEntriesCount : Math.min(startIdx + entriesPerPage, this.allEntriesCount);
    // console.log('I want entries from', startIdx, 'to', endIdx);

    console.log(`⏳ %cGetting page ${pageNum}...`, 'color: blue');

    const pagedEntries = this.visibleEntries.slice(startIdx, endIdx);

    // delay for a millisec so the loader can show up
    await new Promise((resolve) => setTimeout(resolve, 1));
    return pagedEntries;
  }
  /**
   * @param {Object} options
   * @returns {Boolean}
   */
  canFetch(options = {}) {
    if (!this.hasParsedEntries) {
      return false;
    }

    if (this.logBatcher === undefined) {
      return false;
    }

    return true;
  }
  /**
   * @param {Number} entriesPerPage
   * @returns {Number}
   */
  calculatePageLast(entriesPerPage = this.displayOptions.entriesPerPage) {
    const lastPage = Math.ceil(this.visibleEntries.length / entriesPerPage) - 1;
    return Math.max(lastPage, 0);
  }
}

/** export singleton */
const logStore = new LogStore();
export default logStore;
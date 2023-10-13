import { IObservableArray, IObservableValue, observable } from "mobx";
import { encode } from "base-64";

import Batcher from "../classes/Batcher";

import {
  FILTER_DELAY,
  PAGINATE_DELAY,
  LARGE_TEXT_COUNT,
} from "../constants/DEFAULTS";
import { DEFAULT_CATEGORIES_VISIBLE } from "../constants/filterList";

import * as logStoreHelper from "../helpers/logStoreHelper";

import chartStore from "./chartStore";

import ToastController from "../sections/ToastController";

import * as fileParserUtils from "../utilities/fileParserUtils";
import * as logParserUtils from "../utilities/logParserUtils";
import * as regexUtils from "../utilities/regexUtils";
import Entry, { EntryAttributes } from "../classes/Entry";
import { RunLog } from "./databaseStore";
import { Attributes } from "../utilities/entryParserUtils";

type AscensionAttributes = {
  characterName?: string;
  className?: string;
  ascensionNum?: number;
  difficultyName?: string;
  pathName?: string;
  dateList: (Date | string)[];
  standardSeason?: string | null;
  voterMonsters: string[];
  cargoPockets: string[];
};

type DisplayOptions = {
  dayNumFilter: number | "all";
  pageNum: number;
  entriesPerPage: number | "all";
  categoriesVisible: string[];
  filteredAttributes: {
    attributeName: keyof Attributes;
    attributeValue: any;
  }[];
};

/**
 * state and handler of the log data
 */
export class LogStore {
  srcFiles: File[] = [];
  srcRawTexts: string[] = [];
  sharedHashCode?: string = undefined;
  rawText?: string | null = undefined;
  ascensionAttributes: AscensionAttributes = {
    characterName: undefined,
    className: undefined,
    ascensionNum: undefined,
    difficultyName: undefined,
    pathName: undefined,
    dateList: [],
    standardSeason: undefined,
    voterMonsters: [],
    cargoPockets: [],
  };
  allEntries: IObservableArray<Entry>;
  validEntries: IObservableArray<Entry>;
  currentEntries: IObservableArray<Entry>;
  displayOptions: DisplayOptions;
  logBatcher?: Batcher<Entry> = undefined;
  isParsing: IObservableValue<boolean>;
  isFetching: IObservableValue<boolean>;
  isLazyLoading: IObservableValue<boolean>;

  constructor() {
    this.allEntries = observable([]);
    this.validEntries = observable([]);
    this.currentEntries = observable([]);
    this.displayOptions = observable({
      dayNumFilter: "all",
      pageNum: 0,
      entriesPerPage: 110,
      categoriesVisible: DEFAULT_CATEGORIES_VISIBLE.slice(),
      filteredAttributes: [],
    });
    this.isParsing = observable.box(false);
    this.isFetching = observable.box(false);
    this.isLazyLoading = observable.box(false);
  }
  /**
   * clear stored data
   */
  reset() {
    this.srcFiles = [];
    this.srcRawTexts = [];
    this.sharedHashCode = undefined;
    this.allEntries.clear();
    this.validEntries.clear();

    this.ascensionAttributes = {
      characterName: undefined,
      className: undefined,
      ascensionNum: undefined,
      difficultyName: undefined,
      pathName: undefined,
      dateList: [],
      standardSeason: undefined,
      voterMonsters: [],
      cargoPockets: [],
    };

    this.displayOptions = observable({
      dayNumFilter: "all",
      pageNum: 0,
      entriesPerPage: 110,
      categoriesVisible: this.displayOptions.categoriesVisible.slice(),
      filteredAttributes: this.displayOptions.filteredAttributes.slice(),
    });

    //
    chartStore.allEntries = [];
  }
  /**
   * find attributes that are specifically related to a full ascension log
   * @returns {AscensionAttributes}
   */
  setAscensionAttributes() {
    if (this.rawText) {
      this.ascensionAttributes = {
        ...this.ascensionAttributes,
        ...logParserUtils.parseAscensionAttributes(this.rawText),
        ...logParserUtils.parseDailyAttributes(this.rawText),
      };

      // try to extrapolate season date if not available
      if (
        (!this.standardSeason || this.standardSeason == "Unrestricted") &&
        this.srcFiles.length > 0
      ) {
        const sessionToDate = fileParserUtils.getDateFromSessionFile(
          this.srcFiles[0],
        );
        if (sessionToDate) {
          this.ascensionAttributes.standardSeason = `${sessionToDate.getMonth()}-${sessionToDate.getFullYear()}`;
        }
      }
    } else {
      this.ascensionAttributes = {
        ...this.ascensionAttributes,
        ...logParserUtils.parseDailyAttributes(this.rawText),
      };
    }

    return this.ascensionAttributes;
  }

  get hashcode() {
    if (this.sharedHashCode) {
      return this.sharedHashCode;
    }

    if (this.sessionDate === undefined) {
      return encode(
        `${this.allEntriesCount}${this.dayCount}${this.turnCount || "?"}--${
          this.fileName
        }`,
      );
    }

    return encode(this.fileName);
  }

  get hasFiles() {
    return this.srcFiles.length > 0;
  }

  get isReady() {
    return !this.isLoading && this.hasParsedEntries;
  }

  get isLoading() {
    return (
      this.isParsing.get() || this.isFetching.get() || this.isLazyLoading.get()
    );
  }

  get canFetch() {
    if (!this.hasParsedEntries) {
      return false;
    }

    if (this.logBatcher === undefined) {
      return false;
    }

    return true;
  }

  get isImportedLog() {
    return this.sharedHashCode !== undefined;
  }

  get isShareableLog() {
    return this.sharedHashCode !== undefined && this.hashcode !== undefined;
  }

  get fileName() {
    if (!this.hasCharacterName) {
      return "unknown_mafioso_file.txt";
    }

    const characterLabel = this.characterName.replace(" ", "_");

    if (this.isAscensionLog && this.hasSessionDate) {
      return `${characterLabel}_${this.pathLabel}_${this.sessionDate}_mafioso.txt`;
    }

    if (this.isAscensionLog && !this.hasSessionDate) {
      return `${characterLabel}_${this.pathLabel}_mafioso.txt`;
    }

    if (this.hasSessionDate) {
      return `${characterLabel}_${this.sessionDate}_mafioso.txt`;
    }

    return `${characterLabel}_mafioso.txt`;
  }
  /** @type {String} */
  get sessionDate() {
    return logStoreHelper.getSessionDateString();
  }
  /** @type {String} */
  get pathLabel() {
    return logParserUtils.createPathLabel(this.rawText);
  }

  get hasSessionDate() {
    return this.sessionDate !== undefined;
  }

  get isAscensionLog() {
    return (
      this.difficultyName !== undefined &&
      this.pathName !== undefined &&
      this.dayCount >= 1
    );
  }

  get hasParsedEntries() {
    return this.allEntries.length > 0 && this.logBatcher !== undefined;
  }

  get hasCurrentEntries() {
    return this.currentEntries.length > 0;
  }

  get allEntriesCount() {
    return this.allEntries.length;
  }

  get validEntriesCount() {
    return this.validEntries.length;
  }

  get currentEntriesCount() {
    return this.currentEntries.length;
  }

  get characterName() {
    const nameFromFile = fileParserUtils.getNameFromSessionFile(
      logStore.srcFiles[0],
    );
    return this.ascensionAttributes.characterName || nameFromFile;
  }

  get className() {
    return this.ascensionAttributes.className;
  }
  /** @type {Number} */
  get dayCount() {
    return this.ascensionAttributes.dateList.length;
  }

  get turnCount() {
    const checkEntries = this.allEntries.slice();
    let poppedEntry = checkEntries.pop();
    while (
      poppedEntry &&
      typeof poppedEntry.turnNum !== "number" &&
      checkEntries.length > 0
    ) {
      poppedEntry = checkEntries.pop();
    }

    return poppedEntry?.turnNum;
  }

  get ascensionNum() {
    return this.ascensionAttributes.ascensionNum;
  }

  get difficultyName() {
    return this.ascensionAttributes.difficultyName;
  }

  get pathName() {
    return this.ascensionAttributes.pathName;
  }

  get standardSeason() {
    return this.ascensionAttributes.standardSeason;
  }

  get seasonMonth() {
    if (!this.standardSeason || this.standardSeason === "Unrestricted")
      return undefined;

    return this.standardSeason.split("-")[0];
  }

  get seasonYear() {
    if (!this.standardSeason || this.standardSeason === "Unrestricted")
      return undefined;

    return this.standardSeason.split("-")[1];
  }

  get hasAscensionNum() {
    return this.ascensionNum !== undefined;
  }

  get hasCharacterName() {
    return this.characterName !== undefined;
  }

  get isUsingDayFilter() {
    return this.displayOptions.dayNumFilter !== "all";
  }

  get currentDayNum() {
    return this.displayOptions.dayNumFilter;
  }

  get currentPageNum() {
    return this.displayOptions.pageNum;
  }

  get categoriesVisible() {
    return this.displayOptions.categoriesVisible;
  }

  get filteredAttributes() {
    return this.displayOptions.filteredAttributes;
  }

  get isOnFirstPage() {
    return this.currentPageNum === 0;
  }

  get isOnLastPage() {
    return this.currentPageNum === this.calculateLastPageIdx();
  }
  // -- uploading
  /**
   *
   */
  onUploadDone() {
    let toastMessage = "";

    if (this.hasAscensionNum) {
      toastMessage = `Ascension #${this.ascensionNum}!\nAnother one for the books.`;
    } else {
      toastMessage =
        "Ey capo, we didn't find an Ascension Log but managed a regular session log.";
    }

    ToastController.success({ title: "Success!", content: toastMessage });
  }

  async handleUpload(files: File[]) {
    try {
      if (files.length > 10) {
        throw new Error("That is too many files.");
      }

      // console.log(`%c☌ Checking ${files.length} files...`, 'color: #6464ff');
      this.isParsing.set(true);

      this.reset();

      // sort files by kolmafia's date
      const sortedFiles = fileParserUtils.sortBySessionDate(files);
      this.srcFiles = sortedFiles;

      // get text from all files
      this.srcRawTexts = await Promise.all(
        sortedFiles.map(fileParserUtils.readFile),
      );
      if (this.srcRawTexts.length <= 0) {
        this.isParsing.set(false);
        throw new Error("Some of those files may not be valid.");
      }

      // combine all the text from the files and clean it up
      const allText = this.srcRawTexts.join("\n\n");
      await this.prepareLog(allText);

      // raw data gotten, now parse it to create individual entries
      await this.parse();

      this.onUploadDone();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        ToastController.error({ title: "Upload Failed", content: err.message });
      }
      this.isParsing.set(false);
    }
  }
  /**
   * directly giving a full log
   * @param {String} logText
   * @param {Object} databaseEntry
   */
  async importLog(logText: string, databaseEntry: Omit<RunLog, "logText">) {
    this.isParsing.set(true);

    try {
      this.reset();

      await this.prepareLog(logText);

      this.sharedHashCode = databaseEntry.hashcode;
      this.ascensionAttributes = {
        ...this.ascensionAttributes,
        ...databaseEntry,
      };

      await this.parse();

      this.isParsing.set(false);
    } catch (err) {
      if (err instanceof Error) {
        ToastController.error({ title: "Import Failed", content: err.message });
      }
      this.isParsing.set(false);
    }
  }
  /**
   * the full log is cleaned and all we need to do is clean it
   *  and glean any ascension attributes before parsing it
   */
  async prepareLog(logText: string) {
    if (logText.length > LARGE_TEXT_COUNT) {
      ToastController.warn({
        content: "That's a big log so this might take a while.",
      });
    }

    // couldn't find a good way to make sure my regex always captured both \r\n when they existed
    const sanityLog = logText.replace(/\r\n/g, "\n");

    const groupedLogText = logParserUtils.pregroupRawLog(sanityLog);
    const cleanedLog = await logParserUtils.cleanRawLog(groupedLogText);

    // try to find out if there is a full ascension log,
    //  otherwise just use the first text we have
    try {
      this.rawText = logParserUtils.findAscensionLog(cleanedLog);
      this.setAscensionAttributes();
      ToastController.success({
        content: "Preparing to parse Ascension log...",
      });
    } catch (err) {
      this.rawText = cleanedLog;
      this.ascensionAttributes = {
        ...this.ascensionAttributes,
        ...logParserUtils.parseDailyAttributes(this.rawText),
      };

      if (err instanceof Error) {
        ToastController.warn({
          content: `Parsing as a regular session log.\n(${err.message})`,
        });
        console.error(err.message);
      }
    }

    // clean up once more...
    this.rawText = await logParserUtils.postParseCleanup(this.rawText);
    return this.rawText;
  }
  /**
   * handle cleaning up and setting all the data
   */
  async parse() {
    if (!this.rawText) {
      throw new Error("There is no log to parse.");
    }

    this.isParsing.set(true);

    const config = {
      isYouRobot: this.pathName === "You, Robot",
    };

    const parsedData = await logParserUtils.parseLogTxt(this.rawText, config);
    const newData = this.combineEntries(...parsedData);
    this.allEntries.replace(newData);

    chartStore.allEntries = newData;

    const additionalData = this.createEstimatedEntries(...newData);
    this.allEntries.replace(additionalData);
    this.validEntries.replace([]);

    const estimatedBatchSize = Math.round(Math.sqrt(newData.length));
    this.logBatcher = new Batcher(newData, { batchSize: estimatedBatchSize });

    // console.log(`✔️ Finished! Created ${this.allEntries.length} entries.`);
    this.displayOptions.pageNum = 0;
    this.isParsing.set(false);

    await this.fetchEntries();
  }

  updateStandardSeason(newSeason: string) {
    this.ascensionAttributes.standardSeason = newSeason;
  }
  // -- fetch functions
  /**
   * @param {Object} options
   * @return {Array<Entry>}
   */
  async fetchEntries(options = {}) {
    if (!this.canFetch) {
      return;
    }

    const fullOptions = {
      ...this.displayOptions,
      ...options,
    };

    const { pageNum, entriesPerPage } = fullOptions;

    this.isFetching.set(true);

    const validEntries = await this.fetchByFilter(fullOptions, false);
    if (validEntries) {
      this.validEntries.replace(validEntries);
    }

    const isFilteredBeyondRange =
      pageNum < 0 || pageNum > this.calculateLastPageIdx(entriesPerPage);
    if (isFilteredBeyondRange) {
      fullOptions.pageNum = 0;
    }

    // can only continue to fetch by page if filter created entries
    if (this.validEntries.length > 0) {
      const pagedEntries = await this.fetchByPage(fullOptions, false);
      // this.currentEntries.replace(pagedEntries);
      this.onFetchDone(fullOptions, pagedEntries);
    } else {
      // this.currentEntries.replace([]);
      this.onFetchDone(fullOptions, []);
    }

    // done
    return this.currentEntries;
  }
  /**
   * @param {Object} options
   * @param {Boolean} [isFinal]
   * @return {Array<Entry>}
   */
  async fetchByFilter(options: Partial<DisplayOptions> = {}, isFinal = false) {
    if (!this.canFetch) {
      return;
    }

    this.isFetching.set(true);

    const { dayNumFilter, categoriesVisible, filteredAttributes } = {
      ...this.displayOptions,
      ...options,
    };

    if (!this.logBatcher) return [];

    // batch find entries that are in range and not hidden
    const validEntries = await this.logBatcher.run(
      async (entriesGroup) => {
        return entriesGroup.filter((entry) => {
          // check day
          if (dayNumFilter !== "all") {
            if (entry.dayNum !== dayNumFilter + 1) {
              return false;
            }
          }

          // check visibleEntries list
          const isVisibleEntry = categoriesVisible.some((category) =>
            entry.categories.includes(category),
          );
          if (!isVisibleEntry) {
            return false;
          }

          // check chosen attributes
          const hasAllFilteredAttributes = !filteredAttributes.some(
            ({ attributeName, attributeValue }) => {
              const entryAttributeValue =
                entry.attributes[attributeName] ||
                entry[attributeName as keyof typeof entry];
              return entryAttributeValue !== attributeValue;
            },
          );

          if (!hasAllFilteredAttributes) {
            return false;
          }

          return true;
        });
      },
      { batchDelay: FILTER_DELAY },
    );

    // filtering resulted in nothing
    if (validEntries.length <= 0) {
      console.log(`⌛ No results for filter.`);
      if (isFinal) {
        console.warn("fetchByFilter.final is not handled.");
      }
      return [];
    }

    // if marked as final, then go ahead and only filter to first page
    if (isFinal) {
      await this.fetchByPage({ pageNum: 0 });
    }

    // otherwise, here are all entries that are valid
    return validEntries;
  }
  /**
   * @param {Object} options
   * @param {Boolean} [isFinal]
   * @return {Array<Entry>}
   */
  async fetchByPage(options: Partial<DisplayOptions> = {}, isFinal = false) {
    if (!this.canFetch) {
      return;
    }

    this.isFetching.set(true);

    const { pageNum, entriesPerPage } = { ...this.displayOptions, ...options };

    // delay for a bit so the loader can show up
    await new Promise((resolve) => setTimeout(resolve, PAGINATE_DELAY));

    const startIdx =
      entriesPerPage === "all"
        ? 0
        : Math.min(entriesPerPage * pageNum, this.allEntriesCount);
    const endIdx =
      entriesPerPage === "all"
        ? this.allEntriesCount
        : Math.min(startIdx + entriesPerPage, this.allEntriesCount);
    const pagedEntries = this.validEntries.slice(startIdx, endIdx);

    // done
    if (isFinal) {
      this.onFetchDone(options, pagedEntries);
    }

    return pagedEntries;
  }
  /**
   * @param {Object} options
   * @return {Array<Entry>}
   */
  async fetchEntriesAppended(options = {}) {
    if (!this.canFetch) {
      return;
    }

    this.isFetching.set(true);
    this.isLazyLoading.set(true);

    // const previousEntries = this.currentEntries.slice(Math.max(this.currentEntries.length - entriesPerPage - 15, 0), this.currentEntries.length);
    const previousEntries = this.currentEntries.slice();
    const fetchedEntries = await this.fetchByPage(options);
    const combinedEntries = previousEntries.concat(fetchedEntries || []);

    // done
    this.onFetchDone(options, combinedEntries);
    return this.currentEntries;
  }

  onFetchDone(
    options = {},
    newCurrentEntries?: Entry[],
    newValidEntries?: Entry[],
  ) {
    this.displayOptions = {
      ...this.displayOptions,
      ...options,
    };

    if (newCurrentEntries !== undefined) {
      this.currentEntries.replace(newCurrentEntries);
    }

    if (newValidEntries !== undefined) {
      this.validEntries.replace(newValidEntries);
    }

    this.isFetching.set(false);
    this.isLazyLoading.set(false);
  }
  /**
   * @param {Number} entriesPerPage
   * @returns {Number}
   */
  calculateLastPageIdx(entriesPerPage = this.displayOptions.entriesPerPage) {
    if (entriesPerPage === "all") return 0;
    const lastPage = Math.ceil(this.validEntries.length / entriesPerPage) - 1;
    return Math.max(lastPage, 0);
  }
  // -- misc utility
  /**
   * @returns {String}
   */
  export() {
    // rebuild mafioso block
    // const firstDateMatch = logDateUtils.findFirstDate(this.rawText);
    // const startDateText = firstDateMatch || 'Missing!';
    const mafiosoBlock = `<mafioso-start>
      Standard: ${this.standardSeason || "Unrestricted"}
    </mafioso-start>\n\n`;

    const entriesText = this.allEntries
      .map((entry) => entry.export())
      .join("\n\n");
    return mafiosoBlock + entriesText;
  }

  getEntryAt(entryNum: number) {
    return this.allEntries[entryNum];
  }

  findMatcher(matcher: regexUtils.Matcher) {
    if (!this.rawText) return null;
    return regexUtils.findMatcher(this.rawText, matcher);
  }

  findNextEntry(
    startIdx: number,
    attributesFilter: Partial<Record<EntryAttributes, any>>,
  ) {
    if (this.allEntries.length <= 0) {
      return undefined;
    }

    // not a valid index
    if (!this.allEntries[startIdx]) {
      return undefined;
    }

    // there is nothing next
    if (startIdx + 1 > this.allEntries.length - 1) {
      return undefined;
    }

    // no attributesFilter is simple
    if (attributesFilter === undefined) {
      return this.allEntries[startIdx + 1];
    }

    const checkEntries = this.allEntries.slice(
      startIdx + 1,
      this.allEntries.length,
    );
    return checkEntries.find((entry) => {
      const checkAttributeNames = Object.keys(
        attributesFilter,
      ) as EntryAttributes[];
      return !checkAttributeNames.some((attributeName) => {
        const entryAttributeValue = entry.findAttribute(attributeName);
        return entryAttributeValue !== attributesFilter[attributeName];
      });
    });
  }
  /**
   * @param {Number} dayNum
   * @return {String}
   */
  getVoterMonsterOnDay(dayNum: number) {
    return this.ascensionAttributes.voterMonsters[dayNum - 1];
  }
  /**
   * @param {Number} dayNum
   * @return {String}
   */
  getCargoPocketOnDay(dayNum: number) {
    return this.ascensionAttributes.cargoPockets[dayNum - 1];
  }
  // -- logStoreHelper.js wrappers
  /** @alias */
  combineEntries(...args: Entry[]) {
    return logStoreHelper.combineEntries(args);
  }
  /** @alias */
  createEstimatedEntries(...args: Entry[]) {
    return logStoreHelper.createEstimatedEntries(args);
  }
  /** @alias */
  downloadFullLog() {
    logStoreHelper.downloadFullLog();
  }
}

/** export singleton */
const logStore = new LogStore();
export default logStore;

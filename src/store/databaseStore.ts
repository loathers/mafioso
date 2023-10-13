import { IObservableArray, IObservableValue, observable } from "mobx";

import sessionStore from "./sessionStore";

import ToastController from "../sections/ToastController";

// import DATABASE_ENTRY_STATUS from '../constants/DATABASE_ENTRY_STATUSES';

const SERVER_HOST = import.meta.env.MAFIOSO_SERVER_HOST;
const SHARE_ENDPOINT = `${SERVER_HOST}/api/share`;
const FETCH_LOGS_ENDPOINT = `${SERVER_HOST}/api/logs`;
const GET_LOG_ENDPOINT = `${SERVER_HOST}/api/log`;
const UPDATE_LOG_ENDPOINT = `${SERVER_HOST}/api/update`;

export interface RunLog {
  hashcode: string;
  characterName: string;
  pathName: string;
  difficultyName: string;
  dayCount: number | "?";
  turnCount: number | "?";
  standardSeason?: string | null;
  logText: string;
  status?: string;
}

export interface SavedLog {
  databaseEntry: Omit<RunLog, "logText"> & {
    entryDate: string;
  };
  logText: string;
}

type FilterOptions = { difficultyName: string; pathName: string };
type SortOrder = "ASC" | "DESC";
type SortOptions = { daySort: SortOrder; turnSort: SortOrder };

/**
 * state and handler of the log data
 */
class AppStore {
  isFetching: IObservableValue<boolean>;
  role: string;
  databaseList: IObservableArray<RunLog>;
  currentList: IObservableArray<RunLog>;
  filterOptions: FilterOptions;
  sortOptions: SortOptions;
  isShowStandardOnly: boolean;
  searchTermFilter: IObservableValue<string>;

  constructor() {
    this.isFetching = observable.box(false);
    this.role =
      import.meta.env.MAFIOSO_ROLE ||
      window.sessionStorage.getItem("mafioso-role");

    this.databaseList = observable([]);
    this.currentList = observable([]);
    this.filterOptions = {
      difficultyName: sessionStore.getItem("difficultyNameFilter") || "Any",
      pathName: "Any",
    };
    this.sortOptions = {
      daySort: "ASC",
      turnSort: "ASC",
    };
    this.isShowStandardOnly = sessionStore.isShowStandardOnly();
    this.searchTermFilter = observable.box("");
  }

  get isLoading() {
    return this.isFetching.get();
  }

  get isReady() {
    return !this.isLoading && this.databaseList.length > 0;
  }

  get hasData() {
    return this.databaseList.length > 0;
  }

  reset() {
    this.databaseList.replace([]);
    this.currentList.replace([]);
  }

  async fetchLogList(params = {}) {
    this.isFetching.set(true);
    this.reset();

    try {
      const list = await new Promise<RunLog[]>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("loadend", () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              if (xhr.responseText) {
                resolve(JSON.parse(xhr.responseText));
              } else {
                resolve([]);
              }
            } else {
              const error = "Unable to reach server.";
              ToastController.error({ title: "Server Error", content: error });
              reject(error);
            }
          }
        });

        const paramString = formatUrlParams(params);
        xhr.open("GET", `${FETCH_LOGS_ENDPOINT}/${paramString}`);
        xhr.send();
      });

      // if successful, update cached list
      this.databaseList.replace(list);
      this.currentList.replace(list);
      this.filterList();
    } finally {
      this.isFetching.set(false); // update state regardless of result
    }
  }

  /**
   * requests an entry
   */
  async fetchLog(hashcode: string) {
    this.isFetching.set(true);

    try {
      return new Promise<SavedLog>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("loadend", () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              const error = xhr.responseText || "Server did not send any data.";
              ToastController.error({ title: "Server Error", content: error });
              reject(error);
            }
          }
        });

        xhr.open("GET", `${GET_LOG_ENDPOINT}/${hashcode}`);
        xhr.send();
      });
    } finally {
      this.isFetching.set(false);
    }
  }

  async shareLog(payload: RunLog) {
    this.isFetching.set(true);

    try {
      await new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        // xhr.onreadystatechange = () => this.onRequestEnd(xhr, resolve, reject);
        xhr.addEventListener("loadend", () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              ToastController.error({
                title: "Share Error",
                content: xhr.responseText,
              });
              reject(xhr.responseText);
            }
          }
        });

        xhr.open("POST", SHARE_ENDPOINT);
        xhr.send(JSON.stringify(payload));
      });

      ToastController.success({
        title: "Successfuly shared!",
        content: "Grazie, famiglia.",
      });
    } finally {
      this.isFetching.set(false);
    }
  }

  async onUpdateLog(logData: RunLog) {
    this.isFetching.set(true);

    try {
      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("loadend", () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              ToastController.show({ content: "Successfully Updated" });
              resolve(xhr.responseText);
            } else {
              ToastController.error({
                title: "Update Error",
                content: xhr.responseText,
              });
              reject(xhr.responseText);
            }
          }
        });

        const paramString = formatUrlParams({
          status: logData.status,
          role: this.role,
        });
        xhr.open(
          "POST",
          `${UPDATE_LOG_ENDPOINT}/${logData.hashcode}/${paramString}`,
        );
        xhr.send();
      });
    } finally {
      this.isFetching.set(false);
    }
  }

  async filterList(options: Partial<FilterOptions> = {}) {
    this.isFetching.set(true);

    const opts = {
      ...this.filterOptions,
      ...options,
    };

    const optionKeys = Object.keys(opts) as (keyof typeof opts)[];
    const filteredList = this.databaseList.filter((databaseEntry) => {
      return !optionKeys.some((optionName) => {
        if (
          this.isShowStandardOnly &&
          databaseEntry.standardSeason === undefined
        ) {
          return true;
        }

        if (opts[optionName] === "Any") {
          return false;
        }

        // no-path is also standard for now
        if (optionName === "pathName" && opts["pathName"] === "No-Path") {
          return databaseEntry["pathName"] !== "Standard";
        }

        return databaseEntry[optionName] !== opts[optionName];
      });
    });

    // after filtering, sort
    const sortedList = this.sortList(filteredList);

    // delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    this.isFetching.set(false);

    // done, update options and current list
    this.filterOptions = opts;
    this.currentList.replace(sortedList);
    return sortedList;
  }
  /**
   * (does not alter currentList)
   * @param {Array} list
   * @param {Object} [options]
   * @returns {Array<DatabaseEntry>}
   */
  sortList(list: RunLog[], options: Partial<SortOptions> = {}) {
    const { daySort, turnSort } = { ...this.sortOptions, ...options };

    const sortedList = list.sort((entryA, entryB) => {
      if (entryA.dayCount === "?" && entryB.dayCount !== "?") {
        return 1;
      }

      if (entryA.turnCount === "?" && entryB.turnCount !== "?") {
        return 1;
      }

      if (entryA.dayCount === "?" || entryA.turnCount === "?") {
        return 1;
      }

      if (entryB.dayCount === "?" || entryB.turnCount === "?") {
        return -1;
      }

      const isSameDay = entryA.dayCount === entryB.dayCount;
      if (!isSameDay) {
        if (daySort === "DESC") {
          return entryA.dayCount < entryB.dayCount ? 1 : -1;
        } else if (daySort === "ASC") {
          return entryA.dayCount > entryB.dayCount ? 1 : -1;
        }
      } else {
        if (turnSort === "DESC") {
          return entryA.turnCount < entryB.turnCount ? 1 : -1;
        } else if (turnSort === "ASC") {
          return entryA.turnCount > entryB.turnCount ? 1 : -1;
        }
      }

      return 0;
    });

    // done, update options
    this.sortOptions = { daySort, turnSort };
    return sortedList;
  }
}

function formatUrlParams(params: Record<string, any>) {
  return (
    "?" +
    Object.keys(params)
      .map(function (key) {
        return key + "=" + encodeURIComponent(params[key]);
      })
      .join("&")
  );
}

export default new AppStore();

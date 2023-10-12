import {observable} from 'mobx';

import sessionStore from '../store/sessionStore';

import ToastController from '../sections/ToastController';

// import DATABASE_ENTRY_STATUS from '../constants/DATABASE_ENTRY_STATUSES';

const SERVER_HOST = import.meta.env.MAFIOSO_SERVER_HOST;
console.log(import.meta.env);
const SHARE_ENDPOINT = `${SERVER_HOST}/api/share`;
const FETCH_LOGS_ENDPOINT = `${SERVER_HOST}/api/logs`;
const GET_LOG_ENDPOINT = `${SERVER_HOST}/api/log`;
const UPDATE_LOG_ENDPOINT = `${SERVER_HOST}/api/update`;

/**
 * state and handler of the log data
 */
class AppStore {
  constructor() {
    /** @type {Observable<Boolean>} */
    this.isFetching = observable.box(false);
    /** @type {String} */
    this.role = import.meta.env.MAFIOSO_ROLE || window.sessionStorage.getItem('mafioso-role');

    /** @type {Observable<Array<Text>>} */
    this.databaseList = observable([]);
    /** @type {Observable<Array<Text>>} */
    this.currentList = observable([]);
    /** @type {Object} */
    this.filterOptions = {
      /** @type {String} */
      difficultyName: sessionStore.get('difficultyNameFilter') || 'Any',
      /** @type {String} */
      pathName: 'Any',
    }
    /** @type {Object} */
    this.sortOptions = {
      /** @type {String} */
      daySort: 'ASC',
      /** @type {String} */
      turnSort: 'ASC',
    }
    /** @type {Observable<Boolean>} */
    this.isShowStandardOnly = sessionStore.get('isShowStandardOnly');
    /** @type {String} */
    this.searchTermFilter = observable.box('');
  }
  // -- state
  /** @type {Boolean} */
  get isLoading() {
    return this.isFetching.get();
  }
  /** @type {Boolean} */
  get isReady() {
    return !this.isLoading && this.databaseList.length > 0;
  }
  /** @type {Boolean} */
  get hasData() {
    return this.databaseList.length > 0;
  }
  // -- db
  /**
   *
   */
  reset() {
    this.databaseList.replace([]);
    this.currentList.replace([]);
  }
  /**
   * gets all logs that are enabled to be visible
   * @async
   * @param {Object} [params]
   * @property {String} [params.status]
   */
  fetchLogList(params = {}) {
    this.isFetching.set(true);
    this.reset();

    const fetchRequest = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('loadend', () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            if (xhr.responseText) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              resolve();
            }
          } else {
            const error = 'Unable to reach server.';
            ToastController.error({title: 'Server Error', content: error});
            reject(error);
          }
        }
      });

      const paramString = formatUrlParams(params);
      xhr.open('GET', `${FETCH_LOGS_ENDPOINT}/${paramString}`);
      xhr.send();
    });

    // if successful, update cached list
    fetchRequest
      .then((list) => {
        this.databaseList.replace(list);
        this.currentList.replace(list);
        this.filterList();
      })
      .finally(() => this.isFetching.set(false)); // update state regardless of result

    return fetchRequest;
  }
  /**
   * requests an entry
   * @async
   * @param {String} hashcode
   */
  fetchLog(hashcode) {
    this.isFetching.set(true);

    const fetchRequest = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('loadend', () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            const error = xhr.responseText || 'Server did not send any data.';
            ToastController.error({title: 'Server Error', content: error});
            reject(error);
          }
        }
      });

      xhr.open('GET', `${GET_LOG_ENDPOINT}/${hashcode}`);
      xhr.send();
    });

    fetchRequest.finally(() => this.isFetching.set(false));

    return fetchRequest;
  }
  /**
   * requests an entry
   * @async
   * @param {Object} payload
   */
  shareLog(payload) {
    this.isFetching.set(true);

    const fetchRequest = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      // xhr.onreadystatechange = () => this.onRequestEnd(xhr, resolve, reject);
      xhr.addEventListener('loadend', () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            resolve();
          } else {
            ToastController.error({title: 'Share Error', content: xhr.responseText});
            reject(xhr.responseText);
          }
        }
      });

      xhr.open('POST', SHARE_ENDPOINT);
      xhr.send(JSON.stringify(payload));
    });

    fetchRequest
      .then(() => ToastController.success({title: 'Successfuly shared!', content: 'Grazie, famiglia.'}))
      .finally(() => this.isFetching.set(false));

    return fetchRequest;
  }
  /**
   * @async
   * @param {Object} logData
   */
  onUpdateLog(logData) {
    this.isFetching.set(true);

    const request = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('loadend', () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            ToastController.show({content: 'Successfully Updated'});
            resolve();

          } else {
            ToastController.error({title: 'Update Error', content: xhr.responseText});
            reject(xhr.responseText);
          }
        }
      });

      const paramString = formatUrlParams({status: logData.status, role: this.role});
      xhr.open('POST', `${UPDATE_LOG_ENDPOINT}/${logData.hashcode}/${paramString}`);
      xhr.send();
    });

    request.finally(() => this.isFetching.set(false));

    return request;
  }
  // -- list
  /**
   * @param {Object} [filterOptions]
   * @returns {Array<DatabaseEntry>}
   */
  async filterList(filterOptions = {}) {
    const {difficultyName, pathName} = filterOptions;
    this.isFetching.set(true);

    const fullOptions = {
      difficultyName: difficultyName || this.filterOptions.difficultyName,
      pathName: pathName || this.filterOptions.pathName,
    };

    const optionKeys = Object.keys(fullOptions);
    const filteredList = this.databaseList.filter((databaseEntry) => {
      return !optionKeys.some((optionName) => {
        if (this.isShowStandardOnly && databaseEntry.standardSeason === undefined) {
          return true;
        }

        if (fullOptions[optionName] === 'Any') {
          return false;
        }

        // no-path is also standard for now
        if (optionName === 'pathName' && fullOptions['pathName'] === 'No-Path') {
          return databaseEntry['pathName'] !== 'Standard';
        }

        return databaseEntry[optionName] !== fullOptions[optionName];
      })
    });

    // after filtering, sort
    const sortedList = this.sortList(filteredList);

    // delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    this.isFetching.set(false);

    // done, update options and current list
    this.filterOptions = fullOptions;
    this.currentList.replace(sortedList);
    return sortedList;
  }
  /**
   * (does not alter currentList)
   * @param {Array} list
   * @param {Object} [options]
   * @returns {Array<DatabaseEntry>}
   */
  sortList(list, options = {}) {
    const {
      daySort = this.sortOptions.daySort,
      turnSort = this.sortOptions.turnSort,
    } = options;

    const sortedList = list.sort((entryA, entryB) => {
      if (entryA.dayCount === '?' && entryB.dayCount !== '?') {
        return 1;
      }

      if (entryA.turnCount === '?' && entryB.turnCount !== '?') {
        return 1;
      }

      if (entryA.dayCount === '?' || entryA.turnCount === '?') {
        return 1;
      }

      if (entryB.dayCount === '?' || entryB.turnCount === '?') {
        return -1;
      }

      const isSameDay = entryA.dayCount === entryB.dayCount;
      if (!isSameDay) {
        if (daySort === 'DESC') {
          return entryA.dayCount < entryB.dayCount ? 1 : -1;
        } else if (daySort === 'ASC') {
          return entryA.dayCount > entryB.dayCount ? 1 : -1;
        }
      } else {
        if (turnSort === 'DESC') {
          return entryA.turnCount < entryB.turnCount ? 1 : -1;
        } else if (turnSort === 'ASC') {
          return entryA.turnCount > entryB.turnCount ? 1 : -1;
        }
      }

      return 0;
    });

    // done, update options
    this.sortOptions = {daySort, turnSort};
    return sortedList;
  }
}
/**
 * @param {Object} params
 * @returns {String}
 */
function formatUrlParams(params){
  return "?" + Object.keys(params)
                .map(function(key){
                  return key+"="+encodeURIComponent(params[key])
                })
                .join("&");
}
/** export singleton */
export default new AppStore();

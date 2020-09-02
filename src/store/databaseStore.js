import {observable} from 'mobx';

// import DATABASE_ENTRY_STATUS from 'constants/DATABASE_ENTRY_STATUSES';

const SERVER_HOST = process.env['REACT_APP_SERVER_HOST'];
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
    this.role = process.env['REACT_APP_ROLE'];

    /** @type {Observable<Array<Text>>} */
    this.databaseList = observable([]);
    /** @type {Observable<Array<Text>>} */
    this.currentList = observable([]);
    /** @type {Object} */
    this.filterOptions = {
      /** @type {String} */
      difficultyName: 'Any',
      /** @type {String} */
      pathName: 'Any',
    }
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
        const rawResponse = xhr.responseText;
        if (!rawResponse) return reject('Server did not send any data.');

        resolve(JSON.parse(rawResponse));
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
   * @param {DatabaseEntry} databaseEntry
   */
  fetchLog(databaseEntry) {
    this.isFetching.set(true);

    const fetchRequest = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('loadend', (evt) => {
        const rawResponse = xhr.responseText;
        if (!rawResponse) return reject('Server did not send any data.');

        resolve(rawResponse);
      });

      xhr.open('GET', `${GET_LOG_ENDPOINT}/${databaseEntry.hashcode}`);
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
          if (xhr.status === 200 || xhr.status === 0) {
            resolve();
          } else {
            reject(`${xhr.statusText}: ${xhr.responseText}`);
          }
        }
      });

      xhr.open('POST', SHARE_ENDPOINT);
      xhr.send(JSON.stringify(payload));
    });

    fetchRequest.finally(() => this.isFetching.set(false));

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
          if (xhr.status === 200 || xhr.status === 0) {
            resolve();
          } else {
            reject(`${xhr.statusText}: ${xhr.responseText}`);
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
   * @param {Object} [options]
   * @returns {Array<DatabaseEntry>}
   */
  async filterList(options = {}) {
    this.isFetching.set(true);

    const filterOptions = {
      ...this.filterOptions,
      ...options,
    };

    const optionKeys = Object.keys(filterOptions);
    const filteredList = this.databaseList.filter((databaseEntry) => {
      return !optionKeys.some((optionName) => {
        if (filterOptions[optionName] === 'Any') {
          return false;
        };

        return databaseEntry[optionName] !== filterOptions[optionName];
      })
    });

    // delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    this.isFetching.set(false);

    // done, update options and current list
    this.filterOptions = filterOptions;
    this.currentList.replace(filteredList);
    return filteredList;
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

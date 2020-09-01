import {observable} from 'mobx';

const SERVER_HOST = process.env['REACT_APP_SERVER_HOST'];
const SHARE_ENDPOINT = `${SERVER_HOST}/api/share`;
const ACTIVE_LOGS_ENDPOINT = `${SERVER_HOST}/api/active-logs`;
const LOG_ENDPOINT = `${SERVER_HOST}/api/log`;
/**
 * state and handler of the log data
 */
class AppStore {
  constructor() {
    /** @type {Observable<Boolean>} */
    this.isFetching = observable.box(false);

    /** @type {Observable<Array<Text>>} */
    this.databaseList = observable([]);
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
  // -- db
  /**
   * gets all logs that are enabled to be visible
   * @async
   */
  fetchActiveLogs() {
    this.isFetching.set(true);

    const fetchRequest = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('loadend', () => {
        const rawResponse = xhr.responseText;
        if (!rawResponse) return reject('Server did not send any data.');

        resolve(JSON.parse(rawResponse));
      });

      xhr.open('GET', ACTIVE_LOGS_ENDPOINT);
      xhr.send();
    });

    // if successful, update cached list
    fetchRequest
      .then((list) => list ? this.databaseList.replace(list) : [])
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

      xhr.open('GET', `${LOG_ENDPOINT}/${databaseEntry.logHash}`);
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
  // -- list
  /**
   * @param {Object} [options]
   * @returns {Array<DatabaseEntry>}
   */
  filterList(options = {}) {
    const optionKeys = Object.keys(options);
    return this.databaseList.filter((databaseEntry) => {
      return !optionKeys.some((optionName) => databaseEntry[optionName] !== options[optionName])
    });
  }
}
/** export singleton */
export default new AppStore();

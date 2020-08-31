import {observable} from 'mobx';

const SERVER_HOST = process.env['REACT_APP_SERVER_HOST'];
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
  // -- connection
  /**
   *
   */
  async fetch() {
    this.isFetching.set(true);

    try {
      const listResult = await this.handleFetch();
      this.databaseList.replace(listResult);
    } catch (err) {
      console.error(err);
    }

    this.isFetching.set(false); // update state regardless of result
  }
  /**
   * requests database list
   * @async
   */
  handleFetch() {
    return new Promise((resolve, reject) => {
      const oReq = new XMLHttpRequest();
      oReq.addEventListener('error', (evt) => reject(evt));
      oReq.addEventListener('load', (evt) => {
        const rawResponse = oReq.responseText;
        if (!rawResponse) return reject('Server did not send any data.');

        const databaseList = JSON.parse(rawResponse);
        resolve(databaseList);
      });

      oReq.open('GET', `${SERVER_HOST}/api/getSharedLogs`);
      oReq.send();
    });
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

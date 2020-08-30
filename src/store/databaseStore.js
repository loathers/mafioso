import {observable} from 'mobx';

/**
 * state and handler of the log data
 */
class AppStore {
  constructor() {
    /** @type {Observable<Boolean>} */
    this.isFetching = observable.box(false);

    /** @type {Array<Text>} */
    this.databaseList = [];
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
  fetch() {
    this.isFetching.set(true);

    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', (data) => {
      console.log('request finish', data);
      this.databaseList = data;
      this.isFetching.set(false);
    });

    const url = 'http://localhost:8080/api/getSharedLogs';
    oReq.open('GET', url);
    oReq.send();

  }
}
/** export singleton */
export default new AppStore();

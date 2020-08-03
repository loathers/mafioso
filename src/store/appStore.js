import {observable} from 'mobx';
import { v4 as uuidv4 } from 'uuid';

import logStore from 'store/logStore';

/**
 * state and handler of the log data
 */
class AppStore {
  constructor() {
    this.appId = uuidv4();

    /** @type {Boolean} */
    this.isUsingCompactMode = observable.box(false);
  }
  // -- state
  /** @type {Boolean} */
  get isLoading() {
    return logStore.isParsing.get() || logStore.isFetching.get();
  }
  /** @type {Boolean} */
  get isReady() {
    return logStore.isReady;
  }   
  /** @type {Boolean} */
  get isShowingFullUpload() {
    return !logStore.hasFiles;
  }
  // -- data
  /** @type {Boolean} */
  get currentEntries() {
    return logStore.currentEntries;
  }
  // --
  /**
   * @param {Boolean} [toState]
   */
  toggleCompactMode(toState) {
    if (toState === undefined) {
      this.isUsingCompactMode.set(!this.isUsingCompactMode.get());
      console.log('toggle', this.isUsingCompactMode.get())
    } else {
      this.isUsingCompactMode.set(toState);
    }
  }
}
/** export singleton */
export default new AppStore();
import {
  extendObservable,
} from 'mobx';
import { v4 as uuidv4 } from 'uuid';

import logStore from 'store/logStore';

const appId = uuidv4();
/**
 * state and handler of the log data
 */
class AppStore {
  constructor() {

    // const _this = this;
    extendObservable(this, {
      /** @type {Boolean} */
      get isLoading() {
        return logStore.isParsing.get() || logStore.isFetching.get();
      },
      /** @type {Boolean} */
      get isReady() {
        return logStore.isReady;
      },
      /** @type {Boolean} */
      get currentEntries() {
        return logStore.currentEntries;
      },
    })
  }
  /** @type {String} */
  get appId() {
    return appId;
  }
}
/** export singleton */
export default new AppStore();
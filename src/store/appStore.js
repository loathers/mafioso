import {
  extendObservable,
  // observable,
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
        return logStore.isParsing.get();
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
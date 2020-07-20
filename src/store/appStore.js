import logStore from 'store/logStore';

class AppStore {
  /** @default */
  constructor() {
    this.id = 'TEST-ID';
  }
  /** @type {Boolean} */
  get hasData() {
    return logStore.hasData;
  }
}

export default new AppStore();
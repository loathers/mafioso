import logStore from 'store/logStore';

class AppStore {
  constructor() {
    this.id = 'TEST-ID';
  }

  get hasData() {
    return logStore.srcFile !== undefined;
  }
}

export default new AppStore();
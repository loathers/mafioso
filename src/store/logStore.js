class LogStore {
  constructor() {
    this.srcFile = undefined;
  }

  import(file) {
    this.srcFile = file;
  }
}

export default new LogStore();
class LogStore {
  constructor() {
    this.srcFile = undefined;
  }

  get hasFile() {
    return this.srcFile !== undefined;
  }

  import(file) {
    this.srcFile = file;
  }

  parse() {
    if (!this.hasFile) {
      return;
    }

    
  }
}

export default new LogStore();
class LogStore {
  constructor() {
    this.srcFile = undefined;
  }

  get hasFile() {
    return this.srcFile !== undefined;
  }

  handleUpload(file) {
    this.srcFile = file;
  }

  parse() {
    if (!this.hasFile) {
      return;
    }

    
  }
}

export default new LogStore();
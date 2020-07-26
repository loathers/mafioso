export default class Batcher {
  /**
   * @param {Array} batchArray
   * @param {Object} [defaultConfig]
   */
  constructor(batchArray, defaultConfig) {
    /** @type {Array} */
    this.batchArray = batchArray || [];
    /** @type {Object} */
    this.defaultConfig = {
      batchSize: 100,
      batchDelay: 20, // ms
      ...defaultConfig,
    };
  }
  /** @type {Number} */
  get batchLength() {
    return this.batchArray.length;
  }
  /**
   * @param {Function} callback
   * @param {Object} [config]
   */
  async run(callback, config = {}) {
    const {
      batchSize = this.defaultConfig.batchSize,
      batchDelay = this.defaultConfig.batchDelay,
    } = config;

    let batchResult = [];

    const numBatches = this.calculateBatchCount(batchSize);
    for (let i = 0; i < numBatches; i++) {
      const startIdx = i * batchSize;
      const endIdx = startIdx + batchSize;
      const batchGroup = this.batchArray.slice(startIdx, endIdx);

      const groupResult = await callback(batchGroup, startIdx, endIdx);
      await new Promise((resolve) => setTimeout(resolve, batchDelay)); // delay between batches

      batchResult = batchResult.concat(groupResult);
      console.log(`%c... Batch #${i+1} parsed (resulting in ${groupResult.length} items)`, 'color: #6464ff');
    }

    return batchResult;
  }
  /**
   * @param {Number} batchSize
   * @returns {Number}
   */
  calculateBatchCount(batchSize = 100) {
    return Math.max(Math.ceil(this.batchLength / batchSize), 100);
  }
}
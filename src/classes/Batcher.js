export default class Batcher {
  /**
   * @param {Array} batchArray
   * @param {Object} [defaultConfig]
   */
  constructor(batchArray, defaultConfig) {
    /** @type {Array} */
    this.batchArray = batchArray || [];
    /** @type {Object} */
    this.defaultConfig = defaultConfig || {
      batchSize: 100,
      batchDelay: 15, // ms
    };
  }
  /**
   * @param {Function} callback
   * @param {Object} [config]
   */
  async run(callback, config = this.defaultConfig) {
    const {
      batchSize,
      batchDelay,
    } = config;

    let batchResult = [];

    const numBatches = Math.ceil(this.batchArray.length / batchSize);
    for (let i = 0; i < numBatches; i++) {
      const startIdx = i * batchSize;
      const endIdx = startIdx + batchSize;
      const batchGroup = this.batchArray.slice(startIdx, endIdx);

      const groupResult = await callback(batchGroup, startIdx, endIdx);
      await new Promise((resolve) => setTimeout(resolve(), batchDelay)); // delay between batches

      batchResult = batchResult.concat(groupResult);
      console.log(`... Batch #${i+1} parsed (${groupResult.length} entries)`);
    }

    return batchResult;
  }
}
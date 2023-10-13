type BatcherConfig = { batchSize: number; batchDelay: number };

export default class Batcher<T> {
  batchArray: T[];
  defaultConfig: BatcherConfig = { batchSize: 100, batchDelay: 50 };

  constructor(batchArray: T[], defaultConfig: Partial<BatcherConfig>) {
    this.batchArray = batchArray || [];

    this.defaultConfig = {
      ...this.defaultConfig,
      ...defaultConfig,
    };
  }

  get batchLength() {
    return this.batchArray.length;
  }

  async run<R>(
    callback: (
      group: T[],
      startIndex: number,
      endIndex: number,
    ) => Promise<R[]>,
    config: Partial<BatcherConfig> = {},
  ) {
    const { batchSize, batchDelay } = {
      ...this.defaultConfig,
      ...config,
    };

    let batchResult: R[] = [];
    const numBatches = this.calculateBatchCount(batchSize);
    // console.log(`%c☌ Batcher running [batchCount=${numBatches}] with [delay=${batchDelay}ms]`, 'color: #6464ff');

    for (let i = 0; i < numBatches; i++) {
      const startIdx = i * batchSize;
      const endIdx = startIdx + batchSize;
      const batchGroup = this.batchArray.slice(startIdx, endIdx);

      const groupResult = await callback(batchGroup, startIdx, endIdx);
      await new Promise((resolve) => setTimeout(resolve, batchDelay)); // delay between batches

      batchResult.push(...groupResult);
      // console.log(`%c☌ batch #${i+1} complete (${groupResult.length} items)`, 'color: #6464ff');
    }

    return batchResult;
  }

  calculateBatchCount(batchSize = this.defaultConfig.batchSize) {
    return Math.ceil(this.batchLength / Math.min(batchSize, 100));
  }
}

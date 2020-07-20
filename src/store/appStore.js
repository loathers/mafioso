import logStore from 'store/logStore';

const sampleLine1 = '0001\tDay\tTurn\tLocation\tEncounter\tFamiliar\tSpecial\tItems\tEffects\tMus\tMyst\tMox\tMeat';
const sampleLine2 = '0002\t1\t1\tBoxing Daycare\tEnter the Boxing Daycare\tLeft-Hand Man\t\tBrutal brogues|sharkfin gumbo|\t\t0\t0\t0\t0'
const sampleLogString = `${sampleLine1}\n${sampleLine2}`;

class AppStore {
  /** @default */
  constructor() {
    this.id = 'TEST-ID';

    // dev testing
    logStore.cacheLog(sampleLogString);
  }
  /** @type {Boolean} */
  get hasData() {
    return logStore.hasData;
  }
}

export default new AppStore();
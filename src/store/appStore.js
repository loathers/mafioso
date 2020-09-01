import {observable} from 'mobx';
import { v4 as uuidv4 } from 'uuid';

import keycodes from 'constants/keycodes';

import databaseStore from 'store/databaseStore';
import logStore from 'store/logStore';

/**
 * state and handler of the log data
 */
class AppStore {
  constructor() {
    this.appId = uuidv4();

    /** @type {Observable<Boolean>} */
    this.isPretendLoading = observable.box(false);
    /** @type {Observable<Boolean>} */
    this.isUsingCompactMode = observable.box(true);
    /** @type {Observable<Boolean>} */
    this.shouldScrollUp = observable.box(false);
    /** @type {Observable<Boolean>} */
    this.canToggleCompact = observable.box(true);

    /** @type {Observable<Boolean>} */
    this.isDevMode = observable.box(false);
    /** @type {String} */
    this.appRole = process.env['REACT_APP_ROLE'];

    this.initializeListeners();
  }
  // -- state
  /** @type {Boolean} */
  get isDevEnv() {
    return process.env['NODE_ENV'] === 'development' || this.isDevMode.get();
  }
  /** @type {Boolean} */
  get isLoading() {
    return this.isPretendLoading.get() || logStore.isLoading || databaseStore.isLoading;
  }
  /** @type {Boolean} */
  get isReady() {
    return !this.isLoading && logStore.isReady;
  }
  /** @type {Boolean} */
  get isShowingFullUpload() {
    return !logStore.hasFiles;
  }
  // -- data
  /** @type {Boolean} */
  get currentEntries() {
    return logStore.currentEntries;
  }
  // -- preparation functions
  /**
   *
   */
  initializeListeners() {
    window.addEventListener('keydown', (evt) => {
      // don't use the hotkeys if trying to type
      if (evt.srcElement.type === 'text' || evt.srcElement.type === 'textarea' || evt.srcElement.type === 'number') {
        return;
      }

      if (evt.keyCode === keycodes.c) {
        this.toggleCompactMode();
      }

      if (evt.keyCode === keycodes.backquote) {
        this.isDevMode.set(!this.isDevMode.get());
      }
    })
  }
  // -- state changers
  /**
   * @param {Boolean} [toState]
   */
  toggleCompactMode(toState) {
    if (!this.canToggleCompact.get() && !this.isDevMode.get()) {
      return;
    }

    if (toState === undefined) {
      this.isUsingCompactMode.set(!this.isUsingCompactMode.get());
    } else {
      this.isUsingCompactMode.set(toState);
    }
  }
  // --
  /**
   * largely a wrapper for the actual download in logStore
   */
  async downloadFullLog() {
    this.isPretendLoading.set(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      logStore.downloadFullLog();

    } catch (err) {
      this.isPretendLoading.set(false);
    }

    this.isPretendLoading.set(false);
  }
  /**
   * uploads the current log to server
   */
  async onShareLog() {
    if (!this.isReady || !logStore.isAscensionLog) return;

    this.isPretendLoading.set(true);

    try {
      await databaseStore.shareLog(logStore.createLogPayload());

    } catch (err) {
      this.isPretendLoading.set(false);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    this.isPretendLoading.set(false);
  }
  /**
   * @param {DatabaseEntry} databaseEntry
   */
  async onViewSharedLog(databaseEntry) {
    this.isPretendLoading.set(true);

    try {
      const fetchedLogText = await databaseStore.fetchLog(databaseEntry);
      logStore.importLog(fetchedLogText);

    } catch (err) {
      this.isPretendLoading.set(false);
    }

    this.isPretendLoading.set(false);
  }
}
/** export singleton */
export default new AppStore();

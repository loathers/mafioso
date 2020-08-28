import {observable} from 'mobx';
import { v4 as uuidv4 } from 'uuid';

import keycodes from 'constants/keycodes';

import logStore from 'store/logStore';

/**
 * state and handler of the log data
 */
class AppStore {
  constructor() {
    this.appId = uuidv4();

    /** @type {Observable<Boolean>} */
    this.isSharing = observable.box(false);
    /** @type {Observable<Boolean>} */
    this.isUsingCompactMode = observable.box(true);
    /** @type {Observable<Boolean>} */
    this.shouldScrollUp = observable.box(false);
    /** @type {Observable<Boolean>} */
    this.canToggleCompact = observable.box(true);

    /** @type {Observable<Boolean>} */
    this.isDevMode = observable.box(false);

    this.initializeListeners();
  }
  // -- state
  /** @type {Boolean} */
  get isLoading() {
    return logStore.isLoading || this.isSharing.get();
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
   * uploads the current log to server
   */
  async onShareLog() {
    if (!this.isReady) return;

    this.isSharing.set(true);

    const oReq = new XMLHttpRequest();
    const url = 'http://localhost:8080/api/upload';
    oReq.open('POST', url);
    oReq.send(logStore.createLogFile());

    await new Promise((resolve) => setTimeout(resolve, 150));
    this.isSharing.set(false);
  }
}
/** export singleton */
export default new AppStore();

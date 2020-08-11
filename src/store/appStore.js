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

    /** @type {Boolean} */
    this.isUsingCompactMode = observable.box(true);
    /** @type {Boolean} */
    this.shouldScrollUp = observable.box(false);
    /** @type {Boolean} */
    this.canToggleCompact = observable.box(true);

    /** @type {Boolean} */
    this.isDevMode = observable.box(false);

    this.initializeListeners();
  }
  // -- state
  /** @type {Boolean} */
  get isLoading() {
    return logStore.isParsing.get() || logStore.isFetching.get();
  }
  /** @type {Boolean} */
  get isReady() {
    return logStore.isReady && !this.isLoading;
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
  // --
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
  // --
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
}
/** export singleton */
export default new AppStore();
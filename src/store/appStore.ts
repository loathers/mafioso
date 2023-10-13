import { IObservableValue, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";

import { LOG_VIS_URL } from "../constants/PAGE_URLS";

import ToastController from "../sections/ToastController";
import databaseStore from "./databaseStore";
import logStore from "./logStore";

/**
 * state and handler of the log data
 */
class AppStore {
  appId: string;
  hasAttemptedShare: boolean;
  isPretendLoading: IObservableValue<boolean>;
  isUsingCompactMode: IObservableValue<boolean>;
  shouldScrollUp: IObservableValue<boolean>;
  canToggleCompact: IObservableValue<boolean>;
  shouldRedirectToVisualizer: IObservableValue<boolean>;
  isDevMode: IObservableValue<boolean>;

  constructor() {
    this.appId = uuidv4();
    this.hasAttemptedShare = false;
    this.isPretendLoading = observable.box(false);
    this.isUsingCompactMode = observable.box(true);
    this.shouldScrollUp = observable.box(false);
    this.canToggleCompact = observable.box(true);
    this.shouldRedirectToVisualizer = observable.box(false);
    this.isDevMode = observable.box(false);

    this.initializeListeners();
  }

  get isDevEnv() {
    return import.meta.env.DEV || this.isDevMode.get();
  }

  get isLoading() {
    return (
      this.isPretendLoading.get() ||
      logStore.isLoading ||
      databaseStore.isLoading
    );
  }

  get isReady() {
    return !this.isLoading && logStore.isReady;
  }

  get isShowingFullUpload() {
    return !logStore.hasFiles;
  }

  get isShareDisabled() {
    if (this.isDevMode.get()) {
      return !this.isReady || logStore.isImportedLog;
    }

    return (
      !this.isReady ||
      this.hasAttemptedShare ||
      logStore.isImportedLog ||
      !logStore.isAscensionLog
    );
  }

  get visualizerUrl() {
    return logStore.isImportedLog
      ? `${LOG_VIS_URL}/${logStore.hashcode}`
      : `${LOG_VIS_URL}/uploaded`;
  }

  get currentEntries() {
    return logStore.currentEntries;
  }

  initializeListeners() {
    window.addEventListener("keydown", (event) => {
      // don't use the hotkeys if trying to type
      if (event.target && event.target instanceof HTMLInputElement) {
        return;
      }

      if (event.key === "c") {
        this.toggleCompactMode();
      }

      if (event.key === "`") {
        this.isDevMode.set(!this.isDevMode.get());
      }
    });
  }

  toggleCompactMode(toState?: boolean) {
    if (!this.canToggleCompact.get() && !this.isDevMode.get()) {
      return;
    }

    if (toState === undefined) {
      this.isUsingCompactMode.set(!this.isUsingCompactMode.get());
    } else {
      this.isUsingCompactMode.set(toState);
    }
  }

  /**
   * largely a wrapper for the actual download in logStore
   */
  async downloadFullLog() {
    this.isPretendLoading.set(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      logStore.downloadFullLog();
    } catch (err) {
      if (err instanceof Error) {
        ToastController.error({
          title: "Download Failed",
          content: err.message,
        });
      }
      this.isPretendLoading.set(false);
    }

    this.isPretendLoading.set(false);
  }
  /**
   * uploads the current log to server
   */
  async onShareLog() {
    if (this.isShareDisabled) {
      this.showShareFailReason();
      return;
    }

    this.hasAttemptedShare = true;
    this.isPretendLoading.set(true);

    try {
      const payload = {
        hashcode: logStore.hashcode,
        characterName: logStore.characterName,
        difficultyName: logStore.difficultyName!,
        pathName: logStore.pathName!,
        dayCount: logStore.dayCount,
        turnCount: logStore.turnCount!,
        standardSeason: logStore.standardSeason,
        logText: logStore.export(),
      };

      await databaseStore.shareLog(payload);

      // this marks the log as shared & shareable
      logStore.sharedHashCode = logStore.hashcode;
    } catch (err) {
      if (err instanceof Error) {
        ToastController.error({ title: "Share Error", content: err.message });
      }
      this.isPretendLoading.set(false);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    this.isPretendLoading.set(false);
  }

  async onViewSharedLog(hashcode: string) {
    this.isPretendLoading.set(true);

    try {
      const fetchedLogData = await databaseStore.fetchLog(hashcode);
      const { logText, databaseEntry } = fetchedLogData;
      await logStore.importLog(logText, databaseEntry);
      ToastController.success({
        title: "Log successfully imported!",
        content: "Spying on the competition? Ottimo.",
      });
      this.shouldRedirectToVisualizer.set(true);
    } catch (err) {
      // ToastController.show({title: 'Import Failed', content: err.message});
      this.isPretendLoading.set(false);
    }

    this.isPretendLoading.set(false);
  }

  /**
   * just a hacky little handler to show a toast with the reason
   * based on `isShareDisabled`
   */
  showShareFailReason() {
    let failReason = "";
    if (!this.isReady) {
      // failReason += 'App is not ready.\n';
    }

    if (this.hasAttemptedShare) {
      failReason += "You already tried sharing this.\n";
    }

    if (logStore.isImportedLog && !this.hasAttemptedShare) {
      failReason += "This log is from the Database.\n";
    }

    if (!logStore.isAscensionLog) {
      failReason += "This is not an Ascension log.\n";
    }

    // if (logStore.turnCount / logStore.dayCount >= 400) {
    //   failReason += 'Your turns/day ratio is very lopsided. Contact me.';
    // }

    ToastController.error({ title: "Share Error", content: failReason });
  }
}
/** export singleton */
export default new AppStore();

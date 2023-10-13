/**
 * state and handler for local storage
 */
class SessionStore {
  isShowStandardOnly() {
    return this.getItem("isShowStandardOnly") === "true" || false;
  }

  set(key: string, value: string) {
    window.localStorage.setItem(key, value);
  }

  getItem(key: string) {
    return window.localStorage.getItem(key);
  }
}
/** export singleton */
export default new SessionStore();

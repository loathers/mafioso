// import {observable} from 'mobx';

/**
 * state and handler for local storage
 */
class SessionStore {
  constructor() {
    /** @type {DifficultyName} */
    this.difficultyNameFilter = this.getItem('difficultyNameFilter') || 'Any';
    /** @type {PathName} */
    this.pathNameFilter = this.getItem('pathNameFilter') || 'Any';
  }
  /**
   * @param {String} key
   * @returns {*}
   */
  get(key) {
    return this[key];
  }
  /**
   * @param {String} key
   * @param {String} value
   */
  set(key, value) {
    this[key] = value;
    window.localStorage.setItem(key, value);
  }
  /**
   * @param {String} key
   * @returns {*}
   */
  getItem(key) {
    return this[key] || window.localStorage.getItem(key);
  }
}
/** export singleton */
export default new SessionStore();

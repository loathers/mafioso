export default class ListItem {
  /**
   * @param {Object} defaultAttributes
   */
  constructor({name, amount}) {
    /** @type {Number} */
    this.listIdx = -1;
    /** @type {Object} */
    this.attributes = {
      /** @type {String} */
      name: name,
      /** @type {Number} */
      amount: amount || 0,
    }
  }
  /** @type {String} */
  get displayName() {
    return this.attributes.name;
  }
  /** @type {Number} */
  get displayAmount() {
    if (this.attributes.amount <= 1) {
      return null;
    }

    return `(${this.attributes.amount})`;
  }
}
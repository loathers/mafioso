export default class ListItem {
  constructor() {
    /** @type {Number} */
    this.listIdx = -1;
    /** @type {Object} */
    this.attributes = {
      /** @type {String} */
      name: undefined,
      /** @type {Number} */
      amount: 0,
    }
  }
  /** @type {String} */
  get displayName() {
    return this.attributes.name;
  }
  /** @type {Number} */
  get displayAmount() {
    return this.attributes.amount;
  }
}
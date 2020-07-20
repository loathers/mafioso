export const ENTRY_TYPE = {
  MAFIA_LOG: 'ENTRY_TYPE.MAFIA_LOG',
  MAFIA_CLI: 'ENTRY_TYPE.MAFIA_CLI',
  SKILL_BREAKDOWN: 'ENTRY_TYPE.SKILL_BREAKDOWN',
  LOCATION_VISIT: 'ENTRY_TYPE.LOCATION_VISIT',
  NONCOMBAT_SKILL: 'ENTRY_TYPE.NONCOMBAT_SKILL',
  COMBAT_SKILL: 'ENTRY_TYPE.COMBAT_SKILL',
  COMBAT_ITEM: 'ENTRY_TYPE.COMBAT_ITEM',
  INVENTORY_USE: 'ENTRY_TYPE.INVENTORY_USE',
  ITEM_ACQUISITION: 'ENTRY_TYPE.ITEM_ACQUISITION',
  ENCOUNTER: 'ENTRY_TYPE.ENCOUNTER',  
}
/**
 * 
 */
export default class LogEntry {
  /** @default */
  constructor(lineStr) {
    /** @type {String} */
    this.srcString = lineStr;
    /** @type {Object} */
    this.data = undefined;

    // can automatically parse if given a string
    if (lineStr) {
      this.parse();
    }
  }
  /** @type {Boolean} */
  get hasSrc() {
    return this.srcString !== undefined;
  }
  /** @type {Boolean} */
  get hasData() {
    return this.data !== undefined;
  }
}
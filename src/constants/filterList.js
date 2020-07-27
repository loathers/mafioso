import ENTRY_TYPE from 'constants/entryType';

/**
 * visible
 * @type {Array}
 */
export const ENTRY_TYPE_FILTERS = [
  {
    label: 'Combat',
    entryType: ENTRY_TYPE.ENCOUNTER.COMBAT,
    isHidden: false,
    isChecked: true,
  },
  {
    label: 'Eat',
    entryType: ENTRY_TYPE.CONSUMPTION.EAT,
    isHidden: false,
    isChecked: true,
  },
  {
    label: 'Drink',
    entryType: ENTRY_TYPE.CONSUMPTION.DRINK,
    isHidden: false,
    isChecked: true,
  },
  {
    label: 'Chew',
    entryType: ENTRY_TYPE.CONSUMPTION.CHEW,
    isHidden: false,
    isChecked: true,
  },
  {
    label: 'Equip',
    entryType: ENTRY_TYPE.EQUIP,
    isHidden: false,
    isChecked: true,
  },
  {
    label: 'Unequip',
    entryType: ENTRY_TYPE.UNEQUIP,
    isHidden: false,
    isChecked: true,
  },
  {
    label: 'Closet Put',
    entryType: ENTRY_TYPE.CLOSET_PUT,
    isHidden: true,
    isChecked: true,
  },
  {
    label: 'Closet Take',
    entryType: ENTRY_TYPE.CLOSET_TAKE,
    isHidden: true,
    isChecked: true,
  },
  {
    label: 'Ascension Info',
    entryType: ENTRY_TYPE.SNAPSHOT.ASCENSION_INFO,
    isHidden: true,
    isChecked: true,
  },
  {
    label: 'Skill Breakdown',
    entryType: ENTRY_TYPE.SNAPSHOT.SKILL_BREAKDOWN,
    isHidden: true,
    isChecked: true,
  },
  {
    label: 'Day Info',
    entryType: ENTRY_TYPE.SNAPSHOT.DAY_INFO,
    isHidden: true,
    isChecked: true,
  },
];
/**
 * entryTypes that are filtered by default
 * @type {Array}
 */
export const DEFAULT_ENTRY_FILTER = ENTRY_TYPE_FILTERS
  .filter((filterData) => !filterData.isChecked)
  .map((filterData) => filterData.entryType);
/**
 * [ATTRIBUTE_FILTERS description]
 * @type {Array}
 */
export const ATTRIBUTE_FILTERS = [
  {
    label: 'Level Up',
    attributeName: 'isLevelUp',
    attributeValue: true,
    isHidden: false,
    isChecked: false,
  },
  {
    label: 'NonCombat',
    attributeName: 'isNonCombatEncounter',
    attributeValue: true,
    isHidden: false,
    isChecked: false,
  },
];
/**
 * attributes that are filtered by default
 * @type {Array}
 */
export const DEFAULT_ATTRIBUTE_FILTERS = ATTRIBUTE_FILTERS
  .filter((filterData) => filterData.isChecked)
  .map(({attributeName, attributeValue}) => ({attributeName, attributeValue}));
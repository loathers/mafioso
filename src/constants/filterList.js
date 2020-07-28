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
    checked: true,
  },
  {
    label: 'Encounters',
    entryType: ENTRY_TYPE.ENCOUNTER.NONCOMBAT,
    isHidden: false,
    checked: true,
  },
  {
    label: 'Consumption',
    entryGroup: [
      ENTRY_TYPE.CONSUMPTION.EAT, 
      ENTRY_TYPE.CONSUMPTION.DRINK, 
      ENTRY_TYPE.CONSUMPTION.CHEW,
      
    ],
    isHidden: false,
    checked: true,
  },
  {
    label: 'Equip',
    entryType: ENTRY_TYPE.EQUIP,
    isHidden: false,
    checked: false,
  },
  {
    label: 'Unequip',
    entryType: ENTRY_TYPE.UNEQUIP,
    isHidden: false,
    checked: false,
  },
  {
    label: 'Pulls',
    entryType: ENTRY_TYPE.HAGNK_PULL,
    isHidden: false,
    checked: true,
  },
  {
    label: 'Closet Put',
    entryType: ENTRY_TYPE.CLOSET_PUT,
    isHidden: true,
    checked: false,
  },
  {
    label: 'Closet Take',
    entryType: ENTRY_TYPE.CLOSET_TAKE,
    isHidden: true,
    checked: false,
  },
  {
    label: 'Clan Visit',
    entryType: ENTRY_TYPE.CLAN_VISIT,
    isHidden: true,
    checked: false,
  },
  {
    label: 'Visits',
    entryType: ENTRY_TYPE.VISITING,
    isHidden: true,
    checked: false,
  },
  {
    label: 'Talks',
    entryType: ENTRY_TYPE.TALKING,
    isHidden: true,
    checked: false,
  },
  {
    label: 'Shopping',
    entryType: ENTRY_TYPE.TRANSACTION,
    isHidden: false,
    checked: false,
  },
  {
    label: 'Ascension Info',
    entryType: ENTRY_TYPE.SNAPSHOT.ASCENSION_INFO,
    isHidden: true,
    checked: false,
  },
  {
    label: 'Skill Breakdown',
    entryType: ENTRY_TYPE.SNAPSHOT.SKILL_BREAKDOWN,
    isHidden: true,
    checked: false,
  },
  {
    label: 'Day Info',
    entryType: ENTRY_TYPE.SNAPSHOT.DAY_INFO,
    isHidden: true,
    checked: false,
  },
];
/**
 * entryTypes that are filtered by default
 * @type {Array}
 */
export const DEFAULT_ENTRY_FILTER = ENTRY_TYPE_FILTERS
  .filter((filterData) => !filterData.checked)
  .map((filterData) => filterData.entryType);
/**
 * [ATTRIBUTE_FILTERS description]
 * @type {Array}
 */
export const ATTRIBUTE_FILTERS = [
  {
    label: 'NonCombat',
    attributeName: 'isNonCombatEncounter',
    attributeValue: true,
    isHidden: false,
    checked: false,
  },
  {
    label: 'Level Up',
    attributeName: 'isLevelUp',
    attributeValue: true,
    isHidden: false,
    checked: false,
  },
  {
    label: 'Used the Force',
    attributeName: 'isEndedByUseTheForce',
    attributeValue: true,
    isHidden: false,
    checked: false,
  },
  {
    label: 'Free Adventure',
    attributeName: 'isFreeAdv',
    attributeValue: true,
    isHidden: false,
    checked: false,
  },
  {
    label: 'Victories',
    attributeName: 'isVictory',
    attributeValue: true,
    isHidden: false,
    checked: false,
  },
  {
    label: 'Beaten Up',
    attributeName: 'isDeath',
    attributeValue: true,
    isHidden: false,
    checked: false,
  },
];
/**
 * attributes that are filtered by default
 * @type {Array}
 */
export const DEFAULT_ATTRIBUTE_FILTERS = ATTRIBUTE_FILTERS
  .filter((filterData) => filterData.checked)
  .map(({attributeName, attributeValue}) => ({attributeName, attributeValue}));
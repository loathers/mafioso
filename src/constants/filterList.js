import ENTRY_TYPE from 'constants/entryType';

export const ENTRY_TYPE_FILTERS = [
  {
    label: 'Combat',
    entryType: ENTRY_TYPE.ENCOUNTER.COMBAT,
    isHidden: false,
  },
  {
    label: 'Eat',
    entryType: ENTRY_TYPE.CONSUMPTION.EAT,
    isHidden: false,
  },
  {
    label: 'Drink',
    entryType: ENTRY_TYPE.CONSUMPTION.DRINK,
    isHidden: false,
  },
  {
    label: 'Chew',
    entryType: ENTRY_TYPE.CONSUMPTION.CHEW,
    isHidden: false,
  },
  {
    label: 'Equip',
    entryType: ENTRY_TYPE.EQUIP,
    isHidden: false,
  },
  {
    label: 'Unequip',
    entryType: ENTRY_TYPE.UNEQUIP,
    isHidden: false,
  },
  {
    label: 'Closet Put',
    entryType: ENTRY_TYPE.CLOSET_PUT,
    isHidden: true,
  },
  {
    label: 'Closet Take',
    entryType: ENTRY_TYPE.CLOSET_TAKE,
    isHidden: true,
  },
  {
    label: 'Ascension Info',
    entryType: ENTRY_TYPE.SNAPSHOT.ASCENSION_INFO,
    isHidden: true,
  },
  {
    label: 'Skill Breakdown',
    entryType: ENTRY_TYPE.SNAPSHOT.SKILL_BREAKDOWN,
    isHidden: true,
  },
  {
    label: 'Day Info',
    entryType: ENTRY_TYPE.SNAPSHOT.DAY_INFO,
    isHidden: true,
  },
];

export const ATTRIBUTE_FILTERS = [
  {
    label: 'Level Up',
    attributeName: ENTRY_TYPE.ENCOUNTER.COMBAT,
    isHidden: false,
  },
  {
    label: 'NonCombats',
    attributeName: ENTRY_TYPE.ENCOUNTER.NONCOMBAT,
    isHidden: false,
  },
];

export default ENTRY_TYPE_FILTERS;
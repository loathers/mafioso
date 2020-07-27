import ENTRY_TYPE from 'constants/entryType';

export const AVAILABLE_FILTERS = [
  {
    label: 'Combat',
    entryType: ENTRY_TYPE.ENCOUNTER.COMBAT,
  },
  {
    label: 'NonCombat',
    entryType: ENTRY_TYPE.ENCOUNTER.NONCOMBAT,
  },
  {
    label: 'Eat',
    entryType: ENTRY_TYPE.CONSUMPTION.EAT,
  },
  {
    label: 'Drink',
    entryType: ENTRY_TYPE.CONSUMPTION.DRINK,
  },
  {
    label: 'Chew',
    entryType: ENTRY_TYPE.CONSUMPTION.CHEW,
  },
  {
    label: 'Pulls',
    entryType: ENTRY_TYPE.HAGNK_PULL,
  },
  {
    label: 'Equip',
    entryType: ENTRY_TYPE.EQUIP,
  },
  {
    label: 'Unequip',
    entryType: ENTRY_TYPE.UNEQUIP,
  },
  {
    label: 'Unknown',
    entryType: ENTRY_TYPE.UNKNOWN,
  },
];

export default AVAILABLE_FILTERS;
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
    label: 'NonCombat',
    entryType: ENTRY_TYPE.ENCOUNTER.NONCOMBAT,
    isHidden: false,
    checked: true,
  },
  {
    label: 'IOTM',
    entryGroup: [
      ENTRY_TYPE.IOTM.BASTILLE_BATALLION,
      ENTRY_TYPE.IOTM.BEACH_COMB,
      ENTRY_TYPE.IOTM.BOXING_DAYCARE,
      ENTRY_TYPE.IOTM.DECK_OF_EVERY_CARD,
      ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.MAKE,
      ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.EAT,
      ENTRY_TYPE.IOTM.DISTANT_WOODS_GETAWAY,
      ENTRY_TYPE.IOTM.GARBAGE_TOTE,
      ENTRY_TYPE.IOTM.GOD_LOBSTER.COMBAT,
      ENTRY_TYPE.IOTM.GOD_LOBSTER.BOON,
      ENTRY_TYPE.IOTM.PIRATEREALM,
      ENTRY_TYPE.IOTM.SONGBOOM_BOOMBOX,
      ENTRY_TYPE.IOTM.VOTING_BOOTH,
    ],
    isHidden: false,
    checked: true,
  },
  {
    label: 'Diet',
    entryGroup: [
      ENTRY_TYPE.CONSUMPTION.EAT, 
      ENTRY_TYPE.CONSUMPTION.DRINK, 
      ENTRY_TYPE.CONSUMPTION.CHEW,
      ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.MAKE,
      ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.EAT,
    ],
    isHidden: false,
    checked: true,
  },
  {
    label: 'Crafting',
    entryGroup: [
      ENTRY_TYPE.ITEMS.COMBINE,
      ENTRY_TYPE.ITEMS.COOK,
      ENTRY_TYPE.ITEMS.CRAFT,
      ENTRY_TYPE.ITEMS.CREATE,
      ENTRY_TYPE.ITEMS.MIX,
    ],
    isHidden: false,
    checked: true,
  },
  {
    label: 'Buffs/Effects',
    entryGroup: [
      ENTRY_TYPE.EFFECTS.SPELL_CAST,
    ],
    isHidden: false,
    checked: true,
  },
  {
    label: 'Pulls',
    entryType: ENTRY_TYPE.ITEMS.HAGNK_PULL,
    isHidden: false,
    checked: true,
  },
  {
    label: 'Closet',
    entryGroup: [
      ENTRY_TYPE.ITEMS.CLOSET_PUT,
      ENTRY_TYPE.ITEMS.CLOSET_TAKE,
    ],
    isHidden: true,
    checked: false,
  },
  {
    label: 'Equipment',
    entryGroup: [
      ENTRY_TYPE.ITEMS.EQUIP,
      ENTRY_TYPE.ITEMS.UNEQUIP,
    ],
    entryType: ENTRY_TYPE.ITEMS.EQUIP,
    isHidden: false,
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
    entryGroup: [
      ENTRY_TYPE.VISITING,
      ENTRY_TYPE.TALKING,
    ],
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
  {
    label: 'Uncategorized',
    entryType: ENTRY_TYPE.UNKNOWN,
    isHidden: false,
    checked: false,
  },
];
/**
 * entryTypes that are filtered by default
 * @type {Array}
 */
export let DEFAULT_ENTRIES_VISIBLE = [];
ENTRY_TYPE_FILTERS.forEach((filterData) => {
  if (filterData.checked) {
    const {entryType, entryGroup} = filterData;
    if (entryType && !DEFAULT_ENTRIES_VISIBLE.includes(entryType)) {
      DEFAULT_ENTRIES_VISIBLE.push(entryType);
    }

    if (entryGroup) {
      entryGroup.forEach((innerType) => {
        if (!DEFAULT_ENTRIES_VISIBLE.includes(innerType)) {
          DEFAULT_ENTRIES_VISIBLE.push(innerType);
        }
      })
    }
  }
});
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
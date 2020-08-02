/**
 * @typedef {String} EntryType
 */
export const ENTRY_TYPE = {
  UNKNOWN: 'ENTRY_TYPE.UNKNOWN',

  IOTM: {
    BASTILLE_BATTALION: 'ENTRY_TYPE.IOTM.BASTILLE_BATTALION',
    BEACH_COMB: 'ENTRY_TYPE.IOTM.BEACH_COMB',
    BIRD_A_DAY: 'ENTRY_TYPE.IOTM.BIRD_A_DAY',
    BOXING_DAYCARE: 'ENTRY_TYPE.IOTM.BOXING_DAYCARE',
    CAT_BURGLAR: 'ENTRY_TYPE.IOTM.CAT_BURGLAR',
    DECK_OF_EVERY_CARD: 'ENTRY_TYPE.IOTM.DECK_OF_EVERY_CARD',
    DIABOLIC_PIZZA: {
      MAKE: 'ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.MAKE',
      EAT: 'ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.EAT',
    },
    DISTANT_WOODS_GETAWAY: 'ENTRY_TYPE.IOTM.DISTANT_WOODS_GETAWAY',
    FOURTH_OF_MAY_COSPLAY_SABER: {
      UPGRADE: 'ENTRY_TYPE.IOTM.FOURTH_OF_MAY_COSPLAY_SABER.UPGRADE',
      USING_THE_FORCE: 'ENTRY_TYPE.IOTM.FOURTH_OF_MAY_COSPLAY_SABER.USING_THE_FORCE',
    },
    GARBAGE_TOTE: 'ENTRY_TYPE.IOTM.GARBAGE_TOTE',
    GOD_LOBSTER: {
      COMBAT: 'ENTRY_TYPE.IOTM.GOD_LOBSTER.COMBAT',
      BOON: 'ENTRY_TYPE.IOTM.GOD_LOBSTER.BOON',
      REGALIA: 'ENTRY_TYPE.IOTM.GOD_LOBSTER.REGALIA',
      BLESSING: 'ENTRY_TYPE.IOTM.GOD_LOBSTER.BLESSING',
      EXPERIENCE: 'ENTRY_TYPE.IOTM.GOD_LOBSTER.EXPERIENCE',
    },
    LATTE_LOVERS_MUG: 'ENTRY_TYPE.IOTM.LATTE_LOVERS_MUG',
    MELODRAMEDARY: 'ENTRY_TYPE.IOTM.MELODRAMEDARY',
    PILLKEEPER: 'ENTRY_TYPE.IOTM.PILLKEEPER',
    PIRATEREALM: 'ENTRY_TYPE.IOTM.PIRATEREALM',
    SONGBOOM_BOOMBOX: 'ENTRY_TYPE.IOTM.SONGBOOM_BOOMBOX',
    VOTING_BOOTH: 'ENTRY_TYPE.IOTM.VOTING_BOOTH',
  },

  SNAPSHOT: {
    ASCENSION_INFO: 'ENTRY_TYPE.SNAPSHOT.ASCENSION_INFO',
    VALHALLA: 'ENTRY_TYPE.SNAPSHOT.VALHALLA',
    CHARACTER_INFO: 'ENTRY_TYPE.SNAPSHOT.CHARACTER_INFO',
    DAY_INFO: 'ENTRY_TYPE.SNAPSHOT.DAY_INFO',
    // NEW_DAY: 'ENTRY_TYPE.SNAPSHOT.NEW_DAY',
    SKILL_BREAKDOWN: 'ENTRY_TYPE.SNAPSHOT.SKILL_BREAKDOWN',
  },
  ENCOUNTER: {
    COMBAT: 'ENTRY_TYPE.ENCOUNTER.COMBAT',
    NONCOMBAT: 'ENTRY_TYPE.ENCOUNTER.NONCOMBAT',
  },

  TALKING: 'ENTRY_TYPE.TALKING',
  VISITING: 'ENTRY_TYPE.VISITING',
  CLAN_VISIT: 'ENTRY_TYPE.CLAN_VISIT',
  TRANSACTION: 'ENTRY_TYPE.TRANSACTION',

  CONSUMPTION: {
    EAT: 'ENTRY_TYPE.CONSUMPTION.EAT',
    DRINK: 'ENTRY_TYPE.CONSUMPTION.DRINK',
    CHEW: 'ENTRY_TYPE.CONSUMPTION.CHEW',
  },
  ITEMS: {
    HAGNK_PULL: 'ENTRY_TYPE.ITEMS.HAGNK_PULL',

    CLOSET: 'ENTRY_TYPE.ITEMS.CLOSET',
    CLOSET_PUT: 'ENTRY_TYPE.ITEMS.CLOSET_PUT',
    CLOSET_TAKE: 'ENTRY_TYPE.ITEMS.CLOSET_TAKE',
  
    EQUIP: 'ENTRY_TYPE.ITEMS.EQUIP',
    UNEQUIP: 'ENTRY_TYPE.ITEMS.UNEQUIP',

    COMBINE: 'ENTRY_TYPE.ITEMS.COMBINE',
    COOK: 'ENTRY_TYPE.ITEMS.COOK',
    CRAFT: 'ENTRY_TYPE.ITEMS.CRAFT',
    CREATE: 'ENTRY_TYPE.ITEMS.CREATE',
    MIX: 'ENTRY_TYPE.ITEMS.MIX',
  },
  EFFECTS: {
    SPELL_CAST: 'ENTRY_TYPE.EFFECTS.SPELL_CAST',
  },
  GENERIC_USE: 'ENTRY_TYPE.GENERIC_USE',

  FAMILIAR: 'ENTRY_TYPE.FAMILIAR',

  PVP: 'ENTRY_TYPE.PVP',
}

export default ENTRY_TYPE;
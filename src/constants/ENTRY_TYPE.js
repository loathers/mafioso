/**
 * @typedef {String} EntryType
 */
export const ENTRY_TYPE = {
  UNKNOWN: 'ENTRY_TYPE.UNKNOWN',

  IOTM: {
    BASTILLE_BATTALION: 'ENTRY_TYPE.IOTM.BASTILLE_BATTALION',
    BEACH_COMB: 'ENTRY_TYPE.IOTM.BEACH_COMB',
    BIRD_A_DAY: {
      USE: 'ENTRY_TYPE.IOTM.BIRD_A_DAY.USE',
      CAST: 'ENTRY_TYPE.IOTM.BIRD_A_DAY.CAST',
    },
    BOXING_DAYCARE: 'ENTRY_TYPE.IOTM.BOXING_DAYCARE',
    CAT_BURGLAR: 'ENTRY_TYPE.IOTM.CAT_BURGLAR',
    CONSPIRACY_ISLAND: 'ENTRY_TYPE.IOTM.CONSPIRACY_ISLAND',
    DECK_OF_EVERY_CARD: 'ENTRY_TYPE.IOTM.DECK_OF_EVERY_CARD',
    DIABOLIC_PIZZA: {
      MAKE: 'ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.MAKE',
      EAT: 'ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.EAT',
    },
    DISTANT_WOODS_GETAWAY: 'ENTRY_TYPE.IOTM.DISTANT_WOODS_GETAWAY',
    FORTUNE_TELLER: 'ENTRY_TYPE.IOTM.FORTUNE_TELLER',
    FOURTH_OF_MAY_COSPLAY_SABER: {
      UPGRADE: 'ENTRY_TYPE.IOTM.FOURTH_OF_MAY_COSPLAY_SABER.UPGRADE',
      USING_THE_FORCE: 'ENTRY_TYPE.IOTM.FOURTH_OF_MAY_COSPLAY_SABER.USING_THE_FORCE',
    },
    GOD_LOBSTER: {
      COMBAT: 'ENTRY_TYPE.IOTM.GOD_LOBSTER.COMBAT',
      BOON: 'ENTRY_TYPE.IOTM.GOD_LOBSTER.BOON',
      REGALIA: 'ENTRY_TYPE.IOTM.GOD_LOBSTER.REGALIA',
      BLESSING: 'ENTRY_TYPE.IOTM.GOD_LOBSTER.BLESSING',
      EXPERIENCE: 'ENTRY_TYPE.IOTM.GOD_LOBSTER.EXPERIENCE',
    },
    JANUARYS_GARBAGE_TOTE: 'ENTRY_TYPE.IOTM.JANUARYS_GARBAGE_TOTE',
    KRAMCO_SAUSAGEOMATIC: {
      COMBAT: 'ENTRY_TYPE.IOTM.KRAMCO_SAUSAGEOMATIC.COMBAT',
      EQUIP: 'ENTRY_TYPE.IOTM.KRAMCO_SAUSAGEOMATIC.EQUIP',
      GRIND: 'ENTRY_TYPE.IOTM.KRAMCO_SAUSAGEOMATIC.GRIND',
      EAT_MAGICAL_SAUSAGE: 'ENTRY_TYPE.IOTM.KRAMCO_SAUSAGEOMATIC.EAT_MAGICAL_SAUSAGE',
    },
    LATTE_LOVERS_MUG: 'ENTRY_TYPE.IOTM.LATTE_LOVERS_MUG',
    MELODRAMEDARY: 'ENTRY_TYPE.IOTM.MELODRAMEDARY',
    PILLKEEPER: 'ENTRY_TYPE.IOTM.PILLKEEPER',
    PIRATEREALM: 'ENTRY_TYPE.IOTM.PIRATEREALM',
    SONGBOOM_BOOMBOX: 'ENTRY_TYPE.IOTM.SONGBOOM_BOOMBOX',
    VAMPYRIC_CLOAK: 'ENTRY_TYPE.IOTM.VAMPYRIC_CLOAK',
    VOTING_BOOTH: 'ENTRY_TYPE.IOTM.VOTING_BOOTH',
  },
  PATH: {
    COMMUNITY_SERVICE_CHOICE: 'ENTRY_TYPE.PATH.COMMUNITY_SERVICE_CHOICE',
    LOW_KEY_SUMMER_NONCOMBAT: 'ENTRY_TYPE.PATH.LOW_KEY_SUMMER_NONCOMBAT',
  },
  QUEST: {
    TOOT_ORIOLE: 'ENTRY_TYPE.QUEST.TOOT_ORIOLE',
    OPEN_DESERT_PYRAMID: 'ENTRY_TYPE.QUEST.OPEN_DESERT_PYRAMID',
    MADE_WAND: 'ENTRY_TYPE.QUEST.MADE_WAND',
    NAUGHTY_SORCERESS: 'ENTRY_TYPE.QUEST.NAUGHTY_SORCERESS',
    ASCENSION_END: 'ENTRY_TYPE.QUEST.ASCENSION_END',
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
  AUTOSELL: 'ENTRY_TYPE.AUTOSELL',
  TRANSACTION: 'ENTRY_TYPE.TRANSACTION',

  CONSUMPTION: {
    EAT: 'ENTRY_TYPE.CONSUMPTION.EAT',
    DRINK: 'ENTRY_TYPE.CONSUMPTION.DRINK',
    CHEW: 'ENTRY_TYPE.CONSUMPTION.CHEW',
  },
  ITEMS: {
    USE_ITEM: 'ENTRY_TYPE.ITEMS.USE_ITEM',

    HAGNK_PULL: 'ENTRY_TYPE.ITEMS.HAGNK_PULL',
    CLOSET: 'ENTRY_TYPE.ITEMS.CLOSET',
    CLOSET_PUT: 'ENTRY_TYPE.ITEMS.CLOSET_PUT',
    CLOSET_TAKE: 'ENTRY_TYPE.ITEMS.CLOSET_TAKE',
  
    EQUIP_PLAYER: 'ENTRY_TYPE.ITEMS.EQUIP_PLAYER',
    UNEQUIP_PLAYER: 'ENTRY_TYPE.ITEMS.UNEQUIP_PLAYER',
    EQUIP_FAMILIAR: 'ENTRY_TYPE.ITEMS.EQUIP_FAMILIAR',

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
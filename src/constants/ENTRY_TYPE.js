/**
 * @typedef {String} EntryType
 */
export const ENTRY_TYPE = {
  UNKNOWN: 'ENTRY_TYPE.UNKNOWN',
  ANNOTATION_ONLY: 'ENTRY_TYPE.ANNOTATION_ONLY',
  MAFIOSO: {
    GENERATED_BLOCK: 'ENTRY_TYPE.MAFIOSO.GENERATED_BLOCK',
  },
  IOTM: {
    BASTILLE_BATTALION: 'ENTRY_TYPE.IOTM.BASTILLE_BATTALION',
    BEACH_COMB: {
      BEACH_HEAD: 'ENTRY_TYPE.IOTM.BEACH_COMB.BEACH_HEAD',
      WANDERING: 'ENTRY_TYPE.IOTM.BEACH_COMB.WANDERING',
    },
    BIRD_A_DAY: {
      USE: 'ENTRY_TYPE.IOTM.BIRD_A_DAY.USE',
      CAST: 'ENTRY_TYPE.IOTM.BIRD_A_DAY.CAST',
    },
    BOXING_DAYCARE: 'ENTRY_TYPE.IOTM.BOXING_DAYCARE',
    CAT_BURGLAR: 'ENTRY_TYPE.IOTM.CAT_BURGLAR',
    CHATEAU_MANTEGNA: {
      DESK: 'ENTRY_TYPE.IOTM.CHATEAU_MANTEGNA.DESK',
      PAINTING: 'ENTRY_TYPE.IOTM.CHATEAU_MANTEGNA.PAINTING',
      REST: 'ENTRY_TYPE.IOTM.CHATEAU_MANTEGNA.REST',
    },
    CONSPIRACY_ISLAND: 'ENTRY_TYPE.IOTM.CONSPIRACY_ISLAND',
    DECK_OF_EVERY_CARD: 'ENTRY_TYPE.IOTM.DECK_OF_EVERY_CARD',
    DETECTIVE_SCHOOL: 'ENTRY_TYPE.IOTM.DETECTIVE_SCHOOL',
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
    LATTE_LOVERS_MEMBERS_MUG: {
      REFILL: 'ENTRY_TYPE.IOTM.LATTE_LOVERS_MEMBERS_MUG.REFILL',
    },
    MADAME_ZATARA_FORTUNE_TELLER: 'ENTRY_TYPE.IOTM.MADAME_ZATARA_FORTUNE_TELLER',
    MELODRAMEDARY: 'ENTRY_TYPE.IOTM.MELODRAMEDARY',
    PILL_KEEPER: 'ENTRY_TYPE.IOTM.PILL_KEEPER',
    PIRATEREALM: 'ENTRY_TYPE.IOTM.PIRATEREALM',
    POOL_TABLE: 'ENTRY_TYPE.IOTM.POOL_TABLE',
    SNOJO: 'ENTRY_TYPE.IOTM.SNOJO',
    SONGBOOM_BOOMBOX: 'ENTRY_TYPE.IOTM.SONGBOOM_BOOMBOX',
    VAMPYRIC_CLOAK: 'ENTRY_TYPE.IOTM.VAMPYRIC_CLOAK',
    VOTING_BOOTH: 'ENTRY_TYPE.IOTM.VOTING_BOOTH',
    WITCHESS: {
      COMBAT: 'ENTRY_TYPE.IOTM.WITCHESS.COMBAT',
      BUFF: 'ENTRY_TYPE.IOTM.WITCHESS.BUFF',
    },
  },
  PATH: {
    COMMUNITY_SERVICE_CHOICE: 'ENTRY_TYPE.PATH.COMMUNITY_SERVICE_CHOICE',
    LOW_KEY_SUMMER_NONCOMBAT: 'ENTRY_TYPE.PATH.LOW_KEY_SUMMER_NONCOMBAT',
    THE_SOURCE: {
      SOURCE_AGENT_ENCOUNTER: 'ENTRY_TYPE.PATH.THE_SOURCE.SOURCE_AGENT_ENCOUNTER',
    },
  },
  QUEST: {
    TOOT_ORIOLE: 'ENTRY_TYPE.QUEST.TOOT_ORIOLE',
    CRACKPOT_MYSTIC: 'ENTRY_TYPE.QUEST.CRACKPOT_MYSTIC',
    DAILY_DUNGEON: 'ENTRY_TYPE.QUEST.DAILY_DUNGEON',
    TAVERN_CELLAR: 'ENTRY_TYPE.QUEST.TAVERN_CELLAR',
    LADY_SPOOKYRAVEN: 'ENTRY_TYPE.QUEST.LADY_SPOOKYRAVEN',
    SPOOKYRAVEN_MANOR: 'ENTRY_TYPE.QUEST.SPOOKYRAVEN_MANOR',
    KNOB_GOBLIN_KING: 'ENTRY_TYPE.QUEST.KNOB_GOBLIN_KING',
    BOSS_BAT_BOSS: 'ENTRY_TYPE.QUEST.BOSS_BAT_BOSS',
    CRYPT_BOSSES: 'ENTRY_TYPE.QUEST.CRYPT_BOSSES',
    MIST_SHROUDED_PEAK_BOSS: 'ENTRY_TYPE.QUEST.MIST_SHROUDED_PEAK_BOSS',
    DEEP_FAT_FRIARS: 'ENTRY_TYPE.QUEST.DEEP_FAT_FRIARS',
    GIANT_BEANSTALK_PLANT: 'ENTRY_TYPE.QUEST.GIANT_BEANSTALK_PLANT',
    ICY_PEAK_ASCEND: 'ENTRY_TYPE.QUEST.ICY_PEAK_ASCEND',
    HIGHLAND_LORD: 'ENTRY_TYPE.QUEST.HIGHLAND_LORD',
    OPEN_DESERT_PYRAMID: 'ENTRY_TYPE.QUEST.OPEN_DESERT_PYRAMID',
    LEAFLET: 'ENTRY_TYPE.QUEST.LEAFLET',
    ED_THE_UNDYING_BOSS: 'ENTRY_TYPE.QUEST.ED_THE_UNDYING_BOSS',
    NAUGHTY_SORCERESS: 'ENTRY_TYPE.QUEST.NAUGHTY_SORCERESS',
    TOWER_CONTEST_BOOTH: 'ENTRY_TYPE.QUEST.TOWER_CONTEST_BOOTH',
    TOWER_CLOSING_CEREMONY: 'ENTRY_TYPE.QUEST.TOWER_CLOSING_CEREMONY',
    HEDGE_MAZE: 'ENTRY_TYPE.QUEST.HEDGE_MAZE',
    TOWER_DOOR: 'ENTRY_TYPE.QUEST.TOWER_DOOR',
    ASCENSION_END: 'ENTRY_TYPE.QUEST.ASCENSION_END',
    MISC: 'ENTRY_TYPE.QUEST.MISC',

    MADE_WAND: 'ENTRY_TYPE.QUEST.MADE_WAND',
    MAKE_MCCLUSKY_FILE: 'ENTRY_TYPE.QUEST.MAKE_MCCLUSKY_FILE',
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
  GUILD: {
    LEARN_SKILL: 'ENTRY_TYPE.GUILD.LEARN_SKILL',
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
    UNKNOWN_ACQUIRED_ITEM: 'ENTRY_TYPE.ITEMS.UNKNOWN_ACQUIRED_ITEM',
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
    SMITH: 'ENTRY_TYPE.ITEMS.SMITH',
    TRADE: 'ENTRY_TYPE.ITEMS.TRADE',

    ZAP: 'ENTRY_TYPE.ITEMS.ZAP',
  },
  EFFECTS: {
    SPELL_CAST: 'ENTRY_TYPE.EFFECTS.SPELL_CAST',
  },
  GENERIC_USE: 'ENTRY_TYPE.GENERIC_USE',

  FAMILIAR: 'ENTRY_TYPE.FAMILIAR',

  RESET: 'ENTRY_TYPE.RESET',

  PVP: 'ENTRY_TYPE.PVP',
}

export default ENTRY_TYPE;

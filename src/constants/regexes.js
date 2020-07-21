// const ADVENTURE_LINE_REGEX = /\[\d*\].*\s*/;
// const ENCOUNTER_LINE_REGEX = /Encounter:.*\s*/;

// const FAMILIAR_GAIN_WEIGHT_LINE_REGEX = /.*(gains a pound).*\s*/;
// const ACQUIRE_ITEM_LINE_REGEX = /\w*.*acquire an item.*\s*/g;
// const COMBAT_NOT_COST_ADV_REGEX = /.*did not cost.*\s*/;
// const COMBAT_INIT_LINE_REGEX = /Round.*(loses initiative|wins initiative).*\s*/;
// const COMBAT_VICTORY_LINE_REGEX = /(?<=\s).*wins the fight.*\s*/;

// const MAFIA_MAXIMIZER_CLI_REGEX = /.*Maximizer.*\s*/g;
// const MAFIA_ACTION_URL_REGEX = /.*.php.*\s*/g;

export const LOG_SPLIT_REGEX = /\r?\n\r?\n/; // because return carriage is windows specifc
export const REGEX = {
  LINE: {
    LOCATION: /\[\d*\].*\s*/,
    ENCOUNTER: /Encounter:.*\s*/,

    COMBAT_FREE_TURN: /.*combat.*did not cost.*\s*/,
    COMBAT_INIT: /Round.*(loses initiative|wins initiative).*\s*/,
    COMBAT_WIN_INIT: /Round.*(wins initiative).*\s*/,
    COMBAT_LOSE_INIT: /Round.*(loses initiative).*\s*/,
    COMBAT_VICTORY: /(?<=\s).*wins the fight.*\s*/,
    COMBAT_SKILL_USE_THE_FORCE: /.*(USE THE FORCE).*/,

    FAMILIAR_WEIGHT_GAIN: /.*(gains a pound).*\s*/,
    ACQUIRED_ITEMS: /.*acquire.*\s*/gm,

    MAFIA_MAXIMIZER_CLI: /.*Maximizer.*\s*/g,
    MAFIA_ACTION_URL: /.*.php.*\s*/g,
  },

  VALUE: {
    ASCENSION_NUMBER: /(?<=Ascension #)\d+/,
    BUY_ITEM_AMOUNT: /(?<=buy\s)\d+/,
    BUY_ITEM_COST: /(?<=for\s)\d+(?=\seach)/,

    TURN_NUM: /(?!\[)\d*(?=\])/, // look for `[1]`, ignore url hashes with `[]blah[]`
    LOCATION_NAME: /(?<=\]\s).*(?=\r?\n)*/,
    SHOP_LOCATION_NAME: /(?<=each from\s).*\r?\n/,
    ENCOUNTER_NAME: /(?<=Encounter:\s).*/,
    NONCOMBAT_NAME: /(?<=\[\d+\]\s)(.*)(?!Encounter:)/,

    FOUND_AN_ITEM: /(?<=(You acquire an item:\s+)).*/g,
    FOUND_MULTIPLE_ITEMS: /(?<=(You acquire\s+))(.*\(\d*\))/g,

    CONSUMPTION_AMOUNT: /(?<=^(eat|drink|chew)\s)\d+(?=\s)/i,
    CONSUMPTION_TARGET: /(?<=^(eat|drink|chew)\s\d+\s).*/i,
    EAT_AMOUNT: /(?<=^eat\s)\d+(?=\s)/i,
    EAT_TARGET: /(?<=^eat\s\d+\s).*/i,
    DRINK_AMOUNT: /(?<=^drink\s)\d+(?=\s)/i,
    DRINK_TARGET: /(?<=^drink\s\d+\s).*/i,
    CHEW_AMOUNT: /(?<=^chew\s)\d+(?=\s)/i,
    CHEW_TARGET: /(?<=^chew\s\d+\s).*/i,
  },

  SUBSTRING: {
    ASCENSION_INFO: /^(Ascension)/m,
  },

  MISC: {
    LOG_SPLIT: LOG_SPLIT_REGEX,
    LOG_CRUFT: /\n> .+?(?=\n)/,
    LOG_BORDER: /=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=/,
  },
};

export default REGEX;
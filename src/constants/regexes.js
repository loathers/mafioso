// const ADVENTURE_LINE_REGEX = /\[\d*\].*\s*/;
// const ENCOUNTER_LINE_REGEX = /Encounter:.*\s*/;

// const FAMILIAR_GAIN_WEIGHT_LINE_REGEX = /.*(gains a pound).*\s*/;
// const ACQUIRE_ITEM_LINE_REGEX = /\w*.*acquire an item.*\s*/g;
// const COMBAT_NOT_COST_ADV_REGEX = /.*did not cost.*\s*/;
// const COMBAT_INIT_LINE_REGEX = /Round.*(loses initiative|wins initiative).*\s*/;
// const COMBAT_VICTORY_LINE_REGEX = /(?<=\s).*wins the fight.*\s*/;

// const MAFIA_MAXIMIZER_CLI_REGEX = /.*Maximizer.*\s*/g;
// const MAFIA_ACTION_URL_REGEX = /.*.php.*\s*/g;

export const REGEX = {
  LINE: {
    ADVENTURE_NAME: /\[\d*\].*\s*/,
    ENCOUNTER_NAME: /Encounter:.*\s*/,

    COMBAT_FREE_TURN: /.*combat.*did not cost.*\s*/,
    COMBAT_INIT: /Round.*(loses initiative|wins initiative).*\s*/,
    COMBAT_VICTORY: /(?<=\s).*wins the fight.*\s*/,

    FAMILIAR_WEIGHT_GAIN: /.*(gains a pound).*\s*/,
    ACQUIRE_ITEM: /.*acquire.*\s*/g,

    MAFIA_MAXIMIZER_CLI: /.*Maximizer.*\s*/g,
    MAFIA_ACTION_URL: /.*.php.*\s*/g,
  },
  SUBSTRING: {

  }
};

export default REGEX;
export const NEW_LINE_REGEX = /(\r\n|\n)/g;
export const EMPTY_LINES_REGEX = /(\r\n|\n){2,}/g;
export const REGEX = {
  DIABOLIC_PIZZA: {
    INGREDIENTS_LINE: /^pizza.*/m,
    INGREDIENTS_ONLY: /(?<=^pizza\s).*/m,
    EAT_LINE: /^eat\s\d+\sdiabolic pizza/m,
  },
  BEACH_COMB: {
    COMBING_LINE: /.*Combing.*/i,
    COMBING_ACTION: /Combing.*/i,
  },

  LINE: {
    LOCATION: /\[\d*\].*/,
    ENCOUNTER: /Encounter:.*/,

    COMBAT_FREE_TURN: /.*combat.*did not cost.*/i,
    COMBAT_INIT: /Round.*(loses initiative|wins initiative).*/i,
    COMBAT_WIN_INIT: /Round.*(wins initiative).*/i,
    COMBAT_LOSE_INIT: /Round.*(loses initiative).*/i,
    COMBAT_ACTION_ROUND: /^(?!.*(executes a macro|\slose\s|\sgain\s|initiative|\swins\s))round.*!/gmi,
    COMBAT_ROUND: /^round\s\d:.*/gmi,
    COMBAT_VICTORY: /(?<=\s).*wins the fight.*/i,
    COMBAT_SKILL_USE_THE_FORCE: /.*(USE THE FORCE).*/i,

    MEAT_GAIN: /.*gain.*meat.*/i,
    FAMILIAR_WEIGHT_GAIN: /.*(gains a pound).*/i,
    ACQUIRED_SOMETHING: /.*acquire.*/gi,

    HP_CHANGE: /.*(gain|lose).*\d*hit point.*/gi,
    MP_CHANGE: /.*(gain|lose).*\d*(muscularity|mana|mojo) point.*/gi,

    LEVEL_GAIN: /^You gain a level.*\s+/mi,
    SUBSTAT_GAINS: /.*gain.*\d*(muscle|mysticality|moxie).*point.*/gi,

    MUS_EXP_CHANGE: /.*gain.*\d*(Beefiness|Fortitude|Muscleboundness|Strengthliness|Strongness).*/gi,
    MUS_GAINS: /.*you gain.*\d*muscle.*point.*/gi,
    MYST_EXP_CHANGE: /.*gain.*\d*(Enchantedness|Magicalness|Mysteriousness|Wizardliness).*/gi,
    MYST_GAINS: /.*you gain.*\d*mysticality.*point.*/gi,
    MOX_EXP_CHANGE: /.*gain.*\d*(Cheek|Chutzpah|Roguishness|Sarcasm|Smarm).*/gi,    
    MOX_GAINS: /.*you gain.*\d*moxie.*point.*/gi,
  },

  VALUE: {
    ASCENSION_NUMBER: /(?<=Ascension #)\d+/,

    BUY_ITEM_AMOUNT: /(?<=buy\s)\d+/gi,
    BUY_ITEM_COST: /(?<=for\s)\d+(?=\seach)/gi,
    MEAT_GAIN_AMOUNT: /(?<=You gain )\d*(?=\s+meat)/gi,

    COMBAT_ROUND: /(?<=Round\s)\d+(?=:)/gmi,
    COMBAT_ATTACKS: /(?<=^Round.*\s)attacks(?=!)/gi,
    COMBAT_SKILL_NAMES: /(?<=^Round.*casts\s).*(?=!)/gmi,

    TURN_NUM: /(?!\[)\d*(?=\])/, // look for `[1]`, ignore url hashes with `[]blah[]`
    LOCATION_NAME: /(?<=\]\s).*/,
    SHOP_LOCATION_NAME: /(?<=each from\s).*/,
    ENCOUNTER_NAME: /(?<=Encounter:\s).*/,
    NONCOMBAT_NAME: /(?<=\[\d+\]\s)(.*)(?!Encounter:)/,

    FOUND_AN_ITEM: /(?<=(You acquire an item:\s+)).*/gi,
    FOUND_MULTIPLE_ITEMS: /(?!.*effect:.*)(?<=(You acquire\s+))(.*\(\d*\))/gi,
    ACQUIRED_EFFECTS: /(?<=^You acquire an effect:\s).*/gmi,

    CONSUMPTION_AMOUNT: /(?<=^(eat|drink|chew)\s)\d+(?=\s)/gi,
    CONSUMPTION_TARGET: /(?<=^(eat|drink|chew)\s\d+\s).*/gi,
    EAT_AMOUNT: /(?<=^eat\s)\d+(?=\s)/gi,
    EAT_TARGET: /(?<=^eat\s\d+\s).*/gi,
    DRINK_AMOUNT: /(?<=^drink\s)\d+(?=\s)/gi,
    DRINK_TARGET: /(?<=^drink\s\d+\s).*/gi,
    CHEW_AMOUNT: /(?<=^chew\s)\d+(?=\s)/gi,
    CHEW_TARGET: /(?<=^chew\s\d+\s).*/gi,

    HP_GAINS: /(?<=gain\s)\d+(?=\shit point)/gi,
    HP_LOSSES: /(?<=lose\s)\d+(?=\shit point)/gi,
    MP_GAINS: /(?<=gain\s)\d+(?=\s(muscularity|mana|mojo) point)/gi,
    MP_LOSSES: /(?<=lose\s)\d+(?=\s(muscularity|mana|mojo) point)/gi,

    MUS_EXP_GAINS: /(?<=gain\s)\d+(?=\s(Beefiness|Fortitude|Muscleboundness|Strengthliness|Strongness))/gi,
    MUS_EXP_LOSSES: /(?<=lose\s)\d+(?=\s(Beefiness|Fortitude|Muscleboundness|Strengthliness|Strongness))/gi,

    MYST_EXP_GAINS: /(?<=gain\s)\d+(?=\s(Enchantedness|Magicalness|Mysteriousness|Wizardliness))/gi,
    MYST_EXP_LOSSES: /(?<=lose\s)\d+(?=\s(Enchantedness|Magicalness|Mysteriousness|Wizardliness))/gi,

    MOX_EXP_GAINS: /(?<=gain\s)\d+(?=\s(Cheek|Chutzpah|Roguishness|Sarcasm|Smarm))/gi,
    MOX_EXP_LOSSES: /(?<=lose\s)\d+(?=\s(Cheek|Chutzpah|Roguishness|Sarcasm|Smarm))/gi,
  },

  GROUP: {
    ASCENSION_SNAPSHOT: /^(Ascension)/m,
    MOON_SNAPSHOT: /(> moon).*?(?=\s\s> status)/gmis,
    STATUS_SNAPSHOT: /(> status).*?(?=\s\s> equipment)/gmis,
    EQUIPMENT_SNAPSHOT: /(> equipment).*?(?=\s\s> skills)/gmis,
    SKILLS_SNAPSHOT: /(> skills).*?(?=\s\s> effects)/gmis,
    EFFECTS_SNAPSHOT: /(> effects).*?(?=\s\s> modifiers)/gmis,
    MODIFIERS_SNAPSHOT: /(> modifiers).*?(?=\s(=-=))/gmis,
  },

  MISC: {
    STACK_TRACE: /^(stack trace).*(\s*.*at.*\s*)+/gmi,
    COMBAT_MACRO: /.*executes a macro.*/gi,
    MAFIA_MAXIMIZER: /Maximizer:.*/gi,
    MAFIA_CHOICE_URL: /.*.php.*/g,
    EMPTY_CHECKPOINT: /Created an empty checkpoint.*/gi,

    LOG_BORDER: /=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=/,
  },
};

export default REGEX;
import ENTRY_TYPE from 'constants/ENTRY_TYPE';
import REGEX, {
  BACK_NEW_LINE_REGEX, 
  PRE_LINE_EMPTY_SPACE,
  POST_LINE_EMPTY_SPACE,
} from 'constants/REGEXES';

export const CLEAN_RAW_DELAY = 50;
export const FULL_PARSE_DELAY = 50;

export const DISPLAY_SCRUB_DELAY = 5;
export const FILTER_DELAY = 3;

// -- log level
// strings we are going to remove from the ahead of time
export const PREREMOVE_REGEX_LIST = [
  // always first
  REGEX.MISC.STACK_TRACE,
  REGEX.MISC.CLI_PRINT,
  REGEX.MISC.SEND_A_KMAIL,
  REGEX.MISC.EMPTY_CHECKPOINT,
  REGEX.MISC.COMBAT_MACRO,
  REGEX.MISC.MAFIA_MAXIMIZER,
  REGEX.MISC.LOG_BORDER,
  REGEX.MISC.CUSTOM_OUTFIT_LINE,
  REGEX.MISC.USELESS_BREAKFAST_LINE,
  REGEX.MISC.USELESS_LEAFLET_LINE,
  REGEX.MISC.MALL_LINE,
  REGEX.MISC.PVP_LINE,
  REGEX.MISC.USELESS_PHP_LINE,
  // --
  REGEX.LINE.USELESS_VISIT,
  REGEX.LINE.USELESS_USE,
  REGEX.EFFECTS.USELESS_CAST_LINE,
  REGEX.EFFECTS.USELESS_REUP_LINE,
  REGEX.BEACH_COMB.USELESS_VISIT,
  REGEX.BOXING_DAYCARE.VISIT,
  // REGEX.CAT_BURGLAR.NEVERMIND_HEIST_GROUP,
  REGEX.CAT_BURGLAR.USELESS_HEIST_GROUP,
  REGEX.DECK_OF_EVERY_CARD.USELESS_USE,
  REGEX.GOD_LOBSTER.USELESS_VISIT,
  REGEX.HEWN_MOON_RUNE_SPOON.USELESS_USE,
  REGEX.LATTE_LOVERS_MEMBERS_MUG.USELESS_USE,
  REGEX.PILL_KEEPER.NEVERMIND_LINE,
  REGEX.PILL_KEEPER.USELESS_USE,
  REGEX.LINE.MCD_CHANGE,
  REGEX.LINE.UNEQUIP,
  REGEX.LINE.TELESCOPE,
  REGEX.LINE.SWIMMING_POOL,
  REGEX.EFFECTS.UNAFFECT_LINE,
  // always last
  PRE_LINE_EMPTY_SPACE,
  POST_LINE_EMPTY_SPACE,
];
// strings we are going to group together
export const PREGROUP_REGEX_LIST = [
  REGEX.ASCENSION.VALHALLA_GROUP,
  REGEX.GROUP.MOON_SNAPSHOT,
  REGEX.GROUP.STATUS_SNAPSHOT,
  REGEX.GROUP.EQUIPMENT_SNAPSHOT,
  REGEX.GROUP.SKILLS_SNAPSHOT,
  REGEX.GROUP.EFFECTS_SNAPSHOT,
  REGEX.GROUP.MODIFIERS_SNAPSHOT,
  // REGEX.GROUP.SAME_AFTER_BATTLE,
  REGEX.SONGBOOM_BOOMBOX.GROUPING,
  // REGEX.VOTING_BOOTH.GROUPING,
  // REGEX.GOD_LOBSTER.GROUPING,
];
// -- individual entry level
// text we will remove from the display text,
//  most likely because we already parsed the data
export const DISPLAY_SCRUB_LIST = [
  REGEX.DECK_OF_EVERY_CARD.USELESS_PLAY,
  REGEX.DISTANCE_WOODS_GETAWAY.USELESS_GAZING_LINE,
  REGEX.LINE.LOCATION,
  REGEX.LINE.ENCOUNTER,
  REGEX.LINE.DIET_GAIN_LINE,
  REGEX.CHARACTER.LEVEL_GAIN,
  REGEX.CHARACTER.SUBSTAT_GAINS,
  REGEX.CHARACTER.ADV_CHANGE_LINE,
  REGEX.CHARACTER.HP_CHANGE,
  REGEX.CHARACTER.MP_CHANGE,
  REGEX.CHARACTER.MUS_EXP_CHANGE,
  REGEX.CHARACTER.MYST_EXP_CHANGE,
  REGEX.CHARACTER.MOX_EXP_CHANGE,
  REGEX.COMBAT.FREE_COMBAT,
  REGEX.COMBAT.INITIATIVE_LINE,
  REGEX.COMBAT.COMBAT_ROUND_LINE,
  REGEX.COMBAT.REPLACED_LINE,
  REGEX.COMBAT.VICTORY_LINE,
  REGEX.LINE.VISITING,
  REGEX.TRANSACTIONS.ACQUIRED_SOMETHING,
  REGEX.TRANSACTIONS.MEAT_CHANGED_LINE,
  REGEX.TRANSACTIONS.MEAT_SPENT,
  REGEX.TRANSACTIONS.SHOPPING,
  // REGEX.ITEMS.MAKE_SOMETHING_LINE,
  REGEX.ITEMS.CONSUMPTION_LINE,
  REGEX.ITEMS.HAGNK_PULL_LINE,
  REGEX.EFFECTS.CAST_LINE,
  REGEX.DIABOLIC_PIZZA.INGREDIENTS_LINE,
  REGEX.DIABOLIC_PIZZA.EAT_LINE,
  REGEX.DISTANCE_WOODS_GETAWAY.GAZING_LINE,
  REGEX.FOURTH_OF_MAY_COSPLAY_SABER.USE_THE_FORCE_CHOICE_LINE,
  REGEX.MISC.MAFIA_CHOICE_URL,
  BACK_NEW_LINE_REGEX,
  PRE_LINE_EMPTY_SPACE,
  POST_LINE_EMPTY_SPACE,
];
// entries that don't need to have any body text
export const BLANK_BODY_CONTENT_LIST = [
  ENTRY_TYPE.IOTM.CAT_BURGLAR,
  ENTRY_TYPE.IOTM.PILLKEEPER,
  ENTRY_TYPE.IOTM.SONGBOOM_BOOMBOX,
  ENTRY_TYPE.IOTM.VOTING_BOOTH,
];
// entries that don't need to have any body text
export const COMBINABLE_ENTRIES_LIST = [
  ENTRY_TYPE.IOTM.BASTILLE_BATTALION,
  ENTRY_TYPE.IOTM.BEACH_COMB,
  ENTRY_TYPE.IOTM.CAT_BURGLAR,
  ENTRY_TYPE.IOTM.DISTANT_WOODS_GETAWAY,
  ENTRY_TYPE.TALKING,
  ENTRY_TYPE.ITEMS.HAGNK_PULL,
  ENTRY_TYPE.ITEMS.EQUIP,
  ENTRY_TYPE.TRANSACTION,
];
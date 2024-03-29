import ENTRY_TYPE from "./ENTRY_TYPE";
import REGEX, {
  USELESS_PRE_NEWLINE,
  PRELINE_SPACES,
  EXCESSIVE_NEW_LINES,
} from "./REGEXES";

export const LARGE_TEXT_COUNT = 2000000;
export const CLEAN_RAW_DELAY = 2;
export const FULL_PARSE_DELAY = 5;

export const DISPLAY_SCRUB_DELAY = 5;
export const FILTER_DELAY = 5;
export const PAGINATE_DELAY = 80;

// -- log level
// strings we are going to remove completely before any parsing
export const PREREMOVE_REGEX_LIST = [
  // -- always first
  REGEX.KOLMAFIA.STACK_TRACE,
  REGEX.KOLMAFIA.CLI_PRINT,
  REGEX.KOLMAFIA.SEND_A_KMAIL,
  REGEX.KOLMAFIA.EMPTY_CHECKPOINT,
  REGEX.KOLMAFIA.COMBAT_MACRO,
  REGEX.KOLMAFIA.MAXIMIZER,
  REGEX.PREREMOVE.UNKNOWN_ITEM_GROUPING,
  REGEX.PREREMOVE.UNKNOWN_USE_LINE,
  REGEX.PREREMOVE.SINGLELINE_ADVENTURE,
  REGEX.PREREMOVE.ALWAYS_CATCHALL,
  REGEX.PREREMOVE.SINGLELINE_CATCHALL,
  REGEX.PREREMOVE.NO_FOLLOWUP_CATCHALL,
  REGEX.PREREMOVE.USELESS_LEAFLET_LINE,
  REGEX.PREREMOVE.RAFFLE_TEXT,
  REGEX.PREREMOVE.MCD_CHANGE,
  REGEX.PREREMOVE.UNEQUIP,
  REGEX.PREREMOVE.TELESCOPE,
  REGEX.PREREMOVE.FAMILIAR_WEIGHT_GAIN,
  REGEX.PREREMOVE.LOSE_EFFECT_LINE,
  REGEX.PREREMOVE.UNKNOWN_SERVICE_LINE,
  REGEX.PREREMOVE.PVP_REMOVE,
  // -- remove because unsupported
  REGEX.ASDON_MARTIN.CONVERTING_LINE,
  REGEX.CONSPIRACY_ISLAND.TEXT,
  REGEX.CONSPIRACY_ISLAND.CONTROL_PANEL_LINE,
  REGEX.KREMLINS_GREATEST_BRIEFCASE.FIDDLING,
  REGEX.SNOJO.VISIT_CONTROL_LINE,
  // -- remove generally
  REGEX.LINE.MIND_CONTROL_DEVICE_LINE,
  REGEX.ITEMS.CRAFTING_USED_LINE,
  REGEX.ITEMS.USELESS_COMBINE,
  REGEX.EFFECTS.UNMATCHED_EFFECT,
  REGEX.BEACH_COMB.COMB_SQUARE_LINE,
  REGEX.CAT_BURGLAR.USELESS_HEIST_GROUP,
  REGEX.CAT_BURGLAR.NEVERMIND_LINE,
  REGEX.LATTE_LOVERS_MEMBERS_MUG.DO_NOTHING_CHOICE,
  REGEX.NEVERENDING_PARTY.INTRO_CHOICE_GROUP,
  REGEX.PILL_KEEPER.NEVERMIND_LINE,
  REGEX.QUEST.USELESS_DESERT_PYRAMID,
  REGEX.YOU_ROBOT.PREREMOVE_REASSMBLE,
  // -- run again
  REGEX.PREREMOVE.SINGLELINE_CATCHALL,
  REGEX.PREREMOVE.NO_FOLLOWUP_CATCHALL,
  // -- always last clean up
  PRELINE_SPACES,
  EXCESSIVE_NEW_LINES,
];
// strings we are going to group together
export const PREGROUP_REGEX_LIST = [
  REGEX.ASCENSION.VALHALLA_GROUP,
  // REGEX.SNAPSHOT.BEGIN_ASCENSION_SNAPSHOT,
  // REGEX.SNAPSHOT.PLAYER_SNAPSHOT,
  REGEX.GROUP.MCLUSKY_FILE_AND_USE_BINDER,
  // REGEX.GROUP.SAME_AFTER_BATTLE,
  REGEX.QUEST.STAFF_AND_DESERT_GROUP,
  // REGEX.GOD_LOBSTER.GROUPING,
  REGEX.IUNION_CROWN.AFTER_BATTLE_LINEBREAK_GROUP,
  REGEX.SONGBOOM_BOOMBOX.GROUPING,
  REGEX.SPINMASTER_LATHE.LATHE_MAKE_GROUPING,
  REGEX.SWEET_SYNTHESIS.CAST_PREGROUP,
  // REGEX.VOTING_BOOTH.GROUPING,
  REGEX.QUEST.TOWER_DOOR_TEXT,
  REGEX.COMMUNITY_SERVICE.FINAL_SERVICE_CHOICE,
];
// strings we want to split apart (so they can be separate entries)
export const SPLIT_REGEX_LIST = [
  REGEX.COMMUNITY_SERVICE.SPLITTABLE_CHOICE_LINES,
  REGEX.PRESPLIT.UNRELATED_AFTER_COMBAT,
  REGEX.PRESPLIT.UNRELATED_AFTER_FREECOMBAT,
  REGEX.PRESPLIT.POST_NEW_ASCENSION_ENCOUNTER,
  REGEX.YOU_ROBOT.PRESPLIT_STATBOT,
  REGEX.YOU_ROBOT.PRESPLIT_REASSMBLE_AFTER,
  REGEX.YOU_ROBOT.PRESPLIT_REASSMBLE,
  // REGEX.UNWRAPPED_SUPERHERO_CAPE.PRESPLIT_CHANGE_FIDDLING,
];
// -- individual entry level
// text we will remove from the display text,
//  most likely because we already parsed the data
export const DISPLAY_SCRUB_LIST = [
  REGEX.MAFIOSO.LOG_COMMENTS,
  REGEX.LINE.GENERIC_TOOK_CHOICE,
  REGEX.LINE.LOCATION,
  REGEX.LINE.ENCOUNTER,
  REGEX.LINE.DIET_GAIN_LINE,
  REGEX.LINE.VISITING,
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
  REGEX.TRANSACTIONS.ACQUIRED_SOMETHING,
  REGEX.TRANSACTIONS.MEAT_CHANGED_LINE,
  REGEX.TRANSACTIONS.MEAT_SPENT,
  REGEX.TRANSACTIONS.SHOPPING,
  REGEX.ITEMS.CONSUMPTION_LINE,
  REGEX.ITEMS.HAGNK_PULL_LINE,
  REGEX.ITEMS.USE_ITEM_LINE_FIRST_ONLY,
  REGEX.ITEMS.ZAP_LINE,
  REGEX.ITEMS.USE_CHEWING_GUM_LINE,
  REGEX.EFFECTS.CAST_LINE,
  REGEX.CARGO_CULTIST_SHORTS.INSPECTING_POCKETS_LINE,
  REGEX.CARGO_CULTIST_SHORTS.PICK_POCKET_LINE,
  REGEX.DECK_OF_EVERY_CARD.USELESS_PLAY,
  REGEX.DISTANCE_WOODS_GETAWAY.USELESS_GAZING_LINE,
  REGEX.COMMUNITY_SERVICE.CHOICE_LINE,
  REGEX.KOLMAFIA.CHOICE_PHP_LINE,
  REGEX.DIABOLIC_PIZZA.INGREDIENTS_LINE,
  REGEX.DIABOLIC_PIZZA.EAT_LINE,
  REGEX.DISTANCE_WOODS_GETAWAY.GAZING_LINE,
  REGEX.FOURTH_OF_MAY_COSPLAY_SABER.USE_THE_FORCE_CHOICE_LINE,
  REGEX.POCKET_PROFESSOR.AFTER_COMBAT_TEXT,
  REGEX.POTTED_TEA_TREE.ACTION_LINE,
  REGEX.QUEST.VISIT_TOOT,
  REGEX.QUEST.COMBINE_WAND_GROUP,
  REGEX.QUEST.OPEN_DESERT_PYRAMID,
  // cleans up blank lines after text is scrubbed
  USELESS_PRE_NEWLINE,
];
// entries that don't need to have any body text
export const COMBINABLE_ENTRIES_LIST = [
  ENTRY_TYPE.TALKING,
  ENTRY_TYPE.TRANSACTION,
  ENTRY_TYPE.IOTM.BASTILLE_BATTALION,
  ENTRY_TYPE.IOTM.BEACH_COMB.BEACH_HEAD,
  ENTRY_TYPE.IOTM.BEACH_COMB.WANDERING,
  ENTRY_TYPE.IOTM.CAT_BURGLAR,
  ENTRY_TYPE.IOTM.DETECTIVE_SCHOOL.INVESTIGATE,
  ENTRY_TYPE.IOTM.DISTANT_WOODS_GETAWAY.GAZE,
  ENTRY_TYPE.IOTM.JANUARYS_GARBAGE_TOTE,
  ENTRY_TYPE.IOTM.POTTED_POWER_PLANT.GET_BATTERY,
  ENTRY_TYPE.QUEST.TOOT_ORIOLE,
  ENTRY_TYPE.QUEST.LADY_SPOOKYRAVEN,
  ENTRY_TYPE.QUEST.LEAFLET,
  ENTRY_TYPE.QUEST.TOWER_DOOR,
  ENTRY_TYPE.ITEMS.UNKNOWN_ACQUIRED_ITEM,
  ENTRY_TYPE.ITEMS.HAGNK_PULL,
  ENTRY_TYPE.ITEMS.EQUIP_PLAYER,
];

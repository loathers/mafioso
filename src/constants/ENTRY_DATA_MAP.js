import {
  FRIARS_QUEST_ENCOUNTERS,
  LOW_KEY_SUMMER_ENCOUNTERS,
  SPOOKYRAVEN_MANOR_QUEST_ENCOUNTERS,
  KNOB_GOBLIN_KING_ENCOUNTERS,
  BOSS_BAT_ENCOUNTERS,
  CRYPT_BOSS_ENCOUNTERS,
  MIST_SHROUDED_PEAK_BOSS_ENCOUNTERS,
  HIGHLAND_LORD_ENCOUNTERS,
  MISC_QUEST_ENCOUNTERS,
} from 'constants/ENCOUNTERS';
import ENTRY_TYPE from 'constants/ENTRY_TYPE';
import {CATEGORY_ID} from 'constants/CATEGORIES';
import {REGEX} from 'constants/REGEXES';

import {ReactComponent as AscendSVG} from 'images/holy-grail.svg';
import {ReactComponent as CraftSVG} from 'images/anvil.svg';
import {ReactComponent as CombatSVG} from 'images/crossed-swords.svg';
import {ReactComponent as DrinkSVG} from 'images/martini.svg';
import {ReactComponent as EatSVG} from 'images/meal.svg';
import {ReactComponent as EquipmentSVG} from 'images/battle-gear.svg';
import {ReactComponent as FamiliarSVG} from 'images/cat.svg';
import {ReactComponent as InfoSVG} from 'images/info.svg';
import {ReactComponent as ItemBagSVG} from 'images/swap-bag.svg';
import {ReactComponent as LevelUpSVG} from 'images/star-formation.svg';
import {ReactComponent as MafiosoSVG} from 'images/gun-rose.svg';
import {ReactComponent as NoncombatSVG} from 'images/dig-dug.svg';
import {ReactComponent as PathSVG} from 'images/flag-objective.svg';
import {ReactComponent as OptionsSVG} from 'images/freemasonry.svg';
import {ReactComponent as ShopSVG} from 'images/shop.svg';
import {ReactComponent as SpellsSVG} from 'images/spell-book.svg';
import {ReactComponent as SpleenSVG} from 'images/pill.svg';
import {ReactComponent as UnknownSVG} from 'images/uncertainty.svg';

/*
  [ENTRY_TYPE.template]: {
    categories: [CATEGORY_ID.],
    matcher: REGEX.,
    icon: UnknownSVG,
    showAdditionalDisplay: true,
    locationName_alt: null,
    encounterName_alt: null,
    content_alt: null,
  },
 */

/**
 * @typedef {String|RegExp|Array<String|RegExp>|null} Matcher
 *
 * @typedef {Object} EntryData
 * @property {EntryType} EntryData.type                         - this is the key, will be built by parser
 * @property {Array<Category>} EntryData.categories             - visible entry categories
 * @property {RegExp|Array<String|RegExp>} EntryData.matcher    - what to use to determine if text is this type
 * @property {ReactComponent} EntryData.icon                    - icon
 * @property {Matcher} [EntryData.locationName_alt]      - alternative text or regex to find, null shows nothing
 * @property {Matcher} [EntryData.encounterName_alt]     - same, but for encounterName
 * @property {Matcher} [EntryData.content_alt]           - same, but for the body
 */
export const ENTRY_DATA_MAP = {
  // -- mafioso
  [ENTRY_TYPE.MAFIOSO.GENERATED_BLOCK]: {
    categories: [CATEGORY_ID.MAFIOSO],
    matcher: REGEX.MAFIOSO.GENERATED_BLOCK,
    icon: MafiosoSVG,
    locationName_alt: 'Mafioso Data',
  },
  // -- ascension relevant
  [ENTRY_TYPE.SNAPSHOT.VALHALLA]: {
    categories: [CATEGORY_ID.ASCENSION_INFO],
    matcher: REGEX.ASCENSION.VALHALLA_TEXT,
    icon: AscendSVG,
    locationName_alt: 'Valhalla',
    encounterName_alt: 'Welcome to Valhalla!',
    content_alt: ['☪ The {1}', REGEX.ASCENSION.MOON_SIGN_NAME],
  },
  [ENTRY_TYPE.SNAPSHOT.DAY_INFO]: {
    categories: [CATEGORY_ID.SNAPSHOT_INFO],
    matcher: REGEX.SNAPSHOT.KOL_DATE,
    icon: InfoSVG,
  },
  [ENTRY_TYPE.SNAPSHOT.CHARACTER_INFO]: {
    categories: [CATEGORY_ID.SNAPSHOT_INFO],
    matcher: /player snapshot/i,
    icon: InfoSVG,
  },
  [ENTRY_TYPE.SNAPSHOT.SKILL_BREAKDOWN]: {
    categories: [CATEGORY_ID.SNAPSHOT_INFO],
    matcher: REGEX.SNAPSHOT.CONTAIN_SKILLS,
    icon: InfoSVG,
  },
  // -- iotm
  [ENTRY_TYPE.IOTM.BASTILLE_BATTALION]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.OPTIONS],
    matcher: REGEX.BASTILLE_BATTALION.TEXT,
    icon: OptionsSVG,
    showAdditionalDisplay: false,
    locationName_alt: 'Bastille Battalion control rig',
    content_alt: null,
  },
  [ENTRY_TYPE.IOTM.BEACH_COMB.BEACH_HEAD]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.OPTIONS],
    matcher: REGEX.BEACH_COMB.COMBING_LINE,
    icon: OptionsSVG,
    locationName_alt: 'Beach Comb',
    encounterName_alt: REGEX.BEACH_COMB.COMBING_ACTION,
  },
  [ENTRY_TYPE.IOTM.BEACH_COMB.WANDERING]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.OPTIONS],
    matcher: REGEX.BEACH_COMB.COMB_THE_BEACH_LINE,
    icon: OptionsSVG,
    locationName_alt: 'Beach Comb',
    encounterName_alt: 'Comb the Beach',
    content_alt: null,
  },
  [ENTRY_TYPE.IOTM.BIRD_A_DAY.USE]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.USE_ITEM],
    matcher: REGEX.BIRD_A_DAY.USE_LINE,
    icon: SpellsSVG,
    locationName_alt: 'Bird-a-Day Calendar',
    encounterName_alt: 'Time to seek out a bird ♫',
    content_alt: null,
  },
  [ENTRY_TYPE.IOTM.BIRD_A_DAY.CAST]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.EFFECTS],
    matcher: REGEX.BIRD_A_DAY.CAST_LINE,
    icon: SpellsSVG,
    locationName_alt: 'Bird-a-Day Calendar',
    encounterName_alt: REGEX.BIRD_A_DAY.ANY_RESULT,
    content_alt: null,
  },
  [ENTRY_TYPE.IOTM.CAT_BURGLAR]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.FAMILIARS, CATEGORY_ID.OPTIONS],
    matcher: REGEX.CAT_BURGLAR.HEISTED,
    icon: FamiliarSVG,
    locationName_alt: 'Cat Burglar',
    encounterName_alt: 'A Heist!',
    content_alt: null,
  },
  [ENTRY_TYPE.IOTM.CHATEAU_MANTEGNA.DESK]: {
    categories: [CATEGORY_ID.OPTIONS, CATEGORY_ID.OTHER],
    matcher: REGEX.CHATEAU_MANTEGNA.CHECK_DESK_TEXT,
    icon: OptionsSVG,
    locationName: 'Chateau Mantegna',
    encounterName_alt: 'Desking',
  },
  [ENTRY_TYPE.IOTM.CHATEAU_MANTEGNA.REST]: {
    categories: [CATEGORY_ID.OPTIONS, CATEGORY_ID.OTHER],
    matcher: REGEX.CHATEAU_MANTEGNA.REST_TEXT,
    icon: OptionsSVG,
    locationName: 'Chateau Mantegna',
    encounterName_alt: 'Resting',
  },
  [ENTRY_TYPE.IOTM.CONSPIRACY_ISLAND]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.OPTIONS],
    matcher: REGEX.CONSPIRACY_ISLAND.TEXT,
    icon: InfoSVG,
    locationName_alt: 'Conspiracy Island',
  },
  [ENTRY_TYPE.IOTM.BOXING_DAYCARE]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.OPTIONS],
    matcher: REGEX.BOXING_DAYCARE.NONCOMBAT,
    icon: OptionsSVG,
  },
  [ENTRY_TYPE.IOTM.DECK_OF_EVERY_CARD]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.USE_ITEM, CATEGORY_ID.OPTIONS],
    matcher: REGEX.DECK_OF_EVERY_CARD.TEXT,
    icon: OptionsSVG,
  },
  [ENTRY_TYPE.IOTM.DETECTIVE_SCHOOL]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.OPTIONS],
    matcher: [REGEX.DETECTIVE_SCHOOL.VISITING_TEXT, REGEX.DETECTIVE_SCHOOL.INVESTIGATION_TEXT],
    icon: OptionsSVG,
    showAdditionalDisplay: false,
    locationName_alt: '11th Precinct Headquarters',
    encounterName_alt: 'Detective Stuff',
    content_alt: null,
  },
  [ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.MAKE]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.CRAFTING],
    matcher: REGEX.DIABOLIC_PIZZA.INGREDIENTS_LINE,
    icon: CraftSVG,
    locationName_alt: 'Your Workshed',
    encounterName_alt: 'Diabolic Pizza cube',
  },
  [ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.EAT]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.DIET],
    matcher: REGEX.DIABOLIC_PIZZA.EAT_LINE,
    icon: EatSVG,
    locationName_alt: 'Eat - 3 fullness',
    encounterName_alt: 'Diabolic Pizza',
  },
  [ENTRY_TYPE.IOTM.DISTANT_WOODS_GETAWAY]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.OPTIONS],
    matcher: REGEX.DISTANCE_WOODS_GETAWAY.GAZING_LINE,
    icon: OptionsSVG,
    locationName_alt: 'Your Campsite Away From Your Campsite',
    encounterName_alt: 'Gaze at the Stars',
  },
  [ENTRY_TYPE.IOTM.FOURTH_OF_MAY_COSPLAY_SABER.UPGRADE]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.USE_ITEM, CATEGORY_ID.OPTIONS],
    matcher: REGEX.FOURTH_OF_MAY_COSPLAY_SABER.UPGRADE_TEXT,
    icon: OptionsSVG,
    locationName_alt: 'May the Fourth Cosplay Saber',
    encounterName_alt: 'Upgrade Your May the Fourth Cosplay Saber',
    // content_alt: ['[ {1} ]', REGEX.FOURTH_OF_MAY_COSPLAY_SABER.UPGRADE_CHOICE],
  },
  [ENTRY_TYPE.IOTM.GOD_LOBSTER.COMBAT]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.COMBAT],
    matcher: REGEX.GOD_LOBSTER.COMBAT,
    icon: CombatSVG,
  },
  [ENTRY_TYPE.IOTM.GOD_LOBSTER.BOON]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.NONCOMBAT, CATEGORY_ID.OPTIONS],
    matcher: REGEX.GOD_LOBSTER.BOON,
    icon: NoncombatSVG,
  },
  [ENTRY_TYPE.IOTM.HEWN_MOON_RUNE_SPOON]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.USE_ITEM, CATEGORY_ID.OPTIONS],
    matcher: REGEX.HEWN_MOON_RUNE_SPOON.TUNE_MOON_LINE,
    icon: OptionsSVG,
    locationName_alt: 'Hewn Moon Rune Spoon Tune',
    encounterName_alt: ['☪ {1}', REGEX.HEWN_MOON_RUNE_SPOON.TUNE_MOON_RESULT],
    content_alt: null,
  },
  [ENTRY_TYPE.IOTM.LATTE_LOVERS_MEMBERS_MUG.REFILL]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.USE_ITEM, CATEGORY_ID.OPTIONS],
    matcher: REGEX.LATTE_LOVERS_MEMBERS_MUG.FILLED_MUG_LINE,
    icon: OptionsSVG,
    locationName_alt: 'Latte Lovers Member\'s Mug Refill',
    encounterName_alt: REGEX.LATTE_LOVERS_MEMBERS_MUG.FILLED_MUG_INGREDIENTS,
    content_alt: null,
  },
  [ENTRY_TYPE.IOTM.MADAME_ZATARA_FORTUNE_TELLER]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.EFFECTS, CATEGORY_ID.OPTIONS],
    matcher: REGEX.MADAME_ZATARA_FORTUNE_TELLER.CONSULTED_EFFECTED_NAME,
    icon: OptionsSVG,
    showAdditionalDisplay: false,
    locationName_alt: 'Madame Zatara\'s Relationship Fortune Teller',
    encounterName_alt: REGEX.MADAME_ZATARA_FORTUNE_TELLER.CONSULTED_EFFECTED_NAME,
  },
  [ENTRY_TYPE.IOTM.JANUARYS_GARBAGE_TOTE]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.OPTIONS],
    matcher: [REGEX.JANUARYS_GARBAGE_TOTE.USE_FOLDABLE, REGEX.JANUARYS_GARBAGE_TOTE.USE_RESULT],
    icon: EquipmentSVG,
    showAdditionalDisplay: false,
    locationName_alt: 'January\'s Garbage Tote',
    encounterName_alt: REGEX.JANUARYS_GARBAGE_TOTE.CHOICE_NAME,
    content_alt: null,
  },
  [ENTRY_TYPE.IOTM.KRAMCO_SAUSAGEOMATIC.COMBAT]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.COMBAT],
    matcher: REGEX.KRAMCO_SAUSAGEOMATIC.COMBAT,
    icon: CombatSVG,
  },
  [ENTRY_TYPE.IOTM.KRAMCO_SAUSAGEOMATIC.EAT_MAGICAL_SAUSAGE]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.DIET],
    matcher: REGEX.KRAMCO_SAUSAGEOMATIC.EAT_MAGICAL_SAUSAGE,
    icon: EatSVG,
    locationName_alt: 'Eat - 0 fullness',
    encounterName_alt: REGEX.ITEMS.EAT_TARGET,
  },
  [ENTRY_TYPE.IOTM.PILL_KEEPER]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.OPTIONS, CATEGORY_ID.DIET],
    matcher: REGEX.PILL_KEEPER.CHOICE_LINE,
    icon: SpleenSVG,
    locationName_alt: 'Eight Days a Week Pill Keeper',
    encounterName_alt: REGEX.PILL_KEEPER.CHOICE_RESULT,
    content_alt: null,
  },
  [ENTRY_TYPE.IOTM.PIRATEREALM]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.NONCOMBAT],
    matcher: REGEX.PIRATEREALM.LOCATION,
    icon: NoncombatSVG,
  },
  [ENTRY_TYPE.IOTM.POOL_TABLE]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.EFFECTS],
    matcher: REGEX.POOL_TABLE.PLAY_POOL_EFFECT,
    icon: OptionsSVG,
    locationName: 'A Pool Table (VIP Lounge)',
    encounterName_alt: ['{1}-like', REGEX.POOL_TABLE.PLAY_POOL_CHOICE],
    content_alt: null,
  },
  [ENTRY_TYPE.IOTM.SONGBOOM_BOOMBOX]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.USE_ITEM],
    matcher: REGEX.SONGBOOM_BOOMBOX.RESULT,
    icon: OptionsSVG,
    showAdditionalDisplay: false,
    locationName_alt: 'SongBoom™ BoomBox',
    encounterName_alt: ['♫ {1} ♫', REGEX.SONGBOOM_BOOMBOX.RESULT],
    content_alt: null,
  },
  [ENTRY_TYPE.IOTM.SNOJO]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.COMBAT],
    matcher: REGEX.SNOJO.SNOWMAN_COMBAT,
    icon: CombatSVG,
    locationName: 'The Snojo',
  },
  [ENTRY_TYPE.IOTM.VOTING_BOOTH]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.NONCOMBAT],
    matcher: REGEX.VOTING_BOOTH.DAILY_VOTE_TEXT,
    icon: OptionsSVG,
    locationName: 'Voting Booth',
    encounterName_alt: 'Daily Loathing Ballot',
  },
  [ENTRY_TYPE.IOTM.WITCHESS.COMBAT]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.COMBAT],
    matcher: REGEX.WITCHESS.COMBAT_ENCOUNTER_TARGET,
    icon: CombatSVG,
    showAdditionalDisplay: false,
    locationName: 'Your Witchess Set',
    encounterName_alt: REGEX.WITCHESS.COMBAT_ENCOUNTER_TARGET,
  },
  [ENTRY_TYPE.IOTM.WITCHESS.BUFF]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.EFFECTS],
    matcher: REGEX.WITCHESS.DAILY_CHALLENGE_BUFF,
    icon: SpellsSVG,
    showAdditionalDisplay: false,
    locationName: 'Your Witchess Set',
    encounterName_alt: 'Daily Challenge',
  },
  // --
  [ENTRY_TYPE.PATH.COMMUNITY_SERVICE_CHOICE]: {
    categories: [CATEGORY_ID.PATH, CATEGORY_ID.QUEST, CATEGORY_ID.NONCOMBAT],
    matcher: REGEX.COMMUNITY_SERVICE.CHOICE_LINE,
    icon: PathSVG,
    locationName_alt: 'Community Service',
    encounterName_alt: REGEX.COMMUNITY_SERVICE.CHOICE_RESULT,
  },
  [ENTRY_TYPE.PATH.LOW_KEY_SUMMER_NONCOMBAT]: {
    categories: [CATEGORY_ID.PATH, CATEGORY_ID.QUEST, CATEGORY_ID.NONCOMBAT],
    matcher: LOW_KEY_SUMMER_ENCOUNTERS,
    icon: PathSVG,
  },
  [ENTRY_TYPE.PATH.THE_SOURCE.SOURCE_AGENT_ENCOUNTER]: {
    categories: [CATEGORY_ID.PATH, CATEGORY_ID.COMBAT],
    matcher: REGEX.THE_SOURCE.SOURCE_AGENT_ENCOUNTER,
    icon: CombatSVG,
  },
  // --
  [ENTRY_TYPE.QUEST.TOOT_ORIOLE]: {
    categories: [CATEGORY_ID.QUEST],
    matcher: [REGEX.QUEST.VISIT_TOOT, REGEX.QUEST.OPEN_TOOT_LETTER],
    icon: PathSVG,
    locationName_alt: 'Toot Oriole',
    encounterName_alt: 'Letter from King Ralph',
  },
  [ENTRY_TYPE.QUEST.CRACKPOT_MYSTIC]: {
    categories: [CATEGORY_ID.QUEST],
    matcher: REGEX.QUEST.TALK_CRACKPOT_MYSTIC_LINE,
    icon: PathSVG,
    locationName_alt: 'Crackpot Mystic',
  },
  [ENTRY_TYPE.QUEST.DAILY_DUNGEON]: {
    categories: [CATEGORY_ID.QUEST, CATEGORY_ID.NONCOMBAT],
    matcher: REGEX.QUEST.DAILY_DUNGEON_LOCATION,
    icon: PathSVG,
  },
  [ENTRY_TYPE.QUEST.TAVERN_CELLAR]: {
    categories: [CATEGORY_ID.QUEST, CATEGORY_ID.NONCOMBAT],
    matcher: REGEX.QUEST.TAVERN_CELLAR_LOCATION,
    icon: PathSVG,
  },
  [ENTRY_TYPE.QUEST.LADY_SPOOKYRAVEN]: {
    categories: [CATEGORY_ID.QUEST],
    matcher: REGEX.QUEST.TALK_LADY_SPOOKYRAVEN_LINE,
    icon: PathSVG,
    locationName_alt: 'Lady Spookyraven',
  },
  [ENTRY_TYPE.QUEST.SPOOKYRAVEN_MANOR]: {
    categories: [CATEGORY_ID.QUEST],
    matcher: SPOOKYRAVEN_MANOR_QUEST_ENCOUNTERS,
    icon: PathSVG,
  },
  [ENTRY_TYPE.QUEST.KNOB_GOBLIN_KING]: {
    categories: [CATEGORY_ID.QUEST, CATEGORY_ID.COMBAT],
    matcher: KNOB_GOBLIN_KING_ENCOUNTERS,
    icon: CombatSVG,
  },
  [ENTRY_TYPE.QUEST.BOSS_BAT_BOSS]: {
    categories: [CATEGORY_ID.QUEST, CATEGORY_ID.COMBAT],
    matcher: BOSS_BAT_ENCOUNTERS,
    icon: CombatSVG,
  },
  [ENTRY_TYPE.QUEST.CRYPT_BOSSES]: {
    categories: [CATEGORY_ID.QUEST, CATEGORY_ID.COMBAT],
    matcher: CRYPT_BOSS_ENCOUNTERS,
    icon: CombatSVG,
  },
  [ENTRY_TYPE.QUEST.MIST_SHROUDED_PEAK_BOSS]: {
    categories: [CATEGORY_ID.QUEST, CATEGORY_ID.COMBAT],
    matcher: MIST_SHROUDED_PEAK_BOSS_ENCOUNTERS,
    icon: CombatSVG,
  },
  [ENTRY_TYPE.QUEST.DEEP_FAT_FRIARS]: {
    categories: [CATEGORY_ID.QUEST, CATEGORY_ID.NONCOMBAT],
    matcher: FRIARS_QUEST_ENCOUNTERS,
    icon: PathSVG,
  },
  [ENTRY_TYPE.QUEST.LEAFLET]: {
    categories: [CATEGORY_ID.QUEST],
    matcher: REGEX.LINE.LEAFLET,
    icon: PathSVG,
    locationName_alt: 'Strange Leaflet',
    encounterName_alt: 'There is nobody named Xyzzy here',
    content_alt: null,
  },
  [ENTRY_TYPE.QUEST.ED_THE_UNDYING_BOSS]: {
    categories: [CATEGORY_ID.QUEST, CATEGORY_ID.COMBAT],
    matcher: REGEX.QUEST.ED_THE_UNDYING_BOSS,
    icon: CombatSVG,
  },
  [ENTRY_TYPE.QUEST.OPEN_DESERT_PYRAMID]: {
    categories: [CATEGORY_ID.QUEST],
    matcher: REGEX.QUEST.OPEN_DESERT_PYRAMID,
    icon: InfoSVG,
    locationName_alt: 'A Small Pyramid',
    encounterName_alt: 'Pyramid Unlocked',
  },
  [ENTRY_TYPE.QUEST.ICY_PEAK_ASCEND]: {
    categories: [CATEGORY_ID.QUEST],
    matcher: REGEX.QUEST.ICY_PEAK_ASCEND_TEXT,
    icon: PathSVG,
    locationName_alt: 'Icy Peak',
    encounterName_alt: 'Ascending the Mist-Shrouded Peak',
    content_alt: null,
  },
  [ENTRY_TYPE.QUEST.HIGHLAND_LORD]: {
    categories: [CATEGORY_ID.QUEST, CATEGORY_ID.NONCOMBAT],
    matcher: HIGHLAND_LORD_ENCOUNTERS,
    icon: PathSVG,
  },
  [ENTRY_TYPE.QUEST.TOWER_CONTEST_BOOTH]: {
    categories: [CATEGORY_ID.QUEST],
    matcher: REGEX.QUEST.TOWER_BOOTH_TEXT,
    icon: PathSVG,
    locationName_alt: REGEX.LINE.FIRST_LINE,
    encounterName_alt: REGEX.LINE.SECOND_LINE,
    content_alt: null,
  },
  [ENTRY_TYPE.QUEST.TOWER_CLOSING_CEREMONY]: {
    categories: [CATEGORY_ID.QUEST],
    matcher: REGEX.QUEST.TOWER_CEREMONY_TEXT,
    icon: PathSVG,
    locationName_alt: REGEX.LINE.FIRST_LINE,
    content_alt: null,
  },
  [ENTRY_TYPE.QUEST.HEDGE_MAZE]: {
    categories: [CATEGORY_ID.QUEST, CATEGORY_ID.NONCOMBAT],
    matcher: REGEX.QUEST.HEDGE_MAZE_TEXT,
    icon: NoncombatSVG,
  },
  [ENTRY_TYPE.QUEST.TOWER_DOOR]: {
    categories: [CATEGORY_ID.QUEST, CATEGORY_ID.OPTIONS],
    matcher: REGEX.QUEST.TOWER_DOOR_TEXT,
    icon: PathSVG,
    encounterName_alt: 'The Naughty Sorceress\' Tower Door',
  },
  [ENTRY_TYPE.QUEST.NAUGHTY_SORCERESS]: {
    categories: [CATEGORY_ID.QUEST, CATEGORY_ID.COMBAT],
    matcher: REGEX.ASCENSION.NAUGHTY_SORCERESS,
    icon: CombatSVG,
  },
  [ENTRY_TYPE.QUEST.ASCENSION_END]: {
    categories: [CATEGORY_ID.QUEST, CATEGORY_ID.ASCENSION_INFO],
    matcher: REGEX.ASCENSION.KING_FREED,
    icon: AscendSVG,
    encounterName_alt: 'Ascension Complete!',
  },
  [ENTRY_TYPE.QUEST.MISC]: {
    categories: [CATEGORY_ID.QUEST],
    matcher: MISC_QUEST_ENCOUNTERS,
    icon: PathSVG,
  },
  [ENTRY_TYPE.QUEST.MADE_WAND]: {
    categories: [CATEGORY_ID.QUEST, CATEGORY_ID.CRAFTING],
    matcher: /.*acquire.*wand of nagamar.*/i,
    icon: PathSVG,
    locationName_alt: 'Created',
    encounterName_alt: 'Wand of Anagram',
  },
  [ENTRY_TYPE.QUEST.MAKE_MCCLUSKY_FILE]: {
    categories: [CATEGORY_ID.CRAFTING, CATEGORY_ID.USE_ITEM],
    matcher: REGEX.QUEST.MAKE_MCCLUSKY_FILE,
    icon: PathSVG,
    locationName_alt: 'Created',
    encounterName_alt: 'McClusky file (complete)',
  },
  // --
  [ENTRY_TYPE.CONSUMPTION.CHEW]: {
    categories: [CATEGORY_ID.DIET],
    matcher: REGEX.ITEMS.CHEW_TARGET,
    icon: SpleenSVG,
    locationName_alt: ['Chew - {1}', REGEX.ITEMS.CONSUMPTION_COST],
    encounterName_alt: REGEX.ITEMS.CHEW_TARGET,
  },
  [ENTRY_TYPE.CONSUMPTION.DRINK]: {
    categories: [CATEGORY_ID.DIET],
    matcher: REGEX.ITEMS.DRINK_TARGET,
    icon: DrinkSVG,
    locationName_alt: ['Drink - {1}', REGEX.ITEMS.CONSUMPTION_COST],
    encounterName_alt: REGEX.ITEMS.DRINK_TARGET,
  },
  [ENTRY_TYPE.CONSUMPTION.EAT]: {
    categories: [CATEGORY_ID.DIET],
    matcher: REGEX.ITEMS.EAT_TARGET,
    icon: EatSVG,
    locationName_alt: ['Eat - {1}', REGEX.ITEMS.CONSUMPTION_COST],
    encounterName_alt: REGEX.ITEMS.EAT_TARGET,
  },
  // --
  [ENTRY_TYPE.ITEMS.COMBINE]: {
    categories: [CATEGORY_ID.CRAFTING],
    matcher: REGEX.ITEMS.COMBINE_LINE,
    icon: CraftSVG,
    locationName_alt: 'Combined',
    encounterName_alt: REGEX.ITEMS.ACQUIRED_AN_ITEM_NAME,
  },
  [ENTRY_TYPE.ITEMS.COOK]: {
    categories: [CATEGORY_ID.CRAFTING],
    matcher: REGEX.ITEMS.COOK_LINE,
    icon: CraftSVG,
    locationName_alt: 'Cooked',
    encounterName_alt: REGEX.ITEMS.ACQUIRED_AN_ITEM_NAME,
  },
  [ENTRY_TYPE.ITEMS.CRAFT]: {
    categories: [CATEGORY_ID.CRAFTING],
    matcher: REGEX.ITEMS.CRAFT_LINE,
    icon: CraftSVG,
    locationName_alt: 'Crafted',
    encounterName_alt: REGEX.ITEMS.ACQUIRED_AN_ITEM_NAME,
  },
  [ENTRY_TYPE.ITEMS.CREATE]: {
    categories: [CATEGORY_ID.CRAFTING],
    matcher: REGEX.ITEMS.CREATE_LINE,
    icon: CraftSVG,
    locationName_alt: 'Created',
    encounterName_alt: REGEX.ITEMS.ACQUIRED_AN_ITEM_NAME,
  },
  [ENTRY_TYPE.ITEMS.MIX]: {
    categories: [CATEGORY_ID.CRAFTING],
    matcher: REGEX.ITEMS.MIX_LINE,
    icon: CraftSVG,
    locationName_alt: 'Mixed',
    encounterName_alt: REGEX.ITEMS.ACQUIRED_AN_ITEM_NAME,
  },
  [ENTRY_TYPE.ITEMS.SMITH]: {
    categories: [CATEGORY_ID.CRAFTING],
    matcher: REGEX.ITEMS.SMITH_LINE,
    icon: CraftSVG,
    locationName_alt: 'Smithed',
    encounterName_alt: REGEX.ITEMS.ACQUIRED_AN_ITEM_NAME,
  },
  [ENTRY_TYPE.ITEMS.TRADE]: {
    categories: [CATEGORY_ID.CRAFTING],
    matcher: REGEX.ITEMS.TRADE_LINE,
    icon: CraftSVG,
    locationName_alt: 'Traded',
    encounterName_alt: REGEX.ITEMS.ACQUIRED_AN_ITEM_NAME,
  },
  [ENTRY_TYPE.EFFECTS.SPELL_CAST]: {
    categories: [CATEGORY_ID.EFFECTS],
    matcher: REGEX.VALUE.SPELL_CAST_NAMES,
    icon: SpellsSVG,
    locationName_alt: ['✧ {1} ✧', REGEX.EFFECTS.CAST_NAME],
  },
  // --
  [ENTRY_TYPE.ITEMS.CLOSET]: {
    categories: [CATEGORY_ID.OTHER],
    matcher: [REGEX.ITEMS.CLOSET_PUT_TARGETS, REGEX.ITEMS.CLOSET_TAKE_TARGETS],
    icon: ItemBagSVG,
    locationName_alt: 'Your Colossal Closet',
  },
  [ENTRY_TYPE.ENCOUNTER.COMBAT]: {
    categories: [CATEGORY_ID.COMBAT],
    matcher: REGEX.COMBAT.INITIATIVE_LINE,
    icon: CombatSVG,
  },
  [ENTRY_TYPE.ENCOUNTER.NONCOMBAT]: {
    categories: [CATEGORY_ID.NONCOMBAT],
    matcher: REGEX.VALUE.NONCOMBAT_NAME,
    icon: NoncombatSVG,
  },
  [ENTRY_TYPE.FAMILIAR]: {
    categories: [CATEGORY_ID.FAMILIARS],
    matcher: REGEX.FAMILIAR.SWITCH_TO_LINE,
    icon: FamiliarSVG,
    locationName_alt: 'Change Familiar',
    encounterName_alt: REGEX.FAMILIAR.SWITCH_TO_RESULT,
    content_alt: null,
  },
  [ENTRY_TYPE.ITEMS.HAGNK_PULL]: {
    categories: [CATEGORY_ID.PULLS],
    matcher: REGEX.ITEMS.HAGNK_PULL_LINE,
    icon: ItemBagSVG,
    locationName_alt: 'Hagnk\'s Ancestral Mini-Storage',
    encounterName_alt: 'Pull from Hagnk\'s',
  },
  [ENTRY_TYPE.ITEMS.EQUIP_PLAYER]: {
    categories: [CATEGORY_ID.EQUIPMENT],
    matcher: REGEX.ITEMS.EQUIP_PLAYER_TARGETS,
    icon: EquipmentSVG,
    locationName_alt: 'Equip',
    encounterName_alt: REGEX.ITEMS.EQUIP_PLAYER_TARGETS,
  },
  [ENTRY_TYPE.ITEMS.UNEQUIP_PLAYER]: {
    categories: [CATEGORY_ID.EQUIPMENT],
    matcher: REGEX.ITEMS.UNEQUIP_PLAYER_TARGETS,
    icon: EquipmentSVG,
    locationName_alt: 'Unequip',
    encounterName_alt: REGEX.ITEMS.UNEQUIP_PLAYER_TARGETS,
  },
  [ENTRY_TYPE.ITEMS.EQUIP_FAMILIAR]: {
    categories: [CATEGORY_ID.FAMILIAR],
    matcher: REGEX.FAMILIAR.EQUIP_FAMILIAR_RESULT,
    icon: FamiliarSVG,
    locationName_alt: 'Equip Familiar',
    encounterName_alt: REGEX.FAMILIAR.EQUIP_FAMILIAR_RESULT,
    content_alt: null,
  },
  [ENTRY_TYPE.ITEMS.UNKNOWN_ACQUIRED_ITEM]: {
    categories: [CATEGORY_ID.TRANSACTIONS, CATEGORY_ID.OTHER],
    matcher: REGEX.ITEMS.UNKNOWN_ACQUIRED_ITEM,
    icon: ItemBagSVG,
    locationName_alt: 'acquired a bunch of items somehow',
    encounterName_alt: null,
  },
  [ENTRY_TYPE.ITEMS.USE_ITEM]: {
    categories: [CATEGORY_ID.USE_ITEM],
    matcher: REGEX.ITEMS.USE_ITEM_LINE,
    icon: ItemBagSVG,
    locationName_alt: ['Use {1}', REGEX.ITEMS.USE_ITEM_TARGET],
  },
  [ENTRY_TYPE.GUILD.LEARN_SKILL]: {
    categories: [CATEGORY_ID.TRANSACTIONS],
    matcher: REGEX.GUILD.LEARN_SKILL_TARGET,
    icon: LevelUpSVG,
    locationName_alt: 'Learned a new skill!',
    encounterName_alt: REGEX.GUILD.LEARN_SKILL_TARGET,
    content_alt: null,
  },
  [ENTRY_TYPE.VISITING]: {
    categories: [CATEGORY_ID.VISIT],
    matcher: [REGEX.LINE.TALKING, REGEX.LINE.VISITING],
    icon: ShopSVG,
  },
  [ENTRY_TYPE.AUTOSELL]: {
    categories: [CATEGORY_ID.TRANSACTIONS],
    matcher: REGEX.TRANSACTIONS.AUTOSELL,
    icon: ShopSVG,
    locationName_alt: 'Autosell',
    encounterName_alt: REGEX.TRANSACTIONS.SELL_ITEM_TARGET,
  },
  [ENTRY_TYPE.TRANSACTION]: {
    categories: [CATEGORY_ID.TRANSACTIONS],
    matcher: [REGEX.TRANSACTIONS.SHOPPING, REGEX.TRANSACTIONS.TRADING_LINE],
    icon: ShopSVG,
  },
  [ENTRY_TYPE.VISITING]: {
    categories: [CATEGORY_ID.VISIT],
    matcher: [REGEX.LINE.TALKING, REGEX.LINE.VISITING],
    icon: ShopSVG,
  },
  [ENTRY_TYPE.CLAN_VISIT]: {
    categories: [CATEGORY_ID.OTHER],
    matcher: REGEX.LINE.CLAN_VISIT,
    icon: InfoSVG,
  },
  // --
  [ENTRY_TYPE.ANNOTATION_ONLY]: {
    categories: [CATEGORY_ID.ASCENSION_INFO, CATEGORY_ID.OTHER],
    matcher: REGEX.MAFIOSO.LOG_COMMENTS_ONLY,
  },
};
// basically becomes a list of `EntryType`s that have a map value
export const ENTRY_MAP_KEYS = Object.keys(ENTRY_DATA_MAP);

// data for an unknown entry
export const UNKNOWN_ENTRY_DATA = {
  type: ENTRY_TYPE.UNKNOWN,
  categories: [CATEGORY_ID.UNCATEGORIZED],
  icon: UnknownSVG,
}

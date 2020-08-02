import ENTRY_TYPE from 'constants/ENTRY_TYPE';
import {CATEGORY_ID} from 'constants/CATEGORIES';
import {REGEX} from 'constants/REGEXES';

import {ReactComponent as AscendSVG} from 'images/condor-emblem.svg';
import {ReactComponent as CraftSVG} from 'images/anvil-impact.svg';
import {ReactComponent as CombatSVG} from 'images/crossed-swords.svg';
import {ReactComponent as EatSVG} from 'images/meal.svg';
import {ReactComponent as FamiliarSVG} from 'images/cat.svg';
import {ReactComponent as InfoSVG} from 'images/info.svg';
import {ReactComponent as ItemBagSVG} from 'images/swap-bag.svg';
import {ReactComponent as NoncombatSVG} from 'images/dig-dug.svg';
import {ReactComponent as ShopSVG} from 'images/shop.svg';
import {ReactComponent as SpellsSVG} from 'images/spell-book.svg';
import {ReactComponent as SpleenSVG} from 'images/pill.svg';
import {ReactComponent as UnknownSVG} from 'images/uncertainty.svg';

/*
  [ENTRY_TYPE.template]: {
    categories: [CATEGORY_ID.],
    matcher: REGEX.,
    icon: UnknownSVG,
    locationName_alt: null,
    encounterName_alt: null,
    content_alt: null,
  },
 */

/**
 * @typedef {String|RegExp|Array<String|RegExp>|null} EntryDisplayer
 * 
 * @typedef {Object} EntryData
 * @property {EntryType} EntryData.type                         - this is the key, will be built by parser
 * @property {Array<Category>} EntryData.categories             - visible entry categories
 * @property {RegExp|Array<String|RegExp>} EntryData.matcher    - what to use to determine if text is this type
 * @property {ReactComponent} EntryData.icon                    - icon
 * @property {EntryDisplayer} [EntryData.locationName_alt]      - alternative text or regex to find, null shows nothing
 * @property {EntryDisplayer} [EntryData.encounterName_alt]     - same, but for encounterName
 * @property {EntryDisplayer} [EntryData.content_alt]           - same, but for the body
 */
export const ENTRY_DATA_MAP = {
  // -- ascension relevant
  [ENTRY_TYPE.SNAPSHOT.VALHALLA]: {
    categories: [CATEGORY_ID.ASCENSION_INFO],
    matcher: REGEX.ASCENSION.VALHALLA_TEXT,
    icon: AscendSVG,
    locationName_alt: 'Valhalla',
    encounterName_alt: 'Welcome to Valhalla!',
    content_alt: null,
  },
  [ENTRY_TYPE.SNAPSHOT.DAY_INFO]: {
    categories: [CATEGORY_ID.ASCENSION_INFO],
    matcher: REGEX.SNAPSHOT_CHECK.KOL_DATE,
    icon: InfoSVG,
  },
  [ENTRY_TYPE.SNAPSHOT.CHARACTER_INFO]: {
    categories: [CATEGORY_ID.ASCENSION_INFO],
    matcher: [
      REGEX.SNAPSHOT_CHECK.CONTAIN_STATUS, 
      REGEX.SNAPSHOT_CHECK.CONTAIN_EQUIPMENT, 
      REGEX.SNAPSHOT_CHECK.CONTAIN_EFFECTS, 
      REGEX.SNAPSHOT_CHECK.CONTAIN_MODIFIERS,
    ],
    icon: InfoSVG,
  },
  [ENTRY_TYPE.SNAPSHOT.SKILL_BREAKDOWN]: {
    categories: [CATEGORY_ID.ASCENSION_INFO],
    matcher: REGEX.SNAPSHOT_CHECK.CONTAIN_SKILLS,
    icon: InfoSVG,
  },
  // -- iotm
  [ENTRY_TYPE.IOTM.BASTILLE_BATTALION]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.CHOICEADV],
    matcher: REGEX.BASTILLE_BATTALION.TEXT,
    icon: NoncombatSVG,
    locationName_alt: 'Bastille Battalion control rig',
    content_alt: null,
  },
  [ENTRY_TYPE.IOTM.BEACH_COMB]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.NONCOMBAT],
    matcher: REGEX.BEACH_COMB.COMBING_LINE,
    icon: NoncombatSVG,
    locationName_alt: 'Beach Comb',
    encounterName_alt: REGEX.BEACH_COMB.COMBING_ACTION,
  },
  [ENTRY_TYPE.IOTM.BIRD_A_DAY]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.EFFECTS],
    matcher: [REGEX.BIRD_A_DAY.CAST_LINE, REGEX.BIRD_A_DAY.USE_LINE],
    icon: SpellsSVG,
  },
  [ENTRY_TYPE.IOTM.CAT_BURGLAR]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.FAMILIARS],
    matcher: REGEX.CAT_BURGLAR.HEISTED,
    icon: FamiliarSVG,
    locationName_alt: 'Cat Burglar',
    encounterName_alt: 'A Heist!',
  },
  [ENTRY_TYPE.IOTM.BOXING_DAYCARE]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.CHOICEADV],
    matcher: REGEX.BOXING_DAYCARE.NONCOMBAT,
    icon: NoncombatSVG,
  },
  [ENTRY_TYPE.IOTM.DECK_OF_EVERY_CARD]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.USE_ITEM],
    matcher: REGEX.DECK_OF_EVERY_CARD.TEXT,
    icon: InfoSVG,
  },
  [ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.MAKE]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.CRAFTING],
    matcher: REGEX.DIABOLIC_PIZZA.INGREDIENTS_LINE,
    icon: CraftSVG,
    locationName_alt: 'Diabolic Pizza',
  },
  [ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.EAT]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.DIET],
    matcher: REGEX.DIABOLIC_PIZZA.EAT_LINE,
    icon: EatSVG,
    locationName_alt: 'Diabolic Pizza',
  },
  [ENTRY_TYPE.IOTM.DISTANT_WOODS_GETAWAY]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.NONCOMBAT],
    matcher: REGEX.DISTANCE_WOODS_GETAWAY.GAZING_LINE,
    icon: NoncombatSVG,
    locationName_alt: 'Your Campsite Away From Your Campsite',
    encounterName_alt: 'Gaze at the Stars',
  },
  [ENTRY_TYPE.IOTM.FOURTH_OF_MAY_COSPLAY_SABER.UPGRADE]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.USE_ITEM],
    matcher: REGEX.FOURTH_OF_MAY_COSPLAY_SABER.UPGRADE_TEXT,
    icon: InfoSVG,
    locationName_alt: 'May the Fourth Cosplay Saber',
    encounterName_alt: 'Upgrade Your May the Fourth Cosplay Saber',
    content_alt: ['[ {1} ]', REGEX.FOURTH_OF_MAY_COSPLAY_SABER.UPGRADE_CHOICE],
  },
  [ENTRY_TYPE.IOTM.GARBAGE_TOTE]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.NONCOMBAT],
    matcher: [REGEX.JANUARYS_GARBAGE_TOTE.USE_FOLDABLE, REGEX.JANUARYS_GARBAGE_TOTE.USE_RESULT],
    icon: NoncombatSVG,
    encounterName_alt: REGEX.JANUARYS_GARBAGE_TOTE.CHOICE_NAME,
  },
  [ENTRY_TYPE.IOTM.GOD_LOBSTER.COMBAT]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.COMBAT],
    matcher: REGEX.GOD_LOBSTER.COMBAT,
    icon: CombatSVG,
  },
  [ENTRY_TYPE.IOTM.GOD_LOBSTER.BOON]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.NONCOMBAT],
    matcher: REGEX.GOD_LOBSTER.BOON,
    icon: NoncombatSVG,
  },
  [ENTRY_TYPE.IOTM.PILLKEEPER]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.USE_ITEM],
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
  [ENTRY_TYPE.IOTM.SONGBOOM_BOOMBOX]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.USE_ITEM],
    matcher: REGEX.SONGBOOM_BOOMBOX.RESULT,
    icon: NoncombatSVG,
    locationName_alt: 'SongBoom™ BoomBox',
    encounterName_alt: ['♫ {1} ♫', REGEX.SONGBOOM_BOOMBOX.RESULT],
  },
  [ENTRY_TYPE.IOTM.VOTING_BOOTH]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.NONCOMBAT],
    matcher: REGEX.VOTING_BOOTH.DAILY_VOTE_TEXT,
    icon: InfoSVG,
    locationName_alt: 'Voting Booth',
    encounterName_alt: 'Daily Loathing Ballot',
  },
  // --
  [ENTRY_TYPE.CLAN_VISIT]: {
    categories: [CATEGORY_ID.NONCOMBAT],
    matcher: REGEX.LINE.CLAN_VISIT,
    icon: InfoSVG,
  },
  // --
  [ENTRY_TYPE.ITEMS.CLOSET]: {
    categories: [CATEGORY_ID.TRANSACTIONS],
    matcher: [REGEX.ITEMS.CLOSET_PUT_TARGETS, REGEX.ITEMS.CLOSET_TAKE_TARGETS],
    icon: ItemBagSVG,
  },
  [ENTRY_TYPE.ITEMS.HAGNK_PULL]: {
    categories: [CATEGORY_ID.PULLS],
    matcher: REGEX.ITEMS.HAGNK_PULL_LINE,
    icon: ItemBagSVG,
    locationName_alt: 'Hagnk\'s Ancestral Mini-Storage',
    encounterName_alt: 'Pull from Hagnk\'s',
  },
  [ENTRY_TYPE.TRANSACTION]: {
    categories: [CATEGORY_ID.TRANSACTIONS],
    matcher: [REGEX.TRANSACTIONS.AUTOSELL, REGEX.TRANSACTIONS.SHOPPING],
    icon: ShopSVG,
  },
  [ENTRY_TYPE.VISITING]: {
    categories: [CATEGORY_ID.VISIT],
    matcher: [REGEX.LINE.TALKING, REGEX.LINE.VISITING],
    icon: ShopSVG,
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
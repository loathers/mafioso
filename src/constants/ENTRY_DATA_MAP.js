import ENTRY_TYPE from 'constants/ENTRY_TYPE';
import {CATEGORY_ID} from 'constants/CATEGORIES';
import {REGEX} from 'constants/REGEXES';

import {ReactComponent as AscendSVG} from 'images/condor-emblem.svg';
import {ReactComponent as CraftSVG} from 'images/anvil-impact.svg';
import {ReactComponent as EatSVG} from 'images/meal.svg';
import {ReactComponent as InfoSVG} from 'images/info.svg';
import {ReactComponent as NoncombatSVG} from 'images/dig-dug.svg';
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
  [ENTRY_TYPE.IOTM.BASTILLE_BATALLION]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.CHOICEADV],
    matcher: REGEX.BASTILLE_BATALLION.TEXT,
    icon: NoncombatSVG,
    locationName_alt: 'Bastille Battalion',
  },
  [ENTRY_TYPE.IOTM.BEACH_COMB]: {
    categories: [CATEGORY_ID.IOTM, CATEGORY_ID.NONCOMBAT],
    matcher: REGEX.BEACH_COMB.COMBING_LINE,
    icon: NoncombatSVG,
    locationName_alt: 'Beach Comb',
    encounterName_alt: REGEX.BEACH_COMB.COMBING_ACTION,
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
};
// basically becomes a list of `EntryType`s that have a map value
export const ENTRY_MAP_KEYS = Object.keys(ENTRY_DATA_MAP);

// data for an unknown entry
export const UNKNOWN_ENTRY_DATA = {
  type: ENTRY_TYPE.UNKNOWN,
  categories: [CATEGORY_ID.UNCATEGORIZED],
  icon: UnknownSVG,
}
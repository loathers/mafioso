import ENTRY_TYPE from 'constants/entryType';
import {CATEGORY_ID} from 'constants/CATEGORIES';

import {ReactComponent as UnknownSVG} from 'images/uncertainty.svg';

/**
 * @typedef {String|Regex|Array<String|Regex>|null} EntryDisplayer
 * 
 * @typedef {Object} EntryData
 * @property {EntryType} EntryData.type                   - this is the key, will be built by parser
 * @property {Array<Category>} EntryData.categories       - visible entry categories
 * @property {Regex} EntryData.regex                      - what to use to determine if text is this type
 * @property {ReactComponent} EntryData.icon              - icon
 * @property {EntryDisplayer} [EntryData.locationName_alt]      - alternative text or regex to find, null shows nothing
 * @property {EntryDisplayer} [EntryData.encounterName_alt]     - same, but for encounterName
 * @property {EntryDisplayer} [EntryData.content_alt]           - same, but for the body
 */
export const ENTRY_DATA_MAP = {
  [ENTRY_TYPE.IOTM.FOURTH_OF_MAY_COSPLAY_SABER.UPGRADE]: {
    categories: [CATEGORY_ID.USE_ITEM, CATEGORY_ID.IOTM],
    regex: /^encounter.*may the fourth cosplay saber.*$(\r\n|\n).*choice 1386\/\d.*$/gmi,
    icon: UnknownSVG,
    locationName_alt: 'May the Fourth Cosplay Saber',
    encounterName_alt: 'Upgrade Your May the Fourth Cosplay Saber',
    content_alt: ['[ {1} ]', /(?<=^Took choice 1386.*: ).*/gmi],
  },
};

export const ENTRY_MAP_KEYS = Object.keys(ENTRY_DATA_MAP);

export const UNKNOWN_ENTRY_DATA = {
  type: ENTRY_TYPE.UNKNOWN,
  categories: [CATEGORY_ID.UNCATEGORIZED],
  icon: UnknownSVG,
}
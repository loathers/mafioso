import ENTRY_TYPE from 'constants/entryType';
import {CATEGORY_ID} from 'constants/CATEGORIES';

import {ReactComponent as UnknownSVG} from 'images/uncertainty.svg';

/**
 * @typedef {Object} EntryData
 * @property {Array<Category>} EntryData.categories           - visible entry categories
 * @property {Regex} EntryData.regex                          - what to use to determine if text is this type
 * @property {ReactComponent} EntryData.icon                  - icon
 * @property {String | Regex} [EntryData.locationName_alt]    - alternative text or regex to find 
 * @property {String | Regex} [EntryData.encounterName_alt]   - alternative text or regex to find
 * @property {String | Regex} [EntryData.content_alt]         - same, but for the body
 */
export const ENTRY_DATA_MAP = {
  [ENTRY_TYPE.UNKNOWN]: {
    categories: [CATEGORY_ID.UNCATEGORIZED],
    icon: UnknownSVG,
  },
  [ENTRY_TYPE.IOTM.FOURTH_OF_MAY_COSPLAY_SABER.UPGRADE]: {
    categories: [CATEGORY_ID.USE_ITEM, CATEGORY_ID.IOTM],
    regex: /^encounter.*may the fourth cosplay saber.*$(\r\n|\n).*choice 1386\/\d.*$/gmi,
    icon: UnknownSVG,
    locationName_alt: undefined,
    encounterName_alt: undefined,
    content_alt: undefined,
  },
};

export const ENTRY_MAP_KEYS = Object.keys(ENTRY_DATA_MAP);
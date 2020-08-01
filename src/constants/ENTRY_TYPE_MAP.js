import ENTRY_TYPE from 'constants/entryType';

/**
 * defines what regex matches a entry type
 * @type {Object}
 */
export const ENTRY_TYPE_REGEX_MAP = {
  [ENTRY_TYPE.IOTM.FOURTH_OF_MAY_COSPLAY_SABER.UPGRADE]: /^encounter.*may the fourth cosplay saber.*$(\r\n|\n).*choice 1386\/\d.*$/gmi,
};

export const ENTRY_TYPE_MAP_KEYS = Object.keys(ENTRY_TYPE_REGEX_MAP);
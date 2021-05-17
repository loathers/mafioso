import {CATEGORY_ID} from 'constants/CATEGORIES';
import ENTRY_TYPE from 'constants/ENTRY_TYPE';
import REGEX from 'constants/REGEXES';

import ENTRY_DATA from 'data/ENTRY_DATA.json';
import IOTM_ENTRY_DATA from 'data/IOTM_ENTRY_DATA.json';

import * as regexUtils from 'utilities/regexUtils';

/** @type {Object<RawEntryData>} */
const rawEntryData = {
  ...ENTRY_DATA,
  ...IOTM_ENTRY_DATA,
};
/** @type {Object<EntryData>} */
const dataCache = {};
/** @type {Array<String>} */
const dataCacheKeys = Object.keys(rawEntryData);
// start with building cache
buildCache();

export function matchEntryData(entryString) {
  const foundEntryType = dataCacheKeys.find((entryTypeKey) => {
    const data = dataCache[entryTypeKey];
    const {matcher} = data;
    if (matcher instanceof RegExp) {
      return regexUtils.hasString(entryString, matcher);

    } else if (Array.isArray(matcher)) {
      return matcher.some((matchRegex) => regexUtils.hasString(entryString, matchRegex))

    } else {
      return undefined;
    }
  });

  if (foundEntryType) {
    return {
      showAdditionalDisplay: true,
      ...dataCache[foundEntryType],
    };
  }

  // did not find EntryData via this method
  return {
    type: ENTRY_TYPE.UNKNOWN,
    categories: [CATEGORY_ID.UNCATEGORIZED],
    icon: 'UnknownSVG',
  };
}
/**
 *
 */
function buildCache() {
  dataCacheKeys.forEach((entryTypeKey) => {
    const rawData = rawEntryData[entryTypeKey];

    const formattedCategories = rawData.categories.map((categoryString) => CATEGORY_ID[categoryString]);
    const formattedMatcher = convertStringToRegex(rawData.matcher);

    // cache
    dataCache[entryTypeKey] = {
      ...rawData,
      categories: formattedCategories,
      matcher: formattedMatcher,
      locationName_alt: convertStringToRegex(rawData.locationName_alt),
      encounterName_alt: convertStringToRegex(rawData.encounterName_alt),
      content_alt: convertStringToRegex(rawData.content_alt),
      additionalDisplay: convertStringToRegex(rawData.additionalDisplay),
    }
  });
}
/**
 * @param {String|Array} input
 * @returns {RegExp|Array<RegExp>}
 */
function convertStringToRegex(input) {
  if (Array.isArray(input)) {
    return input.map((inputString) => convertStringToRegex(inputString));
  }

  // do nothing
  if (typeof input !== 'string') {
    return input;
  }

  // regex needs to start with slash
  // eg: /(?<=tuning moon to ).*/mi
  if (input.charAt(0) === '/') {
    const inputParts = input.split('/');
    return new RegExp(inputParts[1], inputParts[2]);
  }

  // check if we're using a REGEX path
  const pathParts = input.split('.');
  if (pathParts[0] === 'REGEX') {
    return convertPathToRegex(input);
  }

  // otherwise leaving string alone
  return input;
}
/**
 * @param {String} input
 * @returns {RegExp|Array<RegExp>}
 */
function convertPathToRegex(input) {
  const pathParts = input.split('.');
  if (pathParts.shift() === 'REGEX') {
    const result = pathParts.reduce((regexData, pathPart) => {
      return regexData[pathPart];
    }, REGEX);

    return result;
  }
}

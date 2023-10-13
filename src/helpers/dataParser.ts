import { CATEGORY_ID } from "../constants/CATEGORIES";
import ENTRY_TYPE from "../constants/ENTRY_TYPE";
import REGEX from "../constants/REGEXES";

import ENTRY_DATA from "../data/ENTRY_DATA.json";
import IOTM_ENTRY_DATA from "../data/IOTM_ENTRY_DATA.json";
import LOCATION_ENTRY_DATA from "../data/LOCATION_ENTRY_DATA.json";

import ACTUALLY_ED_THE_UNDYING_ENTRY_DATA from "../data/ACTUALLY_ED_THE_UNDYING_ENTRY_DATA.json";
import YOU_ROBOT_ENTRY_DATA from "../data/YOU_ROBOT_ENTRY_DATA.json";

import * as regexUtils from "../utilities/regexUtils";
import { EntryData } from "../constants/ENTRY_DATA";

type EntryDataByKey = { [type: string]: EntryData };

/** @type {Object<RawEntryData>} */
const rawEntryData = {
  ...ACTUALLY_ED_THE_UNDYING_ENTRY_DATA,
  ...YOU_ROBOT_ENTRY_DATA,
  ...IOTM_ENTRY_DATA,
  ...LOCATION_ENTRY_DATA,
  ...ENTRY_DATA,
} as EntryDataByKey;

const dataCache: EntryDataByKey = {};

buildCache();

export function matchEntryData(entryString: string) {
  const foundEntryType = Object.entries(dataCache).find(([, { matcher }]) => {
    if (matcher instanceof RegExp) {
      return regexUtils.hasString(entryString, matcher);
    } else if (Array.isArray(matcher)) {
      return matcher.some((matchRegex) =>
        regexUtils.hasString(entryString, matchRegex),
      );
    } else {
      return undefined;
    }
  })?.[0];

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
    icon: "UnknownSVG",
  };
}
/**
 *
 */
function buildCache() {
  Object.entries(rawEntryData).forEach(([entryTypeKey, rawData]) => {
    const formattedCategories = rawData.categories.map(
      (categoryString) =>
        CATEGORY_ID[categoryString as keyof typeof CATEGORY_ID],
    );
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
    };
  });
}

function convertStringToRegex(
  input: regexUtils.Matcher | undefined | null,
): regexUtils.Matcher {
  if (!input) {
    return [];
  }

  if (Array.isArray(input)) {
    return input.flatMap((inputString) => convertStringToRegex(inputString));
  }

  // do nothing
  if (typeof input !== "string") {
    return input;
  }

  // regex needs to start with slash
  // eg: /(?<=tuning moon to ).*/mi
  if (input.charAt(0) === "/") {
    const inputParts = input.split("/");
    return new RegExp(inputParts[1], inputParts[2]);
  }

  // check if we're using a REGEX path
  const pathParts = input.split(".");
  if (pathParts[0] === "REGEX") {
    return convertPathToRegex(input);
  }

  // otherwise leaving string alone
  return input;
}

function convertPathToRegex(input: string) {
  const pathParts = input.split(".");
  if (pathParts.shift() === "REGEX") {
    let result = REGEX;
    while (typeof result === "object" && pathParts.length > 0) {
      // @ts-ignore
      result = result[pathParts.shift()!];
    }
    if (result) return result as unknown as RegExp | string;
  }
  return input;
}

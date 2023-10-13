import { v4 as uuidv4 } from "uuid";

import Batcher from "../classes/Batcher";
import Entry from "../classes/Entry";

import {
  PREREMOVE_REGEX_LIST,
  PREGROUP_REGEX_LIST,
  SPLIT_REGEX_LIST,
  FULL_PARSE_DELAY,
  CLEAN_RAW_DELAY,
} from "../constants/DEFAULTS";
import REGEX, { DIVIDING_NEWLINE_REGEX } from "../constants/REGEXES";
import { DIFFICULTY_MAP, PATH_MAP } from "../constants/ABBREVIATION_MAP";

import * as logDateUtils from "./logDateUtils";
import * as regexUtils from "./regexUtils";

const MAX_CHAR_COUNT = 5000000;
const MIN_CHAR_COUNT = 5;

/**
 * core parsing handler - start here
 *
 * @param {String} rawText
 * @param {Object} [config]
 * @return {Array<Entry>}
 */
export async function parseLogTxt(rawText, config) {
  const rawSize = rawText.length;
  if (rawSize > MAX_CHAR_COUNT || rawSize < MIN_CHAR_COUNT) {
    throw new Error(`Unable to parse this log of size ${rawSize}.`);
  }
  // console.log(`%c(log has ${rawSize} characters)`, 'color: #6464ff');

  // first combine some text ahead of time
  // then split some text
  const preparsedLog = presplitRawLog(rawText);

  // split up each entry by wherever there are two new lines
  //  for some reason it doesn't properly split with two new lines
  //  so we're using this weird hack
  const rawEntries = preparsedLog
    .replace(DIVIDING_NEWLINE_REGEX, "}{")
    .split("}{");

  // prepare Batcher
  const rawVal = Math.sqrt(rawSize);
  const newBatchSize = Math.round(1000 - rawVal);
  const BATCH_SIZE = Math.max(100, newBatchSize);
  const entryBatcher = new Batcher(rawEntries, {
    batchSize: BATCH_SIZE,
    batchDelay: FULL_PARSE_DELAY,
  });

  // create the Entry class for each entry text, which will then further parse their data
  const allEntries = await entryBatcher.run((logGroup, startIdx) =>
    parseLogArray(logGroup, startIdx, config),
  );
  return allEntries;
}
/**
 * finds the specific ascension session from given string
 *
 * @string {String} rawText
 * @returns {String | null}
 */
export function findAscensionLog(rawText) {
  const scotchLogAscension = rawText.match(
    REGEX.ASCENSION.SCOTCH_LOG_ASCENSION,
  );
  if (scotchLogAscension) {
    return scotchLogAscension[0];
  }

  // because the snapshot date might be cut off from the rest of the ascension,
  //  capture it here ahead of time to be certain that we have it
  const firstDate = logDateUtils.findFirstDate(rawText);
  const firstDateText = firstDate ? `Start Date: ${firstDate}\n\n` : "";

  const macguffinAscension = rawText.match(
    REGEX.ASCENSION.FOUND_MACGUFFIN_ASCENSION,
  );
  if (macguffinAscension) {
    return firstDateText + macguffinAscension[0];
  }

  const fromValhallaToFreeKing = rawText.match(
    REGEX.ASCENSION.VALHALLA_COMPLETE,
  );
  if (fromValhallaToFreeKing) {
    return firstDateText + fromValhallaToFreeKing[0];
  }

  const fromValhallaToThwaitgold = rawText.match(
    REGEX.ASCENSION.THWAITGOLD_COMPLETE,
  );
  if (fromValhallaToThwaitgold) {
    return firstDateText + fromValhallaToThwaitgold[0];
  }

  const newAscensionToKing = rawText.match(REGEX.ASCENSION.REGULAR_COMPLETE);
  if (newAscensionToKing) {
    return firstDateText + newAscensionToKing[0];
  }

  throw new Error("Could not find an Ascension Log.");
}
/**
 * @param {String} rawText
 * @returns {AscensionAttributes}
 */
export function parseAscensionAttributes(rawText) {
  const characterNameMatch =
    rawText.match(REGEX.CHARACTER.CHARACTER_NAME) ||
    rawText.match(REGEX.CHARACTER.CHARACTER_NAME_FROM_COMBAT) ||
    [];
  const ascensionNumMatch =
    rawText.match(REGEX.ASCENSION.ASCENSION_NUMBER) || [];

  return {
    characterName: characterNameMatch[0],
    className: parseClassName(rawText),
    ascensionNum: ascensionNumMatch[0] || undefined,
    difficultyName: parseDifficultyName(rawText),
    pathName: parsePathName(rawText),
    standardSeason: parseStandardSeason(rawText),
  };
}

export function parseDailyAttributes(rawText) {
  return {
    voterMonsters: parseVoteMonster(rawText),
    cargoPockets: parseCargoPockets(rawText),
  };
}
/**
 * creates a list of Entry class,
 *  which will have parsed an entry's data
 *
 * @async
 * @param {Array<String>} logArray
 * @param {Number} startIdx
 * @param {Object} [config]
 * @returns {Array<Entry>}
 */
export function parseLogArray(logArray, startIdx, config) {
  return logArray.map(
    (rawText, idx) =>
      new Entry({
        entryIdx: startIdx + idx,
        entryId: `${startIdx + idx}_${uuidv4()}`,
        rawText: rawText,
        config: config,
      }),
  );
}
/**
 * group some entries ahead of time
 * @param {String} rawText
 * @return {String}
 */
export function pregroupRawLog(rawText) {
  return PREGROUP_REGEX_LIST.reduce((accumulatedText, preparseRegex) => {
    const pregroupMatches = accumulatedText.match(preparseRegex) || [];
    while (pregroupMatches.length > 0) {
      const nextText = pregroupMatches.shift();
      const groupedText = nextText.replace(DIVIDING_NEWLINE_REGEX, "\n");
      accumulatedText = accumulatedText.replace(nextText, groupedText);
    }

    return accumulatedText;
  }, rawText);
}
/**
 * split some entries ahead of time
 * @param {String} rawText
 * @return {String}
 */
export function presplitRawLog(rawText) {
  return SPLIT_REGEX_LIST.reduce((accumulatedText, regex) => {
    return accumulatedText.replace(regex, "\n\n");
  }, rawText);
}
/**
 * remove stuff that the parser will be completely ignoring
 * @param {String} rawText
 * @return {String}
 */
export async function cleanRawLog(rawText) {
  let cleanedText = rawText.slice();

  const cleaningBatcher = new Batcher(PREREMOVE_REGEX_LIST, {
    batchSize: 5,
    batchDelay: CLEAN_RAW_DELAY,
  });
  await cleaningBatcher.run((removalRegexGroup) => {
    cleanedText = removalRegexGroup.reduce((accumulatedText, removalRegex) => {
      return accumulatedText.replace(removalRegex, "");
    }, cleanedText);

    return cleanedText; // this return is superficial, just for Batcher's logging
  });

  return cleanedText;
}
/**
 * remove some text from the log after the log has been parsed for data
 * @param {string | null | undefined} rawText
 * @return {string}
 */
export async function postParseCleanup(rawText) {
  // hide karma numbers
  rawText = rawText.replace(REGEX.ASCENSION.KARMA_TEXT, "<3");

  // remove the starting generated block
  rawText = rawText.replace(REGEX.MAFIOSO.GENERATED_BLOCK_START, "");

  // replace all the stuff under "Player Snapshot"
  rawText = rawText.replace(
    REGEX.SNAPSHOT.WTF_SNAPSHOT_REPLACER_CAPTURE_GROUP,
    (match, p1, p2) => {
      return `<mafioso>\n${p1}\n${p2}\n</mafioso>\n`;
    },
  );

  return rawText;
}
// -- parsing specific data
/**
 * @param {string | undefined | null} rawText
 * @returns {String}
 */
export function createPathLabel(rawText) {
  const difficultyName = parseDifficultyName(rawText);
  const pathName = parsePathName(rawText);
  const difficultyAbbr = DIFFICULTY_MAP[difficultyName];
  const pathAbbr = PATH_MAP[pathName];
  return `${difficultyAbbr}_${pathAbbr}`.toUpperCase();
}
/**
 * @param {Text} rawText
 * @returns {String}
 */
export function parseDifficultyName(rawText) {
  const ascensionDetails =
    rawText.match(REGEX.ASCENSION.ASCENSION_DETAIL_GROUP) || [];
  return ascensionDetails[1];
}
/**
 * @param {Text} rawText
 * @returns {String}
 */
export function parseStandardSeason(rawText) {
  const standardSeasonMatch = rawText.match(REGEX.MAFIOSO.STANDARD_BLOCK);
  if (standardSeasonMatch) {
    return standardSeasonMatch[0];
  }

  return "Unrestricted";
}
/**
 * @param {Text} rawText
 * @returns {String}
 */
export function parsePathName(rawText) {
  const badMoonDetails = rawText.match(REGEX.ASCENSION.BAD_MOON_DETAILS);
  if (badMoonDetails) {
    return "Bad Moon";
  }

  const edTheUndyingDetails = rawText.match(
    REGEX.ASCENSION.ED_THE_UNDYING_DETAILS,
  );
  if (edTheUndyingDetails) {
    return "Actually Ed the Undying";
  }

  const ascensionDetails =
    rawText.match(REGEX.ASCENSION.ASCENSION_DETAIL_GROUP) || [];
  return ascensionDetails[2];
}
/**
 * @param {Text} rawText
 * @returns {String}
 */
export function parseClassName(rawText) {
  const edTheUndyingDetails = rawText.match(
    REGEX.ASCENSION.ED_THE_UNDYING_DETAILS,
  );
  if (edTheUndyingDetails) {
    return "Ed the Undying";
  }

  const ascensionDetails =
    rawText.match(REGEX.ASCENSION.ASCENSION_DETAIL_GROUP) || [];
  return ascensionDetails[3];
}
/**
 * @param {string} rawText
 * @returns {string[]}
 */
export function parseVoteMonster(rawText) {
  const allMonsters =
    regexUtils.getRegexMatch(rawText, REGEX.VOTING_BOOTH.VOTE_MONSTER_UNIQUE) ||
    [];
  return allMonsters.map((votingText) =>
    regexUtils.findMatcher(votingText, REGEX.VOTING_BOOTH.VOTE_MONSTER_COMBAT),
  );
}
/**
 * @param {string} rawText
 * @returns {string[]}
 */
export function parseCargoPockets(rawText) {
  const allResults =
    regexUtils.getRegexMatch(
      rawText,
      REGEX.CARGO_CULTIST_SHORTS.PICK_POCKET_RESULT,
    ) || [];
  return allResults;
}

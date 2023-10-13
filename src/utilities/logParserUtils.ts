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
import { isNotNull } from "./lib";

const MAX_CHAR_COUNT = 5000000;
const MIN_CHAR_COUNT = 5;

/**
 * core parsing handler - start here
 */
export async function parseLogTxt(
  rawText: string,
  config: Record<string, any>,
) {
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
 */
export function findAscensionLog(rawText: string) {
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

export function parseAscensionAttributes(rawText: string) {
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

export function parseDailyAttributes(rawText: string) {
  return {
    voterMonsters: parseVoteMonster(rawText),
    cargoPockets: parseCargoPockets(rawText),
  };
}
/**
 * creates a list of Entry class,
 *  which will have parsed an entry's data
 */
export async function parseLogArray(
  logArray: string[],
  startIdx: number,
  config: Record<string, any>,
) {
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
 */
export function pregroupRawLog(rawText: string) {
  return PREGROUP_REGEX_LIST.reduce((accumulatedText, preparseRegex) => {
    const pregroupMatches = accumulatedText.match(preparseRegex) || [];
    while (pregroupMatches.length > 0) {
      const nextText = pregroupMatches.shift()!;
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
export function presplitRawLog(rawText: string) {
  return SPLIT_REGEX_LIST.reduce((accumulatedText, regex) => {
    return accumulatedText.replace(regex, "\n\n");
  }, rawText);
}
/**
 * remove stuff that the parser will be completely ignoring
 * @param {String} rawText
 * @return {String}
 */
export async function cleanRawLog(rawText: string) {
  let cleanedText = rawText.slice();

  const cleaningBatcher = new Batcher(PREREMOVE_REGEX_LIST, {
    batchSize: 5,
    batchDelay: CLEAN_RAW_DELAY,
  });
  await cleaningBatcher.run<string>(async (removalRegexGroup) => {
    cleanedText = removalRegexGroup
      .filter(isNotNull)
      .reduce((accumulatedText, removalRegex) => {
        return accumulatedText.replace(removalRegex, "");
      }, cleanedText);

    return [cleanedText]; // this return is superficial, just for Batcher's logging
  });

  return cleanedText;
}
/**
 * remove some text from the log after the log has been parsed for data
 */
export async function postParseCleanup(rawText: string) {
  // hide karma numbers
  rawText = rawText.replace(REGEX.ASCENSION.KARMA_TEXT, "<3");

  // remove the starting generated block
  rawText = rawText.replace(REGEX.MAFIOSO.GENERATED_BLOCK_START, "");

  // replace all the stuff under "Player Snapshot"
  rawText = rawText.replace(
    REGEX.SNAPSHOT.WTF_SNAPSHOT_REPLACER_CAPTURE_GROUP,
    (_match, p1, p2) => {
      return `<mafioso>\n${p1}\n${p2}\n</mafioso>\n`;
    },
  );

  return rawText;
}

export function createPathLabel(rawText?: string | null) {
  const difficultyName = parseDifficultyName(rawText);
  const pathName = parsePathName(rawText);
  const difficultyAbbr = DIFFICULTY_MAP[difficultyName];
  const pathAbbr = PATH_MAP[pathName];
  return `${difficultyAbbr}_${pathAbbr}`.toUpperCase();
}

export function parseDifficultyName(rawText?: string | null) {
  const ascensionDetails =
    rawText?.match(REGEX.ASCENSION.ASCENSION_DETAIL_GROUP) || [];
  return (ascensionDetails?.[1] ?? "Casual") as keyof typeof DIFFICULTY_MAP;
}

export function parseStandardSeason(rawText?: string | null) {
  const standardSeasonMatch = rawText?.match(REGEX.MAFIOSO.STANDARD_BLOCK);
  if (standardSeasonMatch) {
    return standardSeasonMatch[0];
  }

  return "Unrestricted";
}

export function parsePathName(rawText?: string | null): keyof typeof PATH_MAP {
  const badMoonDetails = rawText?.match(REGEX.ASCENSION.BAD_MOON_DETAILS);
  if (badMoonDetails) {
    return "Bad Moon";
  }

  const edTheUndyingDetails = rawText?.match(
    REGEX.ASCENSION.ED_THE_UNDYING_DETAILS,
  );
  if (edTheUndyingDetails) {
    return "Actually Ed the Undying";
  }

  const ascensionDetails =
    rawText?.match(REGEX.ASCENSION.ASCENSION_DETAIL_GROUP) || [];
  return (ascensionDetails?.[2] ?? "No-Path") as keyof typeof PATH_MAP;
}

export function parseClassName(rawText: string) {
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

export function parseVoteMonster(rawText: string) {
  const allMonsters =
    regexUtils.getRegexMatch(rawText, REGEX.VOTING_BOOTH.VOTE_MONSTER_UNIQUE) ||
    [];
  return allMonsters
    .map((votingText) =>
      regexUtils.findMatcher(
        votingText,
        REGEX.VOTING_BOOTH.VOTE_MONSTER_COMBAT,
      ),
    )
    .filter(isNotNull);
}

export function parseCargoPockets(rawText: string) {
  return (
    regexUtils
      .getRegexMatch(rawText, REGEX.CARGO_CULTIST_SHORTS.PICK_POCKET_RESULT)
      ?.filter(isNotNull) || []
  );
}

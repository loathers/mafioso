import { v4 as uuidv4 } from 'uuid';

import Batcher from 'classes/Batcher';
import Entry from 'classes/Entry';

import {
  PREREMOVE_REGEX_LIST,
  PREGROUP_REGEX_LIST,
  SPLIT_REGEX_LIST,
  FULL_PARSE_DELAY,
  CLEAN_RAW_DELAY,
} from 'constants/DEFAULTS';
import REGEX, {DIVIDING_NEWLINE_REGEX} from 'constants/REGEXES';
import {DIFFICULTY_MAP, PATH_MAP} from 'constants/ABBREVIATION_MAP';

import * as logDateUtils from 'utilities/logDateUtils';
import * as regexUtils from 'utilities/regexUtils';

const MAX_CHAR_COUNT = 6000000;
const MIN_CHAR_COUNT = 5;

/**
 * core parsing handler - start here
 *
 * @param {String} rawText
 * @return {Array<Entry>}
 */
export async function parseLogTxt(rawText) {
  try {
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
      .replace(DIVIDING_NEWLINE_REGEX, '}{')
      .split('}{');

    // prepare Batcher
    const rawVal = Math.sqrt(rawSize);
    const newBatchSize = Math.round(1000 - rawVal);
    const BATCH_SIZE = Math.max(100, newBatchSize);
    const entryBatcher = new Batcher(rawEntries, {batchSize: BATCH_SIZE, batchDelay: FULL_PARSE_DELAY});

    // create the Entry class for each entry text, which will then further parse their data
    const allEntries = await entryBatcher.run((logGroup, startIdx) => parseLogArray(logGroup, startIdx));
    return allEntries;

  } catch (e) {
    throw e;
  }
}
/**
 * finds the specific ascension session from given string
 *
 * @string {String} rawText
 * @returns {String | null}
 */
export function findAscensionLog(rawText) {
  const logStartText = handleLogStart(rawText);
  if (logStartText === null) {
    return null;
  }

  const scotchLogAscension = rawText.match(REGEX.ASCENSION.SCOTCH_LOG_ASCENSION);
  if (scotchLogAscension) {
    return logStartText + scotchLogAscension[0];
  }

  const fromValhallaToFreeKing = rawText.match(REGEX.ASCENSION.VALHALLA_COMPLETE);
  if (fromValhallaToFreeKing) {
    return logStartText + fromValhallaToFreeKing[0];
  }

  const fromValhallaToThwaitgold = rawText.match(REGEX.ASCENSION.THWAITGOLD_COMPLETE);
  if (fromValhallaToThwaitgold) {
    return logStartText + fromValhallaToThwaitgold[0];
  }

  const newAscensionToKing = rawText.match(REGEX.ASCENSION.REGULAR_COMPLETE);
  if (newAscensionToKing) {
    return logStartText + newAscensionToKing[0];
  }

  return null;
}
/**
 * create a <mafioso> block because the snapshot date
 *  might be cut off from the rest of the ascension
 *
 * @string {String} rawText
 * @returns {String | null}
 */
export function handleLogStart(rawText) {
  // -- start with finding out what the start date was
  const firstDate = logDateUtils.findRealDates(rawText);
  const startDateText = firstDate.length > 0 ? firstDate[0] : 'Missing!';

  // -- generate the block
  const formattedStart = `<mafioso>
    Start Date: ${startDateText}
  </mafioso>\n\n`;

  return formattedStart;
}
/**
 * @param {String} rawText
 * @returns {AscensionAttributes}
 */
export function parseAscensionAttributes(rawText) {
  const characterNameMatch = rawText.match(REGEX.CHARACTER.CHARACTER_NAME) || rawText.match(REGEX.CHARACTER.CHARACTER_NAME_FROM_COMBAT) || [];
  const ascensionNumMatch = rawText.match(REGEX.ASCENSION.ASCENSION_NUMBER) || [];
  const ascensionDetails = rawText.match(REGEX.ASCENSION.ASCENSION_DETAIL_GROUP) || [];
  const isBadMoon = rawText.match(REGEX.ASCENSION.ASCENSION_BAD_MOON) !== null;

  return {
    characterName: characterNameMatch[0],
    className: ascensionDetails[3],
    ascensionNum: ascensionNumMatch[0] || undefined,
    difficultyName: ascensionDetails[1],
    pathName: isBadMoon ? 'Bad Moon' : ascensionDetails[2],
  }
}
/**
 * @param {String} rawText
 * @returns {AscensionAttributes}
 */
export function parseDailyAttributes(rawText) {
  return {
    voterMonsters: parseVoteMonster(rawText),
    cargoPockets: parseCargoPockets(rawText),
  }
}
/**
 * creates a list of Entry class,
 *  which will have parsed an entry's data
 *
 * @async
 * @param {Array<String>} logArray
 * @param {Number} startIdx
 * @returns {Array<Entry>}
 */
export function parseLogArray(logArray, startIdx) {
  return logArray.map((rawText, idx) => new Entry({
    entryIdx: startIdx + idx,
    entryId: `${startIdx + idx}_${uuidv4()}`,
    rawText: rawText,
  }));
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
      const groupedText = nextText.replace(DIVIDING_NEWLINE_REGEX, '\n');
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
    return accumulatedText.replace(regex, '\n\n');
  }, rawText);
}
/**
 * remove stuff that the parser will be completely ignoring
 * @param {String} rawText
 * @return {String}
 */
export async function cleanRawLog(rawText) {
  let cleanedText = rawText.slice();

  const cleaningBatcher = new Batcher(PREREMOVE_REGEX_LIST, {batchSize: 1, batchDelay: CLEAN_RAW_DELAY});
  await cleaningBatcher.run((removalRegexGroup) => {
    cleanedText = cleanedText.replace(removalRegexGroup[0], '');
    return cleanedText; // this return is superficial, just for Batcher's logging
  });

  return cleanedText;
}
/**
 * remove some text from the log after the log has been parsed for data
 * @param {String} rawText
 * @return {String}
 */
export async function postParseCleanup(rawText) {
  rawText = rawText.replace(REGEX.ASCENSION.KARMA_TEXT, '<3');

  // replace all the stuff under "Player Snapshot"
  return rawText.replace(REGEX.SNAPSHOT.WTF_SNAPSHOT_REPLACER_CAPTURE_GROUP, (match, p1, p2) => {
    return `<mafioso>\n${p1}\n${p2}\n</mafioso>\n`;
  });
}
// -- parsing specific data
/**
 * @param {Text} rawText
 * @returns {String}
 */
export function createPathLabel(rawText) {
  const difficultyName = parseDifficultyName(rawText);
  const pathName = parsePathName(rawText);
  const difficultyAbbr = DIFFICULTY_MAP[difficultyName];
  const pathAbbr = PATH_MAP[pathName];
  return (`${difficultyAbbr}_${pathAbbr}`).toUpperCase();
}
/**
 * @param {Text} rawText
 * @returns {String}
 */
export function parseDifficultyName(rawText) {
  const ascensionDetails = rawText.match(REGEX.ASCENSION.ASCENSION_DETAIL_GROUP) || [];
  return ascensionDetails[1];
}
/**
 * @param {Text} rawText
 * @returns {String}
 */
export function parsePathName(rawText) {
  const ascensionDetails = rawText.match(REGEX.ASCENSION.ASCENSION_DETAIL_GROUP) || [];
  return ascensionDetails[2];
}
/**
 * @param {Text} rawText
 * @returns {String}
 */
export function parseVoteMonster(rawText) {
  const allMonsters = regexUtils.getRegexMatch(rawText, REGEX.VOTING_BOOTH.VOTE_MONSTER_UNIQUE) || [];
  return allMonsters.map((votingText) => regexUtils.findMatcher(votingText, REGEX.VOTING_BOOTH.VOTE_MONSTER_COMBAT));
}
/**
 * @param {Text} rawText
 * @returns {String}
 */
export function parseCargoPockets(rawText) {
  const allResults = regexUtils.getRegexMatch(rawText, REGEX.CARGO_CULTIST_SHORTS.PICK_POCKET_RESULT) || [];
  return allResults;
}

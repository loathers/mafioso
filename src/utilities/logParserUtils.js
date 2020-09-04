import { v4 as uuidv4 } from 'uuid';

import Batcher from 'classes/Batcher';
import Entry from 'classes/Entry';

import {
  PREREMOVE_REGEX_LIST,
  PREGROUP_REGEX_LIST,
  FULL_PARSE_DELAY,
  CLEAN_RAW_DELAY,
} from 'constants/DEFAULTS';
import REGEX, {DIVIDING_NEWLINE_REGEX} from 'constants/REGEXES';
import {DIFFICULTY_MAP, PATH_MAP} from 'constants/ABBREVIATION_MAP';

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
    console.log(`%c(log has ${rawSize} characters)`, 'color: #6464ff');

    // combine some text ahead of time
    const preparsedLog = pregroupRawLog(rawText);

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
  // because the snapshot date might be cut off from the rest of the ascension,
  //  capture it here ahead of time to be certain that we have it
  const snapshotDate = rawText.match(REGEX.SNAPSHOT.SNAPSHOT_DATE);
  const formattedDate = snapshotDate ? `<mafioso>\nLog Start: ${snapshotDate[0]}\n<mafioso/>\n\n` : '';

  const scotchLogStart = rawText.match(REGEX.ASCENSION.SCOTCH_LOG_ASCENSION);
  if (scotchLogStart) {
    return scotchLogStart[0];
  }

  const fromValhallaToFreeKing = rawText.match(REGEX.ASCENSION.VALHALLA_COMPLETE);
  if (fromValhallaToFreeKing) {
    return formattedDate + fromValhallaToFreeKing[0];
  }

  const fromValhallaToThwaitgold = rawText.match(REGEX.ASCENSION.THWAITGOLD_COMPLETE);
  if (fromValhallaToThwaitgold) {
    return formattedDate + fromValhallaToThwaitgold[0];
  }

  const newAscensionToKing = rawText.match(REGEX.ASCENSION.REGULAR_COMPLETE);
  if (newAscensionToKing) {
    return formattedDate + newAscensionToKing[0];
  }

  return null;
}
/**
 * @param {String} rawText
 * @returns {AscensionAttributes}
 */
export function parseAscensionAttributes(rawText) {
  const characterNameMatch = rawText.match(REGEX.CHARACTER.CHARACTER_NAME) || [];
  const classNameMatch = rawText.match(REGEX.CHARACTER.CLASS_NAME) || [];
  const ascensionNumMatch = rawText.match(REGEX.ASCENSION.ASCENSION_NUMBER) || [];

  return {
    characterName: characterNameMatch[0] || '?name',
    className: classNameMatch[0] || '?class',
    ascensionNum: ascensionNumMatch[0] || undefined,
    difficultyName: parseDifficultyName(rawText),
    pathName: parsePathName(rawText),
    voterMonsters: parseVoteMonster(rawText),
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

  // replace text under "Beginning New Ascension"
  const ascensionDetailGroup = regexUtils.findMatcher(rawText, REGEX.ASCENSION.ASCENSION_DETAIL_GROUP);
  const ascensionDetailReplacement = ascensionDetailGroup ? `<mafioso>\n${ascensionDetailGroup}</mafioso>` : '';
  rawText = rawText.replace(REGEX.SNAPSHOT.BEGIN_ASCENSION_SNAPSHOT, ascensionDetailReplacement);

  // replace all the stuff under "Player Snapshot"
  return rawText.replace(REGEX.SNAPSHOT.WTF_SNAPSHOT_REPLACER_CAPTURE_GROUP, (match, p1, p2) => {
    return `<mafioso>\n${p1}\n${p2}\n</mafioso>\n`;
  });
}
// -- parsing specific data
/**
 * @param {String} rawText
 * @returns {Array<KolDate>}
 */
export function findAllDates(rawText) {
  return rawText
    .match(REGEX.SNAPSHOT.KOL_DATE)
    .reduce((dateArray, dateText) => {
      if (!dateArray.includes(dateText)) {
        dateArray = dateArray.push(dateText);
      }

      return dateArray;
    }, []);
}
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
  return regexUtils.findMatcher(rawText, REGEX.ASCENSION.DIFFICULTY_NAME);
}
/**
 * @param {Text} rawText
 * @returns {String}
 */
export function parsePathName(rawText) {
  return regexUtils.findMatcher(rawText, REGEX.ASCENSION.PATH_NAME);
}
/**
 * @param {Text} rawText
 * @returns {String}
 */
export function parseVoteMonster(rawText) {
  const allMonsters = regexUtils.getRegexMatch(rawText, REGEX.VOTING_BOOTH.VOTE_MONSTER_UNIQUE);
  return allMonsters.map((votingText) => regexUtils.findMatcher(votingText, REGEX.VOTING_BOOTH.VOTE_MONSTER_COMBAT));
}

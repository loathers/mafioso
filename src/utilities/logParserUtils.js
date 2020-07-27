import { v4 as uuidv4 } from 'uuid';

import Batcher from 'classes/Batcher';
import Entry from 'classes/Entry';

import {PREREMOVE_REGEX_LIST, PREGROUP_REGEX_LIST} from 'constants/DEFAULTS';
import REGEX, {EMPTY_LINES_REGEX} from 'constants/regexes';

const logId = uuidv4();

/**
 * core parsing handler - start here
 * 
 * @param {String} rawText
 * @return {Array<Entry>}
 */
export async function parseLogTxt(rawText) {
  try {
    const rawCleaned = await cleanRawLog_debounced(rawText);
    const rawSize = rawCleaned.length;
    if (rawSize > 10000000) {
      throw new Error(`This log of ${rawSize} characters is too huge!`);
    }

    const preparsedLog = pregroupRawLog(rawCleaned);
    const rawArray = preparsedLog
      .replace(EMPTY_LINES_REGEX, '}{')
      .split('}{');

    if (rawArray.length <= 1) {
      // throw new Error('Not enough data on log.');
    }

    const BATCH_SIZE = calculateBatchSize(rawSize);
    console.log(`%c(log has ${rawSize} characters)`, 'color: #6464ff');

    const entryBatcher = new Batcher(rawArray, {batchSize: BATCH_SIZE});
    const allEntries = await entryBatcher.run((logGroup, startIdx) => parseLogArray(logGroup, startIdx));

    return allEntries;

  } catch (e) {
    console.error(e);
  }
}
/**
 * finds the specific ascension session from given string
 *
 * @string {String} rawText
 * @returns {String | null} 
 */
export function findAscensionLog(rawText) {
  const ascensionMatch = rawText.match(REGEX.GROUP.COMPLETE_ASCENSION);
  if (ascensionMatch !== null) {
    return ascensionMatch[0];
  
  } else {
    return null;
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
    entryId: `${startIdx + idx}_${logId}`,
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
      const groupedText = nextText.replace(EMPTY_LINES_REGEX, '\n');
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
export async function cleanRawLog_debounced(rawText) {
  let cleanedText = rawText.slice();

  const cleaningBatcher = new Batcher(PREREMOVE_REGEX_LIST, {batchSize: 1});
  await cleaningBatcher.run((removalRegexGroup) => {
    cleanedText = cleanedText.replace(removalRegexGroup[0], '');
    return cleanedText; // this return is superficial, just for Batcher's logging
  });

  return cleanedText;
}
/**
 * remove stuff that the parser will be completely ignoring
 * @param {String} rawText
 * @return {String}
 */
export function cleanRawLog(rawText) {
  return PREREMOVE_REGEX_LIST.reduce((currentText, replacementRegex) => {
    return currentText.replace(replacementRegex, '');
  }, rawText);    
}
/**
 * update batch size based on number of characters in the log
 *  this calculation is not very scientific
 *  
 * @param {Number} rawSize
 */
function calculateBatchSize(rawSize) {
  const rawVal = Math.sqrt(rawSize);
  const newBatchSize = Math.round(1000 - rawVal);
  return Math.max(100, newBatchSize);
}

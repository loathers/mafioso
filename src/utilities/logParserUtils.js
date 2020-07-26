import { v4 as uuidv4 } from 'uuid';

import Batcher from 'classes/Batcher';
import LogEntry from 'classes/LogEntry';

import {PREREMOVE_REGEX_LIST, PREGROUP_REGEX_LIST} from 'constants/DEFAULTS';
import {EMPTY_LINES_REGEX} from 'constants/regexes';

const logId = uuidv4();

/**
 * core parsing handler - start here
 * 
 * @param {String} rawText
 * @return {Array<LogEntry>}
 */
export async function parseLogTxt(rawText) {
  try {
    const rawCleaned = cleanRawLog(rawText);
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

    const entryBatcher = new Batcher(rawArray, {batchSize: BATCH_SIZE, batchDelay: 10});
    const logEntries = await entryBatcher.run((logGroup, startIdx) => parseLogArray(logGroup, startIdx));

    return logEntries;

  } catch (e) {
    console.error(e);
  }
}
/** 
 * creates a list of LogEntry class, 
 *  which will have parsed an entry's data 
 * 
 * @async
 * @param {Array<String>} logArray
 * @param {Number} startIdx
 * @returns {Array<LogEntry>}
 */
export function parseLogArray(logArray, startIdx) {
  return logArray.map((rawText, idx) => new LogEntry({
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

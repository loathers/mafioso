import { v4 as uuidv4 } from 'uuid';

import LogEntry from 'classes/LogEntry';

import REGEX, {EMPTY_LINES_REGEX} from 'constants/regexes';

const logId = uuidv4();
const PARSE_DELAY = 10; // ms

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

    const preparsedLog = pregroupRawLog(prescrubRawLog(rawCleaned));

    const rawArray = preparsedLog
      .replace(EMPTY_LINES_REGEX, '}{')
      .split('}{');

    if (rawArray.length <= 1) {
      throw new Error('Not enough data on log.');
    }

    const BATCH_SIZE = calculateBatchSize(rawSize);
    console.log(`(log has ${rawSize} characters)`);

    const logEntries = await parseRawArray(rawArray, {batchSize: BATCH_SIZE});
    return logEntries;

  } catch (e) {
    console.error(e);
  }
}
/** 
 * parses an array of raw strings
 * @param {Array<String>} rawArray
 * @param {Object} [options]
 * @returns {Array<LogEntry>}
 */
export async function parseRawArray(rawArray, options = {}) {
  const {
    batchSize = 100,
  } = options;

  let logEntries = [];

  // calculate size of batches for performance
  const batchCount = Math.ceil(rawArray.length / batchSize);
  for (let i = 0; i < batchCount; i++) {
    const startIdx = i * batchSize;
    const endIdx = startIdx + batchSize;
    const logGroup = rawArray.slice(startIdx, endIdx);
    const parsedGroup = await parseLogArray(logGroup, startIdx);

    logEntries = logEntries.concat(parsedGroup);
    console.log(`... Batch #${i+1} parsed (${parsedGroup.length} entries)`);
  }

  return logEntries;
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
  return new Promise((resolve) => {
    const parsedLogArray = logArray.map((rawText, idx) => new LogEntry({
      entryIdx: startIdx + idx,
      entryId: `${startIdx + idx}_${logId}`,
      rawText: rawText,
    }));

    setTimeout(() => resolve(parsedLogArray), PARSE_DELAY);
  })
}
/**
 * do some stuff before splitting up the entries
 * @param {String} rawText
 * @return {String}
 */
export function prescrubRawLog(rawText) {
  const regexToPrescrub = [
    REGEX.GROUP.MOON_SNAPSHOT,
    REGEX.GROUP.STATUS_SNAPSHOT,
    REGEX.GROUP.EQUIPMENT_SNAPSHOT,
    REGEX.GROUP.SKILLS_SNAPSHOT,
    REGEX.GROUP.EFFECTS_SNAPSHOT,
    REGEX.GROUP.MODIFIERS_SNAPSHOT,
  ];

  return regexToPrescrub.reduce((accumulatedText, preparseRegex) => {
    const prescrubMatches = accumulatedText.match(preparseRegex) || [];
    while (prescrubMatches.length > 0) {
      const nextText = prescrubMatches.shift();
      const groupedText = nextText.replace(EMPTY_LINES_REGEX, '\n');
      accumulatedText = accumulatedText.replace(nextText, groupedText);
    }

    return accumulatedText;
  }, rawText);
}
/**
 * group some text as an entry before splitting
 * @param {String} rawText
 * @return {String}
 */
export function pregroupRawLog(rawText) {
  const regexToPregroup = [
    REGEX.GROUP.SAME_AFTER_BATTLE,
  ];

  return regexToPregroup.reduce((accumulatedText, preparseRegex) => {
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
  return rawText
    .replace(REGEX.MISC.STACK_TRACE, '')
    .replace(REGEX.MISC.SEND_A_KMAIL, '')
    .replace(REGEX.MISC.EMPTY_CHECKPOINT, '')
    .replace(REGEX.MISC.COMBAT_MACRO, '')
    .replace(REGEX.MISC.MAFIA_CHOICE_URL, '')
    .replace(REGEX.MISC.MAFIA_MAXIMIZER, '')
    .replace(REGEX.MISC.LOG_BORDER, '');
}
/**
 * update batch size based on number of characters in the log
 *  this calculation is not very scientific
 *  
 * @param {Number} rawSize
 */
function calculateBatchSize(rawSize) {
  const rawVal = Math.sqrt(rawSize);
  const newBatchSize = Math.round(1200 - rawVal);
  return Math.max(100, newBatchSize);
}

import { v4 as uuidv4 } from 'uuid';

import LogEntry from 'classes/LogEntry';

import REGEX, {
  EMPTY_LINES_REGEX, 
  PRE_LINE_EMPTY_SPACE,
  POST_LINE_EMPTY_SPACE,
} from 'constants/regexes';

const logId = uuidv4();
const PARSE_DELAY = 10; // ms

// strings we are going to remove from the ahead of time
const PREREMOVE_REGEX_LIST = [
  REGEX.MISC.STACK_TRACE,
  REGEX.MISC.CLI_PRINT,
  REGEX.MISC.SEND_A_KMAIL,
  REGEX.MISC.EMPTY_CHECKPOINT,
  REGEX.MISC.COMBAT_MACRO,
  REGEX.MISC.MAFIA_CHOICE_URL,
  REGEX.MISC.MAFIA_MAXIMIZER,
  REGEX.MISC.LOG_BORDER,
  REGEX.LINE.MCD_CHANGE,
  REGEX.LINE.UNAFFECT,
  REGEX.LINE.TELESCOPE,
  REGEX.LINE.SWIMMING_POOL,
  PRE_LINE_EMPTY_SPACE,
  POST_LINE_EMPTY_SPACE,
];
// strings we are going to group together
const PREGROUP_REGEX_LIST = [
  REGEX.GROUP.MOON_SNAPSHOT,
  REGEX.GROUP.STATUS_SNAPSHOT,
  REGEX.GROUP.EQUIPMENT_SNAPSHOT,
  REGEX.GROUP.SKILLS_SNAPSHOT,
  REGEX.GROUP.EFFECTS_SNAPSHOT,
  REGEX.GROUP.MODIFIERS_SNAPSHOT,
  REGEX.GROUP.SAME_AFTER_BATTLE,
  REGEX.VOTING_BOOTH.GROUPING,
  REGEX.GOD_LOBSTER.GROUPING,
  REGEX.BOXING_DAYCARE.GROUPING,
];

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

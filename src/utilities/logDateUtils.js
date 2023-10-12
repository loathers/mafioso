import REGEX from '../constants/REGEXES';

/**
 * @param {String} rawText
 * @returns {Array<Date>}
 */
export function findRealDates(rawText) {
  const allDates = rawText.match(REGEX.SNAPSHOT.REAL_DATE) || [];
  return allDates.filter((date, idx) => allDates.indexOf(date) === idx);
}
/**
 * @param {String} rawText
 * @returns {Array<KolDate>}
 */
export function findFirstDate(rawText) {
  const snapshotDate = rawText.match(REGEX.SNAPSHOT.SNAPSHOT_DATE);
  if (snapshotDate) {
    return snapshotDate[0];
  }

  const scotchDate = rawText.match(REGEX.SNAPSHOT.SCOTCH_LOG_DATE);
  if (scotchDate) {
    return scotchDate[0];
  }

  const kolDate = rawText.match(REGEX.SNAPSHOT.KOL_DATE);
  if (kolDate) {
    return kolDate[0];
  }

  const realDates = findRealDates(rawText);
  if (realDates) {
    return realDates[0];
  }

  return undefined;
}

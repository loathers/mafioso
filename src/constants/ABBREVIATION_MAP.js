/**
 * @returns {String}
 */
export function createAbbreviation(difficultyName = '', pathName = '') {
  const difficultyAbbr = DIFFICULTY_MAP[difficultyName.toLowerCase()];
  const pathAbbr = PATH_MAP[pathName.replace(' ', '_').toLowerCase()];
  return (`${difficultyAbbr}-${pathAbbr}`).toUpperCase();
}
/**
 * @typedef {String} DifficultyName
 * @typedef {String} DifficultyAbbr
 */
export const DIFFICULTY_MAP = {
  hardcore: 'HC',
  softcore: 'SC',
  casual: 'CAS',
};
/**
 * @typedef {String} PathName
 * @typedef {String} PathAbbr
 */
export const PATH_MAP = {
  standard: 'STD',
  low_key_summer: 'LKS',
  community_service: 'CS',
};
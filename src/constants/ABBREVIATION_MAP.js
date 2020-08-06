/**
 * @returns {String}
 */
export function createAbbreviation(difficultyName = '', pathName = '') {
  const difficultyAbbr = DIFFICULTY_MAP[difficultyName.toLowerCase()];
  const pathAbbr = PATH_MAP[pathName];
  return (`${difficultyAbbr}_${pathAbbr}`).toUpperCase();
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
  'Standard': 'STD',
  'Low Key Summer': 'LKS',
  'Path of the Plumber': 'PLUMB',
  'Kingdom of Exploathing': 'EXPLO',
  'Two Crazy Random Summer': '2CRS',
  'Dark Gyffte': 'DG',
  'Disguises Delimit': 'DD',
  'G-Lover': 'GLOV',
  'Pocket Familiars': 'POKEFAM',
  'Live. Ascend. Repeat.': 'LAR',
  'Gelatinous Noob': 'GN',
  'Nuclear Autumn': 'NA',
  'The Source': 'SRC',
  'Avatar of West of Loathing': 'AOWOL',
  'Community Service': 'CS',
  'One Crazy Random Summer': '1CRS',
  'Actually Ed the Undying': 'ED',
  'Picky': 'PICKY',
  'Heavy Rains': 'HR',
  'Slow and Steady': 'S&S',
  'Avatar of Sneaky Pete': 'PETE',
  'Class Act II: A Class For Pigs': 'CAII',
  'KOLHS': 'KOLHS',
  'BIG!': 'BIG',
  'Avatar of Jarlsberg': 'JARLS',
  'Class Act': 'CA',
  'Zombie Slayer': 'ZS',
  'Bugbear Invasion': 'BI',
  'Avatar of Boris': 'BORIS',
  'Trendy': 'TREND',
  'Way of the Surprising Fist': 'FIST',
  'Bees Hate You': 'BEES',
  'Oxygenarian': 'OXY',
  'Boozetafarian': 'BOOZE',
  'Teetotaler': 'TEET',
};
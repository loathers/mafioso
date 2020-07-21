/**
 * (there are many different types of string matching methods
 *  I might want to do a lot of swapping around to test efficiency)
 * 
 * @param {String} searchStr
 * @param {String} matchStr
 * @return {*}
 */
export function getRegexMatch(searchStr, matchStr) {
  return searchStr.match(new RegExp(matchStr));
}
/**
 * @param {String} searchStr
 * @param {String} matchStr
 * @return {Boolean}
 */
export function hasString(searchStr, matchStr) {
  return new RegExp(matchStr).test(searchStr);
}
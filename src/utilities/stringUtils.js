/**
 * (there are many different types of string matching methods
 *  I might want to do a lot of swapping around to test efficiency)
 * 
 * @param {String} searchStr
 * @param {String} matchStr
 * @return {Boolean}
 */
export function hasString(searchStr, matchStr) {
  // return searchStr.indexOf(matchStr) !== -1;
  return searchStr.match(new RegExp(matchStr));
}
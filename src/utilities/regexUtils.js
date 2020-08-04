/**
 * @param {Matcher} matcher
 * @return {String|null}
 */
export function findMatcher(searchStr, matcher) {
  // search for result of regex
  if (matcher instanceof RegExp) {
    const matchedText = getRegexMatch(searchStr, matcher) || [];
    return matchedText[0];
  }

  // example: ["I like big {1} and I can not {2}", "butts", "lie"]
  //  results in "I like big butts and I can not lie"
  if (Array.isArray(matcher)) {
    return matcher.reduce((result, innermatcher, idx) => {
      if (idx === 0) {
        return innermatcher;
      }

      const innerResult = findMatcher(searchStr, innermatcher);
      return result.replace(`{${idx}}`, innerResult);
    });
  }

  // not found - undefined
  return undefined;
}
/**
 * (there are many different types of string matching methods
 *  I might want to do a lot of swapping around to test efficiency)
 * 
 * @param {String} searchStr
 * @param {String | Regex} matchRegex
 * @param {String} [regexFlags]
 * @return {Array<String>}
 */
export function getRegexMatch(searchStr, matchRegex, regexFlags) {
  if (matchRegex instanceof RegExp) {
    return searchStr.match(matchRegex);
  }

  return searchStr.match(new RegExp(matchRegex, regexFlags));
}
/**
 * @param {String} searchStr
 * @param {String} matchStr
 * @return {Boolean}
 */
export function hasString(searchStr, matchStr) {
  return new RegExp(matchStr).test(searchStr);
}
/**
 * @param {String} sourceStr
 * @return {Number}
 */
export function countNumLines(sourceStr) {
  const newLineMatches = sourceStr.match(/\r?\n/g);
  if (newLineMatches === null) {
    return 1;
  }

  return newLineMatches.length + 1;
}
/**
 * @param {String} sourceStr
 * @return {String}
 */
export function fixSpecialEntities(sourceStr) {
  return sourceStr
    .replace(/&ouml;/g, 'ö')
    .replace(/&eacute;/g, 'é')
    .replace(/&oacute;/g, 'ó')
    .replace(/&trade;/g, '™')
    .replace(/&quot;/g, '"');
}
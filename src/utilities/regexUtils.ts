type SingleMatcher = RegExp | string;
export type Matcher = SingleMatcher | SingleMatcher[];

export function findMatcher(
  searchStr: string,
  matcher: Matcher,
): string | undefined {
  // search for result of regex
  if (matcher instanceof RegExp) {
    const matchedText = getRegexMatch(searchStr, matcher) || [];
    return matchedText[0];
  }

  // example: ["I like big {1} and I can not {2}", "butts", "lie"]
  //  results in "I like big butts and I can not lie"
  if (Array.isArray(matcher)) {
    return matcher.reduce<string>((acc, innermatcher, idx) => {
      if (idx === 0 && typeof innermatcher === "string") {
        return innermatcher;
      }

      const innerResult = findMatcher(searchStr, innermatcher);
      return acc.replace(`{${idx}}`, innerResult || "");
    }, "");
  }

  // not found - undefined
  return undefined;
}
/**
 * (there are many different types of string matching methods
 *  I might want to do a lot of swapping around to test efficiency)
 */
export function getRegexMatch(
  searchStr: string,
  matchRegex: SingleMatcher,
  regexFlags?: string,
) {
  if (matchRegex instanceof RegExp) {
    return searchStr.match(matchRegex);
  }

  return searchStr.match(new RegExp(matchRegex, regexFlags));
}

export function hasString(searchStr: string, matchStr: SingleMatcher) {
  return new RegExp(matchStr).test(searchStr);
}

export function countNumLines(sourceStr: string) {
  const newLineMatches = sourceStr.match(/\r?\n/g);
  if (newLineMatches === null) {
    return 1;
  }

  return newLineMatches.length + 1;
}

export function fixSpecialEntities(sourceStr: string) {
  return sourceStr
    .replace(/&ouml;/g, "ö")
    .replace(/&eacute;/g, "é")
    .replace(/&oacute;/g, "ó")
    .replace(/&trade;/g, "™")
    .replace(/&quot;/g, '"');
}

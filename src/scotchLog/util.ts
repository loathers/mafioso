/**
    Uses matchers to grab first # from a string. Generally I 
    don't like how unreadable regex-littered scripts become,
    which is why I barely use regex at all in this parser.
*/
function grabNumber(s: string) {
  return Number(s.match(/\d+/)?.[0] ?? "0");
}

/**
 * Function for determining if the item or skill used generated
 * a special flag; sniffs, banishes, & freekills currently
 * supported using the reference lists up top.
 */
function isSpecial(
  s: string,
  type: string,
  list: { name: string; type: string }[],
) {
  return list.find((i) => i.name === s && i.type === type) ? 1 : 0;
}

/**
 * Very simple helper to establish if you are running a free-run fam. Used for "casts RETURN" parsing.
 */
function isRunner(familiar: Familiar) {
  if (familiar === Familiar.get("Frumious Bandersnatch")) return true;
  if (familiar === Familiar.get("Pair of Stomping Boots")) return true;

  // If we didn't hit the right fams, it's false.
  return false;
}

/**
 * Tests to see if the string matches any of my "fake" generated turns. Currently, when I instantiate a "fake" turn, I include a bit at the beginning that identifies exactly what kind of turn it is.
 * @param s Turn text
 * @returns Whether the line is a fake turn
 */
function isFake(s: string) {
  if (s.includes("CONSUME:")) {
    return true;
  }
  if (s.includes("PILLKEEPER:")) {
    return true;
  }
  if (s.includes("THE SIMIAN PAW CURLS:")) {
    return true;
  }
  if (s.includes("HEIST: Stealing an item!")) {
    return true;
  }

  // If it didn't hit the "fake" conditions above, it has
  //   presumably given me its heart & made it real. We
  //   won't forget about it. :'-0
  return false;
}

/*
 * List of substrings to look for when parsing stat gain strings.
 */
const STAT_DICTIONARY = {
  mus: [
    "Beefiness",
    "Fortitude",
    "Muscleboundness",
    "Strengthliness",
    "Strongness",
  ],
  mys: ["Enchantedness", "Magicalness", "Mysteriousness", "Wizardliness"],
  mox: ["Cheek", "Chutzpah", "Roguishness", "Sarcasm", "Smarm"],
};

/**
 * Function for grabbing substat changes. KOL uses a
 * series of known word buckets for mus/mys/mox; this
 * compares against those words & snags the #. Tried
 * to align structure with "isSpecial".
 */
function statChange(text: string, type: "mus" | "mys" | "mox") {
  return STAT_DICTIONARY[type]?.some((s) => text.includes(s))
    ? grabNumber(text)
    : 0;
}

const MAFIA_EPOCH = new Date("20050128");

/**
 * A function to calculate # of days a YYYYMMDD date string is from today's date.
 * @param usersDate
 * @returns
 */
function daysFromToday(userDateString: string) {
  const today = new Date();
  const userDate = new Date(userDateString);

  // Some simple error checking
  if (!userDate) {
    print(`ERROR: input date (${usersDate}) is not valid.`, "red");
    return 0;
  } else if (userDate > today) {
    print(
      `ERROR: input date (${usersDate}) is in the future, not the past.`,
      "red",
    );
    return 0;
  } else if (userDate < MAFIA_EPOCH) {
    print(
      `ERROR: you're trying to grab a log from before KOLMafia existed (${usersDate}). Calm down, fam.`,
      "red",
    );
    return 0;
  }

  const timeDifference = Math.abs(today.getTime() - userDate.getTime());
  return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}

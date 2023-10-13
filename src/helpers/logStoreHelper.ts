import ENTRY_TYPE from "../constants/ENTRY_TYPE";
import REGEX from "../constants/REGEXES";

import Entry from "../classes/Entry";

import logStore from "../store/logStore";

import * as fileParserUtils from "../utilities/fileParserUtils";
import download from "../utilities/download";
import { isNotNull } from "../utilities/lib";

/**
 * look at each entry and their neighbor in front and see if
 *  they are valid to combine together
 */
export function combineEntries(entriesList: Entry[]) {
  let combinedEntriesList = [];

  const searchEntries = entriesList.slice();
  // const originalLength = entriesList.length;

  // going to look at all the entries,
  while (searchEntries.length > 0) {
    const currEntry = searchEntries.shift();

    if (!currEntry) break;

    const nextEntry = searchEntries.shift();

    // if this is the last entry, we are done
    if (!nextEntry) {
      combinedEntriesList.push(currEntry);
      continue;
    }

    // get the next entry and see if it can combine

    if (currEntry.canCombineWith(nextEntry)) {
      const combinedEntry = new Entry({
        entryId: currEntry.id,
        entryIdx: currEntry.entryIdx,
        rawText: currEntry.rawText.concat("\n\n").concat(nextEntry.rawText),
      });

      // put the newly created entry back to the front of the search
      // just in case it can combine with the next one
      searchEntries.unshift(combinedEntry);
      continue;
    }

    // did not combine, move on
    searchEntries.unshift(nextEntry); // put the next entry back
    combinedEntriesList.push(currEntry);
  }

  // console.log(`%cCombined entries from ${originalLength} to ${combinedEntriesList.length}`, 'color: #6464ff');
  return combinedEntriesList;
}
/**
 * there are some things we're going to guess about an entry
 *  - what day it is on
 *  - turn num, and adjusted if needed
 *  - what familiar was used
 *
 * @param {Array<Entry>} allEntries
 * @returns {Array<Entry>}
 */
export function createEstimatedEntries(allEntries: Entry[]) {
  // all data that is being tracked
  const dateList: string[] = []; // kol dates
  const scotchDayList: string[] = []; // scotchlog day nums
  let prevTurnNum = -1;
  let trackedFamiliar: string | null = null;

  // start
  const conjecturedEntries = allEntries.map((entry, idx) => {
    // find the next entry that is not a free adventure
    const nextEntry = logStore.findNextEntry(idx, { isAdventure: true });

    // update turnNum
    entry = handleEstimateTurnNum(entry, nextEntry);

    // sometimes the last few entries don't have any turns tracked by mafia
    // so we'll just set it equal to our last known turnNum
    if (
      nextEntry === undefined &&
      prevTurnNum > 0 &&
      entry.turnNum &&
      entry.turnNum <= prevTurnNum
    ) {
      // just in case it also costs adventures, add it in
      const extraAdventureChanges =
        entry.adventureChangeValue < 0
          ? Math.abs(entry.adventureChangeValue)
          : 0;
      entry.turnNum = prevTurnNum + extraAdventureChanges;
    }

    // + use entries with the date in them as a point of reference
    const dateMatch = entry.findMatcher(REGEX.SNAPSHOT.KOL_DATE);
    if (dateMatch !== undefined && !dateList.includes(dateMatch)) {
      dateList.push(dateMatch);
    }
    // separately track scotch's DAY START #
    const dayMatch = entry.findMatcher(REGEX.SNAPSHOT.SCOTCH_LOG_DATE);
    if (dayMatch !== undefined && !scotchDayList.includes(dayMatch)) {
      scotchDayList.push(dayMatch);
    }

    // set dayNum of entry
    entry.dayNum = Math.max(dateList.length, scotchDayList.length);

    // + update estimate if familar was swapped to
    if (entry.entryType === ENTRY_TYPE.FAMILIAR) {
      const switchedToFamiliar = entry.findMatcher(
        REGEX.FAMILIAR.SWITCH_TO_RESULT,
      );
      trackedFamiliar = switchedToFamiliar || null;
    }

    // apply trackedFamiliar only if it is a combat
    if (entry.isAdventure) {
      entry.familiarUsed = trackedFamiliar;
    }

    // forced adventures mean they were guaranteed
    entry = handleForcedAdventure(entry, idx);

    // update estimates
    prevTurnNum = entry.turnNum || -1;

    return entry;
  });

  // set dateList
  logStore.ascensionAttributes.dateList =
    dateList.length > scotchDayList.length ? dateList : scotchDayList;
  if (logStore.ascensionAttributes.dateList.length <= 0) {
    handleDateListFallback();
  }

  // done
  return conjecturedEntries;
}
/**
 * double check what mafia thinks this turn number is
 */
function handleEstimateTurnNum(currEntry: Entry, nextEntry?: Entry) {
  const nextTurnNum = nextEntry?.rawTurnNum;
  const myTurnNum = currEntry.turnNum || 0;

  // rawTurnNum means that mafia marked it as an adventure
  if (nextTurnNum) {
    // if the next number is the same as current number, most likely this is a free adv (thanks CaptainScotch!)
    if (nextTurnNum === myTurnNum) {
      currEntry.isInBetweenTurns = true;
      currEntry.turnNum = nextTurnNum - 1;
    }

    // freeing the king doesn't actually take a turn
    if (
      currEntry.entryType === ENTRY_TYPE.QUEST.ASCENSION_END ||
      currEntry.entryType === ENTRY_TYPE.PATH.COMMUNITY_SERVICE.FINAL_SERVICE
    ) {
      currEntry.isInBetweenTurns = true;
      currEntry.turnNum = myTurnNum - 1;
    }

    // I don't have a number, so we'll assume this is before the next adventure
  } else {
    currEntry.turnNum = 0;
  }

  return currEntry;
}
/**
 * find and update data for any adventures that were forced to happen
 * - pill keeper
 * - stench jelly
 */
function handleForcedAdventure(currEntry: Entry, idx: number) {
  // Pill Keeper - Sunday surprise semirare activated
  if (currEntry.hasText(REGEX.PILL_KEEPER.SURPRISE)) {
    const surpriseEntry = logStore.findNextEntry(idx, { isSemirare: true });
    if (surpriseEntry) {
      currEntry.additionalDisplay = `"${surpriseEntry.encounterDisplay}"`;
      surpriseEntry.isForcedAdventure = true;
    }
  }

  // Pill Keeper - Sneakisol activated
  if (currEntry.hasText(REGEX.PILL_KEEPER.SNEAKISOL)) {
    const sneakisolEntry = logStore.findNextEntry(idx, {
      isNonCombatEncounter: true,
      isForcedAdventure: false,
    });
    if (sneakisolEntry) {
      currEntry.additionalDisplay = `"${sneakisolEntry.encounterDisplay}"`;
      sneakisolEntry.isForcedAdventure = true;
    }
  }

  // Stench Jellied activated
  if (currEntry.hasText(REGEX.SPACE_JELLYFISH.ACQUIRED_STENCH_JELLIED_EFFECT)) {
    const stenchedNoncombatEntry = []; // since there can be more than one, keep track until the end

    const acquiredList = currEntry.findMatchers(
      REGEX.SPACE_JELLYFISH.ACQUIRED_STENCH_JELLIED_EFFECT,
    ) || ["once"];
    for (let sj = 0; sj < acquiredList.length; sj++) {
      const stenchEntry = logStore.findNextEntry(idx, {
        isNonCombatEncounter: true,
        isForcedAdventure: false,
      });
      if (stenchEntry) {
        stenchedNoncombatEntry.push(`"${stenchEntry.encounterDisplay}"`);
        stenchEntry.isForcedAdventure = true;
      }
    }

    currEntry.additionalDisplay = `${stenchedNoncombatEntry.join("  &  ")}`;
  }

  // forced friends
  if (
    currEntry.hasText(
      REGEX.FOURTH_OF_MAY_COSPLAY_SABER.USE_THE_FORCE_CHOICE_FRIENDS,
    )
  ) {
    for (let sj = 0; sj < 3; sj++) {
      const friendEntry = logStore.findNextEntry(idx, {
        locationDisplay: currEntry.locationDisplay,
        isCombatEncounter: true,
        isForcedAdventure: false,
      });

      // not found?
      if (friendEntry === undefined) break;

      // mark it as forced
      friendEntry.isForcedAdventure = true;

      // if you used force again here, stop looking for any more
      if (
        friendEntry.hasText(
          REGEX.FOURTH_OF_MAY_COSPLAY_SABER.USE_THE_FORCE_CHOICE_FRIENDS,
        )
      ) {
        break;
      }
    }
  }

  // Portscan - out of The Source
  if (currEntry.hasText(REGEX.SOURCE_TERMINAL.CAST_PORTSCAN)) {
    const portscanEntry = logStore.findNextEntry(idx, {
      isCombatEncounter: true,
      isForcedAdventure: false,
      hasPortscanEncounter: true,
    });
    if (portscanEntry) {
      portscanEntry.isForcedAdventure = true;
    }
  }

  // set the Diabolic Pizza Eat entry's additional display to be the ingredients
  if (currEntry.entryType === ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.MAKE) {
    const pizzaEatEntry = logStore.findNextEntry(idx, {
      entryType: ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.EAT,
    });
    if (pizzaEatEntry) {
      pizzaEatEntry.additionalDisplay = currEntry.additionalDisplay;
    }
  }

  if (
    currEntry.entryType ===
    ENTRY_TYPE.IOTM.COMPREHENSIVE_CARTOGRAPHY.MAP_THE_MONSTER
  ) {
    currEntry.isForcedAdventure = true;
  }

  return currEntry;
}
/**
 * @returns {String}
 */
export function getSessionDateString() {
  if (!logStore.isReady) return;

  const firstFile = logStore.srcFiles[0];
  if (firstFile === undefined) return; // shared files do not have `srcFiles`

  const fileSessionDate = fileParserUtils.getDateFromSessionFile(firstFile);
  if (fileSessionDate) {
    return fileParserUtils.convertDateToString(fileSessionDate);
  }

  const realDateText = logStore.findMatcher(REGEX.SNAPSHOT.REAL_DATE);
  if (realDateText) {
    const realDate = new Date(realDateText);
    return fileParserUtils.convertDateToString(realDate);
  }

  return undefined;
}
/**
 * use dates from uploaded logs if we didn't find in any the rawText itself
 */
function handleDateListFallback() {
  const fileDates = logStore.srcFiles
    .map((srcFile) => fileParserUtils.getDateFromSessionFile(srcFile))
    .filter(isNotNull);
  if (fileDates.length <= logStore.ascensionAttributes.dateList.length) {
    return;
  }

  logStore.ascensionAttributes.dateList = fileDates;
}
// -- utility
/**
 * downloads the current ascension log to user
 */
export function downloadFullLog() {
  if (!logStore.isReady) throw new Error("Log is not ready to be downloaded.");
  download(logStore.export(), logStore.fileName, "text/plain");
}

function findMapTheMonstersOnDay(dayNum: number) {
  const list = [];

  let searchIdx = 0;
  while (searchIdx >= 0) {
    const foundEntry = logStore.findNextEntry(searchIdx, {
      dayNum: dayNum,
      entryType: ENTRY_TYPE.IOTM.COMPREHENSIVE_CARTOGRAPHY.MAP_THE_MONSTER,
    });

    if (foundEntry === undefined) {
      break;
    }

    searchIdx = foundEntry.entryIdx;
    list.push(foundEntry);
  }

  return list;
}

export type Stats = {
  dayNum: number;
  voterMonster?: string;
  paintingMonster?: string;
  cargoPocket?: string;
  latheChoice?: string;
  mapTheMonsterList?: string;
};

/**
 * creates data for StatsPage
 * @returns {Array}
 */
export function createStats() {
  const statsData = []; // final collation of data

  const statDayCount = Math.max(logStore.dayCount, 1);
  for (let i = 0; i < statDayCount; i++) {
    const dayNum = i + 1;

    // this is what will be returned
    const currentData: Stats = {
      dayNum: dayNum,
    };

    if (logStore.ascensionAttributes.voterMonsters.length > 0) {
      currentData["voterMonster"] = logStore.getVoterMonsterOnDay(dayNum);
    }

    if (logStore.ascensionAttributes.cargoPockets.length > 0) {
      currentData["cargoPocket"] = logStore.getCargoPocketOnDay(dayNum);
    }

    const paintingMonsterEntry = logStore.findNextEntry(0, {
      dayNum: dayNum,
      entryType: ENTRY_TYPE.IOTM.CHATEAU_MANTEGNA.PAINTING,
    });
    if (paintingMonsterEntry?.attributes.encounterName) {
      currentData["paintingMonster"] =
        paintingMonsterEntry.attributes.encounterName;
    }

    const lathMakeEntry = logStore.findNextEntry(0, {
      dayNum: dayNum,
      entryType: ENTRY_TYPE.IOTM.SPINMASTER_LATHE.MAKE_ITEM,
    });
    if (lathMakeEntry?.encounterDisplay) {
      currentData["latheChoice"] = lathMakeEntry.encounterDisplay;
    }

    const cartographyList = findMapTheMonstersOnDay(dayNum);
    if (cartographyList.length > 0) {
      currentData["mapTheMonsterList"] = cartographyList
        .map((cartographyEntry) => cartographyEntry.encounterDisplay)
        .join(", ");
    }

    statsData.push(currentData);
  }

  return statsData;
}

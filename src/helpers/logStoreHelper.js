import ENTRY_TYPE from 'constants/ENTRY_TYPE';
import REGEX from 'constants/REGEXES';

import Entry from 'classes/Entry';

import logStore from 'store/logStore';

import * as fileParserUtils from 'utilities/fileParserUtils';
import download from 'utilities/download';

/**
 * look at each entry and their neighbor in front and see if
 *  they are valid to combine together
 *
 * @param {Array<Entry>} entriesList
 * @returns {Array<Entry>}
 */
export function combineEntries(entriesList) {
  let combinedEntriesList = [];

  const searchEntries = entriesList.slice();
  const originalLength = entriesList.length;

  // going to look at all the entries,
  while (searchEntries.length > 0) {
    const currEntry = searchEntries.shift();

    // if this is the last entry, we are done
    if (searchEntries.length <= 0) {
      combinedEntriesList.push(currEntry);
      continue;
    }

    // get the next entry and see if it can combine
    const nextEntry = searchEntries.shift();
    if (currEntry.canCombineWith(nextEntry)) {
      const combinedEntry = new Entry({
        entryId: currEntry.id,
        entryIdx: currEntry.entryIdx,
        rawText: currEntry.rawText.concat('\n\n').concat(nextEntry.rawText),
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

  console.log(`%cCombined entries from ${originalLength} to ${combinedEntriesList.length}`, 'color: #6464ff');
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
export function createEstimatedEntries(allEntries) {
  // all data that is being tracked
  const estimates = {
    dateList: [], // kol dates
    prevEntry: null,
    prevTurnNum: -1,
    trackedFamiliar: null, // familiar that user last swapped to
  }

  // start
  const conjecturedEntries = allEntries.map((entry, idx) => {
    // find the next entry that is not a free adventure
    const nextEntry = logStore.findNextEntry(idx, {isAdventure: true});

    // update turnNum
    entry = handleEstimateTurnNum(entry, nextEntry);

    // + use entries with the date in them as a point of reference
    const dateMatch = entry.findMatcher(REGEX.SNAPSHOT.SCOTCH_LOG_DATE) || entry.findMatcher(REGEX.SNAPSHOT.KOL_DATE);
    if (dateMatch !== undefined && !estimates.dateList.includes(dateMatch)) {
      estimates.dateList.push(dateMatch);
    }

    // set dayNum of entry
    entry.dayNum = estimates.dateList.length;

    // + update estimate if familar was swapped to
    if (entry.entryType === ENTRY_TYPE.FAMILIAR) {
      const switchedToFamiliar = entry.findMatcher(REGEX.FAMILIAR.SWITCH_TO_RESULT);
      estimates.trackedFamiliar = switchedToFamiliar || null;
    }

    // apply trackedFamiliar only if it is a combat
    if (entry.isAdventure) {
      entry.familiarUsed = estimates.trackedFamiliar;
    }

    // forced adventures mean they were guaranteed
    entry = handleForcedAdventure(entry, idx);

    // update estimates
    estimates.prevEntry = entry;
    estimates.prevTurnNum = entry.turnNum;

    return entry;
  });

  // done
  logStore.ascensionAttributes.dateList = estimates.dateList || [];
  return conjecturedEntries;
}
/**
 * double check what mafia thinks this turn number is
 *
 * @param {Entry} currEntry
 * @param {Entry} nextEntry
 * @returns {Entry}
 */
function handleEstimateTurnNum(currEntry, nextEntry) {
  const nextTurnNum = nextEntry && nextEntry.rawTurnNum;
  const myTurnNum = currEntry.turnNum;

  // rawTurnNum means that mafia marked it as an adventure
  if (currEntry.hasRawTurnNum) {
    // if the next number is the same as current number, most likely this is a free adv (thanks CaptainScotch!)
    if (nextTurnNum === myTurnNum) {
      currEntry.isInBetweenTurns = true;
      currEntry.turnNum = nextTurnNum - 1;
    }

    // freeing the king doesn't actually take a turn
    if (currEntry.entryType === ENTRY_TYPE.QUEST.ASCENSION_END) {
      currEntry.isInBetweenTurns = true;
      currEntry.turnNum = myTurnNum - 1;
    }

  // I don't have a number, so we'll assume this is before the next adventure
  } else {
    if (nextTurnNum) {
      currEntry.turnNum = nextTurnNum - 1;
    } else {
      currEntry.turnNum = 0;
    }
  }

  return currEntry;
}
/**
 * find and update data for any adventures that were forced to happen
 * - pill keeper
 * - stench jelly
 *
 * @param {Entry} currEntry
 * @param {Number} idx
 * @returns {Entry}
 */
function handleForcedAdventure(currEntry, idx) {
  // Pill Keeper - Sunday surprise semiare activated
  if (currEntry.hasText(REGEX.PILL_KEEPER.SURPRISE)) {
    const surpriseEntry = logStore.findNextEntry(idx, {isSemirare: true});
    if (surpriseEntry) {
      currEntry.additionalDisplay = `"${surpriseEntry.Display}"`;
      surpriseEntry.isForcedAdventure = true;
    }
  }

  // Pill Keeper - Sneakisol activated
  if (currEntry.hasText(REGEX.PILL_KEEPER.SNEAKISOL)) {
    const sneakisolEntry = logStore.findNextEntry(idx, {isNonCombatEncounter: true, isForcedAdventure: false});
    if (sneakisolEntry) {
      currEntry.additionalDisplay = `"${sneakisolEntry.encounterDisplay}"`;
      sneakisolEntry.isForcedAdventure = true;
    }
  }

  // Stench Jellied activated
  if (currEntry.hasText(REGEX.SPACE_JELLYFISH.ACQUIRED_STENCH_JELLIED_EFFECT)) {
    const stenchedNoncombatEntry = []; // since there can be more than one, keep track until the end

    const acquiredList = currEntry.findMatchers(REGEX.SPACE_JELLYFISH.ACQUIRED_STENCH_JELLIED_EFFECT) || ['once'];
    for (let sj=0; sj<acquiredList.length; sj++) {
      const stenchEntry = logStore.findNextEntry(idx, {isNonCombatEncounter: true, isForcedAdventure: false});
      if (stenchEntry) {
        stenchedNoncombatEntry.push(`"${stenchEntry.encounterDisplay}"`);
        stenchEntry.isForcedAdventure = true;
      }
    }

    currEntry.additionalDisplay = `${stenchedNoncombatEntry.join('  &  ')}`;
  }

  // forced friends
  if (currEntry.hasText(REGEX.FOURTH_OF_MAY_COSPLAY_SABER.USE_THE_FORCE_CHOICE_FRIENDS)) {
    for (let sj=0; sj<3; sj++) {
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
      if (friendEntry.hasText(REGEX.FOURTH_OF_MAY_COSPLAY_SABER.USE_THE_FORCE_CHOICE_FRIENDS)) {
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
// -- utility
/**
 * downloads the current ascension log to user
 */
export function downloadFullLog() {
  if (!logStore.isReady) return;
  download(logStore.export(), logStore.fileName, 'text/plain');
}
